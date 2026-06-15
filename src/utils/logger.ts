import * as Sentry from "@sentry/react";

/**
 * Centralized logging utility for Thaiyalagam.
 * Redirects logs to Sentry for tracking while maintaining console output during development.
 */
export const logger = {
  info: (message: string, context?: any) => {
    console.info(`[INFO] ${message}`, context || "");
    Sentry.addBreadcrumb({
      category: "log",
      message,
      level: "info",
      data: context,
    });
  },

  warn: (message: string, context?: any) => {
    console.warn(`[WARN] ${message}`, context || "");
    Sentry.captureMessage(message, {
      level: "warning",
      extra: context,
    });
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error || "");
    if (error instanceof Error) {
      Sentry.captureException(error, {
        extra: { message, ...error },
      });
    } else {
      Sentry.captureMessage(message, {
        level: "error",
        extra: { error },
      });
    }
  },

  debug: (message: string, context?: any) => {
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, context || "");
    }
  },
};
