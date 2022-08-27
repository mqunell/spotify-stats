import { ArtistCount, mostCommonArtists, playlistDurations } from '@/lib/stats';
import { Playlist } from '@/pages/api/playlists';

describe('Stats tests', () => {
	describe('playlistDurations', () => {
		it('handles an empty array', () => {
			expect(playlistDurations([])).toEqual(null);
		});

		it('handles a single playlist', () => {
			expect(playlistDurations([mockPlaylists[0]])).toEqual({
				shortest: { name: 'Mock 0', duration: 1631215 },
				longest: { name: 'Mock 0', duration: 1631215 },
			});
		});

		it('finds the shortest playlist', () => {
			let playlists = mockPlaylists;
			expect(playlistDurations(playlists).shortest).toEqual({
				name: 'Mock 2',
				duration: 1303683,
			});

			playlists = [mockPlaylists[0], mockPlaylists[1]];
			expect(playlistDurations(playlists).shortest).toEqual({
				name: 'Mock 0',
				duration: 1631215,
			});
		});

		it('finds the longest playlist', () => {
			let playlists = mockPlaylists;
			expect(playlistDurations(playlists).longest).toEqual({
				name: 'Mock 1',
				duration: 1658299,
			});

			playlists = [mockPlaylists[2], mockPlaylists[3]];
			expect(playlistDurations([mockPlaylists[2], mockPlaylists[3]]).longest).toEqual({
				name: 'Mock 3',
				duration: 1568293,
			});
		});
	});

	describe('mostCommonArtist', () => {
		it('handles an empty array', () => {
			expect(mostCommonArtists([])).toEqual([]);
		});

		it('counts the most common artist(s) properly', () => {
			let playlists = mockPlaylists;
			expect(mostCommonArtists(playlists)).toEqual([{ artist: 'Architects', count: 3 }]);

			playlists = mockPlaylists.slice(1);
			expect(mostCommonArtists(playlists)).toEqual([
				{ artist: 'Architects', count: 2 },
				{ artist: 'Imminence', count: 2 },
				{ artist: 'Spiritbox', count: 2 },
			]);

			playlists = [mockPlaylists[1]];
			const artistCounts = mostCommonArtists(playlists);
			artistCounts.forEach((artistCount: ArtistCount) => {
				expect(artistCount.count).toEqual(1);
			});
			expect(artistCounts.length).toEqual(mockPlaylists[1].tracks.length);
		});
	});
});

/*
Shortest: Mock 2 - 1303683
Longest: Mock 1 - 1658299
Most common: Architects - 3 (shouldn't count dupes in Mock 0)

Mock 0
Architects			Discourse Is Dead	226605
TDWP					Nightfall			268200
Dayseeker			The Color Black	243333
Veil of Maya		Outsider				249468
Architects			Giving Blood		212063
TDWP					Sour Breath			190000
EC, WBTBWB			Hypa Hypa			241546 = 1631215

Mock 1
Architects			Dead Butterflies	242407
Imminence			The Sickness		243501
OM&M					Obsolete				265750
Zero 9:36			Adrenaline			204198
Spiritbox			Blessed Be			245830
Saul					King Of Misery		235760
Dayseeker			Drunk					220853 = 1658299

Mock 2
WBTBWB				Dreh auf!			184363
Architects			Libertine			241866
FEVER 333			BITE BACK			190657
SWS					Bloody Knuckles	205979
MMF					Blood & Water		230673
MTS, CL				Contraband			250145 = 1303683

Mock 3
AA						Alone Again			228977
MIW					Timebomb				226124
Silent Planet		Panopticon			214066
Imminence			Ghost					255418
DON BROCO			One True Prince	238783
Electric Callboy	We Got the Moves	206858
Spiritbox, SC		Yellowjacket		198067 = 1568293
*/

