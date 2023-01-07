import { AllUserActionProps, TestProps, UserProps } from "@proptypes";
import styles from "./UserInfo.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { DateIcon, EmailIcon } from "public/icons";

import axios from "@axios";
import { options } from "@data";
import {
  CommentSwitch,
  LikesSwitch,
  PublishSwitch,
  TestSwitch,
} from "@components";

import { ClipLoader } from "react-spinners";

export const UserInfo = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({
    user: {} as UserProps,
    data: {} as AllUserActionProps,
  });
  const [categoryType, setCategoryType] = useState("tests");
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = (): UserProps =>
    axios.get(`/auth/me/${id}`).then(({ data }: { data: UserProps }) => data);
  const getUserCategory = (): TestProps[] =>
    axios
      .get(`/getActionsUser/${id}`)
      .then(({ data }: { data: TestProps[] }) => data);

  const handlerFetchData = () => {
    Promise.all([getUserData(), getUserCategory()]).then(function (results) {
      setUserInfo({
        user: results[0],
        data: { ...userInfo.data, ...results[1] },
      });
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handlerFetchData();
  }, [id]);

  const handlerSwitchCategory = (title: string) => setCategoryType(title);

  return (
    <div className={styles.user} data-testid="UserInfo">
      {isLoading ? (
        <ClipLoader loading={isLoading} color="#39ca81" />
      ) : (
        <div className={styles.user__content}>
          <div className={styles.user__avatar}>
            <div className={styles.questions__image}>
              <img src={userInfo.user.avatarUrl.url} alt="avatar" />
            </div>

            <div className={styles.user__contact}>
              <div className={styles.user__email}>
                <EmailIcon width={16} />
                {userInfo.user.email}
              </div>
              <h2 className={styles.user__name}>@{userInfo.user.fullName}</h2>
              <div className={styles.user__date}>
                <DateIcon width={16} />
                {new Date(userInfo.user.createdAt!).toLocaleDateString(
                  "ru-RU",
                  options
                )}
              </div>
            </div>
          </div>

          <div className={styles.user__statistics}>
            <div className={styles.user__categories}>
              <div
                className={
                  categoryType === "tests"
                    ? [styles.user__category, styles.user__categoryActive].join(
                        " "
                      )
                    : styles.user__category
                }
                onClick={() => handlerSwitchCategory("tests")}
              >
                Прохождение тестов{" "}
                <span className={styles.user__circle}>
                  {userInfo.data.allScore.length}
                </span>
              </div>
              <div
                className={
                  categoryType === "publish"
                    ? [styles.user__category, styles.user__categoryActive].join(
                        " "
                      )
                    : styles.user__category
                }
                onClick={() => handlerSwitchCategory("publish")}
              >
                Публикации{" "}
                <span className={styles.user__circle}>
                  {userInfo.data.allPublish.length}
                </span>
              </div>
              <div
                className={
                  categoryType === "likes"
                    ? [styles.user__category, styles.user__categoryActive].join(
                        " "
                      )
                    : styles.user__category
                }
                onClick={() => handlerSwitchCategory("likes")}
              >
                Лайки{" "}
                <span className={styles.user__circle}>
                  {userInfo.data.allLikes.length}
                </span>
              </div>
              <div
                className={
                  categoryType === "comments"
                    ? [styles.user__category, styles.user__categoryActive].join(
                        " "
                      )
                    : styles.user__category
                }
                onClick={() => handlerSwitchCategory("comments")}
              >
                Комментарии{" "}
                <span className={styles.user__circle}>
                  {userInfo.data.allComments.length}
                </span>
              </div>
            </div>

            <div>
              {" "}
              {(() => {
                switch (categoryType) {
                  case "tests":
                    return (
                      <TestSwitch
                        user={userInfo.user}
                        data={userInfo.data.allScore}
                      />
                    );
                  case "publish":
                    return (
                      <PublishSwitch
                        user={userInfo.user}
                        data={userInfo.data.allPublish}
                      />
                    );
                  case "likes":
                    return (
                      <LikesSwitch
                        user={userInfo.user}
                        data={userInfo.data.allLikes}
                      />
                    );
                  case "comments":
                    return (
                      <CommentSwitch
                        user={userInfo.user}
                        data={userInfo.data.allComments}
                      />
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
