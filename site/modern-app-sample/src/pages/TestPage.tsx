import { useState } from 'react';

import { PageBase } from '@iyulab/modern-app/layouts/PageBase';
import styles from '@/styles/Test.module.scss';

import { Position } from '@iyulab/modern-app/layouts/components/FlyoutElement';
import { useUI } from '@iyulab/modern-app/hooks/UseStores';

export function TestPage() {
    const ui = useUI();
    const [position, setPosition] = useState<Position>(0);

    const handlePositionChange = (event) => {
        const newPosition = event.target.value;
        const value = Number(Position[newPosition]);
        setPosition(value);
    };

    const handleFlyout = (e) => {
        ui.notificationMenu.position = position;
        ui.toggleNotificationAsync(e);
        // ui.toggleSubNavAsync(e);
        // ui.hoverNavTooltipAsync(e, 'test');
    }

    return (
        <PageBase docTitle='This is Test'>
            <div className={styles.container}>
                <div className={styles.line}>
                    <button onClick={handleFlyout}>Test</button>
                    <button onClick={handleFlyout}>Test</button>
                    <button onClick={handleFlyout}>Test</button>
                </div>
                <div className={styles.line}>
                    <button onClick={handleFlyout}>Test</button>
                    <div className={styles.card}>
                        <h1>Select Position</h1>
                        <select onChange={handlePositionChange} value={Position[position]}>
                            {Object.values(Position).map((value) => {
                                if(typeof value === 'string') {
                                    return (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>)
                                }
                            })}
                        </select>
                    </div>
                    <button onClick={handleFlyout}>Test</button>
                </div>
                <div className={styles.line}>
                    <button onClick={handleFlyout}>Test</button>
                    <button onClick={handleFlyout}>Test</button>
                    <button onClick={handleFlyout}>Test</button>
                </div>
            </div>
        </PageBase>
    )
}