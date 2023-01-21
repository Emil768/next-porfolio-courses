import styles from "./Home.module.scss";

import { SamoletIcon, MapIcon } from "public/gallery";
import Link from "next/link";
import Image from "next/legacy/image";

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
          </Link>
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
