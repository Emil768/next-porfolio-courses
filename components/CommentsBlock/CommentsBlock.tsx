import { useRef, useState } from "react";
import { CommentProps, UserProps } from "propTypes";
import styles from "./CommentsBlock.module.scss";

import { EditIcon, RemoveIcon, ReplyIcon, SuccessIcon } from "public/icons";

import ContentEditable from "react-contenteditable";
import Link from "next/link";

import useAuthStore from "store/auth";
import useQuizStore from "store/quiz";

interface CommentsBlockProps extends CommentProps {
  onReplyComment: (name: string) => void;
}

export const CommentsBlock = ({
  postedBy,
  createdAt,
  text,
  testId,
  _id,
  onReplyComment,
}: CommentsBlockProps) => {
  const [isEdit, setIsEdit] = useState(true);
  const { data } = useAuthStore();
  const { fetchRemoveComment, fetchUpdateComment } = useQuizStore();

  const textComment = useRef(text);

  const handleChange = (name: string) => {
    textComment.current = name;
  };

  const handlerOnEditComment = async () => {
    fetchUpdateComment({ id: _id, testId, text: textComment.current });

    setIsEdit(true);
  };

  const handlerOnRemoveComment = () => fetchRemoveComment({ id: _id, testId });

  const handlerOnReplyComment = (name: string) => {
    onReplyComment(name);
  };

  return (
    <div className={styles.comments__block}>
      <div className={styles.comments__avatar}>
        <img src={postedBy.avatarUrl.url} alt="avatar" />
      </div>
      <div className={styles.comments__info}>
        <div className={styles.comments__infoTop}>
          <div className={styles.comments__name}>
            <Link href={`/user/${postedBy._id}`}>{postedBy.fullName}</Link>
          </div>
          <div className={styles.comments__date}>
            {new Date(createdAt).toLocaleString()}
          </div>
        </div>

        <ContentEditable
          className={
            isEdit
              ? styles.comments__text
              : [styles.comments__text, styles.comments__textEdit].join(" ")
          }
          html={textComment.current}
          disabled={isEdit}
          onChange={(e) => handleChange(e.target.value)}
        />

        <div className={styles.comments__communication}>
          <div
            className={styles.comments__reply}
            onClick={() => handlerOnReplyComment(postedBy.fullName)}
          >
            <ReplyIcon width={15} />
            Ответить
          </div>
          {postedBy._id === (data && data._id) && (
            <div className={styles.comments__panel}>
              <div className={styles.comments__edit}>
                {isEdit ? (
                  <EditIcon width={20} onClick={() => setIsEdit(false)} />
                ) : (
                  <SuccessIcon width={20} onClick={handlerOnEditComment} />
                )}
              </div>
              <div
                className={styles.comments__remove}
                onClick={handlerOnRemoveComment}
              >
                <RemoveIcon width={20} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
