import { useEffect } from 'react';

import { useDocumentTitle } from '@iyulab/modern-app/hooks/UseDocumentTitle';
import { useLocator } from '@iyulab/modern-app/hooks/UseStores';
import { LocatorStore } from '@iyulab/modern-app/stores/LocatorStore';

import styles from '@iyulab/modern-app/styles/layouts/PageBase.module.scss';

interface PageBaseProps {
  docTitle?: string;
  title?: string;
  onLoad?: (locator:LocatorStore) => Promise<void>;
  children: React.ReactNode;
}

function PageBase({ docTitle, title, onLoad, children } : PageBaseProps) {
  useDocumentTitle(docTitle);
  const locator = useLocator();

  useEffect(() => {
    if (onLoad) {
      onLoad(locator).then(() => {
        locator.progress = 100;
      }).finally(() => {
        locator.progress = 100;
      });
    } else {
      locator.progress = 100;
    }
  }, [onLoad, locator]);

  return (
    <div className={styles.container}>
      {title && (<div className={styles.header}>{title}</div>)}
      {children}
    </div>
  );
}

export { PageBase };