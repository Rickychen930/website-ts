/**
 * Toast Notification System
 * Professional toast notifications for user feedback
 */

import React, { Component, ReactNode, createRef } from "react";
import "../../../assets/css/toast.css";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

/**
 * Toast Item Component
 */
class ToastItem extends Component<ToastItemProps> {
  private timeoutId: NodeJS.Timeout | null = null;
  private itemRef = createRef<HTMLDivElement>();

  componentDidMount(): void {
    const { toast, onRemove } = this.props;
    const duration = toast.duration ?? 5000;

    if (duration > 0) {
      this.timeoutId = setTimeout(() => {
        onRemove(toast.id);
      }, duration);
    }

    // Trigger animation
    requestAnimationFrame(() => {
      if (this.itemRef.current) {
        this.itemRef.current.classList.add("toast-enter");
      }
    });
  }

  componentWillUnmount(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private handleRemove = (): void => {
    const { toast, onRemove } = this.props;
    if (this.itemRef.current) {
      this.itemRef.current.classList.add("toast-exit");
      setTimeout(() => {
        onRemove(toast.id);
      }, 300);
    } else {
      onRemove(toast.id);
    }
  };

  private getIcon(): string {
    const { type } = this.props.toast;
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "•";
    }
  }

  render(): ReactNode {
    const { toast } = this.props;
    const { message, type } = toast;

    return (
      <div
        ref={this.itemRef}
        className={`toast toast-${type}`}
        role="alert"
        aria-live={type === "error" ? "assertive" : "polite"}
        aria-atomic="true"
      >
        <div className="toast-icon" aria-hidden="true">
          {this.getIcon()}
        </div>
        <div className="toast-message">{message}</div>
        <button
          className="toast-close"
          onClick={this.handleRemove}
          aria-label="Close notification"
          type="button"
        >
          ×
        </button>
      </div>
    );
  }
}

/**
 * Toast Container Component
 */
export class ToastContainer extends Component<ToastContainerProps> {
  render(): ReactNode {
    const { toasts, onRemove } = this.props;

    if (toasts.length === 0) return null;

    return (
      <div
        className="toast-container"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </div>
    );
  }
}

/**
 * Toast Manager - Singleton pattern for managing toasts
 */
class ToastManager {
  private toasts: Toast[] = [];
  private listeners: Set<(toasts: Toast[]) => void> = new Set();
  private idCounter = 0;

  /**
   * Subscribe to toast changes
   */
  subscribe(listener: (toasts: Toast[]) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners
   */
  private notify(): void {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  /**
   * Show a toast
   */
  show(message: string, type: ToastType = "info", duration?: number): string {
    const id = `toast-${Date.now()}-${this.idCounter++}`;
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };

    this.toasts.push(toast);
    this.notify();

    return id;
  }

  /**
   * Remove a toast
   */
  remove(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toasts = [];
    this.notify();
  }

  /**
   * Get current toasts
   */
  getToasts(): Toast[] {
    return [...this.toasts];
  }
}

export const toastManager = new ToastManager();

/**
 * Convenience functions
 */
export const toast = {
  success: (message: string, duration?: number) =>
    toastManager.show(message, "success", duration),
  error: (message: string, duration?: number) =>
    toastManager.show(message, "error", duration),
  warning: (message: string, duration?: number) =>
    toastManager.show(message, "warning", duration),
  info: (message: string, duration?: number) =>
    toastManager.show(message, "info", duration),
  remove: (id: string) => toastManager.remove(id),
  clear: () => toastManager.clear(),
};

export default ToastContainer;

