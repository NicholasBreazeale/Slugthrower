const Discord = require('discord.js');
const client = new Discord.Client();

const sw_emojis = {};

class result {
	constructor(title = "", value = [0,0,0,0,0,0]) {
		this.title = title;
		this.value = value;
	}
	toString() {
		let str = this.title + "\nResult:";
		
		// Check if there are no values
		let allZero = true;
		for (let i = 0; i < this.value.length; i++) {
			if (this.value[i] !== 0) {
				allZero = false;
				break;
			}
		}
		if (allZero) {
			return str + " nothing";
		}
		
		// Compose string
		const positives = [sw_emojis["success"], sw_emojis["advantage"], sw_emojis["triumph"], sw_emojis["despair"], sw_emojis["light"], sw_emojis["dark"]];
		const negatives = [sw_emojis["failure"], sw_emojis["threat"]];
		for (let i = 0; i < 6; i++) {
			if (this.value[i] > 0) {
				str += " " + positives[i] + "×" + this.value[i];
			} else if (i < 2 && this.value[i] < 0) {
				str += " " + negatives[i] + "×" + (this.value[i] * -1).toString();
			}
		}
		
		return str;
	}
}

const diceResults = [
	new result("blank"),
	new result("success", [1,0,0,0,0,0]),
	new result("success2", [2,0,0,0,0,0]),
	new result("success_advantage", [1,1,0,0,0,0]),
	new result("advantage", [0,1,0,0,0,0]),
	new result("advantage2", [0,2,0,0,0,0]),
	new result("triumph", [1,0,1,0,0,0]),
	new result("failure", [-1,0,0,0,0,0]),
	new result("failure2", [-2,0,0,0,0,0]),
	new result("failure_threat", [-1,-1,0,0,0,0]),
	new result("threat", [0,-1,0,0,0,0]),
	new result("threat2", [0,-2,0,0,0,0]),
	new result("despair", [-1,0,0,1,0,0]),
	new result("light", [0,0,0,0,1,0]),
	new result("light2", [0,0,0,0,2,0]),
	new result("dark", [0,0,0,0,0,1]),
	new result("dark2", [0,0,0,0,0,2])
];
const dice = {
	b: new result("boost", [0,0,1,3,5,4]),
	a: new result("ability", [0,1,1,2,4,4,3,5]),
	p: new result("proficiency", [0,1,1,2,2,4,3,3,3,5,5,6]),
	s: new result("setback", [0,0,7,7,10,10]),
	d: new result("difficulty", [0,7,8,10,10,10,11,9]),
	c: new result("challenge", [0,7,7,8,8,10,10,9,9,11,11,12]),
	f: new result("force", [15,15,15,15,15,15,16,13,13,14,14,14]),
};

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	// Get emoji from master guild
	for (const [key, value] of client.guilds.cache.get(process.env.MASTER_GUILD_ID).emojis.cache) {
		str = "<:" + value.name + ":" + value.id + ">";
		sw_emojis[value.name] = str;
	}
});

client.on('message', msg => {
	let command = msg.content.split(" ")[0];
	if (command !== "/swr" && command !== "/swroll") {
		return;
	}
	
	let str = msg.content.substring(command.length).trim();
	
	// Validate string
	let matchedStr = str.match(/([0-9]+[a-zA-Z]\s*)+/);
	if (matchedStr === null || str !== matchedStr[0]) {
		msg.reply("Blargh!");
	}
	
	// Parse dice notation
	let diceCount = [], diceType = [];
	for (let i = 0, args = str.match(/[0-9]+|[a-zA-Z]/g); i < args.length; i++) {
		diceCount.push(Number(args[i]));
		i++;
		diceType.push(args[i]);
	}
	
	// Roll dice
	let res = new result();
	for (let i = 0; i < diceCount.length; i++) {
		let die = dice[diceType[i]];
		for (let j = 0; j < diceCount[i]; j++) {
			let r = diceResults[die.value[Math.floor(Math.random() * die.value.length)]];
			res.title += sw_emojis[(die.title !== "force" ? (die.title + "_") : "") + r.title];
			for (let k = 0; k < 6; k++) {
				res.value[k] += r.value[k];
			}
		}
	}
	
	msg.reply(res.toString());
});

client.login(process.env.TOKEN);