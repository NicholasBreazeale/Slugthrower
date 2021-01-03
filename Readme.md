# Slugthrower #

Discord bot for rolling the special dice from the Star Wars Roleplaying game by Fantasy Flight Games. Die rolls use custom emoji and totals are displayed separately for easy readability.

[Invite](https://discord.com/api/oauth2/authorize?client_id=253751620356014080&permissions=0&scope=bot)

Usage:
```
[/swr OR /swroll] <command>
	help: displays a link to here
	d[10 OR 100]: roll a d10 or d100, can optionally append "+ <number>" to add a modifier to the roll

Roll SWRPG dice: <number><die type>...(spaces are allowed between die groups)
	b: boost (blue d6)
	a: ability (green d8)
	p: proficiency (yellow d12)

	s: setback (black d6)
	d: difficulty (purple d8)
	c: challenge (red d12)

	f: force (white d12)
```

Examples:
- /swroll help
- /swroll 1b2a3p 4s5d6c 7f
- /swr 1b3a1p4d
- /swroll 2a2p 2s3d1c
- /swr 5f
- /swroll d10
- /swr d100 + 20

*Note: Triumph and despair automatically add a success and failure respectively.*

## Running Your Own Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Enter the app and add a bot to it.
3. Replace "process.env.TOKEN" in the bot.js file with the bot's token.
4. In your Discord client, create a new server and add all the custom emoji.
5. Enable developer mode in your Discord client. (Settings > Appearance > Advanced > Developer Mode)
6. Right click your server icon, click "Copy ID", and replace "process.env.MASTER_GUILD_ID" in the bot.js file with the copied ID.
7. Open the folder containing the bot's files in a command window/terminal and enter "npm install".
8. Once installation is complete, enter "npm start". Use this command any time hereafter to start the bot.

### Heroku

If you want to instead run this bot from Heroku, don't edit the bot.js file as seen in steps 3 and 5. Instead, set config vars to the respective values. Once the bot is running, be sure to have the **web** dyno resource disabled and the **worker** dyno enabled.