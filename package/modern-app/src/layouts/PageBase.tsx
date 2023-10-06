import { useEffect } from 'react';

import { useDocumentTitle } from '@iyulab/modern-app/hooks/UseDocumentTitle';
import { useLocator } from '@iyulab/modern-app/hooks/UseStores';

import styles from '@iyulab/modern-app/styles/layouts/PageBase.module.scss';

interface PageBaseProps {
  title?: string;
  useProgress?: boolean;
  children: React.ReactNode;
}

function PageBase({ title, useProgress, children } : PageBaseProps) {
  useDocumentTitle(title);
  const locator = useLocator();

  // 페이지 마운트 시 프로그레스 바를 100%로 설정합니다.
  useEffect(() => {
    // useProgress를 사용하면 프로그레스 바를 100%로 설정하지 않습니다.
    if (useProgress === undefined || useProgress === false) {
      locator.progress = 100;
    }
  });

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export { PageBase };