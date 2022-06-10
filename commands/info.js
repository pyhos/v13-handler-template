const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const { color, footer, avatar } = require('../config/embed-config')

/**
 * Basit bir kullanıcı ve sunucu komududur.
 * 
 * Yapan: ' sallamadım#3027
 * 
 * 
 */

module.exports = {
	data: new SlashCommandBuilder()
	.setName('info')
    .setDescription("Info of user or a server.")
    .addSubcommand(subCommand => 
        subCommand.setName('user').setDescription("Basic user info.")
        .addUserOption(option => option.setName('user').setDescription('Mentioned user.').setRequired(false)))
    .addSubcommand(subCommand => 
        subCommand.setName('server').setDescription('Basic server info.')),
        /**
        * 
        * @param {Discord.Interaction} interaction
        * @returns
        */
	    async execute(interaction) {
            if(interaction.options.getSubcommand() === "user") {
                let user = interaction.options.getUser('user')
                let member = interaction.member || user.member
                if(user) {
                    const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setFooter({ text: footer, iconURL: avatar })
                    .setAuthor({ name: `${user.username}`, iconURL: user.displayAvatarURL({dynamic:true}) })
                    .addFields(
                        { name: `Username & ID:`, value: `${user.username} & ${user.id}`, inline: true },
                        { name: `Avatar link:`, value: `[Click](${user.displayAvatarURL()})`, inline: true },
                        { name: `Creation Date:`, value: `${user.createdAt.toLocaleDateString("en-us")}`, inline: true },
                        { name: `Server Join Date`, value: `${member.joinedAt.toLocaleDateString("en-us")}` }
                    )
                    .setDescription(`User info for: ${user.username}`)

                    await interaction.reply({ embeds: [ embed ] });
                } else if(!user) {
                    const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setFooter({ text: footer, iconURL: avatar })
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic:true}) })
                    .addFields(
                        { name: `Username & ID:`, value: `${interaction.user.username} & ${interaction.user.id}`, inline: true },
                        { name: `Avatar link:`, value: `[Click](${interaction.user.displayAvatarURL()})`, inline: true },
                        { name: `Creation Date:`, value: `${interaction.user.createdAt.toLocaleDateString("en-us")}`, inline: true },
                        { name: `Server Join Date`, value: `${member.joinedAt.toLocaleDateString("en-us")}` }
                    )
                    .setDescription(`User info for: ${interaction.user.username}`)


                    await interaction.reply({ embeds: [ embed ] });
                }

            } else if(interaction.options.getSubcommand() === "server") {
                let server = interaction.guild 
                let banner = `[Click](${server.bannerURL()})` ? `No banner.` : "No banner."

                const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setFooter({ text: footer, iconURL: avatar })
                .setAuthor({ name: `${server.name}`, iconURL: server.iconURL({dynamic:true}) })
                .addFields(
                    { name: `Name & ID:`, value: `${server.name} & ${server.id}`, inline: true },
                    { name: `Icon link:`, value: `[Click](${server.iconURL()})`, inline: true },
                    { name: `Creation Date:`, value: `${server.createdAt.toLocaleDateString("en-us")}`, inline: true },
                    { name: `Server banner link`, value: `${banner}` }
                )
                .setDescription(`Server info for: ${server.name}`)

                await interaction.reply({ embeds: [ embed ] })
                
            }
            
            
	},
};