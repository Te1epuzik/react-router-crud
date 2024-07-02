import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditPostView } from "./EditPostView";

export const EditPost = ({ id, content, URL }: TProps) => {
  const [text, setText] = useState<string>(content);
  const navigate = useNavigate();

  const handleWrite = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    if (!value) {
      setText("");
      return;
    }

    setText(value);
  };

  const handleSave = async () => {
    try {
      const response: Response = await fetch(URL + `/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          content: text,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }

		navigate(`/posts/${id}`)
  };

  return (
    <>
      <EditPostView
        id={id}
        text={text}
        handleWrite={handleWrite}
        handleSave={handleSave}
      />
    </>
  );
};

type TProps = {
  id: string;
  content: string;
  URL: string;
};
