import classes from './allPosts.module.scss';

export type TPost = {
	id?: string;
	content?: string;
}

type TProps = {
	data: JSON;
}

type TNULL = {
	data: null;
}

export const AllPosts = ({ data }: TProps | TNULL ) => {

	console.log(data)
	const posts: TPost[] = [];
	if (data) {
		posts.push(...data);
	}

	return (
		<div className={classes['all-posts']}>
			{posts.map(post => 
				<div key={post.id} className={classes['post']} id={post.id}>
					{post.content}
				</div>
			)}
		</div>
	)
}
