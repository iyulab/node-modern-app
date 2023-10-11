import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { autorun } from "mobx";

import { useLayout, useMenu } from "@iyulab/modern-app/hooks/UseStores";

import { overview, leftChevron, rightChevron } from './IconVector';
import styles from "@iyulab/modern-app/styles/layouts/LeftNav.module.scss";

function LeftNav() {
  const menu = useMenu();
  const layout = useLayout();
  
  const [expand, setExpand] = useState(true);
  const [isSmallWindow, setIsSmallWindow] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");

  // 다중 메뉴 선택시
  const groupChanged = (key: string) => {
    setTimeout(() => {
      setSelectedGroup(key);
    }, 0);
  }

  // 브라우저 사이즈 변경시
  useEffect(() => {
    const setLayout = autorun(() => {
      const isSmall = layout.isMediumScreen;
  
      if(isSmall) {
        setIsSmallWindow(true);
        setExpand(false);
      } else {
        setIsSmallWindow(false);
        setExpand(true);
      }
    });

    return () => {
      setLayout();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* 네비게이션 본문 */}
      <div className={`${styles.leftNavContainer} ${isSmallWindow ? styles.small : ''} ${expand ? styles.expand : ''}`}>
        
        {/* 네비게이션 메뉴: 단일메뉴, 다중메뉴, 메뉴분리간격조정 */}
        <div className={styles.navMenus}>

          {menu.menuItems.map((menu, index) => {

            if(menu.type === "blank") {

              // 1. 메뉴 구분선
              return (<div className={styles.seperator} key={index}></div>)
            } else if(menu.subMenu === undefined || menu.subMenu.length === 0) {

              // 2. 단일 메뉴
              return (
                <NavLink to={menu.path!} key={menu.key} className={({isActive}) => {
                  if(isActive) groupChanged('');
                  return `${styles.singleMenu} ${isActive ? styles.selected : ''}`}} end>
                  <svg className={styles.icon} viewBox={`0 0 ${menu.iconSize ?? 20} ${menu.iconSize ?? 20}`}>
                    <path d={menu.iconData ?? overview}></path>
                  </svg>
                  <div className={styles.text}>{menu.display}</div>
                </NavLink>)
            } else {

              // 3. 다중 메뉴 (하위 메뉴가 있는 메뉴)
              return (
                <div key={menu.key} className={`${styles.groupMenu} ${!expand ? styles.collapsed : ''}
                  ${selectedGroup === menu.key ? styles.selected : ''}`} >
                  <NavLink to={menu.path!} className={({isActive}) => {
                    if(isActive) groupChanged(menu.key!);
                    return `${styles.mainMenu} ${isActive ? styles.selected : ''}`}} end>
                    <svg className={styles.icon} viewBox={`0 0 ${menu.iconSize ?? 20} ${menu.iconSize ?? 20}`}>
                      <path d={menu.iconData ?? overview}></path>
                    </svg>
                    <div className={styles.text}>{menu.display}</div>
                  </NavLink>
                  {selectedGroup === menu.key ? menu.subMenu.map((child) => {
                    return (
                      <NavLink to={child.path!} key={child.key} className={({isActive}) => {
                        if(isActive) groupChanged(menu.key!);
                        return `${styles.subMenu} ${isActive ? styles.selected : ''}`}}>
                          <div className={styles.text}>{child.display}</div>
                      </NavLink>)
                  }) : null}
                </div>);
            }

          })}

        </div>

        {/* 네비게이션 하단 버튼 */}
        <div className={styles.navFooter}>
          {/* 펼침/접힘 버튼 */}
          <div className={styles.button} onClick={() => setExpand(!expand)}>
            <svg className={styles.img} viewBox="0 0 32 32">
              <path d={expand ? leftChevron : rightChevron}></path>
            </svg>
          </div>
        </div>

      </div>

      {/* 작은 윈도우사이즈에서 메뉴바가 펼쳐질때 오른쪽을 커버하는 오버레이 창 */}
      <div className={isSmallWindow && expand ? styles.smallWindowExpandedOverlay : ""}
        onClick={() => setExpand(false)}>
      </div>

    </>
  );
}

export { LeftNav };
