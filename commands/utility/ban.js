const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a member and ban them.')
        .setDescriptionLocalizations({
            ko: '멤버를 추방합니다.',
        })
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban')
                .setDescriptionLocalizations({
                    ko: '추방할 멤버를 선택하세요.',
                })
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for banning')
                .setDescriptionLocalizations({
                    ko: '이유를 입력하세요.',
                }))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

        async execute(interaction){
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

            await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
            await interaction.guild.members.ban(target);
        },
};

