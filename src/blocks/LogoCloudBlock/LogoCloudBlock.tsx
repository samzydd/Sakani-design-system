/**
 * LogoCloudBlock — Blocks / Marketing / Logo Cloud
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly -- swap the real brand marks in
 * brandLogos.tsx for your own actual customers' logos.
 *
 * Matches Figma "Logo Cloud" (node 1507:27923, 2 styles: Monochrome,
 * Color). `variant` stays a real, explicit prop (Figma's own axis,
 * renamed from "style" to avoid colliding with the DOM/React `style`
 * prop, same naming choice already made by Badge/FeaturedIcon/
 * CtaBannerBlock) -- a genuine visual choice, not derivable from which
 * brands are shown:
 *   'monochrome' -- every logo renders in one flat fg/subtle gray.
 *   'color'      -- each logo renders in its own authentic brand color.
 *
 * `brands` picks which of the built-in real marks to show (and in what
 * order) -- Figma's own two states happen to use all 7 in the same
 * order, so that's the default, but a real logo wall very plausibly
 * wants fewer or a different order. See brandLogos.tsx for why these
 * are dedicated `color`-prop components (one flat fill each) rather
 * than a generic `filter: grayscale()` recolor trick: that can't
 * reliably hit one exact target gray across logos of very different
 * source luminance the way directly setting the fill can.
 */

import React from 'react';
import { brandLogoComponents, brandColors, brandLabels, type LogoCloudBrand } from './brandLogos';
import styles from './LogoCloudBlock.module.css';

export type LogoCloudVariant = 'monochrome' | 'color';

const DEFAULT_BRANDS: LogoCloudBrand[] = ['vercel', 'netlify', 'github', 'figma', 'notion', 'linear', 'stripe'];

export interface LogoCloudBlockProps {
  label?: string;
  brands?: LogoCloudBrand[];
  /** Figma Style axis (renamed to avoid colliding with the DOM `style` prop). Defaults to "monochrome". */
  variant?: LogoCloudVariant;
  className?: string;
}

export const LogoCloudBlock: React.FC<LogoCloudBlockProps> = ({
  label = 'Trusted by teams at', brands = DEFAULT_BRANDS, variant = 'monochrome', className,
}) => (
  <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
    <p className={styles.label}>{label}</p>
    <div className={styles.logos}>
      {brands.map((brand) => {
        const Logo = brandLogoComponents[brand];
        return (
          <span key={brand} role="img" aria-label={brandLabels[brand]} className={styles.logo}>
            <Logo color={variant === 'color' ? brandColors[brand] : 'currentColor'} />
          </span>
        );
      })}
    </div>
  </div>
);

export default LogoCloudBlock;
