const { SlashCommandBuilder, EmbedBuilder, User } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('me')
        .setDescription('자신의 정보를 표시합니다.')
    ,
    async execute(interaction){
        const embed = new EmbedBuilder()
            .setColor('#04BF8A')
            .setTitle('Information')
            .setAuthor({name: `${interaction.user.username}`/*, iconURL: '', url: ``*/})
            .setDescription('Display your information')
           // .setThumbnail(`${interaction.user.avatarURL()}`)
            .addFields(
                { name: '\u200A', value: '\u200A' },
                { name: 'username', value: `${interaction.user.username}`, inline: true },
                { name: 'id', value: `${interaction.user.id}`, inline: true },
                { name: 'avatar', value: `${interaction.user.avatar}`, inline: false },
            )
            .setImage(`${interaction.user.avatarURL()}`)
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`})
            
            

        await interaction.reply({ embeds: [embed] });
    },
}