import { PageBase } from "@iyulab/modern-app";
import styles from "@/styles/HomePage.module.scss";

export function UserPage() {
  return (
    <PageBase title="This is Home">
      <div className={styles.home}>
        <h1>Hello This is User Page</h1>
      </div>
    </PageBase>
  );
}
