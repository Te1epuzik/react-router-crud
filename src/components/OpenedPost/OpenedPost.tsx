import { TData } from "../../models/fetchModel";
import classes from "./openedPost.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import avatarPNG from "../../assets/avatar.png";
import commentIcon from "../../assets/comment.svg";

import { LikeIcon } from "../AllPosts/Post/LikeIcon";

type TProps = {
	URL: string;
	calcLeftTimeInData: (data: TData[]) => TData[];
}

export const OpenedPost = ({URL, calcLeftTimeInData}: TProps) => {
	const [data, setData] = useState<TData[]>([]);
	const [liked, setLiked] = useState<boolean>(false);
  const params = useParams();
  const id: string = params.id as string;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: Response = await fetch(URL, {
					method: "GET",
				});
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const dataJSON: TData[] = await response.json();
				const finallyData: TData[] = calcLeftTimeInData(dataJSON);
				setData(finallyData);
				console.log(data)
			} catch (error) {
				console.error(error);
			}
		};
	
		fetchData();
	}, []);

  const post: TData | undefined = data.find((post) => +post.id === +id);

  console.log(data);
  const { content, created } = post as TData;

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={classes["post-alone"]} id={id}>
      <header className={classes["header"]}>
        <div className={classes["avatar"]}>
          <img className={classes["avatar-img"]} src={avatarPNG} alt="" />
        </div>
        <div className={classes["autor"]}>
          <span className={classes["name"]}>Semen Tonkikh</span>
          <div className={classes["status"]}>
            <span className={classes["autor-status"]}>
              Основатель группы{" "}
              <span className={classes["date"]}>&#183; {created}</span>
            </span>
          </div>
        </div>
      </header>
      <p className={classes["content"]}>{content}</p>
      <div className={classes["reaction"]}>
        <span onClick={handleLike} className={classes["like-btn"]}>
          <LikeIcon liked={liked} />
          Нравится
        </span>
        <label htmlFor="comment1" className={classes["comment-btn"]}>
          <img className={classes["comment-icon"]} src={commentIcon} alt="" />
          Комментировать
        </label>
      </div>
      <div className={classes["comment"]}>
        <div className={classes["comment-avatar"]}>
          <img className={classes["avatar-img"]} src={avatarPNG} alt="" />
        </div>
        <input
          className={classes["comment-input"]}
          type="text"
          name=""
          id="comment1"
        />
      </div>
    </div>
  );
};
