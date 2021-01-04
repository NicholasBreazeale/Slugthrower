# Slugthrower #

Discord bot for rolling the special dice from the Star Wars Roleplaying game by Fantasy Flight Games. Die rolls use custom emoji and totals are displayed separately for easy readability.

[Invite](https://discord.com/api/oauth2/authorize?client_id=253751620356014080&permissions=264192&scope=bot)

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
3. In your Discord client, create a new server and add all the custom emoji.
4. Open the folder containing the bot's files in a command window/terminal and enter "npm install".
5. Set the following environment variables in the terminal:
	1. TOKEN = The bot's token.
	2. MASTER_GUILD_ID = The server ID with the cusom emoji ([finding the ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)).
6. Enter "npm start".

Repeat steps 5 and 6 to restart the bot.

### Heroku

If you want to instead run this bot from Heroku, set the environment variables in the app's config vars. Once the bot is running, be sure to enable only the **worker** dyno.