import { useEffect } from 'react';

import { useDocumentTitle } from '@iyulab/modern-app/hooks/UseDocumentTitle';
import { useLocator } from '@iyulab/modern-app/hooks/UseStores';

import styles from '@iyulab/modern-app/styles/layouts/PageBase.module.scss';

interface PageBaseProps {
  docTitle?: string;
  title?: string;
  children: React.ReactNode;
}

function PageBase({ docTitle, title, children } : PageBaseProps) {
  useDocumentTitle(docTitle);
  const locator = useLocator();

  useEffect(() => {
    locator.progress = 100;
  }, [locator]);

  return (
    <div className={styles.container}>
      {title && (<div className={styles.header}>{title}</div>)}
      {children}
    </div>
  );
}

export { PageBase };