import classes from "./allPosts.module.scss";
import { useEffect, useState } from "react";
import { TData } from "../../models/fetchModel";

import { Post } from "./Post";

type TProps = {
  URL: string;
  postsQuantity: number;
	calcLeftTimeInData: (data: TData[]) => TData[];
};

export const AllPosts = ({ URL, postsQuantity, calcLeftTimeInData }: TProps) => {
  const [data, setData] = useState<TData[]>([]);
  const [posts, setPosts] = useState<TData[]>([]);

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
  }, [postsQuantity]);

  useEffect(() => {
    if (data) {
      setPosts(data.reverse());
    } else {
      setPosts([]);
    }
  }, [data]);

	

  return (
    <div className={classes["all-posts"]}>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          created={post.created as string}
          content={post.content}
        />
      ))}
    </div>
  );
};
