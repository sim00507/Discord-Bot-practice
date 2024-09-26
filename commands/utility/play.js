const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require("@distube/ytdl-core");
const ffmpegPath = require('ffmpeg-static');

const path = require('path');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('음악을 재생합니다.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('YouTube URL을 입력하세요.')
                .setRequired(true)), // url 필수 or 필수x
  
    async execute(interaction) {
        const url = interaction.options.getString('url');

        console.log('FFmpeg path:', ffmpegPath);

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('음성 채널에 들어가셔야 음악을 재생할 수 있습니다.');
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = ytdl(url, { filter: 'audioonly', ffmpegPath });
        stream.on('error', (error) => {
            console.error('Stream error:', error);
        });
        console.log('Stream created successfully');

      /*  stream.on('info', (info) => {
            console.log('Stream info:', info);
        });
*/
        const resource = createAudioResource('C:\\Users\\Jyanie\\Downloads\\Sabrina Carpenter Espresso Official Video.mp3',{inlineVolume: true});
       /* const resource = createAudioResource(stream, {
            inlineVolume: true
        }); */
        resource.volume.setVolume(1);

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: 'play' // 구독자가 없더라도 음악을 재생
            }
        });

        connection.subscribe(player);
        player.play(resource);

        player.on('stateChange', (oldState, newState) => {
            console.log(`Audio player state changed from ${oldState.status} to ${newState.status}`);
        });

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('음악이 재생됩니다.');
        });

        player.on(AudioPlayerStatus.Idle, () => {
            console.log('음악 재생이 완료되었습니다.');
            connection.destroy(); 
        });

        player.on('error', (error) => {
            console.error(`Player error: ${error.message} with resource ${error.resource}`);
        });

        try {
            await interaction.reply(`음악 재생 중: ${url}`);
        } catch (error) {
            console.error('Error occurred while trying to reply:', error);
        }
    },
};
