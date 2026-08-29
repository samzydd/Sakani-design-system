/**
 * ActivityLogBlock — Blocks / Application / Activity Log
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly. Assembled from existing Sakani
 * components -- no new primitives:
 *
 *   Card shell (bg/surface, border/default, radius/xl) -> "Recent activity"
 *   heading -> ActivityFeed
 *
 * Mirrors the two states in the Figma block:
 *   Timeline · ActivityFeed's own "default" variant (icon rail)
 *   Compact  · ActivityFeed's "compact" variant (avatar-led rows)
 */

import React from 'react';
import { MessageCircle, Upload, Pencil, CircleCheck } from 'lucide-react';
import { ActivityFeed, ActivityFeedHighlight } from '@sakaniui/react';
import amaraKalu from './assets/activity-amara-kalu.jpg';
import chidiDuru from './assets/activity-chidi-duru.jpg';
import jadeSilva from './assets/activity-jade-silva.jpg';
import raviMenon from './assets/activity-ravi-menon.jpg';
import styles from './ActivityLogBlock.module.css';

export type ActivityLogBlockState = 'timeline' | 'compact';

export interface ActivityLogBlockProps {
  state?: ActivityLogBlockState;
  className?: string;
}

const items = [
  { actor: 'Amara Kalu', description: <>commented on <ActivityFeedHighlight>Design Review</ActivityFeedHighlight></>, timestamp: '2m ago', icon: <MessageCircle />, avatarSrc: amaraKalu },
  { actor: 'Chidi Duru', description: <>uploaded 3 <ActivityFeedHighlight>files to Assets</ActivityFeedHighlight></>, timestamp: '1h ago', icon: <Upload />, avatarSrc: chidiDuru },
  { actor: 'Jade Silva', description: <>edited the <ActivityFeedHighlight>Pricing Table</ActivityFeedHighlight> component</>, timestamp: '3h ago', icon: <Pencil />, avatarSrc: jadeSilva },
  { actor: 'Ravi Menon', description: <>marked <ActivityFeedHighlight>"Fix Table overflow"</ActivityFeedHighlight> as done</>, timestamp: 'Yesterday', icon: <CircleCheck />, avatarSrc: raviMenon },
];

export const ActivityLogBlock: React.FC<ActivityLogBlockProps> = ({
  state = 'timeline',
  className,
}) => (
  <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
    <h2 className={styles.title}>Recent activity</h2>
    <ActivityFeed items={items} variant={state === 'compact' ? 'compact' : 'default'} />
  </div>
);

export default ActivityLogBlock;
