/**
 * brandLogos
 *
 * Real brand marks (Vercel, Netlify, GitHub, Figma, Notion, Linear,
 * Stripe) -- lucide-react ships no brand icons in the version this
 * library uses, same gap already hit for ProfileCard's/TeamCard's own
 * social marks. Paths traced from the SVGs already downloaded for
 * Marquee's own logo demo (src/assets/marketing/brands/*.svg) -- kept
 * as inline components here instead, though, since each needs to
 * render in two different colors depending on LogoCloudBlock's own
 * `variant` (a fixed muted gray for "monochrome", the brand's own
 * authentic color for "color"): every one of these source files is a
 * single flat-fill path, so accepting a `color` prop and applying it
 * directly as the fill is exact and trivial here, unlike a generic
 * `filter: grayscale()`-based recolor trick, which can't reliably hit
 * one specific flat target color across logos of very different source
 * luminance.
 */

import React from 'react';

export type LogoCloudBrand = 'vercel' | 'netlify' | 'github' | 'figma' | 'notion' | 'linear' | 'stripe';

interface LogoProps {
  color: string;
}

const Vercel: React.FC<LogoProps> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill={color} d="M12 1.608L24 22.392H0L12 1.608Z" />
  </svg>
);

const Netlify: React.FC<LogoProps> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill={color}
      d="M6.49 19.04H6.26L5.13 17.9V17.67L6.86 15.96H8.06L8.21 16.11V17.31L6.5 19.04H6.49ZM5.13 6.31V6.1L6.26 4.97H6.49L8.2 6.68V7.88L8.05 8.03H6.85L5.13 6.31ZM15.09 15.4H13.44L13.3 15.27V11.44C13.3 10.76 13.03 10.24 12.2 10.21C11.78 10.21 11.3 10.21 10.77 10.23L10.7 10.31V15.27L10.56 15.41H8.9L8.77 15.27V8.73L8.9 8.59H12.6C12.9423 8.58868 13.2814 8.65496 13.598 8.78504C13.9146 8.91511 14.2025 9.10641 14.4449 9.34798C14.6874 9.58954 14.8798 9.87661 15.0111 10.1927C15.1424 10.5088 15.21 10.8477 15.21 11.19V15.27L15.08 15.41L15.09 15.4ZM6.72 12.96H0.14L0 12.82V11.18L0.14 11.04H6.72L6.86 11.18V12.82L6.72 12.96ZM23.86 12.96H17.28L17.14 12.82V11.18L17.28 11.04H23.86L24 11.18V12.82L23.86 12.96ZM11.05 6.55V1.64L11.19 1.5H12.84L12.98 1.64V6.54L12.84 6.68H11.19L11.05 6.55ZM11.05 22.36V17.46L11.19 17.32H12.84L12.98 17.45V22.36L12.84 22.5H11.19L11.05 22.36Z"
    />
  </svg>
);

const Github: React.FC<LogoProps> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill={color}
      d="M12 0.297C5.37 0.297 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.297 12 0.297Z"
    />
  </svg>
);

const Figma: React.FC<LogoProps> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill={color}
      d="M15.852 8.981H11.264V0H15.852C18.328 0 20.342 2.014 20.342 4.49C20.342 6.966 18.328 8.981 15.852 8.981ZM12.735 7.51H15.852C17.517 7.51 18.871 6.155 18.871 4.491C18.871 2.827 17.516 1.472 15.852 1.472H12.735V7.51ZM12.735 8.981H8.148C5.672 8.981 3.658 6.967 3.658 4.491C3.658 2.015 5.672 0 8.148 0H12.736V8.981H12.735ZM8.148 1.471C6.483 1.471 5.129 2.826 5.129 4.49C5.129 6.154 6.483 7.51 8.148 7.51H11.265V1.471H8.148ZM12.735 16.49H8.148C5.672 16.49 3.658 14.476 3.658 12C3.658 9.524 5.672 7.51 8.148 7.51H12.736V16.49H12.735ZM8.148 8.981C6.483 8.981 5.129 10.336 5.129 12C5.129 13.664 6.484 15.019 8.148 15.019H11.265V8.981H8.148ZM8.172 24C5.683 24 3.657 21.986 3.657 19.51C3.657 17.034 5.671 15.02 8.147 15.02H12.735V19.461C12.735 21.964 10.688 24 8.172 24ZM8.148 16.49C7.34764 16.4911 6.58036 16.8095 6.01441 17.3754C5.44847 17.9414 5.13006 18.7086 5.129 19.509C5.129 21.174 6.494 22.528 8.173 22.528C9.878 22.528 11.266 21.152 11.266 19.46V16.49H8.148ZM15.852 16.49H15.754C13.278 16.49 11.264 14.476 11.264 12C11.264 9.524 13.278 7.51 15.754 7.51H15.852C18.328 7.51 20.342 9.524 20.342 12C20.342 14.476 18.328 16.49 15.852 16.49ZM15.755 8.981C14.09 8.981 12.736 10.336 12.736 12C12.736 13.664 14.091 15.019 15.755 15.019H15.853C17.518 15.019 18.872 13.664 18.872 12C18.872 10.336 17.516 8.981 15.852 8.981H15.755Z"
    />
  </svg>
);

