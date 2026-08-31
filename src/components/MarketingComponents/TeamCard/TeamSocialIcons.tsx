/**
 * TeamSocialIcons
 *
 * Instagram/Facebook/LinkedIn outline glyphs, traced from the SVGs
 * downloaded from the Figma file -- lucide-react ships no social/brand
 * icons in the version this library uses (confirmed empty for
 * Instagram, Facebook, and Linkedin, same gap already hit for X/GitHub
 * in ProfileCard's own SocialIcons.tsx). Unlike ProfileCard's marks,
 * though, Figma's own source paths here already used a plain stroke
 * color (#78716A, this system's own fg/muted) rather than a fixed brand
 * fill, so these were always generic outline icons, not solid brand
 * logos -- swapped to `stroke="currentColor"` so they still inherit
 * FeaturedIcon's own themed icon color instead of a hardcoded gray that
 * wouldn't adapt to dark mode.
 */

import React from 'react';

export const InstagramIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M11.6667 4.33333H11.6733M4.66667 1.33333H11.3333C13.1743 1.33333 14.6667 2.82572 14.6667 4.66667V11.3333C14.6667 13.1743 13.1743 14.6667 11.3333 14.6667H4.66667C2.82572 14.6667 1.33333 13.1743 1.33333 11.3333V4.66667C1.33333 2.82572 2.82572 1.33333 4.66667 1.33333ZM10.6666 7.58004C10.7489 8.13487 10.6541 8.70152 10.3958 9.19938C10.1375 9.69725 9.72873 10.101 9.22772 10.3532C8.7267 10.6053 8.15893 10.6931 7.60516 10.604C7.05138 10.5149 6.53981 10.2534 6.14319 9.85681C5.74658 9.4602 5.48512 8.94862 5.39601 8.39485C5.3069 7.84107 5.39468 7.2733 5.64685 6.77229C5.89903 6.27127 6.30276 5.86253 6.80062 5.6042C7.29849 5.34587 7.86514 5.2511 8.41997 5.33337C8.98592 5.41729 9.50987 5.68101 9.91443 6.08558C10.319 6.49014 10.5827 7.01409 10.6666 7.58004Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FacebookIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 1.33333H10C9.11594 1.33333 8.2681 1.68452 7.64298 2.30964C7.01786 2.93477 6.66667 3.78261 6.66667 4.66667V6.66667H4.66667V9.33333H6.66667V14.6667H9.33333V9.33333H11.3333L12 6.66667H9.33333V4.66667C9.33333 4.48986 9.40357 4.32029 9.5286 4.19526C9.65362 4.07024 9.82319 4 10 4H12V1.33333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M10.6667 5.33333C11.7275 5.33333 12.7449 5.75476 13.4951 6.50491C14.2452 7.25505 14.6667 8.27247 14.6667 9.33333V14H12V9.33333C12 8.97971 11.8595 8.64057 11.6095 8.39052C11.3594 8.14048 11.0203 8 10.6667 8C10.313 8 9.97391 8.14048 9.72386 8.39052C9.47381 8.64057 9.33333 8.97971 9.33333 9.33333V14H6.66667V9.33333C6.66667 8.27247 7.08809 7.25505 7.83824 6.50491C8.58838 5.75476 9.6058 5.33333 10.6667 5.33333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 6H1.33333V14H4V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M2.66667 4C3.40305 4 4 3.40305 4 2.66667C4 1.93029 3.40305 1.33333 2.66667 1.33333C1.93029 1.33333 1.33333 1.93029 1.33333 2.66667C1.33333 3.40305 1.93029 4 2.66667 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
