const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
        const embed = new EmbedBuilder()
            .setColor('#04BF8A')
            .setDescription('Pong!')
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });

    },
    
};