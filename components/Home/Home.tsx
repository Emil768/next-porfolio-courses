import styles from "./Home.module.scss";

import { SamoletIcon, MapIcon, ArrowIcon } from "public/gallery";

import Link from "next/link";
import Image from "next/legacy/image";
import { TelegramIcon, WhatsappIcon } from "public/icons";

export const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__content}>
        <div className={styles.home__contentText} data-aos="zoom-in-right">
          <div data-aos="fade-right" className={styles.imageWrapper}>
            <Image
              src={SamoletIcon.src}
              className={[styles.imageSamolet, styles.rotate].join(" ")}
              width={150}
              height={150}
              priority={true}
              alt="samolet"
            />
          </div>
          <h1 className={styles.home__title}>Английский для начинающих</h1>
          <p className={styles.home__subtitle}>
            Сделай первый шаг навстречу английскому без ошибок с
            учителем-билингвой!
          </p>
          <q className={styles.home__quote}>
            Enjoy English u know, discover English u don&apos;t.
          </q>
          <Link className={styles.home__button} href={"/tariffs"}>
            Записаться
            <div className={styles.home__arrow}>
              <img src={ArrowIcon.src} alt="arrow" />
            </div>
          </Link>

          <div className={styles.home__links}>
            или написать:
            <a
              href={"https://t.me/elnaramurat"}
              target="_blank"
              className={styles.home__link}
            >
              <TelegramIcon className={styles.home__linkTelegram} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=79787523348"
              target="_blank"
              className={[styles.home__link, styles.home__linkWhatsapp].join(
                " "
              )}
            >
              <WhatsappIcon />
            </a>
          </div>
        </div>
        <div className={styles.home__contentImage} data-aos="zoom-in">
          <Image
            src={MapIcon.src}
            className={styles.home__author}
            layout="fill"
            quality={100}
            priority={true}
            alt="world"
          />
        </div>
      </div>
    </div>
  );
};
