import { useEffect } from "react";

import { HeadphonesIcon, MusicIcon } from "public/gallery";
import { programsData } from "data";

import AOS from "aos";
import "aos/dist/aos.css";

import styles from "../styles/Programs.module.scss";
import Head from "next/head";

const Programs = () => {
  useEffect(() => {
    AOS.init({ disable: "phone" });
  }, []);
  return (
    <section className={styles.programs}>
      <Head>
        <title>Программа курса Extra school</title>
        <meta
          name="description"
          content="Программа курса Extra school - учебная программа объяснит тебе сложное доступным языком, с образными примерами так, что ты поймешь и запомнишь"
        />
        <meta property="og:title" content="Программа курса Extra school" />
        <meta
          property="og:description"
          content="Программа курса Extra school - учебная программа объяснит тебе сложное доступным языком, с образными примерами так, что ты поймешь и запомнишь"
        />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
          }
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className={styles.programs__content}>
        <h1
          className={[styles.programs__title, styles.title].join(" ")}
          data-aos="fade-right"
        >
          ПРОГРАММА КУРСА
        </h1>
        <div className={styles.programs__contentInfo}>
          <div className={styles.imageWrapper} data-aos="fade-down-right">
            <img
              className={[styles.imagePlayer, styles.rotate].join(" ")}
              src={MusicIcon.src}
              alt="music"
            />
          </div>
          {programsData.map((item, index) => (
            <div
              className={styles.programs__block}
              data-aos="zoom-in"
              key={index}
            >
              <img
                className={styles.programs__blockSlice}
                src={item.slice.src}
                alt="slice"
              />
              <span className={styles.programs__blockNumber}>{item.id}</span>
              <div className={styles.programs__blockInfo}>
                <h1 className={styles.programs__blockTitle}>{item.title}</h1>
                <p className={styles.programs__blockText}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div data-aos="zoom-in" data-aos-anchor=".programs__block">
          <img
            className={[styles.imagePhone, styles.rotate].join(" ")}
            src={HeadphonesIcon.src}
            alt="headphones"
          />
        </div>
      </div>
    </section>
  );
};

export default Programs;
