import { getPlaylists } from '@/lib/playlists';
import Playlists from '@/components/Playlists';

const Cache = async () => {
	const playlists: Playlist[] = getPlaylists();

	return <Playlists playlists={playlists} />;
};

export default Cache;
