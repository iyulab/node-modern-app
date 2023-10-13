import { PageBase } from '@iyulab/modern-app/layouts/PageBase';
import styles from '@/styles/HomePage.module.scss';

export function MixPage() {
    return (
        <PageBase title='This is Mix'>
            <div className={styles.home}>
                <h1>Hello This is Mix Page</h1>
            </div>
        </PageBase>
    )
}