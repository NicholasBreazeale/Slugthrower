const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
	if (msg.content === 'ping') {
		msg.reply('Pong!');
	}
}

client.login(process.env.BOT_TOKEN);