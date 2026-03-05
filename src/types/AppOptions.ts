import type { ScreenPosition } from "@iyulab/components/dist/utilities/Notifier.js";

// 알림 옵션
export interface NotificationOptions {
  title?: string;
  duration?: number;
  position?: ScreenPosition;
}

// 대화상자 옵션
export interface DialogOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}