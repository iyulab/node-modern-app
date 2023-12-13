import { useRef, Children, isValidElement, useEffect, useState } from 'react';
import { useDocumentTitle } from '@iyulab/modern-app/hooks/UseDocumentTitle';

import { angleUp2, pin, close } from '@iyulab/modern-app/layouts/IconVector';
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
  
  // Grid Layout
  const container = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);
  const rightMenu = useRef<HTMLDivElement>(null);
  const bottomPanel = useRef<HTMLDivElement>(null);
  const bottomMenu = useRef<HTMLDivElement>(null);

  // main content scroll
  const main = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const scrollTop = useRef<HTMLDivElement>(null);

  // panel toggle keys
  const bottomKeys: string[] = [];
  const rightKeys: string[] = [];
  const [bottomKey, setBottomKey] = useState<string | null>(null);
  const [rightKey, setRightKey] = useState<string | null>(null);
  const [isFixedRight, setIsFixedRight] = useState<boolean>(true);
  const [isFixedBottom, setIsFixedBottom] = useState<boolean>(true);

  // children components
  let headerComponent:any;
  const mainComponents:any[] = [];
  const rightPanelComponents:any = {};
  const bottomPanelComponents:any = {};

  // children 분류
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
        mainComponents.push(child);
      }
    }
  });

  // 오른쪽 패널 토글
  const onToggleRigtht = (key:string) => {
    if(rightKey === key) {
      setRightKey(null);
    } else {
      setRightKey(key);
    }
  }

  // 하단 패널 토글
  const onToggleBottom = (key:string) => {
    if(bottomKey === key) {
      setBottomKey(null);
    } else {
      setBottomKey(key);
    }
  }

  // 높이만큼 grid 설정
  const adjustRows = () => {
    if(container.current === null) return;
    container.current!.style.gridTemplateRows = `auto 100% auto auto`;
    const topHeight = top.current ? top.current.offsetHeight : 0;
    const bottomPanelHeight = isFixedBottom && bottomPanel.current ? bottomPanel.current.offsetHeight : 0;
    const bottomMenuHeight = bottomMenu.current ? bottomMenu.current.offsetHeight : 0;
    const height = topHeight + bottomPanelHeight + bottomMenuHeight;
    container.current.style.gridTemplateRows = `auto calc(100% - ${height}px) auto auto`;
  }

  // 너비만큼 grid 설정
  const adjustColumns = () => {
    if(container.current === null) return;
    container.current!.style.gridTemplateColumns = `100% auto auto`;
    const rightPanelWidth = isFixedRight && rightPanel.current ? rightPanel.current.offsetWidth : 0;
    const rightMenuWidth = rightMenu.current ? rightMenu.current.offsetWidth : 0;
    const width = rightPanelWidth + rightMenuWidth;
    container.current.style.gridTemplateColumns = `calc(100% - ${width}px) auto auto`;
  }

  // 스크롤 이벤트
  const handleScroll = () => {
    if(content.current === null || scrollTop.current === null) return;    

    if(content.current.scrollTop > 20) {
      top.current!.classList.add(styles.shadow);
      scrollTop.current.style.display = 'flex';
    } else {
      top.current!.classList.remove(styles.shadow);
      scrollTop.current.style.display = 'none';
    }
  }

  // 스크롤 최상단으로 이동
  const onScrollToTop = () => {
    if(content.current === null) return;
    content.current.scrollTo({top: 0, behavior: 'instant'});
  }

  // 오른쪽 패널 리사이즈
  const resizeRightPanel = (event:any) => {
    event.preventDefault();

    const target = event.target;
    target.classList.add(styles.active);
    let moveX = 0;
    const move = (e:any) => {
      moveX += e.movementX;
      target.style.left = `${moveX}px`;
    }

    const stop = () => {
      target.style.left = '-2px';
      target.classList.remove(styles.active);
      rightPanel.current!.style.width = `${rightPanel.current!.offsetWidth - moveX}px`;
      adjustColumns();

      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  }

  // 하단 패널 리사이즈
  const resizeBottomPanel = (event:any) => {
    event.preventDefault();

    const target = event.target;
    target.classList.add(styles.active);
    let moveY = 0;
    const move = (e:any) => {
      moveY += e.movementY;
      target.style.top = `${moveY}px`;
    }

    const stop = () => {
      target.style.top = '-2px';
      target.classList.remove(styles.active);
      bottomPanel.current!.style.height = `${bottomPanel.current!.offsetHeight - moveY}px`;
      adjustRows();

      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  }

  useEffect(() => {
    adjustRows();
    adjustColumns();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    adjustRows();
  }, [bottomKey, isFixedBottom]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    adjustColumns();
  }, [rightKey, isFixedRight]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.container} ref={container}>
      
      {/* 페이지 헤드라인 */}
      {headerComponent && (
        <div className={styles.top} ref={top}>
          {headerComponent}
        </div>
      )}

      {/* 페이지 본문 */}
      <div className={styles.main} ref={main}>
        <div className={styles.content} ref={content}
          onScroll={() => handleScroll()}>
          {props.title && (<div className={styles.title}>{props.title}</div>)}
          {mainComponents}
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
      {rightKey !== null && (
        <div className={`${styles.panel} ${styles.right} ${isFixedRight ? styles.fixed : ''}`}
          ref={rightPanel}>
          <div className={styles.resize} onMouseDown={resizeRightPanel}></div>
          <div className={styles.panelHead}>
            <div className={styles.title}>
              {rightKey}
            </div>
            <div className={styles.flex}></div>
            <svg className={`${styles.button} ${styles.pin}`} viewBox='0 0 24 24'
              onClick={() => setIsFixedRight(!isFixedRight)}>
              <path d={pin}></path>
            </svg>
            <svg className={styles.button} viewBox='0 -960 960 960'
              onClick={() => setRightKey(null)}>
              <path d={close}></path>
            </svg>
          </div>
          <div className={styles.panelContent}>
            {rightPanelComponents[rightKey]}
          </div>
        </div>
      )}

      {/* 페이지 오른쪽 메뉴 */}
      {rightKeys.length > 0 && (
        <div className={`${styles.menu} ${styles.right}`}
          ref={rightMenu}>
          {rightKeys.map((key) => (
            <div key={key}
              className={`${styles.tab} ${rightKey === key ? styles.active : ''}`}
              onClick={() => onToggleRigtht(key)}>
              {key}
            </div>
          ))}
        </div>
      )}

      {/* 페이지 하단 패널 */}
      {bottomKey !== null && (
        <div className={`${styles.panel} ${styles.bottom} ${isFixedBottom ? styles.fixed : ''}`}
          ref={bottomPanel}>
          <div className={styles.resize} onMouseDown={resizeBottomPanel}></div>
          <div className={styles.panelHead}>
            <div className={styles.title}>
              {bottomKey}
            </div>
            <div className={styles.flex}></div>
            <svg className={`${styles.button} ${styles.pin}`} viewBox='0 0 24 24'
              onClick={() => setIsFixedBottom(!isFixedBottom)}>
              <path d={pin}></path>
            </svg>
            <svg className={styles.button} viewBox='0 -960 960 960'
              onClick={() => setBottomKey(null)}>
              <path d={close}></path>
            </svg>
          </div>
          <div className={styles.panelContent}>
            {bottomPanelComponents[bottomKey]}
          </div>
        </div>
      )}

      {/* 페이지 하단 메뉴 */}
      {bottomKeys.length > 0 && (
        <div className={`${styles.menu} ${styles.bottom}`}
          ref={bottomMenu}>
          {bottomKeys.map((key) => (
            <div key={key}
              className={`${styles.tab} ${bottomKey === key ? styles.active : ''}`}
              onClick={() => onToggleBottom(key)}>
              {key}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export { PageBase };