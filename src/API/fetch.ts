import { useEffect } from "react";

export const fetch = (url: string, deps = [], callback) => {
	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(value => callback(value))
	}, deps);
}