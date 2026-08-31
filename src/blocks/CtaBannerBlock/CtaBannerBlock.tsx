/**
 * CtaBannerBlock — Blocks / Marketing / CTA Banner
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire the two actions to your real
 * signup/repo links in place of the callbacks here.
 *
 * Matches Figma "CTA Banner" (node 1513:28017, 2 styles: Neutral,
 * Accent). `variant` stays a real, explicit prop (Figma's own axis,
 * renamed from "style" to avoid colliding with the DOM/React `style`
 * prop, same naming choice already made by Badge/FeaturedIcon) -- a
 * genuine visual choice, not derivable from the banner's own copy.
 *
 * Both buttons reuse the shared Button component, but which variant
 * each one renders is DERIVED from `variant`, not a separate manual
 * prop per button: on 'neutral' the primary action is Button
 * variant="primary" (the usual dark-accent treatment) and the
 * secondary is variant="secondary" (bg/subtle) -- but on 'accent' the
 * banner's own background IS that same dark accent color, so BOTH
 * buttons switch to variant="secondary" (bg/subtle) instead, or the
 * primary action would vanish into its own background. Confirmed from
 * Figma's own Accent export, where neither button is the usual dark
 * "primary" -- both are the light bg/subtle treatment.
 *
 * The GitHub icon is a small local `currentColor` SVG (lucide-react
 * ships no brand icons in the version this library uses, same gap
 * already hit for ProfileCard's and TeamCard's own social marks) --
 * kept local to this block rather than a shared export, since blocks
 * are copy-paste composition examples, not part of the strict
 * component surface.
 */

import React from 'react';
import { Button } from '../../components/Button';
import styles from './CtaBannerBlock.module.css';

const GithubIcon: React.FC = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M12 0.296997C5.37 0.296997 0 5.667 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.667 18.627 0.296997 12 0.296997Z"
    />
  </svg>
);

export type CtaBannerVariant = 'neutral' | 'accent';

export interface CtaBannerAction {
  label: string;
  onClick?: () => void;
}

export interface CtaBannerBlockProps {
  title: string;
  description: string;
  primaryAction: CtaBannerAction;
  secondaryAction?: CtaBannerAction;
  /** Shows the GitHub icon before the secondary action's label. */
  secondaryActionIcon?: boolean;
  /** Figma Style axis (renamed to avoid colliding with the DOM `style` prop). Defaults to "neutral". */
  variant?: CtaBannerVariant;
  className?: string;
}

export const CtaBannerBlock: React.FC<CtaBannerBlockProps> = ({
  title, description, primaryAction, secondaryAction, secondaryActionIcon = false,
  variant = 'neutral', className,
}) => {
  const isAccent = variant === 'accent';

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <div className={[styles.banner, isAccent ? styles.bannerAccent : styles.bannerNeutral].join(' ')}>
        <p className={[styles.title, isAccent ? styles.titleAccent : ''].filter(Boolean).join(' ')}>{title}</p>
        <p className={[styles.description, isAccent ? styles.descriptionAccent : ''].filter(Boolean).join(' ')}>{description}</p>

        <div className={styles.ctaRow}>
          <Button
            variant={isAccent ? 'secondary' : 'primary'}
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button
              variant="secondary"
              onClick={secondaryAction.onClick}
              leftIcon={secondaryActionIcon ? <GithubIcon /> : undefined}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CtaBannerBlock;
