import { GetServerSideProps } from 'next';
import { getPlaylists } from '@/lib/playlists';
import Playlists from '@/components/Playlists';

interface Props {
	playlists: Playlist[];
}

export const getServerSideProps: GetServerSideProps = async () => {
	const playlists = getPlaylists();
	return { props: { playlists } };
};

const Cache = ({ playlists }: Props): JSX.Element => {
	return <Playlists playlists={playlists} />;
};

export default Cache;
