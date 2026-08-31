/**
 * TeamSectionBlock — Blocks / Marketing / Team Section
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Matches Figma "Team Section" (node 1583:41557). Composed entirely
 * from existing library components -- SectionHeading (Marketing, the
 * "Team" eyebrow + title + subtitle, align="center") and a grid of
 * TeamCard (Marketing, the plain "Card" style -- no `bio`, matching
 * every member shown here) -- no new visual primitives, this block is
 * purely heading + grid layout.
 *
 * Figma's own grid instance is 1688px wide (4 cards x 404px + 3x24px
 * gaps) inside an outer frame cropped to 1280px, clipping the grid's
 * own right edge in that specific export -- not a real 1280px content
 * width, just how that particular thumbnail was framed. This block
 * sizes itself to the grid's actual, uncropped content width instead
 * (same reasoning applied throughout this set: match the real content
 * size, not an incidentally-cropped preview frame).
 *
 * The grid is real CSS Grid with auto-fill (min 404px per card,
 * matching Figma exactly), not a fixed 4-card row -- it wraps onto
 * additional rows for any other member count, same reasoning
 * ProductGridBlock/BlogListingBlock give for their own grids.
 * TeamCard's own max-width:404px (a standalone-usage default) is
 * overridden so each card genuinely fills its grid cell rather than
 * capping below it, same override pattern already established for
 * ProductCard and BlogListingCard.
 */

import React from 'react';
import { SectionHeading } from '../../components/MarketingComponents/SectionHeading';
import { TeamCard, type TeamCardProps } from '../../components/MarketingComponents/TeamCard';
import styles from './TeamSectionBlock.module.css';

export interface TeamSectionMember extends Omit<TeamCardProps, 'className'> {
  /** Unique key for the grid -- defaults to `name` if omitted. */
  id?: string;
}

export interface TeamSectionBlockProps {
  /** Small pill above the title, e.g. "Team". Omit to hide it. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  members: TeamSectionMember[];
  className?: string;
}

export const TeamSectionBlock: React.FC<TeamSectionBlockProps> = ({
  eyebrow = 'Team', title, subtitle, members, className,
}) => (
  <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
    <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" className={styles.heading} />

    <div className={styles.grid}>
      {members.map(({ id, ...member }, i) => (
        <TeamCard key={id ?? member.name ?? i} {...member} className={styles.card} />
      ))}
    </div>
  </div>
);

export default TeamSectionBlock;
