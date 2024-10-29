Spotify authentication:
app/page.tsx         ->  <Login />
  <Login />          ->  /api/auth
  /api/auth          ->  https://accounts.spotify.com/authorize  ->  /api/authCallback
  /api/authCallback  ->  https://accounts.spotify.com/api/token  ->  app/page.tsx with tokens in cookies
app/page.tsx         ->  /api/user (with access token) for basic user data and playlist metas

Choosing playlists and fetching tracks:
app/page.tsx         ->  <ChoosePlaylists /> until playlists chosen/fetched

Displaying tables of playlists and tracks:
app/page.tsx         ->  <Playlists /> until button clicked to choose again
  <Playlists /> handles filtering and statistics
	<Playlists /> passes data to <PlaylistsMobile /> and <PlaylistsDesktop /> only for displaying (ie. no extra logic)
