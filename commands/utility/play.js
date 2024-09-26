const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require("@distube/ytdl-core");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('음악을 재생합니다.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('YouTube URL을 입력하세요.')
                .setRequired(true)),
    
    async execute(interaction) {
        const url = interaction.options.getString('url');

        // 사용자가 음성 채널에 있는지 확인
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('음성 채널에 들어가셔야 음악을 재생할 수 있습니다.');
        }

        // 음성 채널에 연결
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        // YouTube 스트림 가져오기
        const stream = ytdl(url, { filter: 'audioonly' });
        const resource = createAudioResource(stream);

        // 오디오 플레이어 생성 및 재생
        const player = createAudioPlayer();
        connection.subscribe(player);
        player.play(resource);

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('음악이 재생됩니다.');
        });

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy(); // 음악이 끝나면 연결 끊기
        });

        await interaction.reply(`음악 재생 중: ${url}`);
    },
};
