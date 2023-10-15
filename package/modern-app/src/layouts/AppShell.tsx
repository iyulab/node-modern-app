import { useEffect, useState, useRef } from 'react';
import { Outlet } from "react-router-dom";

import { TopBar } from './TopBar';
import { LeftNav } from './LeftNav';

import { angleUp2 } from '@iyulab/modern-app/layouts/IconVector';
import styles from '@iyulab/modern-app/styles/layouts/AppShell.module.scss';

function AppShell() {
  const [mounted, setMounted] = useState<boolean>(false);
  const content = useRef<HTMLDivElement>(null);
  const scrollTop = useRef<HTMLDivElement>(null);

  // hydrate시 html 먼저 로드, 마운트 되었을때 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  // 스크롤 이벤트
  const handleScroll = () => {
    if(content.current === null || scrollTop.current === null) return;

    if(content.current.scrollTop > 20) {
      scrollTop.current.style.display = 'block';
    } else {
      scrollTop.current.style.display = 'none';
    }
  }

  // 스크롤 최상단으로 이동
  const onScrollToTop = () => {
    if(content.current === null) return;
    content.current.scrollTo({top: 0, behavior: 'smooth'});
  }

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
            <div className={styles.content} ref={content} 
              onScroll={() => handleScroll()}>
              <Outlet />
            </div>
            {/* 페이지 끌어올림 */}
            <div className={styles.scrollTop} ref={scrollTop}
              onClick={() => onScrollToTop()}>
              <svg className={styles.icon} viewBox="0 0 24 24">
                <path d={angleUp2}></path>
              </svg>
            </div>
          </main>

          {/*  */}
          <footer></footer>

        </div>
      </>
    );
}

export { AppShell };