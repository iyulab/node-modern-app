import { useEffect, useRef } from 'react';

import { useDocumentTitle } from '@iyulab/modern-app/hooks/UseDocumentTitle';
import { useLocator } from '@iyulab/modern-app/hooks/UseStores';

import { angleUp2 } from '@iyulab/modern-app/layouts/IconVector';
import styles from '@iyulab/modern-app/styles/layouts/PageBase.module.scss';

interface PageBaseProps {
  docTitle?: string;
  title?: string;
  children: React.ReactNode;
}

function PageBase({ docTitle, title, children } : PageBaseProps) {
  useDocumentTitle(docTitle);
  const content = useRef<HTMLDivElement>(null);
  const scrollTop = useRef<HTMLDivElement>(null);
  const locator = useLocator();

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

  useEffect(() => {
    locator.progress = 100;
  }, [locator]);

  return (
    <div className={styles.container} ref={content}
      onScroll={() => handleScroll()}>
      {title && (<div className={styles.header}>{title}</div>)}
      {children}
      {/* 페이지 끌어올림 */}
      <div className={styles.scrollTop} ref={scrollTop}
        onClick={() => onScrollToTop()}>
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path d={angleUp2}></path>
        </svg>
      </div>
    </div>
  );
}

export { PageBase };