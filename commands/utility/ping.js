const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('ping')
       /* .setNameLocalizations({
            ko: '핑',
        })*/
        .setDescription('Replies with Pong.')
        /*.setDescriptionLocalizations({
            ko: '퐁으로 응답합니다.',
        })*/,
    async execute(interaction){
        await interaction.reply('Pong!');
    },
};