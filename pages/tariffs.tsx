import { useEffect } from "react";

import styles from "../styles/Tariffs.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";

const Tariffs = () => {
  useEffect(() => {
    AOS.init({ disable: "phone" });
  }, []);
  return (
    <section className={styles.tariffs}>
      <div className={styles.tariffs__content}>
        <h1
          className={[styles.tariffs__title, styles.title].join(" ")}
          data-aos="fade-right"
        >
          ТАРИФЫ И ЦЕНЫ
        </h1>

        <div className={styles.tariffs__contentBlocks}>
          <div className={styles.tariffs__block} data-aos="zoom-in">
            <div className={styles.tariffs__blockContent}>
              <h3 className={styles.tariffs__blockTitle}>Тариф «В группе»</h3>
              <span className={styles.tariffs__blockPrice}>3400 ₽</span>
              <ul className={styles.tariffs__blockList}>
                <li className={styles.tariffs__blockItem}>2 месяца обучения</li>
                <li className={styles.tariffs__blockItem}>
                  25 учебных модулей
                </li>
                <li className={styles.tariffs__blockItem}>25 видео-лекций</li>
                <li className={styles.tariffs__blockItem}>
                  закрытый Telegram-канал c Нади
                </li>
                <li className={styles.tariffs__blockItem}>
                  доступ к урокам на 12 месяцев со старта курса
                </li>
                <li className={styles.tariffs__blockItem}>
                  мини-чат с куратором
                </li>
                <li className={styles.tariffs__blockItem}>
                  более 150 упражнений на платформе с проверкой от куратора
                </li>
                <li className={styles.tariffs__blockItem}>
                  25 pdf-конспектов к урокам
                </li>
                <li className={styles.tariffs__blockItem}>
                  20 pdf-глоссариев с тематической лексикой
                </li>
                <li className={styles.tariffs__blockItem}>
                  <s>
                    4 групповых урока с Нади в Skype для разговорной практики в
                    мини-группах до 5 человек
                  </s>
                </li>
                <li className={styles.tariffs__blockItem}>
                  <s>
                    4 индивидуальных урока с Нади в Skype для разговорной
                    практики
                  </s>
                </li>
                <li className={styles.tariffs__blockItem}>
                  <s>Длительность уроков — 60 минут</s>
                </li>
              </ul>
              <span className={styles.tariffs__blockButton}>Купить</span>
            </div>
          </div>
          <div className={styles.tariffs__block} data-aos="zoom-in">
            <div className={styles.tariffs__blockContent}>
              <h3 className={styles.tariffs__blockTitle}>Тариф «PRO»</h3>
              <span className={styles.tariffs__blockPrice}>
                <s className={styles.priceDiscount}>10 000 ₽</s> / 6400 ₽
              </span>
              <ul className={styles.tariffs__blockList}>
                <li className={styles.tariffs__blockItem}>2 месяца обучения</li>
                <li className={styles.tariffs__blockItem}>
                  25 учебных модулей
                </li>
                <li className={styles.tariffs__blockItem}>25 видео-лекций</li>
                <li className={styles.tariffs__blockItem}>
                  закрытый Telegram-канал c Нади
                </li>
                <li className={styles.tariffs__blockItem}>
                  доступ к урокам на 12 месяцев со старта курса
                </li>
                <li className={styles.tariffs__blockItem}>
                  мини-чат с куратором
                </li>
                <li className={styles.tariffs__blockItem}>
                  более 150 упражнений на платформе с проверкой от куратора
                </li>
                <li className={styles.tariffs__blockItem}>
                  25 pdf-конспектов к урокам
                </li>
                <li className={styles.tariffs__blockItem}>
                  20 pdf-глоссариев с тематической лексикой
                </li>
                <li className={styles.tariffs__blockItem}>
                  4 групповых урока с Нади в Skype для разговорной практики в
                  мини-группах до 5 человек
                </li>
                <li className={styles.tariffs__blockItem}>
                  4 индивидуальных урока с Нади в Skype для разговорной практики
                </li>
                <li className={styles.tariffs__blockItem}>
                  Длительность уроков — 60 минут
                </li>
              </ul>
              <span className={styles.tariffs__blockButton}>Купить</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tariffs;
