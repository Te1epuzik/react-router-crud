import classes from './layOut.module.scss';
import { Link, Outlet } from 'react-router-dom';

export const LayOut = () => {
	return (
		<div className='posts'>
			<header className='posts__header'>
				<Link to='/posts/new/publication' className='posts__new-btn button' type='button'>Создать пост</Link>
			</header>
			<Outlet />
		</div>
	)
}
