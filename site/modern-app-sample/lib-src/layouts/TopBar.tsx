import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { autorun } from "mobx";

import {
  useLayout,
  useLocator,
  useUI,
} from "@iyulab/modern-app/hooks/UseStores";
import { Themes } from "@iyulab/modern-app/stores/LayoutStore";

import logo from "@iyulab/modern-app/assets/app-logo.svg";
import { VectorIcons } from "./VectorIcons";
import styles from "@iyulab/modern-app/styles/layouts/TopBar.module.scss";

import { observer } from "mobx-react";
import { topBarOptions } from "./TopBarOptions";

const TopBar = observer(() => {
  const locator = useLocator();
  const layout = useLayout();
  const ui = useUI();

  const progressbar = useRef<HTMLSpanElement>(null);
  const themeIcon = useRef<SVGPathElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [notiCount, setNotiCount] = useState<number>(0);

  // 테마 설정(아이콘 변경)
  useEffect(() => {
    const setTheme = autorun(() => {
      const path = themeIcon.current;
      if (!path) return;

      if (layout.theme === Themes.dark) {
        path.setAttribute("d", VectorIcons.sun);
      } else {
        path.setAttribute("d", VectorIcons.moon);
      }
    });

    return () => {
      setTheme();
    };
  });

  // 로딩 설정
  useEffect(() => {
    // 로딩 중
    const setProgress = autorun(() => {
      const bar = progressbar.current;
      if (!bar) return;

      const progress = locator.progress;
      if (progress === 1) {
        bar.style.opacity = "0";
        bar.style.transform = `scaleX(1)`;
        setTimeout(() => clearProgress(), 350);
      } else {
        bar.style.opacity = "1";
        bar.style.transitionDuration = "350ms, 350ms, 350ms";
        bar.style.transform = `scaleX(${progress})`;
      }
    });

    // 로딩 초기화
    const clearProgress = () => {
      if (locator.isLoading) return;

      const bar = progressbar.current;
      if (!bar) return;

      bar.style.opacity = "1";
      bar.style.transitionDuration = "0ms, 350ms, 350ms";
      bar.style.transform = `scaleX(0)`;
    };

    return () => {
      setProgress();
    };
  });

  // 브레드 크럼 설정
  useEffect(() => {
    const setBread = autorun(() => {
      if (!locator.current?.fullPaths) return;
      setPaths(locator.current.fullPaths);
    });

    return () => {
      setBread();
    };
  });

  // 알림 설정
  useEffect(() => {
    setNotiCount(2);
  }, []);

  return (
    <>
      {/* 헤더부 본문 */}
      <div className={styles.container}>
        {/* 로고 */}
        <Link className={styles.logo} to={locator.baseUrl}>
          <div className={styles.icon}>
            <img className={styles.img} src={layout.logo ?? logo} />
          </div>
          <div className={styles.title}>{layout.title}</div>
        </Link>

        {/* 네비게이션 브레드 바 */}
        <div className={styles.breadCrumb}>
          {paths.map((_, index) => {
            const toPath = paths.slice(0, index + 1).join("/");
            const display = locator.getDisplay(index);
            return (
              <div className={styles.bread} key={toPath}>
                <Link to={toPath} className={styles.path}>
                  {display}
                </Link>
                {index !== paths.length - 1 ? (
                  <div className={styles.slash}>/</div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* 중간 채움 */}
        <div className={styles.flex}></div>

        {/* User 버튼 */}
        <div className={styles.userButtons}>
          {/* Help 버튼 */}
          {topBarOptions.visibleHelp && (
            <div
              className={styles.hoverButton}
              onClick={() => locator.go(locator.helpUrl)}
            >
              <svg className={styles.icon} viewBox="0 -960 960 960">
                <path d={VectorIcons.question} />
              </svg>
              <div className={styles.tooltip}>HELP</div>
            </div>
          )}

          {/* Theme 버튼 */}
          <div
            className={styles.hoverButton}
            onClick={() => layout.toggleTheme()}
          >
            <svg className={styles.icon} viewBox="0 -960 960 960">
              <path ref={themeIcon} />
            </svg>
            <div className={styles.tooltip}>THEME</div>
          </div>

          {/* Notification 버튼 */}
          {topBarOptions.visibleNotification && (
            <div
              className={styles.hoverButton}
              onClick={(e) => ui.toggleNotificationAsync(e as unknown as Event)}
            >
              <svg className={styles.icon} viewBox="0 -960 960 960">
                <path d={VectorIcons.notification} />
              </svg>
              {notiCount > 0 ? (
                <span className={styles.badge}>{notiCount}</span>
              ) : null}
              <div className={styles.tooltip}>NOTIFICATION</div>
            </div>
          )}

          <div
            className={styles.hoverButton}
            onClick={(e) => ui.showUserMenuAsync(e as unknown as Event)}
          >
            <svg className={styles.icon}>
              <path d={VectorIcons.user} />
            </svg>
            <div className={styles.tooltip}>User</div>
          </div>
        </div>
      </div>

      {/* 페이징 프로그레스바 */}
      <span className={styles.progressbar}>
        <span className={styles.bar} ref={progressbar}></span>
      </span>
    </>
  );
});

export { TopBar };
