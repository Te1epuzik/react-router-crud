import classes from "./newPost.module.scss";
import { useState, FormEvent } from "react";
import { TMenu } from "../../models/newPostModel";
import { Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import { v4 } from "uuid";

import { Publication } from "./Publication";
import { NotFound } from "./NotFound";

type TProps = {
  URL: string;
	incrementPosts: VoidFunction;
};

export const NewPost = ({ URL, incrementPosts }: TProps) => {
  const navigate = useNavigate();

  const menuList: TMenu[] = [
    {
      name: "Публикация",
      link: "/posts/new/publication",
      id: 0,
    },
    {
      name: "Фото/видео",
      link: "/posts/new/media",
      id: 1,
    },
    {
      name: "Прямой эфир",
      link: "/posts/new/live",
      id: 2,
    },
    {
      name: "Ещё",
      link: "/posts/new/more",
      id: 3,
    },
  ];

  const getSavedText = (): string => {
    const text = localStorage.getItem("text");
    if (typeof text === "string") {
      return text;
    } else {
      return "";
    }
  };

  const [id, setId] = useState<string>("");
  const [text, setText] = useState<string>(getSavedText());

  const textChange = (value: string) => {
    if (typeof value === "string") {
      setText(value);
    }

    if (value === null) {
      localStorage.removeItem("text");
      return;
    }

    localStorage.setItem("text", value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/");
    localStorage.removeItem("text");
    setId(v4());
    console.log(text);

    try {
      const response: Response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({ id: id, content: text }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    } finally {
			incrementPosts();
		}
  };

  return (
    <form onSubmit={handleSubmit} className={classes["new-post"]}>
      <header className={classes["new-post__header"]}>
        <nav className={classes["new-post__menu"]}>
          <ul className={classes["new-post__menu-list"]}>
            {menuList.map((menuItem) => (
              <li key={menuItem.id} className={classes["new-post__menu-item"]}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? classes["new-post__menu-link"] +
                        " " +
                        classes["new-post__menu-link--active"]
                      : classes["new-post__menu-link"]
                  }
                  to={menuItem.link}
                >
                  {menuItem.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/" className={classes["new-post__close"]}>
          <img
            src={closeIcon}
            alt="close"
            className={classes["new-post__close-img"]}
          />
        </Link>
      </header>
      <div className={classes["new-post__body"]}>
        <Routes>
          <Route
            path="/publication"
            element={<Publication text={text} onChange={textChange} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className={classes["new-post__footer"]}>
        <button
          type="submit"
          className={classes["new-post__make-post"] + " " + "button"}
        >
          Опубликовать
        </button>
      </footer>
    </form>
  );
};
