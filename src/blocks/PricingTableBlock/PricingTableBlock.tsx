/**
 * PricingTableBlock — Blocks / Marketing / Pricing Table
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire each plan's CTA to your real
 * checkout/contact flow in place of the callbacks here.
 *
 * Matches Figma "Pricing Table" (node 1509:28031, 2 previews:
 * Tiers=2/3). The tier COUNT is fully derived from `plans.length`
 * (Figma's own axis name is just describing how many plans its two
 * examples happen to show, not an independent choice) -- but the two
 * examples also disagree on layout for that reason: 3 plans stretch
 * (flex:1) to fill the full row, while 2 plans are fixed-width (360px)
 * and centered instead of stretched edge-to-edge. Both behaviors are
 * kept, switched on `plans.length <= 2`, since an edge-to-edge stretch
 * of just 2 cards across a 1280px row would look sparse compared to
 * Figma's own deliberate choice to keep a 2-plan comparison narrower
 * and centered.
 *
 * Which plan is "Most popular" is derived from that plan's own
 * `highlighted: true`, not a separate index/id lookup -- the elevated
 * shadow, accent border, "Most popular" badge, and switching its CTA
 * to Button variant="primary" (every other plan uses variant="outline")
 * all derive from that one flag. The header's own "Pricing" eyebrow
 * badge is accent/SOLID emphasis, not accent/subtle like every other
 * eyebrow badge elsewhere in this library (SectionHeading,
 * BlogListingFeaturedCard's "Featured") -- confirmed as this block's
 * own deliberately bolder treatment, not a copy-paste mismatch, since
 * both of Figma's own tier examples use the same solid badge here.
 *
 * The non-highlighted CTA button is Button variant="outline" -- Figma's
 * own two examples actually disagree here too (the 2-tier export's
 * button is bg/subtle, matching variant="secondary"; the 3-tier
 * export's is bg/surface+border/subtle, closer to variant="outline"),
 * a real inconsistency between two separately-authored examples rather
 * than a deliberate difference. Resolved to variant="outline" (visually
 * near-identical to bg/subtle against this card's own white background,
 * and it's what the more detailed 3-tier export actually specifies).
 * The checkmark reuses lucide's Check icon (24px, fg/muted, matching
 * the feature label's own color) -- Figma names it just "Icons" with no
 * further spec, so no dedicated shared icon was warranted here.
 */

import React from 'react';
import { Check } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './PricingTableBlock.module.css';

export interface PricingPlan {
  id?: string;
  name: string;
  price: string;
  /** Omit for a plan with no numeric period, e.g. "Custom". */
  period?: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  features: string[];
  /** Drives the "Most popular" badge, accent border/shadow, and primary CTA. */
  highlighted?: boolean;
  /** Defaults to "Most popular" when highlighted. */
  badgeLabel?: string;
}

export interface PricingTableBlockProps {
  /** Small pill above the title, e.g. "Pricing". Omit to hide it. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  className?: string;
}

export const PricingTableBlock: React.FC<PricingTableBlockProps> = ({
  eyebrow = 'Pricing', title, subtitle, plans, className,
}) => {
  const isNarrow = plans.length <= 2;

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        {eyebrow && <Badge variant="accent" emphasis="solid">{eyebrow}</Badge>}
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={[styles.plans, isNarrow ? styles.plansNarrow : ''].filter(Boolean).join(' ')}>
        {plans.map((plan, i) => (
          <div
            key={plan.id ?? plan.name ?? i}
            className={[
              styles.plan,
              plan.highlighted ? styles.planHighlighted : '',
              isNarrow ? styles.planFixed : '',
            ].filter(Boolean).join(' ')}
          >
            {plan.highlighted && (
              <Badge variant="accent" emphasis="subtle">{plan.badgeLabel ?? 'Most popular'}</Badge>
            )}
            <p className={styles.name}>{plan.name}</p>
            <div className={styles.priceRow}>
              <p className={styles.price}>{plan.price}</p>
              {plan.period && <p className={styles.period}>{plan.period}</p>}
            </div>
            <p className={styles.description}>{plan.description}</p>
            <Button
              variant={plan.highlighted ? 'primary' : 'outline'}
              className={styles.fullWidth}
              onClick={plan.onCtaClick}
            >
              {plan.ctaLabel}
            </Button>
            <Divider className={styles.fullWidth} />
            <div className={styles.features}>
              {plan.features.map((feature, j) => (
                <div key={j} className={styles.featureRow}>
                  <Check size={24} strokeWidth={iconStrokeWidth(24)} className={styles.featureIcon} aria-hidden="true" />
                  <p className={styles.featureLabel}>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTableBlock;
