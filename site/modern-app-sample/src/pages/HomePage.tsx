import { PageBase } from '@iyulab/modern-app/layouts/PageBase';
import styles from '@/styles/HomePage.module.scss';

export function HomePage() {
    return (
        <PageBase title='This is Home'>
            <div className={styles.home}>
                <h1>Hello This is Home Page</h1>
            </div>
        </PageBase>
    )
}