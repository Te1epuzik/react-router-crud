import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.scss";

import { TData } from "./models/fetchModel";

import { NewPost, LayOut, OpenedPost, EditPost } from "@/components";

function App() {
  const URL: string = "http://localhost:7070/posts";
  const [postsQuantity, setPostsQuantity] = useState(0);
  const [id, setId] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const incrementPosts = (): void => {
    setPostsQuantity((prev) => prev + 1);
  };

  const calcLeftTimeInData = (data: TData[]): TData[] => {
    const finallyData: TData[] = [];

    data.forEach((post: TData) => {
      const leftTime = getLeftTime(post.created as number);
      finallyData.push({ ...post, created: leftTime });
    });

    return finallyData;
  };

  const getPost = (id: string, content: string): void => {
    setId(id);
    setContent(content);
  };

  const getLeftTime = (created: number): string => {
    const date = new Date();
    const leftTime: number = (date.getTime() - created) / 1000;

    if ((leftTime / 60) % 60 < 1) {
      return "только что";
    } else if (leftTime / 3600 < 1) {
      const minutes: number = Math.floor((leftTime / 60) % 60);

      return `${minutes} мин.`;
    } else if (leftTime / 86400 < 1) {
      const hours: number = Math.floor(leftTime / 3600);
      let hourWord: string;

      switch (hours) {
        case 1:
          hourWord = "час";
          break;
        case 2:
        case 3:
        case 4:
          hourWord = "часа";
          break;
        default:
          hourWord = "часов";
          break;
      }

      return `${hours} ${hourWord}`;
    } else if (leftTime / 86400 < 2) {
      return "вчера";
    } else {
      const days = Math.floor(leftTime / 86400);
      let dayWord: string;

      if (days < 5) {
        dayWord = "дня";
      } else {
        dayWord = "дней";
      }

      return `${days} ${dayWord}`;
    }
  };

  return (
    <div className="posts">
      <Routes>
        <Route
          path="/"
          element={
            <LayOut
              URL={URL}
              postsQuantity={postsQuantity}
              calcLeftTimeInData={calcLeftTimeInData}
            />
          }
        >
          <Route
            path="/posts/new/*"
            element={<NewPost URL={URL} incrementPosts={incrementPosts} />}
          />
        </Route>
        <Route
          path="/posts/:id"
          element={
            <OpenedPost
              URL={URL}
              calcLeftTimeInData={calcLeftTimeInData}
              getPost={getPost}
            />
          }
        />
        <Route
          path="/posts/edit"
          element={<EditPost id={id} content={content} URL={URL} />}
        />
      </Routes>
    </div>
  );
}

export default App;
