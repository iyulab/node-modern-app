import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { TopBar } from "./TopBar";
import { LeftNav } from "./LeftNav";

import '../styles/global.css';
import styles from "./AppShell.module.scss";

function AppShell() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(true);

  // hydrate시 html 먼저 로드, 마운트 되었을때 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fix Me: 메뉴 토글시 width 조정 컨트롤 안하고 css로 처리해주기...
  return (
    mounted && (
      <>
        {/* 루트 */}
        <div className={styles.shell}>
          {/* 헤더부 */}
          <header className={styles.header}>
            <TopBar />
          </header>

          {/* 메인 */}
          <main className={styles.main}>
            {/* 좌측 네비 */}
            <div className={styles.nav}>
              <LeftNav onExpand={(e) => setExpand(e)} />
            </div>
            {/* 페이지 */}
            <div className={`${styles.content} ${expand ? styles.expand : ''}`}>
              <Outlet />
            </div>
          </main>

          {/*  */}
          <footer></footer>
        </div>
      </>
    )
  );
}

export { AppShell };
