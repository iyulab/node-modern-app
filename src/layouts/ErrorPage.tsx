import { useEffect } from "react";
import { useRouteError, useNavigate, isRouteErrorResponse } from "react-router-dom";

import { useDocumentTitle } from "../hooks/UseDocumentTitle";

import styles from './ErrorPage.module.scss';

function ErrorPage() {
  useDocumentTitle('Error Occurred');
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('error occurred');
  }, []);

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 400:
        return (
          <div className={styles["error-container"]}>
            <h1>400 - 잘못된 요청</h1>
            <p>죄송합니다, 요청이 잘못되었습니다.</p>
            <div onClick={() => navigate(-1)} className={styles["error-button"]}>
              이전으로 돌아가기
            </div>
          </div>
        );

      case 401:
        return (
          <div className={styles["error-container"]}>
            <h1>401 - 권한 없음</h1>
            <p>이 페이지를 볼 권한이 없습니다.</p>
            <div onClick={() => navigate(-1)} className={styles["error-button"]}>
              이전으로 돌아가기
            </div>
          </div>
        );

      case 403:
        return (
          <div className={styles["error-container"]}>
            <h1>403 - 액세스 거부</h1>
            <p>죄송합니다, 해당 페이지에 액세스 권한이 없습니다.</p>
            <div onClick={() => navigate(-1)} className={styles["error-button"]}>
              이전으로 돌아가기
            </div>
          </div>
        );

      case 404:
        return (
          <div className={styles["error-container"]}>
            <h1>404 - 페이지를 찾을 수 없음</h1>
            <p>죄송합니다, 요청하신 페이지를 찾을 수 없습니다.</p>
            <div onClick={() => navigate(-1)} className={styles["error-button"]}>
              이전으로 돌아가기
            </div>
          </div>
        );

      case 418:
        return (
          <div className={styles["error-container"]}>
            <h1 className={styles["teapot"]}>418 - I'm a teapot</h1>
            <p>이게 뭐에요? ☕</p>
            <div onClick={() => navigate(-1)} className={styles["error-button"]}>
              이전으로 돌아가기
            </div>
          </div>
        );

      case 500:
        return (
          <div className={styles["error-container"]}>
            <h1>500 - 서버 오류</h1>
            <p>죄송합니다, 서버에서 오류가 발생했습니다.</p>
            <div onClick={() => navigate(-1)} className={styles["error-button"]}>
              이전으로 돌아가기
            </div>
          </div>
        );

      default:
        return (
          <div className={styles["error-container"]}>
            <h1>{error.status} - 알 수 없는 오류</h1>
            <p>죄송합니다, 알 수 없는 오류가 발생했습니다.</p>
            <p>{error.data}</p>
            <div onClick={() => navigate(-1)} className={styles["error-button"]}>
              이전으로 돌아가기
            </div>
          </div>
        );
    }
  }

  return (
    <div className={styles["error-container"]}>
      <h1>오류 발생</h1>
      <p>죄송합니다, 뭔가 잘못되었습니다.</p>
      <div onClick={() => navigate(-1)} className={styles["error-button"]}>
        이전으로 돌아가기
      </div>
    </div>
  );
}

export { ErrorPage };