import { useRef, useState } from "react";
import { CommentProps } from "propTypes";
import styles from "./CommentsBlock.module.scss";

import { EditIcon, RemoveIcon, ReplyIcon, SuccessIcon } from "public/icons";
import { fetchRemoveComment, fetchUpdateComment } from "redux/slices";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ContentEditable from "react-contenteditable";
import Link from "next/link";

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
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(true);

  const textComment = useRef(text);

  const handleChange = (name: string) => {
    textComment.current = name;
  };

  const handlerOnRemoveComment = async (_id: string) => {
    dispatch(fetchRemoveComment({ id: _id, testId }));
  };

  const handlerOnReplyComment = (name: string) => {
    onReplyComment(name);
  };

  const handlerOnEditComment = () => {
    dispatch(
      fetchUpdateComment({ testId, text: textComment.current, id: _id })
    );
    setIsEdit(true);
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
                onClick={() => handlerOnRemoveComment(_id)}
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
