import classes from './publication.module.scss';
import avatarImg from '../../../assets/avatar.png';
import { ChangeEvent } from 'react';
import { TProps } from '../../../models/publicationPropsModel';

export const Publication = ({ text, onChange }: TProps) => {

	const handleTextInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = event.target;
		onChange(value);
	};

	return (
		<div className={classes['publication']}>
			<div className={classes['publication__avatar']}>
				<img className={classes['publication__avatar-img']} src={avatarImg} alt='avatar' />
			</div>
			<textarea
				className={classes['publication__textarea']}
				value={text}
				name='post'
				id='post1'
				autoFocus
				onChange={handleTextInput}></textarea>
		</div>
	)
}
