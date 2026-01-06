import React, { Component, ReactNode } from "react";

export type BasePageProps = {
  title?: string;
  children?: ReactNode;
};

export type BasePageState = {
  isLoading: boolean;
};

class BasePage<
  P = {},
  S extends BasePageState = BasePageState,
> extends Component<BasePageProps & P, S> {
  static defaultProps = {
    title: "",
  };

  constructor(props: BasePageProps & P) {
    super(props);
    this.state = {
      isLoading: false,
    } as S;
  }

  // 🔹 Utility
  protected setLoading(isLoading: boolean): void {
    this.setState({ isLoading } as Pick<S, "isLoading">);
  }

  // 🔹 Render helper methods
  protected renderHeader(): ReactNode {
    return null;
  }

  protected renderLoading(): ReactNode {
    return (
      <div className="page-loading" role="status" aria-live="polite" aria-label="Loading">
        <p>Loading...</p>
      </div>
    );
  }

  protected renderContent(): ReactNode {
    return this.props.children;
  }

  protected renderFooter(): ReactNode {
    return null; // Override in subclass if needed
  }

  protected renderError(error: Error | string): ReactNode {
    const errorMessage = error instanceof Error ? error.message : error;
    return (
      <div className="page-error" role="alert" aria-label="Error">
        <p>{errorMessage}</p>
      </div>
    );
  }

  private renderBody(): ReactNode {
    return (
      <div className="page-content">
        {this.state.isLoading ? this.renderLoading() : this.renderContent()}
      </div>
    );
  }

  // 🔹 Main render
  public render(): ReactNode {
    return (
      <div className="page-container">
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default BasePage;
