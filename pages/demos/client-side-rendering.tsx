import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ClientSideRendering() {
	const [fetchText, setFetchText] = useState('Loading...');

	useEffect(() => {
		axios
			.get('/api/hello')
			.then((res) => setFetchText(res.data.text))
			.catch((error) => setFetchText(`Failed to load: ${JSON.stringify(error)}`));
	}, []);

	return (
		<div className="p-8">
			<Head>
				<title>CSR Demo</title>
				<meta name="description" content="CSR Demo" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="text-lg underline">Client-side Rendering</h1>
			<p>Use Axios, useEffect, and useState to retrieve data from `api/hello`:</p>
			<p>{fetchText}</p>
		</div>
	);
}
