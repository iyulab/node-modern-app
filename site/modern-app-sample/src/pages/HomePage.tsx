import { PageBase } from "@iyulab/modern-app";
import styles from "@/styles/HomePage.module.scss";

export function HomePage() {
  return (
    <PageBase docTitle="Home Page" title="Overview">
      <div className={styles.home}>
        <h1>Hello This is Home Page</h1>
      </div>
    </PageBase>
  );
}
