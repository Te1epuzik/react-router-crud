import classes from "./editPost.module.scss";
import avatarPNG from "../../assets/avatar.png";
import closeIcon from "../../assets/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

export const EditPostView = ({ id, text, handleWrite, handleSave }: TProps) => {
  return (
    <div className={classes["edit"]}>
      <header className={classes["header"]}>
        <label htmlFor="edit-post1" className={classes["title"]}>
          Редактировать публикацию
        </label>
        <Link className={classes['close']} to={`/posts/${id}`}>
          <img src={closeIcon} alt="" />
        </Link>
      </header>
      <div className={classes["body"]}>
        <div className={classes["avatar"]}>
          <img className={classes["avatar-img"]} src={avatarPNG} alt="" />
        </div>
        <textarea
          className={classes["edit-textarea"]}
          onChange={handleWrite}
          value={text}
          name="edit-post"
          id="edit-post1"
        ></textarea>
      </div>
      <footer className={classes["footer"]}>
        <button
          className={classes["save-btn"] + " " + "button"}
          onClick={handleSave}
          type="button"
        >
          Сохранить
        </button>
      </footer>
    </div>
  );
};

type TProps = {
  id: string;
  text: string;
  handleWrite: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSave: () => void;
};
