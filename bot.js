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

function fullMatch(str, regex) {
	let matchedStr = str.match(regex);
	return (matchedStr !== null && matchedStr[0] === str);
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	// Get emoji from master guild
	for (const [key, value] of client.guilds.cache.get(process.env.MASTER_GUILD_ID).emojis.cache) {
		sw_emojis[value.name] = "<:" + value.name + ":" + value.id + ">";
	}
});

client.on('message', msg => {
	let command = msg.content.split(" ")[0];
	if (command !== "/swr" && command !== "/swroll") {
		return;
	}

	let str = msg.content.substring(command.length).trim();

	if (str === "help") {
		msg.reply("Usage guide can be found here: https://github.com/NicholasBreazeale/Slugthrower#slugthrower");
		return;
	}

	// d10/d100 + mod
	if (fullMatch(str, /^d100?(\s*\+\s*[0-9]+)?$/)) {
		let args = str.match(/[0-9]+/g);
		let replyMsg = "";

		// Roll die
		let rand = Math.floor(Math.random() * Number(args[0]));
		replyMsg = "(" + rand.toString() + ") ";

		// Add modifier (if available)
		if (args.length === 2) {
			replyMsg += "+ " + args[1] + " = " + (rand + Number(args[1])).toString();
		} else {
			replyMsg += "= " + rand.toString();
		}

		msg.reply(replyMsg);
		return;
	}

	// SWFFG dice
	if (fullMatch(str, /([0-9]+[abcdfps]\s*)+/)) {
		let args = str.match(/[0-9]+|[abcdfps]/g);

		// Roll dice
		let res = new result();
		for (let i = 0; i < args.length; i += 2) {
			let die = dice[args[i+1]];
			for (let j = 0; j < Number(args[i]); j++) {
				let r = diceResults[die.value[Math.floor(Math.random() * die.value.length)]];

				// Concatenate emoji
				res.title += sw_emojis[(die.title !== "force" ? (die.title + "_") : "") + r.title];
				// Add array values
				for (let k = 0; k < 6; k++) {
					res.value[k] += r.value[k];
				}
			}
		}

		msg.reply(res.toString());
		return;
	}

	// No valid roll query
	msg.reply("Blargh!");
});

client.login(process.env.TOKEN);