import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { autorun } from "mobx";

import { useLayout, useUI } from "../hooks/UseStores";
import type { GroupMenu, MenuItem } from "../stores/LayoutStore";

import { VectorIcons } from "./VectorIcons";
import styles from "./LeftNav.module.scss";

interface LeftNavProps {
  onExpand?: (isExpanded: boolean) => void;
}

function LeftNav({ onExpand }: LeftNavProps) {
  const layout = useLayout();
  const ui = useUI();

  const [expand, setExpand] = useState<boolean>(true);
  const [isSmallWindow, setIsSmallWindow] = useState<boolean>(false);
  const [toggleGroup, setToggleGroup] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  // 다중 메뉴 선택시
  const groupChanged = (key: string) => {
    setTimeout(() => {
      setSelectedGroup(key);
    }, 0);
  };

  // 그룹 메뉴 펼침/접힘
  const onToggleGroupMenu = (e: any, key: number, menu: GroupMenu) => {
    if (expand) {
      setToggleGroup((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    } else {
      ui.toggleSubNavAsync(e, menu);
    }
  };

  // 메뉴 접힘 상태에서 메뉴 디스플레이
  const onHoverMenuDisplay = (e: any, display: string) => {
    if (expand) return;
    ui.hoverNavTooltipAsync(e, display);
  };

  // 펼침/접힘 버튼 클릭
  const onToggleExpand = () => {
    setExpand(!expand);
    if (!isSmallWindow) {
      onExpand?.(!expand);
    }
  };

  // 브라우저 사이즈 변경시
  useEffect(() => {
    const setLayout = autorun(() => {
      const isSmall = layout.isMediumScreen;

      if (isSmall) {
        setIsSmallWindow(true);
        setExpand(false);
        onExpand?.(false);
      } else {
        setIsSmallWindow(false);
        setExpand(true);
        onExpand?.(true);
        ui.subNavMenu.hideClickAsync();
      }
    });

    return () => {
      setLayout();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function renderMenuItem(menu: MenuItem, index: number): any {
    // 1. 구분선
    if (menu.type === "separator") {
      const height = {
        height: menu.height ? menu.height : undefined,
      };

      return (
        <div key={index} className={styles.separator} style={height}>
          {menu.line && <div className={styles.line}></div>}
        </div>
      );
    }
    // 2. 단일 메뉴
    else if (menu.type === "single") {
      const hasParm = menu.path?.endsWith("/:id?");
      const path = hasParm ? menu.path?.replace("/:id?", "") : menu.path;

      return (
        <NavLink
          key={menu.key}
          to={path!}
          className={({ isActive }) => {
            if (isActive) groupChanged("");
            return `${styles.singleMenu} ${isActive ? styles.selected : ""}`;
          }}
          onMouseEnter={(e) => onHoverMenuDisplay(e, menu.display)}
          end={!hasParm}
        >
          <svg
            className={styles.icon}
            viewBox={menu.iconViewBox ?? "0 0 24 24"}
          >
            <path d={menu.iconData ?? VectorIcons.cube}></path>
          </svg>
          <div className={styles.text}>{menu.display}</div>
        </NavLink>
      );
    }
    // 3. 그룹 메뉴
    else if (menu.type === "group") {
      const selected =
        menu.subMenu.find((s) => s.key === selectedGroup) !== undefined;
      const showMenu = toggleGroup[index] ?? false;

      return (
        <div
          key={index}
          className={`${styles.groupMenu}
        ${selected ? styles.selected : ""} ${expand ? "" : styles.collapsed}`}
        >
          {/* 그룹 메뉴 헤더 */}
          <div
            className={`${styles.groupHeader}`}
            onClick={(e) => onToggleGroupMenu(e, index, menu)}
            onMouseEnter={(e) => onHoverMenuDisplay(e, menu.display)}
          >
            <svg
              className={styles.icon}
              viewBox={menu.iconViewBox ?? "0 0 24 24"}
            >
              <path d={menu.iconData ?? VectorIcons.group}></path>
            </svg>
            <div className={styles.text}>{menu.display}</div>
            <div className={styles.flex}></div>
            <svg className={styles.toggle} viewBox="0 0 24 24">
              <path
                d={showMenu ? VectorIcons.angleDown : VectorIcons.angleUp}
              ></path>
            </svg>
          </div>
          {/* 그룹 메뉴 본문 */}
          <div className={styles.groupBody} hidden={!showMenu || !expand}>
            {menu.subMenu.map((child) => {
              const hasParm = child.path?.endsWith("/:id?");
              const path = hasParm
                ? child.path?.replace("/:id?", "")
                : child.path;

              return (
                <NavLink
                  key={child.key}
                  to={path!}
                  className={({ isActive }) => {
                    if (isActive) groupChanged(child.key);
                    return `${styles.subMenu} ${
                      isActive ? styles.selected : ""
                    }`;
                  }}
                  end={!hasParm}
                >
                  <div className={styles.text}>{child.display}</div>
                </NavLink>
              );
            })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      {/* 네비게이션 본문 */}
      <div
        className={`${styles.leftNavContainer} ${
          isSmallWindow ? styles.small : ""
        } ${expand ? styles.expand : ""}`}
      >
        {/* 네비게이션 메뉴: 단일메뉴, 그룹메뉴, 메뉴구분선 */}
        <div className={styles.navMenus}>
          <div className={styles.mainMenus}>
            {layout.mainMenus.map((menu, index) => {
              return renderMenuItem(menu, index);
            })}
          </div>

          <div className={styles.subMenus}>
            {layout.subMenus.map((menu, index) => {
              return renderMenuItem(menu, index);
            })}
          </div>
        </div>

        {/* 네비게이션 하단 버튼 */}
        <div className={styles.navFooter}>
          {/* 펼침/접힘 버튼 */}
          <div className={styles.button} onClick={onToggleExpand}>
            <svg className={styles.img} viewBox="0 0 32 32">
              <path
                d={expand ? VectorIcons.leftChevron : VectorIcons.rightChevron}
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* 작은 윈도우사이즈에서 메뉴바가 펼쳐질때 오른쪽을 커버하는 오버레이 창 */}
      <div
        className={
          isSmallWindow && expand ? styles.smallWindowExpandedOverlay : ""
        }
        onClick={() => setExpand(false)}
      ></div>
    </>
  );
}

export { LeftNav };
