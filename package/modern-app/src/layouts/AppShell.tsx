import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

import { TopBar } from './TopBar';
import { LeftNav } from './LeftNav';

import styles from '@iyulab/modern-app/styles/layouts/AppShell.module.scss';

function AppShell() {
  const [mounted, setMounted] = useState<boolean>(false);
  
  // hydrate시 html 먼저 로드, 마운트 되었을때 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && (
      <>
        {/* 루트 */}
        <div className={styles.shell}>
          
          {/* 헤더부 */}
          <header className={styles.header}>
            <TopBar />
          </header>
          
          {/* 메인 */}
          <main className={styles.main}>
            {/* 세로네비 */}
            <div className={styles.nav}>
              <LeftNav />
            </div>
            {/* 페이지 */}
            <div className={styles.content}>
              <Outlet />
            </div>
          </main>

          {/*  */}
          <footer></footer>

        </div>
      </>
    );
}

export { AppShell };