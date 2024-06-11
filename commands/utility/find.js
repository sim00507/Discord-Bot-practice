const { SlashCommandBuilder, EmbedBuilder, User } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('find')
        .setDescription('특정 유저의 정보를 표시합니다.')
        .addUserOption(option=> option
            .setName('멤버')
            .setDescription('찾을 멤버')
            .setRequired(true)

        )
    ,
    async execute(interaction){
        const target = interaction.options.getUser('멤버');
        console.log(target)
        const embed = new EmbedBuilder()
            .setColor('#04BF8A')
            .setTitle('Information')
            .setAuthor({name: `${target.username}`/*, iconURL: '', url: ``*/})
            .setDescription('Display user information')
           // .setThumbnail(`${interaction.user.avatarURL()}`)
            .addFields(
                { name: '\u200A', value: '\u200A' },
                { name: 'username', value: `${target.username}`, inline: true },
                { name: 'id', value: `${target.id}`, inline: true },
                { name: 'avatar', value: `${target.avatar}`, inline: false },
            )
            .setImage(`${target.avatarURL()}`)
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`})
            
            

        await interaction.reply({ embeds: [embed] });
    },
}