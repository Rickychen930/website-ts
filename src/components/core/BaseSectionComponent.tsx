/**
 * BaseSectionComponent - Base Class for Section Components
 * Follows MVC Pattern - View Layer
 * 
 * Principles:
 * - MVC: Represents View layer
 * - SRP: Single responsibility for section rendering
 * - OCP: Open for extension via inheritance
 * - DIP: Depends on controller abstractions
 */

import React, { ReactNode } from 'react';
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from './BaseComponent';
import { UserProfile } from '../../types/user';
import { IBaseController } from '../../controllers/base-controller';

export interface IBaseSectionProps extends IBaseComponentProps {
  profile: UserProfile;
  controller: IBaseController;
  sectionId: string;
  title?: string;
}

export interface IBaseSectionState extends IBaseComponentState {
  isLoading: boolean;
  hasData: boolean;
}

/**
 * Base Section Component
 * Provides common functionality for all section components
 */
export abstract class BaseSectionComponent<P extends IBaseSectionProps = IBaseSectionProps, S extends IBaseSectionState = IBaseSectionState> extends BaseComponent<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      isMounted: false,
      error: null,
      isLoading: false,
      hasData: false,
    } as S;
  }

  componentDidMount(): void {
    super.componentDidMount?.();
    this.checkDataAvailability();
  }

  /**
   * Check if section should display based on controller logic
   */
  protected checkDataAvailability(): void {
    const { controller, profile } = this.props;
    const hasData = controller.shouldDisplay(profile);
    this.setState({ hasData } as Pick<S, keyof S>);
  }

  /**
   * Get section wrapper classes
   */
  protected getSectionClasses(): string {
    const { className, sectionId } = this.props;
    return this.getClassNames('section', `section--${sectionId}`, className);
  }

  /**
   * Render section title
   */
  protected renderSectionTitle(): ReactNode {
    const { title, sectionId } = this.props;
    if (!title) return null;

    return (
      <h2 className="section__title" id={sectionId}>
        {title}
      </h2>
    );
  }

  /**
   * Render section content (to be implemented by subclasses)
   */
  protected abstract renderSectionContent(): ReactNode;

  /**
   * Render empty state
   */
  protected renderEmptyState(): ReactNode {
    return (
      <div className="section__empty">
        <p>No data available for this section.</p>
      </div>
    );
  }

  /**
   * Main render method
   */
  render(): ReactNode {
    if (this.state.error) {
      return this.renderError();
    }

    if (!this.state.hasData) {
      return null; // Don't render if no data
    }

    return (
      <section className={this.getSectionClasses()} id={this.props.sectionId}>
        {this.renderSectionTitle()}
        <div className="section__content">
          {this.renderSectionContent()}
        </div>
      </section>
    );
  }
}
