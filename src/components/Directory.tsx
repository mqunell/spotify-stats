'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import ChoosePlaylists from './ChoosePlaylists'
import Loading from './Loading'
import Playlists from './Playlists'

// TODO: Continue refactoring this component:
// * Rename the component and file
// * Split the data fetching portions and use Suspense
// * Use fewer `return`s

const Directory = ({ accessToken, logout }: { accessToken: string; logout: Function }) => {
	const [userData, setUserData] = useState<UserData>({
		loading: false,
		displayName: '',
		playlistMetas: [],
		error: null,
	})
	const [selectedPlaylistLinks, setSelectedPlaylistLinks] = useState<string[]>([])
	const [showChoosePlaylists, setShowChoosePlaylists] = useState<boolean>(true)
	const [fetchedPlaylists, setFetchedPlaylists] = useState<Playlist[]>([])

	useEffect(() => {
		const getAuthData = async () => {
			setUserData((prev) => ({ ...prev, loading: true }))

			try {
				const res = await axios.post('/api/user', { accessToken })
				const { displayName, playlistMetas } = res.data
				setUserData((prev) => ({ ...prev, displayName, playlistMetas }))
			} catch (error) {
				console.debug('getAuthData error', error)
				setUserData((prev) => ({ ...prev, error: error?.message ?? 'Unknown' }))
			}

			setUserData((prev) => ({ ...prev, loading: false }))
		}

		if (!accessToken) {
			setUserData({ loading: false, displayName: '', playlistMetas: [], error: '' })
		} else {
			getAuthData()
		}
	}, [accessToken])

	const fetchPlaylistsTracks = async () => {
		const playlistMetas = userData.playlistMetas.filter(({ apiLink }) =>
			selectedPlaylistLinks.includes(apiLink),
		)

		try {
			const res = await axios.post('/api/playlistsTracks', { playlistMetas })
			const playlists: Playlist[] = res.data

			setFetchedPlaylists(playlists)
		} catch (error) {
			console.log('api fail')
		}
	}

	if (userData.loading) return <Loading />
	if (userData.error) return <p>{userData.error}</p>

	if (showChoosePlaylists) {
		return (
			<>
				<h1 className="text-xl">Hello, {userData.displayName}</h1>
				<ChoosePlaylists
					playlistMetas={userData.playlistMetas}
					selectedPlaylists={selectedPlaylistLinks}
					setSelectedPlaylists={setSelectedPlaylistLinks}
					submitPlaylists={() => {
						setShowChoosePlaylists(false)
						fetchPlaylistsTracks()
					}}
				/>
			</>
		)
	}

	if (!fetchedPlaylists.length) {
		return <Loading quantity={selectedPlaylistLinks.length} />
	}

	return (
		<>
			<Playlists playlists={fetchedPlaylists} />

			<div className="mx-auto mt-2 flex gap-4">
				<button
					type="button"
					className="rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-400"
					onClick={() => {
						setShowChoosePlaylists(true)
						setFetchedPlaylists([])
					}}
				>
					Change playlists
				</button>

				<button
					type="button"
					className="rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-400"
					onClick={() => logout()}
				>
					Logout (from here, not Spotify)
				</button>
			</div>
		</>
	)
}

export default Directory
