import { EmptyIcon } from "public/icons";
import styles from "./EmptyBlock.module.scss";

interface EmptyBlockProps {
  title: string;
  text: string;
}

export const EmptyBlock = ({ title, text }: EmptyBlockProps) => (
  <div className={styles.empty}>
    <EmptyIcon />
    <h2 className={styles.empty__title}>{title}...</h2>
    <div className={styles.empty__text}>{text}</div>
  </div>
);
