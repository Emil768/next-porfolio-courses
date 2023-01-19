import { AllUserActionProps } from "propTypes";
import styles from "styles/UserInfo.module.scss";

import { useState } from "react";

import { DateIcon, EmailIcon } from "public/icons";

import axios from "utils/axios";
import { options } from "data";
import {
  CommentSwitch,
  LikesSwitch,
  PublishSwitch,
  TestSwitch,
} from "components";

import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params!;
    const { data } = await axios.get<AllUserActionProps>(
      `/getActionsUser/${id}`
    );

    return {
      props: { userInfo: data },
    };
  } catch (err) {
    return {
      props: { userInfo: {} as AllUserActionProps },
    };
  }
};

const UserInfo = ({ userInfo }: { userInfo: AllUserActionProps }) => {
  const { user, allComments, allLikes, allPublish, allScore } = userInfo;
  const [categoryType, setCategoryType] = useState("tests");
  const handlerSwitchCategory = (title: string) => setCategoryType(title);

  return (
    <section className={styles.user} data-testid="UserInfo">
      <Head>
        <title>{`${user.fullName} - Extra school`}</title>

        <meta property="og:title" content={`${user.fullName} - Extra school`} />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
          }
        />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
          }
        />
        <meta property="og:type" content="article" />
      </Head>
      {Object.keys(userInfo).length !== 0 ? (
        <div className={styles.user__content}>
          <div className={styles.user__avatar}>
            <div className={styles.questions__image}>
              <img src={user.avatarUrl.url} alt="avatar user" />
            </div>

            <div className={styles.user__contact}>
              <div className={styles.user__email}>
                <EmailIcon />
                {user.email}
              </div>
              <h2 className={styles.user__name}>@{user.fullName}</h2>
              <div className={styles.user__date}>
                <DateIcon />
                {new Date(user.createdAt!).toLocaleDateString("ru-RU", options)}
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
                <span className={styles.user__circle}>{allScore.length}</span>
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
                <span className={styles.user__circle}>{allPublish.length}</span>
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
                <span className={styles.user__circle}>{allLikes.length}</span>
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
                  {allComments.length}
                </span>
              </div>
            </div>

            <div>
              {" "}
              {(() => {
                switch (categoryType) {
                  case "tests":
                    return <TestSwitch user={user} data={allScore} />;
                  case "publish":
                    return <PublishSwitch user={user} data={allPublish} />;
                  case "likes":
                    return <LikesSwitch user={user} data={allLikes} />;
                  case "comments":
                    return <CommentSwitch user={user} data={allComments} />;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
      ) : (
        <div>Error...</div>
      )}
    </section>
  );
};

export default UserInfo;
