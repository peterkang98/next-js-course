import styles from "./index.module.css"

export default function Home() {
  console.log(styles);
  return <h1 className={styles.redText}>인덱스</h1>;
}
