import Link from 'next/link'
import demoPlaylists from '@/lib/demoPlaylists'
import Playlists from './Playlists'

const Login = () => (
	<>
		<section className="grid h-screen w-full place-items-center">
			<div className="flex w-full max-w-screen-sm flex-col items-center rounded-lg border p-12 shadow">
				<h1 className="text-xl">View playlists and stats</h1>

				<Link
					href="/api/auth"
					className="mb-8 mt-2 w-max rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
				>
					Authenticate with Spotify
				</Link>

				<p className="text-sm">Scroll down for demo ⬇️</p>
			</div>
		</section>
		<div className="min-h-screen w-full">
			<Playlists playlists={demoPlaylists} />
		</div>
	</>
)

export default Login
