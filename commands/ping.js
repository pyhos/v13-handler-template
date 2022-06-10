const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')


/**
 * Basit bir ping komududur.
 * 
 * Yapan: ' sallamadım#3027
 * 
 * 
 */



module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows bot latency.'),
	/**
	 * 
	 * @param {Discord.Interaction} interaction 
	 */	
	async execute(interaction) {
		await interaction.reply(`${interaction.client.ws.ping}MS ping!`);
	},
};