const mockPlaylists: Playlist[] = [
	{
		name: 'Mock 0',
		link: 'https://open.spotify.com/playlist/2YQ41qOb2Fb9peyrRjFwIx',
		tracks: [
			{
				name: 'Discourse Is Dead',
				duration: 226605,
				link: 'https://open.spotify.com/track/3XFqW9PbzMBy6wV06egJQ2',
				artists: [
					{
						name: 'Architects',
						link: 'https://open.spotify.com/artist/3ZztVuWxHzNpl0THurTFCv',
					},
				],
				album: {
					name: 'For Those That Wish To Exist',
					link: 'https://open.spotify.com/album/7qemUq4n71awwVPOaX7jw4',
					type: 'album',
				},
			},
			{
				name: 'Nightfall',
				duration: 268200,
				link: 'https://open.spotify.com/track/1DGGXoVHUXRBdb8HzqgZR7',
				artists: [
					{
						name: 'The Devil Wears Prada',
						link: 'https://open.spotify.com/artist/0NbQe5CNgh4YApOCDuHSjb',
					},
				],
				album: {
					name: 'Nightfall',
					link: 'https://open.spotify.com/album/6c7U2YXjHUA6W2iljglTaq',
					type: 'single',
				},
			},
			{
				name: 'The Color Black',
				duration: 243333,
				link: 'https://open.spotify.com/track/1WOugzlcgAGDkkERsIZ5N6',
				artists: [
					{
						name: 'Dayseeker',
						link: 'https://open.spotify.com/artist/5FjQVp1Lb0kltmwIuu5kfj',
					},
				],
				album: {
					name: 'Sleeptalk',
					link: 'https://open.spotify.com/album/2oLk2Z8wtuGX1xC9evzvC9',
					type: 'album',
				},
			},
			{
				name: 'Outsider',
				duration: 249468,
				link: 'https://open.spotify.com/track/2UJ7e55bObCYCqpBkehnsr',
				artists: [
					{
						name: 'Veil Of Maya',
						link: 'https://open.spotify.com/artist/2i7CQcVBh2K6uOR3CH09M1',
					},
				],
				album: {
					name: 'Outsider',
					link: 'https://open.spotify.com/album/7GO1IxJeKLxhsOiD6aag2r',
					type: 'single',
				},
			},
			{
				name: 'Giving Blood',
				duration: 212063,
				link: 'https://open.spotify.com/track/5OVb8VkoO9ZYG64ngOPZpW',
				artists: [
					{
						name: 'Architects',
						link: 'https://open.spotify.com/artist/3ZztVuWxHzNpl0THurTFCv',
					},
				],
				album: {
					name: 'For Those That Wish To Exist',
					link: 'https://open.spotify.com/album/7qemUq4n71awwVPOaX7jw4',
					type: 'album',
				},
			},
			{
				name: 'Sour Breath',
				duration: 190000,
				link: 'https://open.spotify.com/track/7aHcIWhVPLBiM1l2D6rvZ0',
				artists: [
					{
						name: 'The Devil Wears Prada',
						link: 'https://open.spotify.com/artist/0NbQe5CNgh4YApOCDuHSjb',
					},
				],
				album: {
					name: 'Sour Breath',
					link: 'https://open.spotify.com/album/1nA10bqx2SBmmvA41osUKe',
					type: 'single',
				},
			},
			{
				name: 'Hypa Hypa',
				duration: 241546,
				link: 'https://open.spotify.com/track/1IEGcGqT1zCMHSF3rLqCLm',
				artists: [
					{
						name: 'Electric Callboy',
						link: 'https://open.spotify.com/artist/1WNoKxsp715jez1Td4vthc',
					},
					{
						name: 'We Butter The Bread With Butter',
						link: 'https://open.spotify.com/artist/1oA1SW4FRAis6e8krh5YAf',
					},
				],
				album: {
					name: 'Hypa Hypa',
					link: 'https://open.spotify.com/album/2ZilFKm58r2FX6H1qazufm',
					type: 'single',
				},
			},
		],
	},
	{
		name: 'Mock 1',
		link: 'https://open.spotify.com/playlist/02drrMTBZCRK9w3uVf6WoB',
		tracks: [
			{
				name: 'Dead Butterflies',
				duration: 242407,
				link: 'https://open.spotify.com/track/740eZizATBkHBPSuFKaGvF',
				artists: [
					{
						name: 'Architects',
						link: 'https://open.spotify.com/artist/3ZztVuWxHzNpl0THurTFCv',
					},
				],
				album: {
					name: 'Dead Butterflies',
					link: 'https://open.spotify.com/album/06HQ3Ea3WmoV7uZdanr87B',
					type: 'single',
				},
			},
			{
				name: 'The Sickness',
				duration: 243501,
				link: 'https://open.spotify.com/track/1Ed94m9ift7NVq8OAZrBiR',
				artists: [
					{
						name: 'Imminence',
						link: 'https://open.spotify.com/artist/7rqJQQxuUOCk052MK5kLsH',
					},
				],
				album: {
					name: 'Turn the Light On (Deluxe Edition)',
					link: 'https://open.spotify.com/album/3GZfQwqf8P4ee6cfusb9c3',
					type: 'album',
				},
			},
			{
				name: 'Obsolete',
				duration: 265750,
				link: 'https://open.spotify.com/track/4d8iN5Re3A6UOYVxZAbJ7v',
				artists: [
					{
						name: 'Of Mice & Men',
						link: 'https://open.spotify.com/artist/4tususHNaR68xdgLstlGBA',
					},
				],
				album: {
					name: 'Obsolete',
					link: 'https://open.spotify.com/album/2hiPqMWbwko9fxKd1JWUI1',
					type: 'single',
				},
			},
			{
				name: 'Adrenaline',
				duration: 204198,
				link: 'https://open.spotify.com/track/3QSVzVODWkWzGeDOGHZW0F',
				artists: [
					{
						name: 'Zero 9:36',
						link: 'https://open.spotify.com/artist/1V599H9vfq6hWe2hGzyzI0',
					},
				],
				album: {
					name: 'Adrenaline',
					link: 'https://open.spotify.com/album/1YcMKSPZJmSf89tiRrYR4V',
					type: 'single',
				},
			},
			{
				name: 'Blessed Be',
				duration: 245830,
				link: 'https://open.spotify.com/track/3vsvxhDA3Bsc4bEVKiJkdA',
				artists: [
					{
						name: 'Spiritbox',
						link: 'https://open.spotify.com/artist/4MzJMcHQBl9SIYSjwWn8QW',
					},
				],
				album: {
					name: 'Blessed Be',
					link: 'https://open.spotify.com/album/5MyS8T1MyTTXGKUXpkrJWL',
					type: 'single',
				},
			},
			{
				name: 'King Of Misery',
				duration: 235760,
				link: 'https://open.spotify.com/track/45tCDAsDDxiCdyWCFtCjgR',
				artists: [
					{
						name: 'Saul',
						link: 'https://open.spotify.com/artist/3bpsYqqHc3GqU3WclK4dpp',
					},
				],
				album: {
					name: 'King Of Misery',
					link: 'https://open.spotify.com/album/7zwHdUqCvKpXB7gM1oHUOp',
					type: 'single',
				},
			},
			{
				name: 'Drunk',
				duration: 220853,
				link: 'https://open.spotify.com/track/36LoyBmv0UAPMZDoxQxwwd',
				artists: [
					{
						name: 'Dayseeker',
						link: 'https://open.spotify.com/artist/5FjQVp1Lb0kltmwIuu5kfj',
					},
				],
				album: {
					name: 'Sleeptalk',
					link: 'https://open.spotify.com/album/2oLk2Z8wtuGX1xC9evzvC9',
					type: 'album',
				},
			},
		],
	},
	{
		name: 'Mock 2',
		link: 'https://open.spotify.com/playlist/3Xn8qtwudwyd9NkgYPFOuj',
		tracks: [
			{
				name: 'Dreh auf!',
				duration: 184363,
				link: 'https://open.spotify.com/track/2lU7wi6V6RpYKYdelZqms6',
				artists: [
					{
						name: 'We Butter The Bread With Butter',
						link: 'https://open.spotify.com/artist/1oA1SW4FRAis6e8krh5YAf',
					},
				],
				album: {
					name: 'Dreh auf!',
					link: 'https://open.spotify.com/album/6wfCf6I0akMdGasL0DcywD',
					type: 'single',
				},
			},
			{
				name: 'Libertine',
				duration: 241866,
				link: 'https://open.spotify.com/track/5xTpvgLLS9uL93Riwe4otA',
				artists: [
					{
						name: 'Architects',
						link: 'https://open.spotify.com/artist/3ZztVuWxHzNpl0THurTFCv',
					},
				],
				album: {
					name: 'For Those That Wish To Exist',
					link: 'https://open.spotify.com/album/7qemUq4n71awwVPOaX7jw4',
					type: 'album',
				},
			},
			{
				name: 'BITE BACK',
				duration: 190657,
				link: 'https://open.spotify.com/track/1oBFfQhQ94n8dNhL3yb9bd',
				artists: [
					{
						name: 'FEVER 333',
						link: 'https://open.spotify.com/artist/1B0155rdv175D1tQ8VH7Oy',
					},
				],
				album: {
					name: 'BITE BACK',
					link: 'https://open.spotify.com/album/67cm6fgju3tVa579TNHXmy',
					type: 'single',
				},
			},
			{
				name: 'Bloody Knuckles',
				duration: 205979,
				link: 'https://open.spotify.com/track/08KyVYfTxXxMk1zAIRDrQB',
				artists: [
					{
						name: 'Sleeping With Sirens',
						link: 'https://open.spotify.com/artist/3N8Hy6xQnQv1F1XCiyGQqA',
					},
				],
				album: {
					name: 'Bloody Knuckles',
					link: 'https://open.spotify.com/album/7x0i7WtY4KmuFrrX6EiKIW',
					type: 'single',
				},
			},
			{
				name: 'Blood & Water',
				duration: 230673,
				link: 'https://open.spotify.com/track/4aKWfvddjsBwIrb3KKLb4x',
				artists: [
					{
						name: 'Memphis May Fire',
						link: 'https://open.spotify.com/artist/7cNNNhdJDrt3vgQjwSavNf',
					},
				],
				album: {
					name: 'Blood & Water',
					link: 'https://open.spotify.com/album/04AnLeNIV9gBaAqgPIJv9N',
					type: 'single',
				},
			},
			{
				name: 'Contraband (feat. Courtney LaPlante)',
				duration: 250145,
				link: 'https://open.spotify.com/track/1BZ9bUYt4fsF2bLVPZp2aU',
				artists: [
					{
						name: 'Make Them Suffer',
						link: 'https://open.spotify.com/artist/0FZcPgWI3BsFQl4rOAGSHT',
					},
					{
						name: 'Courtney LaPlante',
						link: 'https://open.spotify.com/artist/1g9j6GF1jyjrhixt3Vurzs',
					},
				],
				album: {
					name: 'Contraband (feat. Courtney LaPlante)',
					link: 'https://open.spotify.com/album/0qlgSj9XuoYqRc40HAmE3d',
					type: 'single',
				},
			},
		],
	},
	{
		name: 'Mock 3',
		link: 'https://open.spotify.com/playlist/2GDDcQVWJauJzEbAq7sLn1',
		tracks: [
			{
				name: 'Alone Again',
				duration: 228977,
				link: 'https://open.spotify.com/track/3R6WrsYpIuxJw7ZGHT5w85',
				artists: [
					{
						name: 'Asking Alexandria',
						link: 'https://open.spotify.com/artist/1caBfBEapzw8z2Qz9q0OaQ',
					},
				],
				album: {
					name: 'Alone Again',
					link: 'https://open.spotify.com/album/529z8YYjj1Yrib54m9svgq',
					type: 'single',
				},
			},
			{
				name: 'Timebomb',
				duration: 226124,
				link: 'https://open.spotify.com/track/3Mol9yc6kEdpu8lKEvsune',
				artists: [
					{
						name: 'Motionless In White',
						link: 'https://open.spotify.com/artist/6MwPCCR936cYfM1dLsGVnl',
					},
				],
				album: {
					name: 'Timebomb',
					link: 'https://open.spotify.com/album/0QaS7rHAPOIE3P0zaB99Xu',
					type: 'single',
				},
			},
			{
				name: 'Panopticon',
				duration: 214066,
				link: 'https://open.spotify.com/track/6le63Shm2oOFmKhnW8YuvJ',
				artists: [
					{
						name: 'Silent Planet',
						link: 'https://open.spotify.com/artist/0JGTiwfinlCuANGu4Gq2XU',
					},
				],
				album: {
					name: 'Panopticon',
					link: 'https://open.spotify.com/album/0uQCNLjrvPjgWN2Ra0lgxA',
					type: 'single',
				},
			},
			{
				name: 'Ghost',
				duration: 255418,
				link: 'https://open.spotify.com/track/4zXVXBZYAfVF3kpMpxMVXD',
				artists: [
					{
						name: 'Imminence',
						link: 'https://open.spotify.com/artist/7rqJQQxuUOCk052MK5kLsH',
					},
				],
				album: {
					name: 'Ghost',
					link: 'https://open.spotify.com/album/0ItxHvbrwEw58Pi97OZcyM',
					type: 'single',
				},
			},
			{
				name: 'One True Prince',
				duration: 238783,
				link: 'https://open.spotify.com/track/0wvten1XP6yV7NKAhG94h3',
				artists: [
					{
						name: 'DON BROCO',
						link: 'https://open.spotify.com/artist/1aOt6LvXOV6I8dv1A5Diia',
					},
				],
				album: {
					name: 'Uber',
					link: 'https://open.spotify.com/album/4cdXVlLRuQwtehFWu78LLN',
					type: 'single',
				},
			},
			{
				name: 'We Got the Moves',
				duration: 206858,
				link: 'https://open.spotify.com/track/4EFb9FhLyFiDbYKwBwDZre',
				artists: [
					{
						name: 'Electric Callboy',
						link: 'https://open.spotify.com/artist/1WNoKxsp715jez1Td4vthc',
					},
				],
				album: {
					name: 'We Got the Moves',
					link: 'https://open.spotify.com/album/3DlJt0IZ2E2YHTdyP9napb',
					type: 'single',
				},
			},
			{
				name: 'Yellowjacket (feat. Sam Carter)',
				duration: 198067,
				link: 'https://open.spotify.com/track/3yk51U329nwdpeIHV0O5ez',
				artists: [
					{
						name: 'Spiritbox',
						link: 'https://open.spotify.com/artist/4MzJMcHQBl9SIYSjwWn8QW',
					},
					{
						name: 'Sam Carter',
						link: 'https://open.spotify.com/artist/21QEpK62qn34QVshh4qpTK',
					},
				],
				album: {
					name: 'Eternal Blue',
					link: 'https://open.spotify.com/album/6cZ39G1mahxDAGfoPzDllb',
					type: 'album',
				},
			},
		],
	},
];
