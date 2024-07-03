import { TData } from "@/models/fetchModel";
import classes from "./openedPost.module.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import avatarPNG from "@/assets/avatar.png";
import commentIcon from "@/assets/comment.svg";
import closeIcon from "@/assets/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";

import { LikeIcon } from "@components/AllPosts/Post/LikeIcon";

type TProps = {
  URL: string;
  calcLeftTimeInData: (data: TData[]) => TData[];
  getPost: (id: string, content: string) => void;
};

type OpenedPostViewProps = TData & {
  handleLike: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  liked: boolean;
};

export const OpenedPostView = ({
  id,
  created,
  content,
  handleEdit,
  handleDelete,
  handleLike,
  liked,
}: OpenedPostViewProps) => {
  return (
    <div className={classes["post-alone"]} id={id}>
      <div className={classes["control"]}>
        <div className={classes["buttons"]}>
          <button
            className={classes["edit"] + " " + "button"}
            onClick={handleEdit}
            type="button"
          >
            Редактировать
          </button>
          <button
            className={classes["delete"] + " " + "button"}
            onClick={handleDelete}
            type="button"
          >
            Удалить
          </button>
        </div>
        <Link className={classes["close"]} to="/">
          <img className={classes["close-icon"]} src={closeIcon} alt="" />
        </Link>
      </div>
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
        <input className={classes["comment-input"]} type="text" id="comment1" />
      </div>
    </div>
  );
};

export const OpenedPost = ({ URL, calcLeftTimeInData, getPost }: TProps) => {
  const [data, setData] = useState<TData[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const navigate = useNavigate();
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const post = data.find((post) => +post.id === +id);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleEdit = () => {
    if (!post) {
      return;
    }
    getPost(id, post.content);
    navigate("/posts/edit");
  };

  const handleDelete = async () => {
    try {
      const response: Response = await fetch(URL + `/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {post && (
        <OpenedPostView
          {...post}
          handleLike={handleLike}
          liked={liked}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
};
