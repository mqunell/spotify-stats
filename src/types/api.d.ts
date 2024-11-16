/**
 * See the links for more information and unlisted properties
 */

// /me
type ApiMe = {
	display_name: string
	href: string
	id: string
	// others
}

// /users/{user_id}/playlists
// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-list-users-playlists
type ApiPlaylistsMeta = {
	href: string
	items: ApiPlaylist[]
	limit: number // [1, 50]; default 20
	next: string | null
	offset: number // [0, 100,000]; default 0
	previous: string | null
	total: number
}

// /playlists/{playlist_id}
// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
type ApiPlaylist = {
	description: string | null
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	images: {
		url: string
		height: number
		width: number
	}[]
	name: string
	public: boolean
	snapshot_id: string
	tracks: {
		href: string // Used to get playlist tracks
		total: number
	}
	uri: string
}

type ApiPlaylistTracksMeta = {
	href: string
	items: ApiPlaylistTrack[]
	limit: number
	next: string | null
	offset: number
	previous: string | null
	total: number
}

type ApiPlaylistTrack = {
	track: {
		album: {
			album_type: string
			external_urls: {
				spotify: string
			}
			name: string
		}
		artists: {
			external_urls: {
				spotify: string
			}
			name: string
		}[]
		duration_ms: number
		external_urls: {
			spotify: string
		}
		name: string
	}
}
