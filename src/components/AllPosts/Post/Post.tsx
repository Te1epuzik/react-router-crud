import classes from "./post.module.scss";
import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import avatarPNG from "@/assets/avatar.png";
import commentIcon from "@/assets/comment.svg";
import { LikeIcon } from "./LikeIcon";

type TProps = {
  id: string;
  content: string;
  created: string;
};

export const Post = ({ id, content, created }: TProps) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleLike = () => {
    setLiked(!liked);
  };

  const handlePostRedirect = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    if (
      target.className.includes("avatar") ||
      target.className.includes("name") ||
      target.className.includes("like-btn") ||
      target.className.includes("comment-btn") ||
      target.className.includes("comment-input")
    ) {
      return;
    }

    navigate(`/posts/${id}`);
  };

  return (
    <div onClick={handlePostRedirect} className={classes["post"]} id={id}>
      <header className={classes["header"]}>
        <div className={classes["avatar"]}>
          <img className={classes["avatar-img"]} src={avatarPNG} alt="" />
        </div>
        <div className={classes["autor"]}>
          <span className={classes["name"]}>Semen Tonkikh</span>
          <div className={classes["status"]}>
            <span className={classes["autor-status"]}>
              Основатель группы{" "}
              <span className={classes["date"]}>
                &#183; {created}
              </span>
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
