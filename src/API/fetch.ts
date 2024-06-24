import { useState, useEffect } from "react";

const UseJSONFetch = (url: string, options: RequestInit) => {
	const [data, setData] = useState<JSON | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!url) return;

		const fetchData = async () => {
			setLoading(true);
			setError(null);


			fetch(url, options)
				.then(response => {
					if (!response.ok) {
						return response.json();
					} else {
						throw new Error(`Error! Status: ${response.status}`)
					}
				})
				.then(data => {
					setData(data)
				})
				.catch(error => setError(error.message))
				.finally(() => {
					setLoading(false);
				});
		}

		fetchData();
	}, [url, options]);

	return { data, loading, error };
}

export default UseJSONFetch;