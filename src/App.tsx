import { Routes, Route, Link } from 'react-router-dom';
import { useRef } from 'react';
import './App.scss';
import useJSONFetch from './API/fetch';

import { NewPost } from './components/NewPost';

function App() {
	const fetchOptions = useRef<RequestInit>({ method: 'GET' })
	const { data } = useJSONFetch(
		'http://localhost:7070/posts', 
		fetchOptions.current
	);
	console.log(data)

	return (
		<div className='posts'>
			<header className='posts__header'>
				<Link to='/posts/new' className='posts__new-btn button' type='button'>Создать пост</Link>
			</header>
			<Routes>
				<Route path='/posts/new/*' element={<NewPost />} />
			</Routes>
		</div>
	)
}

export default App
