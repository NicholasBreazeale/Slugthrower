const Discord = require('discord.js');
const client = new Discord.Client();

const sw_emojis = {};

const dice = [
	{
		"name": "boost",
		"values": [0,0,1,3,5,4]
	},
	{
		"name": "ability",
		"values": [0,1,1,2,4,4,3,5]
	},
	{
		"name": "proficiency",
		"values": [0,1,1,2,2,4,3,3,3,5,5,6]
	},
	{
		"name": "setback",
		"values": [0,0,7,7,10,10]
	},
	{
		"name": "difficulty",
		"values": [0,7,8,10,10,10,11,9]
	},
	{
		"name": "challenge",
		"values": [0,7,7,8,8,10,10,9,9,11,11,12]
	},
	{
		"name": "force",
		"values": [13,13,13,13,13,13,14,15,15,16,16,16]
	}
];
const results = [
	"blank",
	"success",
	"success2",
	"success_advantage",
	"advantage",
	"advantage2",
	"triumph",
	"failure",
	"failure2",
	"failure_threat",
	"threat",
	"threat2",
	"despair",
	"dark",
	"dark2",
	"light",
	"light2"
];

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	// Get emoji from master guild
	for (const [key, value] of client.guilds.cache.get(process.env.MASTER_GUILD_ID).emojis.cache) {
		str = "<:" + value.name + ":" + value.id + ">";
		sw_emojis[value.name] = str;
	}
});

client.on('message', msg => {
	if (msg.content.substring(0, 4) === "/sw ") {
		let reply = "";
		let args = msg.content.split(" ");
		switch (args.length) {
			// Force dice
			case 2:
				let arg = Number(args[1]);
				for (let i = 0; i < arg; i++) {
					reply += sw_emojis[results[dice[6].values[Math.floor(Math.random() * 12)]]] + " ";
				}
				break;
			// Check dice
			case 7:
				for (let i = 0; i < 6; i++) {
					let arg = Number(args[i+1]);
					for (let j = 0; j < arg; j++) {
						reply += sw_emojis[dice[i].name + "_" + results[dice[i].values[Math.floor(Math.random() * dice[i].values.length)]]] + " ";
					}
				}
				break;
			default:
				reply = "Blarg!";
		}
		
		msg.reply(reply);
	}
});

client.login((process.env.TOKEN);