import { useRef, Children, isValidElement, useEffect, useState } from 'react';
import { useDocumentTitle } from '@iyulab/modern-app/hooks/UseDocumentTitle';

import { angleUp2 } from '@iyulab/modern-app/layouts/IconVector';
import styles from '@iyulab/modern-app/styles/layouts/PageBase.module.scss';
import { PageHeader } from './PageHeader';
import { PagePanel } from './PagePanel';

interface PageBaseProps {
  docTitle?: string;
  title?: string;
  children: React.ReactNode;
}

function PageBase(props : PageBaseProps) {
  useDocumentTitle(props.docTitle);
  const header = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const footer = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const scrollTop = useRef<HTMLDivElement>(null);

  const [bottomKey, setBottomKey] = useState<string | null>(null);
  const [rightKey, setRightKey] = useState<string | null>(null);

  const bottomKeys: string[] = [];
  const rightKeys: string[] = [];

  let headerComponent:any;
  const rightPanelComponents:any = {};
  const bottomPanelComponents:any = {};
  const childrenComponents:any[] = [];

  Children.forEach(props.children, (child) => {
    if (isValidElement(child)) {
      if(child.type === PageHeader) {
        headerComponent = child;
      } else if(child.type === PagePanel) {
        if(child.key === null) 
          throw new Error('PagePanel must have a key property.');

        if(child.props.position === 'right') {
          rightKeys.push(child.key);
          rightPanelComponents[child.key] = child;
        } else if(child.props.position === 'bottom') {
          bottomKeys.push(child.key);
          bottomPanelComponents[child.key] = child;
        }
      } else {
        childrenComponents.push(child);
      }
    }
  });

  const onToggleRigtht = (key:string) => {
    if(rightKey === key) {
      setRightKey(null);
    } else {
      setRightKey(key);
    }
  }

  const onToggleBottom = (key:string) => {
    if(bottomKey === key) {
      setBottomKey(null);
    } else {
      setBottomKey(key);
    }
  }

  // header 높이만큼 body height 설정
  const adjustBody = () => {
    if(body.current === null) return;
    const headerHeight = header.current ? header.current.clientHeight : 0;
    const footerHeight = footer.current ? footer.current.clientHeight : 0;
    const totalHeight = headerHeight + footerHeight;
    body.current.style.height = `calc(100% - ${totalHeight}px)`;
  }

  // 스크롤 이벤트
  const handleScroll = () => {
    if(content.current === null || scrollTop.current === null) return;    

    if(content.current.scrollTop > 20) {
      scrollTop.current.style.display = 'flex';
    } else {
      scrollTop.current.style.display = 'none';
    }
  }

  // 스크롤 최상단으로 이동
  const onScrollToTop = () => {
    if(content.current === null) return;
    content.current.scrollTo({top: 0, behavior: 'instant'});
  }

  useEffect(() => {
    adjustBody();
  }, []);

  useEffect(() => {
    adjustBody();
  }, [bottomKey]);

  return (
    <div className={styles.container}>
      
      {/* 페이지 헤드라인 */}
      <div className={styles.header} ref={header}>
        {headerComponent}
      </div>

      {/* 페이지 바디 */}
      <div className={styles.body} ref={body}>

        {/* 페이지 본문 */}
        <div className={styles.main}>
          <div className={styles.content} ref={content}
            onScroll={() => handleScroll()}>
            {props.title && (<div className={styles.title}>{props.title}</div>)}
            {childrenComponents}
          </div>
          {/* 페이지 끌어올림 */}
          <div className={styles.scrollTop} ref={scrollTop}
            onClick={() => onScrollToTop()}>
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d={angleUp2}></path>
            </svg>
          </div>
        </div>
        
        {/* 페이지 오른쪽 패널 */}
        {rightKeys.length > 0 && (
          <div className={styles.panel}>
            <div className={styles.content}>
              {rightKey !== null && rightPanelComponents[rightKey]}
            </div>
            <div className={styles.menu}>
              {rightKeys.map((key) => (
                <div key={key}
                  className={`${styles.tab} ${rightKey === key ? "active" : ''}`}
                  onClick={() => onToggleRigtht(key)}>
                  {key}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 페이지 하단 패널 */}
      {bottomKeys.length > 0 && (
        <div className={styles.footer} ref={footer}>
          <div className={styles.content}>
            {bottomKey !== null && bottomPanelComponents[bottomKey]}
          </div>
          <div className={styles.menu}>
            {bottomKeys.map((key) => (
              <div key={key}
                className={`${styles.tab} ${bottomKey === key ? styles.active : ''}`}
                onClick={() => onToggleBottom(key)}>
                {key}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export { PageBase };