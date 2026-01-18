/**
 * BaseComponent - Base Class for All Components
 * Follows OOP Principles and SOLID
 * 
 * Principles:
 * - OOP: Base class with inheritance
 * - SRP: Single responsibility for component lifecycle
 * - OCP: Open for extension via inheritance
 * - DIP: Depends on abstractions (React.Component)
 */

import React, { Component, ReactNode } from 'react';

export interface IBaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface IBaseComponentState {
  isMounted: boolean;
  error: Error | null;
}

/**
 * Base Component Class
 * Provides common functionality for all components
 */
export abstract class BaseComponent<P extends IBaseComponentProps = IBaseComponentProps, S extends IBaseComponentState = IBaseComponentState> extends Component<P, S> {
  protected componentName: string;

  constructor(props: P) {
    super(props);
    this.componentName = this.constructor.name;
    this.state = {
      isMounted: false,
      error: null,
    } as S;
  }

  componentDidMount(): void {
    this.setState({ isMounted: true } as Pick<S, keyof S>);
    this.onMount?.();
  }

  componentWillUnmount(): void {
    this.onUnmount?.();
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error } as Pick<S, keyof S>);
    this.onError?.(error, errorInfo);
  }

  /**
   * Lifecycle hooks (optional override)
   */
  protected onMount?(): void;
  protected onUnmount?(): void;
  protected onError?(error: Error, errorInfo: React.ErrorInfo): void;

  /**
   * Generate CSS class names
   */
  protected getClassNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  /**
   * Abstract render method - must be implemented by subclasses
   */
  abstract render(): ReactNode;

  /**
   * Render error state
   */
  protected renderError(): ReactNode {
    if (!this.state.error) return null;

    return (
      <div className="error-container" data-testid={`${this.componentName}-error`}>
        <p>An error occurred in {this.componentName}</p>
        <details>
          <summary>Error details</summary>
          <pre>{this.state.error.message}</pre>
        </details>
      </div>
    );
  }
}
