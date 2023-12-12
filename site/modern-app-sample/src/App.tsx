import { useEffect, useState, useRef } from "react";
import { AppShell } from "@iyulab/modern-app/layouts/AppShell";
import styles from './styles/App.module.scss';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const app = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // setTimeout(() => {
    //   app.current!.classList.add(styles.mounted);
    // }, 1_500);
  }, []);

  return mounted && (
    <>
      {/* <div className={styles.app} ref={app}>
        <h1>WelCome!</h1>
      </div> */}

      {/* 모던앱 레이아웃 */}
      <AppShell />
    </>
  );
}