const demoPlaylists: Playlist[] = [
	{
		name: 'Demo Playlist 1',
		link: 'https://open.spotify.com/playlist/3TUX81exw5z3DMFCe7RWtC',
		tracks: [
			{
				name: "Sometimes You're the Hammer, Sometimes You're the Nail",
				duration: 274034,
				link: 'https://open.spotify.com/track/6ZjvObA6zPCLnKvI0XYdcf',
				artists: [
					{
						name: 'A Day To Remember',
						link: 'https://open.spotify.com/artist/4NiJW4q9ichVqL1aUsgGAN',
					},
				],
				album: {
					name: 'Common Courtesy',
					link: 'https://open.spotify.com/album/1NllrdYrRGnzaOEgMOifMB',
					type: 'album',
				},
			},
			{
				name: 'Murder Mitten',
				duration: 302160,
				link: 'https://open.spotify.com/track/0B3oPKtXM6xhntyFnvXOlz',
				artists: [
					{
						name: 'I See Stars',
						link: 'https://open.spotify.com/artist/3iCJOi5YKh247eutgCyLFe',
					},
				],
				album: {
					name: 'New Demons',
					link: 'https://open.spotify.com/album/3n3mz1JLu21HdX7f4eIHa0',
					type: 'album',
				},
			},
			{
				name: 'Cold Like War',
				duration: 226200,
				link: 'https://open.spotify.com/track/4iLRsbijzBUP9AkQVlEn6z',
				artists: [
					{
						name: 'We Came As Romans',
						link: 'https://open.spotify.com/artist/6qO6LhD6FuXK5e2PtfAIMz',
					},
				],
				album: {
					name: 'Cold Like War',
					link: 'https://open.spotify.com/album/1qpUcrw2nugBO605yX1wGq',
					type: 'album',
				},
			},
			{
				name: 'A Match Made in Heaven',
				duration: 228017,
				link: 'https://open.spotify.com/track/5QDDmrz819WmzBeQHZNhor',
				artists: [
					{
						name: 'Architects',
						link: 'https://open.spotify.com/artist/3ZztVuWxHzNpl0THurTFCv',
					},
				],
				album: {
					name: 'All Our Gods Have Abandoned Us',
					link: 'https://open.spotify.com/album/2NJMu78M8xVy2NAxicD1so',
					type: 'album',
				},
			},
			{
				name: 'Shadow Moses',
				duration: 243320,
				link: 'https://open.spotify.com/track/68osIGtVjM7QWVe6pazLHj',
				artists: [
					{
						name: 'Bring Me The Horizon',
						link: 'https://open.spotify.com/artist/1Ffb6ejR6Fe5IamqA5oRUF',
					},
				],
				album: {
					name: 'Sempiternal (Expanded Edition)',
					link: 'https://open.spotify.com/album/6IYPmM3xsOPL2XPSvf1ZAz',
					type: 'album',
				},
			},
			{
				name: 'Hologram',
				duration: 225853,
				link: 'https://open.spotify.com/track/46wngKirMvdfKTFMMcZyU3',
				artists: [
					{
						name: 'Crown The Empire',
						link: 'https://open.spotify.com/artist/2vKiJjsgjgqIECUyYeIVvO',
					},
				],
				album: {
					name: 'Retrograde',
					link: 'https://open.spotify.com/album/3DyqJmc1Mged8dW8uo3vMe',
					type: 'album',
				},
			},
			{
				name: 'My Old Ways',
				duration: 239813,
				link: 'https://open.spotify.com/track/7ePnBfXkvlEtHWzSgDKJOO',
				artists: [
					{
						name: 'The Plot In You',
						link: 'https://open.spotify.com/artist/1cJ5tVoeAEFcZBAwSZ0CtF',
					},
				],
				album: {
					name: 'Happiness in Self Destruction',
					link: 'https://open.spotify.com/album/0W2ozL102U4aeUWfc55yyk',
					type: 'album',
				},
			},
			{
				name: 'Wishful Sinking',
				duration: 267866,
				link: 'https://open.spotify.com/track/2aIsTGNOM8geFrmQltgfhv',
				artists: [
					{
						name: 'blessthefall',
						link: 'https://open.spotify.com/artist/7t2C8WwLyKUKRe0LVh8zl9',
					},
				],
				album: {
					name: 'Hard Feelings',
					link: 'https://open.spotify.com/album/4ynBCBfxMK2COzPTJ8kma9',
					type: 'album',
				},
			},
			{
				name: 'Better Ash Than Dust',
				duration: 226869,
				link: 'https://open.spotify.com/track/1YzmZx56gqJY77BSNrID31',
				artists: [
					{
						name: 'Stick To Your Guns',
						link: 'https://open.spotify.com/artist/2sqrupqcoipb7UzVKApEnJ',
					},
				],
				album: {
					name: 'Better Ash Than Dust',
					link: 'https://open.spotify.com/album/5gOaWmXqbjthIXx1Xevu0S',
					type: 'single',
				},
			},
			{
				name: 'Into Despair',
				duration: 232261,
				link: 'https://open.spotify.com/track/3704ubdKifYWely4tG7xdI',
				artists: [
					{
						name: 'Currents',
						link: 'https://open.spotify.com/artist/5pqvAI85RMxL9K0xHvSwGu',
					},
				],
				album: {
					name: 'I Let the Devil In',
					link: 'https://open.spotify.com/album/1tlqDcqc36lMw5m3RuyzzK',
					type: 'album',
				},
			},
			{
				name: "Don't Ask, Don't Tell",
				duration: 321866,
				link: 'https://open.spotify.com/track/1iqmSnRWRU2nOkQgbMtG3Q',
				artists: [
					{
						name: 'Chelsea Grin',
						link: 'https://open.spotify.com/artist/4UgQ3EFa8fEeaIEg54uV5b',
					},
				],
				album: {
					name: 'Evolve',
					link: 'https://open.spotify.com/album/02wgJYD4gujyYDIdnqiKAh',
					type: 'single',
				},
			},
			{
				name: 'Widower',
				duration: 278000,
				link: 'https://open.spotify.com/track/3AqydzHbn8KtlKxymfe1fG',
				artists: [
					{
						name: 'Make Them Suffer',
						link: 'https://open.spotify.com/artist/0FZcPgWI3BsFQl4rOAGSHT',
					},
				],
				album: {
					name: 'Neverbloom',
					link: 'https://open.spotify.com/album/6KbvY4ELCjlIYSz5TtrmL2',
					type: 'album',
				},
			},
		],
	},
	{
		name: 'Demo Playlist 2',
		link: 'https://open.spotify.com/playlist/3uKTMsGxVihj9so1nsfKFS',
		tracks: [
			{
				name: 'Hell Finds You Everywhere (feat. Noah Sebastian)',
				duration: 204164,
				link: 'https://open.spotify.com/track/6EfGrYJ8Kw4xuNRd7UzQA3',
				artists: [
					{
						name: 'Thousand Below',
						link: 'https://open.spotify.com/artist/0iU3WDujScAofxcK2EMypN',
					},
					{
						name: 'Noah Sebastian',
						link: 'https://open.spotify.com/artist/3w0i7biKO0q6DGVXCKzhj9',
					},
				],
				album: {
					name: 'Hell Finds You Everywhere',
					link: 'https://open.spotify.com/album/4MF4pjJyipArWvVHiPSSVl',
					type: 'album',
				},
			},
			{
				name: 'Neon Grave',
				duration: 240353,
				link: 'https://open.spotify.com/track/4pehGtiMD6B2WZHsKmr3oo',
				artists: [
					{
						name: 'Dayseeker',
						link: 'https://open.spotify.com/artist/5FjQVp1Lb0kltmwIuu5kfj',
					},
				],
				album: {
					name: 'Dark Sun',
					link: 'https://open.spotify.com/album/0DY5kJhDXPfDjVdSKNvWlL',
					type: 'album',
				},
			},
			{
				name: 'Broken',
				duration: 228600,
				link: 'https://open.spotify.com/track/3xVmo0y8QSYOVLaifgZv8H',
				artists: [
					{
						name: 'The Devil Wears Prada',
						link: 'https://open.spotify.com/artist/0NbQe5CNgh4YApOCDuHSjb',
					},
				],
				album: {
					name: 'Color Decay',
					link: 'https://open.spotify.com/album/5H93Egq9XH6M9R1mkxQDch',
					type: 'album',
				},
			},
			{
				name: 'The Mountain',
				duration: 267602,
				link: 'https://open.spotify.com/track/0ffLIc91fF0lK1E71rRRHp',
				artists: [
					{
						name: 'Of Mice & Men',
						link: 'https://open.spotify.com/artist/4tususHNaR68xdgLstlGBA',
					},
				],
				album: {
					name: 'EARTHANDSKY',
					link: 'https://open.spotify.com/album/0tS05Pktw3qSQqcKIL6YM9',
					type: 'album',
				},
			},
			{
				name: 'Popular Monster',
				duration: 220537,
				link: 'https://open.spotify.com/track/4GssB27iJeqmfGxS94Tfij',
				artists: [
					{
						name: 'Falling In Reverse',
						link: 'https://open.spotify.com/artist/2CmaKO2zEGJ1NWpS1yfVGz',
					},
				],
				album: {
					name: 'Popular Monster',
					link: 'https://open.spotify.com/album/4gxFqhVYU4wp1XDH1KiIo4',
					type: 'single',
				},
			},
			{
				name: 'Erase',
				duration: 223089,
				link: 'https://open.spotify.com/track/68OfR28SM9D06I3UfGC2p9',
				artists: [
					{
						name: 'Imminence',
						link: 'https://open.spotify.com/artist/7rqJQQxuUOCk052MK5kLsH',
					},
				],
				album: {
					name: 'Turn the Light On',
					link: 'https://open.spotify.com/album/75DTIyll3eRg99nyMMeqaA',
					type: 'album',
				},
			},
			{
				name: 'Take Me Back To Eden',
				duration: 500116,
				link: 'https://open.spotify.com/track/2Gt7fjNlx901pPRkvBiNBZ',
				artists: [
					{
						name: 'Sleep Token',
						link: 'https://open.spotify.com/artist/2n2RSaZqBuUUukhbLlpnE6',
					},
				],
				album: {
					name: 'Take Me Back To Eden',
					link: 'https://open.spotify.com/album/1gjugH97doz3HktiEjx2vY',
					type: 'album',
				},
			},
			{
				name: 'Riptide',
				duration: 211119,
				link: 'https://open.spotify.com/track/4Xgono4pmRbojXlCIYh8or',
				artists: [
					{
						name: 'Beartooth',
						link: 'https://open.spotify.com/artist/6vwjIs0tbIiseJMR3pqwiL',
					},
				],
				album: {
					name: 'The Surface',
					link: 'https://open.spotify.com/album/5WmbnLQhy8ndx8S7puEolG',
					type: 'album',
				},
			},
			{
				name: 'Hypa Hypa',
				duration: 213000,
				link: 'https://open.spotify.com/track/6KitEot8XS4u38FrxccbV0',
				artists: [
					{
						name: 'Electric Callboy',
						link: 'https://open.spotify.com/artist/1WNoKxsp715jez1Td4vthc',
					},
				],
				album: {
					name: 'Hypa Hypa',
					link: 'https://open.spotify.com/album/6peXY6oxX8yRjpWII0qjU6',
					type: 'single',
				},
			},
			{
				name: 'THE DEATH OF PEACE OF MIND',
				duration: 241499,
				link: 'https://open.spotify.com/track/6tRneEcItwpSxBtqgem5Dr',
				artists: [
					{
						name: 'Bad Omens',
						link: 'https://open.spotify.com/artist/3Ri4H12KFyu98LMjSoij5V',
					},
				],
				album: {
					name: 'THE DEATH OF PEACE OF MIND',
					link: 'https://open.spotify.com/album/3p7m1Pmg6n3BlpL9Py7IUA',
					type: 'album',
				},
			},
			{
				name: 'NERVOUS',
				duration: 246463,
				link: 'https://open.spotify.com/track/1Oi9XgOIpxhFve8jtEitjK',
				artists: [
					{
						name: 'While She Sleeps',
						link: 'https://open.spotify.com/artist/38LdIuxB548zgHoEY2AN7a',
					},
					{
						name: 'Simon Neil',
						link: 'https://open.spotify.com/artist/1bacSIxMGJgKSpuzxRXpiz',
					},
				],
				album: {
					name: 'SLEEPS SOCIETY',
					link: 'https://open.spotify.com/album/0wotrj0XrHFh7x2FVvsuA1',
					type: 'album',
				},
			},
			{
				name: 'Knives',
				duration: 256068,
				link: 'https://open.spotify.com/track/0A04MG489D3uGPYpNcjniU',
				artists: [
					{
						name: 'Bullet For My Valentine',
						link: 'https://open.spotify.com/artist/7iWiAD5LLKyiox2grgfmUT',
					},
				],
				album: {
					name: 'Bullet For My Valentine',
					link: 'https://open.spotify.com/album/76DreJ7TNtULuyeVoPC9rw',
					type: 'album',
				},
			},
			{
				name: 'Unleashed',
				duration: 275177,
				link: 'https://open.spotify.com/track/0TB3g8StOcm9UacldRD2Rj',
				artists: [
					{
						name: 'Killswitch Engage',
						link: 'https://open.spotify.com/artist/37394IP6uhnjIpsawpMu4l',
					},
				],
				album: {
					name: 'Atonement',
					link: 'https://open.spotify.com/album/5k1IQPbz37ctTDrw4vbvtp',
					type: 'album',
				},
			},
			{
				name: 'The Death We Seek',
				duration: 245719,
				link: 'https://open.spotify.com/track/0VwEIRp1gZihPBqQVKBd9w',
				artists: [
					{
						name: 'Currents',
						link: 'https://open.spotify.com/artist/5pqvAI85RMxL9K0xHvSwGu',
					},
				],
				album: {
					name: 'The Death We Seek',
					link: 'https://open.spotify.com/album/0llAadNufIDvVRzWfSxQxC',
					type: 'album',
				},
			},
			{
				name: 'Of the Abyss',
				duration: 343032,
				link: 'https://open.spotify.com/track/3wzAXBZ6mhuYEzf2IJAbDc',
				artists: [
					{
						name: 'Lorna Shore',
						link: 'https://open.spotify.com/artist/6vXYoy8ouRVib302zxaxFF',
					},
				],
				album: {
					name: '...And I Return To Nothingness - EP',
					link: 'https://open.spotify.com/album/0pt5jMdHTsMtlzpc4OMmAk',
					type: 'single',
				},
			},
		],
	},
	{
		name: 'Demo Playlist 3',
		link: 'https://open.spotify.com/playlist/3QrNWnoss3WuvpurJKAdCv',
		tracks: [
			{
				name: 'Planet Zero',
				duration: 222738,
				link: 'https://open.spotify.com/track/7g2LuO2QFplZfsLKRFiVHl',
				artists: [
					{
						name: 'Shinedown',
						link: 'https://open.spotify.com/artist/70BYFdaZbEKbeauJ670ysI',
					},
				],
				album: {
					name: 'Planet Zero',
					link: 'https://open.spotify.com/album/7tWcsQLHpvXnUPN1jsSaGw',
					type: 'album',
				},
			},
			{
				name: 'Lifetime',
				duration: 176226,
				link: 'https://open.spotify.com/track/19dNZyDyw00aKgr6S0Os6e',
				artists: [
					{
						name: 'Three Days Grace',
						link: 'https://open.spotify.com/artist/2xiIXseIJcq3nG7C8fHeBj',
					},
				],
				album: {
					name: 'EXPLOSIONS',
					link: 'https://open.spotify.com/album/4drZZN0HTkJzcdlPmmQyqG',
					type: 'album',
				},
			},
			{
				name: 'Bad Man',
				duration: 202379,
				link: 'https://open.spotify.com/track/0CGyintEvK6qL0BPvQWZ37',
				artists: [
					{
						name: 'Disturbed',
						link: 'https://open.spotify.com/artist/3TOqt5oJwL9BE2NG9MEwDa',
					},
				],
				album: {
					name: 'Divisive',
					link: 'https://open.spotify.com/album/592wLCECATlzgwiEWTOPEa',
					type: 'album',
				},
			},
			{
				name: 'Wolf (feat. John Cooper of Skillet)',
				duration: 198750,
				link: 'https://open.spotify.com/track/2TotmUJiZqzDh7OMjD7zGr',
				artists: [
					{
						name: 'Saint Asonia',
						link: 'https://open.spotify.com/artist/6Fwq3TDWpMhcL1KTKVQiI8',
					},
					{
						name: 'Skillet',
						link: 'https://open.spotify.com/artist/49bzE5vRBRIota4qeHtQM8',
					},
				],
				album: {
					name: 'Wolf (feat. John Cooper of Skillet)',
					link: 'https://open.spotify.com/album/6q3tBwBS5uMSeeWD3JRhDZ',
					type: 'single',
				},
			},
			{
				name: 'THE DAM',
				duration: 240725,
				link: 'https://open.spotify.com/track/4zD1UlSWZ1YvG9pJmjVXZ8',
				artists: [
					{
						name: 'Daughtry',
						link: 'https://open.spotify.com/artist/5P5FTygHyx2G57oszR3Wot',
					},
				],
				album: {
					name: 'SHOCK TO THE SYSTEM (PART ONE)',
					link: 'https://open.spotify.com/album/3Phx7bXkyoGS0O39giHiXS',
					type: 'single',
				},
			},
			{
				name: 'Ashes of Eden',
				duration: 293640,
				link: 'https://open.spotify.com/track/7HjNOz8Y7H7uSySXuHNg1Y',
				artists: [
					{
						name: 'Breaking Benjamin',
						link: 'https://open.spotify.com/artist/5BtHciL0e0zOP7prIHn3pP',
					},
				],
				album: {
					name: 'Dark Before Dawn',
					link: 'https://open.spotify.com/album/09asAAZJ7rXedp9J8wqvBR',
					type: 'album',
				},
			},
			{
				name: 'Numb',
				duration: 187520,
				link: 'https://open.spotify.com/track/0kO3njY9N1Rxgv27Ha1lLh',
				artists: [
					{
						name: 'Linkin Park',
						link: 'https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz',
					},
				],
				album: {
					name: 'Meteora (Bonus Edition)',
					link: 'https://open.spotify.com/album/0y13VbGddQ4azdVWakksAL',
					type: 'album',
				},
			},
		],
	},
]

export default demoPlaylists
