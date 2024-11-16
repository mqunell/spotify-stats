import Link from 'next/link'

const Login = () => (
	<>
		<h1 className="text-xl">Music Time 🎸 🥁</h1>
		<p>Authenticate with Spotify for the Full Experience™️</p>
		<Link href="/api/auth" className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500">
			Log in with Spotify 🤙
		</Link>
	</>
)

export default Login
