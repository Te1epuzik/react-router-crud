import { Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import './App.scss';
import useJSONFetch from './API/fetch';

import { NewPost } from './components/NewPost';
import { LayOut } from './components/LayOut';

function App() {
	const fetchOptions = useRef<RequestInit>({ method: 'GET' })
	const { data } = useJSONFetch(
		'http://localhost:7070/posts',
		fetchOptions.current
	);
	console.log(data)

	return (
		<Routes>
			<Route path='/' element={<LayOut />}>
				<Route path='/posts/new/*' element={<NewPost />} />
			</Route>
		</Routes>
	)
}

export default App
