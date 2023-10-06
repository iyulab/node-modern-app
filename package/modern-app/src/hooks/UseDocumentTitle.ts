import { useEffect, useRef } from 'react';

function useDocumentTitle(title?: string, prevailOnUnmount: boolean = false) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title ?? defaultTitle.current;
    }, [title]);

    // 언마운트 시에 이전 타이틀로 복구여부
    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export { useDocumentTitle }