import { RATE_LIMIT_DELAY, RATE_LIMIT_REQUESTS } from '@/lib/constants';
import { useEffect, useState } from 'react';

const Loading = ({ quantity }: { quantity: number }) => {
	const [loadingCount, setLoadingCount] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setLoadingCount((prev) => prev + 1);
		}, RATE_LIMIT_DELAY / RATE_LIMIT_REQUESTS);

		return () => clearInterval(interval);
	}, []);

	const LoadingText = () => {
		if (quantity === 0) return <span>Loading playlists...</span>;

		if (loadingCount <= quantity)
			return (
				<span>
					Loading playlist {loadingCount}/{quantity}...
				</span>
			);

		return <span>Formatting {quantity} playlists...</span>;
	};

	console.log({ quantity, loadingCount });

	return (
		<div className="flex gap-1">
			<span className="animate-spin">♾️</span>
			<LoadingText />
		</div>
	);
};

export default Loading;
