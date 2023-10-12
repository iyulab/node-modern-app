import { PageBase } from '@iyulab/modern-app/layouts/PageBase';
import styles from '@/styles/HomePage.module.scss';
import { Outlet } from 'react-router-dom';

export function LitPage() {
    return (
        <PageBase title='This is Home'>
            <div className={styles.home}>
                <h1>Hello This is Lit Page</h1>
                <Outlet></Outlet>
            </div>
        </PageBase>
    )
}