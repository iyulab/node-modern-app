import { PageHeader, PageBase, PagePanel } from '@iyulab/modern-app/layouts';

import styles from '@/styles/Test.module.scss';

export function TestPage() {

    return (
        <PageBase docTitle='This is Test'>
            <PageHeader>
                <div className={styles.head}>
                    헤더 타이틀
                </div>
            </PageHeader>
            <div className={styles.body}>
                본문 시작<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                본문 끝
            </div>
            <PagePanel key="오른쪽 패널" position='right'>
                <div className={styles.rightPanel}>
                    오른쪽 패널
                </div>
            </PagePanel>
            <PagePanel key="하단 패널" position='bottom'>
                <div className={styles.bottomPanel}>
                    하단 패널
                </div>
            </PagePanel>
        </PageBase>
    );
}