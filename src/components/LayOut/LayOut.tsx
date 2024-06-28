import { Link, Outlet } from 'react-router-dom';
import { AllPosts } from '../AllPosts';
import { useRef } from 'react';
import UseJSONFetch from '../../API/fetch';


export const LayOut = () => {
	const fetchOptions = useRef<RequestInit>({ method: 'GET' })
	const { data } = UseJSONFetch(
		'http://localhost:7070/posts',
		fetchOptions.current
	);

	return (
		<div className='posts'>
			<header className='posts__header'>
				<Link to='/posts/new/publication' className='posts__new-btn button' type='button'>Создать пост</Link>
			</header>
			<Outlet />
			<AllPosts data={data} />
		</div>
	)
}
