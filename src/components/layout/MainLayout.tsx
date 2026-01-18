/**
 * MainLayout - Main Layout Component
 * Provides page structure with header and footer
 * 
 * Principles:
 * - SRP: Single responsibility for layout structure
 * - DRY: Reusable layout wrapper
 */

import React from 'react';
import { UserProfile } from '../../types/user';
import { NavbarEnhanced } from './NavbarEnhanced';
import { Footer } from './Footer';
import { SkipToContent } from '../core/SkipToContent';

export interface IMainLayoutProps {
  profile?: UserProfile | null;
  children: React.ReactNode;
}

/**
 * MainLayout Component
 * Main layout wrapper with navbar and footer
 */
export class MainLayout extends React.Component<IMainLayoutProps> {
  render(): React.ReactNode {
    const { profile, children } = this.props;

    return (
      <div className="app-layout">
        <SkipToContent targetId="main-content" label="Skip to main content" />
        <NavbarEnhanced profile={profile} />
        <div className="app-content">
          {children}
        </div>
        <Footer profile={profile} />
      </div>
    );
  }
}
