import { PageBase } from "@iyulab/modern-app";
import styles from "@/styles/HomePage.module.scss";

export function ReactPage() {
  return (
    <PageBase title="This is Home">
      <div className={styles.home}>
        <h1>Hello This is React Page</h1>
      </div>
    </PageBase>
  );
}
