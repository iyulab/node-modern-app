import { PageBase } from "@iyulab/modern-app";
import styles from "@/styles/HomePage.module.scss";

export function LitPage() {
  return (
    <PageBase title="This is Home">
      <div className={styles.home}>
        <h1>Hello This is Lit Page</h1>
      </div>
    </PageBase>
  );
}
