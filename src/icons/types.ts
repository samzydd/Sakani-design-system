import type React from 'react';

/**
 * Any icon component a Sakani component can render: a Sakani icon
 * (`@sakaniui/react/icons`), a Lucide icon or a Tabler React icon. Props that
 * take an icon accept the component itself (`IconSettings`), not an element.
 */
export type IconComponent = React.ComponentType<{
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
}>;
