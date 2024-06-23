import classes from './newPost.module.scss';
import { TMenu } from '../../models/newPostModel';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import closeIcon from '../../assets/close_24dp_FILL0_wght400_GRAD0_opsz24.svg';

import { Publication } from './Publication';

export const NewPost = () => {
	const menuList: TMenu[] = [
		{
			name: 'Публикация',
			link: '/posts/new/publication',
			id: 0,
		},
		{
			name: 'Фото/видео',
			link: '/posts/new/media',
			id: 1,
		},
		{
			name: 'Прямой эфир',
			link: '/posts/new/live',
			id: 2,
		},
		{
			name: 'Ещё',
			link: '/posts/new/more',
			id: 3,
		},
	];

	return (
		<div className={classes['new-post']}>
			<header className={classes['new-post__header']}>
				<nav className={classes['new-post__menu']}>
					<ul className={classes['new-post__menu-list']}>
						{menuList.map(menuItem =>
							<li
								key={menuItem.id}
								className={classes['new-post__menu-item']}>
								<NavLink
									to={menuItem.link}
									className={({ isActive }) =>
										isActive
											? classes['new-post__menu-link']
											+ ' '
											+ classes['new-post__menu-link--active']
											: classes['new-post__menu-link']}>
									{menuItem.name}
								</NavLink>
							</li>
						)}
					</ul>
				</nav>
				<Link to='/' className={classes['new-post__close']}>
					<img
						src={closeIcon}
						alt="close"
						className={classes['new-post__close-img']} />
				</Link>
			</header>
			<div className={classes['new-post__body']}>
				<Routes>
					<Route path='/publication' element={<Publication />} />
				</Routes>
			</div>
			<footer className={classes['new-post__footer']}></footer>
		</div>
	)
}
