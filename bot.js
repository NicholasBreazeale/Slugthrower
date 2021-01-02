const Discord = require("discord.js");
const client = new Discord.Client();

const dice = require("./data/dice.json");
const display = require("./data/display.json");
const results = require("./data/results.json");

const sw_emojis = {};

function fullMatch(str, regex) {
	const matchedStr = str.match(regex);
	return (matchedStr !== null && matchedStr[0] === str);
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	// Get emoji from master guild
	for (const [key, value] of client.guilds.cache.get(process.env.MASTER_GUILD_ID).emojis.cache) {
		sw_emojis[value.name] = `<:${value.name}:${value.id}>`;
	}
});

client.on("message", msg => {
	const [command, ...args] = msg.content.split(/\s+/);
	if (command !== "/swr" && command !== "/swroll") {
		return;
	}

	const diceFormula = args.join("");

	// Redirect a help command to the github page
	if (diceFormula === "help") {
		msg.reply("Usage guide can be found here: https://github.com/NicholasBreazeale/Slugthrower#slugthrower");
		return;
	}

	// d10/d100 + mod
	if (fullMatch(diceFormula, /^d100?(\+[0-9]+)?/)) {
		const [dieSize, modifier] = diceFormula.match(/[0-9]+/g);
		const dieRoll = Math.floor(Math.random() * Number(dieSize));
		msg.reply(`(${dieRoll}) ${modifier !== undefined ? `+ ${modifier} = ${(dieRoll + Number(modifier))}` : `= ${dieRoll}`}`)
		return;
	}

	// SWFFG dice
	if (fullMatch(diceFormula, /([0-9]+[abcdfps])+/)) {
		const rolls = [];
		const resultArr = results["init"].slice();

		// Roll dice
		diceFormula.match(/[0-9]+[abcdfps]/g).forEach(currentValue => {
			const dieCount = Number(currentValue.slice(0, -1));
			const dieType = Object.keys(dice).find(element => element[0] === currentValue.slice(-1));

			for (let i = 0; i < dieCount; i++) {
				let roll = dice[dieType][Math.floor(Math.random() * dice[dieType].length)];
				rolls.push(sw_emojis[`${dieType}_${roll}`]);
				// Add results together
				results[roll].forEach((currentValue, index) => {
					resultArr[index] += currentValue;
				});
			}
		});

		// Generate a simple roll result
		let resultStr = resultArr.reduce((accumulator, currentValue, index) => {
			if (currentValue !== 0) {
				return accumulator + ` ${sw_emojis[display[currentValue > 0 ? "positive" : "negative"][index]]}x${Math.abs(currentValue)}`;
			} else {
				return accumulator;
			}
		}, "");
		resultStr = `Results:${resultStr === "" ? " nothing": resultStr}`;

		msg.reply(`${rolls.join("")}\n${resultStr}`);
		return;
	}

	// No valid roll query
	msg.reply("Blargh!");
});

client.login(process.env.TOKEN);