const Notion: React.FC<LogoProps> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill={color}
      d="M4.459 4.20802C5.205 4.81402 5.485 4.76802 6.887 4.67402L20.102 3.88102C20.382 3.88102 20.149 3.60102 20.056 3.55502L17.86 1.96802C17.44 1.64202 16.879 1.26802 15.805 1.36102L3.01 2.29502C2.544 2.34102 2.45 2.57502 2.636 2.76102L4.459 4.20802ZM5.252 7.28802V21.192C5.252 21.939 5.625 22.219 6.466 22.172L20.989 21.332C21.83 21.286 21.924 20.772 21.924 20.165V6.35402C21.924 5.74802 21.691 5.42102 21.176 5.46702L5.999 6.35402C5.439 6.40102 5.252 6.68202 5.252 7.28802ZM19.589 8.03302C19.682 8.45302 19.589 8.87302 19.169 8.92102L18.469 9.06102V19.325C17.861 19.652 17.301 19.839 16.834 19.839C16.086 19.839 15.899 19.605 15.339 18.906L10.762 11.72V18.672L12.21 19C12.21 19 12.21 19.84 11.042 19.84L7.82 20.026C7.727 19.84 7.82 19.373 8.147 19.28L8.987 19.047V9.85402L7.822 9.76002C7.728 9.34002 7.962 8.73402 8.615 8.68702L12.071 8.45402L16.835 15.733V9.29302L15.62 9.15402C15.527 8.64002 15.9 8.26702 16.367 8.22102L19.589 8.03302ZM1.936 1.03502L15.246 0.0550198C16.88 -0.0849802 17.301 0.00801984 18.328 0.75502L22.577 3.74102C23.277 4.25402 23.511 4.39402 23.511 4.95402V21.332C23.511 22.358 23.138 22.966 21.831 23.058L6.373 23.992C5.393 24.039 4.925 23.899 4.411 23.245L1.282 19.185C0.722 18.438 0.489 17.879 0.489 17.225V2.66702C0.489 1.82802 0.863 1.12702 1.936 1.03502Z"
    />
  </svg>
);

const Linear: React.FC<LogoProps> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill={color}
      d="M2.886 4.18C4.01198 2.86759 5.40869 1.81445 6.9802 1.09291C8.5517 0.37137 10.2608 -0.0014678 11.99 4.34259e-06C18.624 4.34259e-06 24 5.376 24 12.009C24 15.649 22.38 18.912 19.82 21.114L2.887 4.18H2.886ZM1.817 5.626L18.373 22.182C17.849 22.512 17.298 22.802 16.723 23.048L0.951 7.277C1.198 6.702 1.488 6.15 1.817 5.626ZM0.322 9.163L14.837 23.678C14.127 23.85 13.394 23.96 12.642 24L0 11.358C0.0393248 10.618 0.147119 9.88316 0.322 9.163ZM0.152 14.025L9.975 23.849C7.522 23.4299 5.25956 22.2598 3.49989 20.5001C1.74023 18.7404 0.570101 16.478 0.151 14.025H0.152Z"
    />
  </svg>
);

const Stripe: React.FC<LogoProps> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill={color}
      d="M13.976 9.15C11.804 8.344 10.62 7.724 10.62 6.741C10.62 5.91 11.303 5.436 12.521 5.436C14.748 5.436 17.036 6.294 18.611 7.067L19.501 1.573C18.252 0.975 15.697 0 12.165 0C9.667 0 7.589 0.654 6.104 1.872C4.56 3.147 3.757 4.992 3.757 7.218C3.757 11.257 6.224 12.978 10.233 14.437C12.818 15.357 13.678 16.011 13.678 17.02C13.678 18 12.838 18.565 11.324 18.565C9.449 18.565 6.359 17.644 4.334 16.456L3.434 22.011C5.175 22.99 8.385 24 11.714 24C14.355 24 16.557 23.376 18.042 22.187C19.706 20.882 20.567 18.951 20.567 16.455C20.567 12.327 18.043 10.604 13.973 9.15H13.976Z"
    />
  </svg>
);

/** Each brand's own authentic color, used for LogoCloudBlock's "color" variant. */
export const brandColors: Record<LogoCloudBrand, string> = {
  vercel: '#000000',
  netlify: '#00C7B7',
  github: '#181717',
  figma: '#F24E1E',
  notion: '#000000',
  linear: '#5E6AD2',
  stripe: '#635BFF',
};

export const brandLabels: Record<LogoCloudBrand, string> = {
  vercel: 'Vercel',
  netlify: 'Netlify',
  github: 'GitHub',
  figma: 'Figma',
  notion: 'Notion',
  linear: 'Linear',
  stripe: 'Stripe',
};

export const brandLogoComponents: Record<LogoCloudBrand, React.FC<LogoProps>> = {
  vercel: Vercel,
  netlify: Netlify,
  github: Github,
  figma: Figma,
  notion: Notion,
  linear: Linear,
  stripe: Stripe,
};
