/**
 * Toast Provider Component
 * Provides toast notifications throughout the app
 */

import React, { Component, ReactNode } from "react";
import { ToastContainer, toastManager, Toast } from "../views/components/ui";

interface ToastProviderState {
  toasts: Toast[];
}

export class ToastProvider extends Component<{}, ToastProviderState> {
  private unsubscribe: (() => void) | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      toasts: [],
    };
  }

  componentDidMount(): void {
    this.unsubscribe = toastManager.subscribe((toasts) => {
      this.setState({ toasts });
    });
  }

  componentWillUnmount(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  private handleRemove = (id: string): void => {
    toastManager.remove(id);
  };

  render(): ReactNode {
    return <ToastContainer toasts={this.state.toasts} onRemove={this.handleRemove} />;
  }
}

export default ToastProvider;

