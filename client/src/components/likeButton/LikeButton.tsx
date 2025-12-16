import type { FC } from "react";
import style from "./LikeButton.module.scss";
interface LikeButtonProps {
  liked: number;
  likes?: number;
  likePost: () => void;
}
const LikeButton: FC<LikeButtonProps> = ({ liked, likes=0, likePost }) => {
  return (
    <div className={style.likeContainer}>
      <button
        className={`${
          Number(liked) === 1 ? style.buttonLiked : style.likeButton
        }`}
        onClick={() => likePost()}
      >
        Like
      </button>
      {likes>0 && <h4>{likes}</h4>}
    </div>
  );
};

export default LikeButton;
