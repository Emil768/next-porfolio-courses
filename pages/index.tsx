import { useEffect } from "react";
import { Home } from "components";

import styles from "../styles/About.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  SliceIcon_1,
  AuthorIcon,
  TourIcon,
  CertificateIcon_1,
  CertificateIcon_2,
  CertificateIcon_3,
} from "public/gallery";

const About = () => {
  useEffect(() => {
    AOS.init({ disable: "phone" });
  }, []);
  return (
    <section className={styles.about}>
      <Home />
      <div className={styles.about__top}>
        <h2
          className={[styles.about__title, styles.title].join(" ")}
          data-aos="fade-right"
        >
          ОБО МНЕ
        </h2>
        <img src={SliceIcon_1.src} className={styles.slice} alt="slice" />
      </div>
      <div className={styles.about__content}>
        <div className={styles.about__text} data-aos="zoom-in">
          <p>Меня зовут Эльнара!</p>
          <p>
            Я говорю на <b>английском</b>, <b>турецком</b>, <b>украинском</b> и
            <b> русском </b>
            языках. Уже более <b>10 лет</b> преподаю английский язык в своей
            онлайн школе <b>Extra Engl</b>. Имею десятки благодарных студентов,
            с которыми и по сей день остаюсь на связи.
          </p>
          <p>
            Закончила <b>Ялтинскую гуманитарно-педагогическую академию</b>, в
            составе Крымского федерального университета имени В.И. Вернадского с
            отличием. Имею степень магистра филологии.
          </p>
          <p>
            <b>Язык</b> – уникальный инструмент, с помощью которого вы сможете
            путешествовать, найти высокооплачиваемую работу за рубежом, успешно
            самореализоваться, найти новых друзей, а главное – быть везде
            «своим», инсайдером, которого будут воспринимать, как человека из
            своей команды.
          </p>
          <p>
            <b>Английский язык</b> – это самый богатый язык в мире, каждый день
            добавляющий в свой словарь 13,5 лексических единиц. Если ты устал от
            занудных школьных объяснений, хочешь ярких, понятных примеров, а
            также избавиться от комплексов и заговорить на английском – тебе
            понравится этот курс. Он объяснит тебе сложное доступным языком, с
            образными примерами так, что ты поймешь и запомнишь.
          </p>
          <p>Ты с нами? Да? – Тогда WELCOME!</p>
        </div>
        <div className={styles.about__author} data-aos="zoom-in">
          <img
            className={styles.about__authorImage}
            src={AuthorIcon.src}
            alt="author"
          />
          <img className={styles.imageTour} src={TourIcon.src} alt="tour" />
        </div>
      </div>
      <div className={styles.about__certificates}>
        <div className={styles.about__certificatesLeft} data-aos="zoom-in">
          <img src={CertificateIcon_3.src} alt="certificate" />
        </div>
        <div
          className={styles.about__certificatesCenter}
          data-aos="fade-down"
          data-aos-anchor=".about__certificates-left"
        >
          <img src={CertificateIcon_1.src} alt="certificate" />
        </div>
        <div className={styles.about__certificatesRight} data-aos="zoom-in">
          <img src={CertificateIcon_2.src} alt="certificate" />
        </div>
      </div>
    </section>
  );
};

export default About;
