import fs from 'fs';
import Playlists from '@/components/Playlists';

const Cache = async () => {
	const jsonData: string = fs.readFileSync('formattedPlaylists.json').toString();

	const playlists: Playlist[] = JSON.parse(jsonData)
		.filter(({ name }: Playlist) => name.startsWith('20') && name !== '2010s Mix')
		.sort((a: Playlist, b: Playlist) => (a.name > b.name ? -1 : 1));

	return <Playlists playlists={playlists} />;
};

export default Cache;
