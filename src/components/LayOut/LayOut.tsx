import { Link, Outlet } from "react-router-dom";
import { AllPosts } from "@components/AllPosts";
import { TData } from "@/models/fetchModel";

type TProps = {
  URL: string;
  postsQuantity: number;
	calcLeftTimeInData: (data: TData[]) => TData[]; 
};

export const LayOut = ({ URL, postsQuantity, calcLeftTimeInData }: TProps) => {
  return (
    <>
      <header className="posts__header">
        <Link
          to="/posts/new/publication"
          className="posts__new-btn button"
          type="button"
        >
          Создать пост
        </Link>
      </header>
      <Outlet />
      <AllPosts URL={URL} postsQuantity={postsQuantity} calcLeftTimeInData={calcLeftTimeInData} />
    </>
  );
};
