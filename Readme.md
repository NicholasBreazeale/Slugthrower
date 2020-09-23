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