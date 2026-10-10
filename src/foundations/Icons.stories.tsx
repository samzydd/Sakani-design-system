import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as Icons from '../icons';
import { iconNames, filledIconNames, IconHome, IconBell, IconSettings, IconSearch, IconHeart, IconHeartFilled, type SakaniIcon } from '../icons';

/**
 * Icons -- the Sakani icon set is Tabler Icons (tabler.io/icons, MIT): 5,184
 * outline icons and 1,054 filled ones, the same as the Figma "↳ Icons
 * (Tabler)" page. Import from `@sakaniui/react/icons` (`IconHome`,
 * `IconHomeFilled` ...); each icon is tree-shaken on its own.
 */
const meta = {
  title: 'Foundations/Icons',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const page: React.CSSProperties = { padding: 32, fontFamily: 'var(--font-sans)', color: 'var(--color-fg-default)' };
const pascal = (n: string) => n.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
const all = Icons as unknown as Record<string, SakaniIcon>;

/** Sizes and props. The default stroke is 1.5, the Figma icon stroke. */
export const Overview: Story = {
  render: () => (
    <div style={{ ...page, display: 'grid', gap: 24, alignContent: 'start', background: 'var(--color-bg-canvas)', minHeight: '100vh' }}>
      {[16, 20, 24, 32].map((s) => (
        <div key={s} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <span style={{ width: 40, fontSize: 12, color: 'var(--color-fg-muted)' }}>{s}px</span>
          <IconHome size={s} /><IconBell size={s} /><IconSettings size={s} /><IconSearch size={s} /><IconHeart size={s} /><IconHeartFilled size={s} />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <span style={{ width: 40, fontSize: 12, color: 'var(--color-fg-muted)' }}>props</span>
        <IconHeart size={32} strokeWidth={1} /><IconHeart size={32} /><IconHeart size={32} strokeWidth={2} />
        <IconHeart size={32} color="#e11d48" /><IconHeartFilled size={32} color="#e11d48" />
      </div>
    </div>
  ),
};

type GalleryArgs = { size: number; style: 'outline' | 'filled'; dark: boolean };

/** Every icon. Search by name; change style, size and theme in the controls. */
export const Gallery: StoryObj<GalleryArgs> = {
  args: { size: 24, style: 'outline', dark: false },
  argTypes: {
    style: { control: 'inline-radio', options: ['outline', 'filled'] },
    size: { control: { type: 'range', min: 16, max: 48, step: 4 } },
  },
  render: function Render({ size, style, dark }) {
    const [q, setQ] = React.useState('');
    const names = (style === 'filled' ? filledIconNames : iconNames) as readonly string[];
    const shown = names.filter((n) => n.includes(q.trim().toLowerCase().replace(/\s+/g, '-')));
    return (
      <div className={dark ? 'dark' : undefined} style={{ ...page, background: dark ? '#13151a' : 'var(--color-bg-canvas)', minHeight: '100vh' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${names.length} icons`}
          style={{ display: 'block', margin: '0 auto 24px', width: 320, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--color-border-default)', background: 'var(--color-bg-surface)', color: 'inherit' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${size + 72}px, 1fr))`, gap: 8 }}>
          {shown.slice(0, 1500).map((n) => {
            const Icon = all['Icon' + pascal(n) + (style === 'filled' ? 'Filled' : '')];
            return (
              <div key={n} style={{ display: 'grid', justifyItems: 'center', gap: 8, padding: 8 }}>
                {Icon && <Icon size={size} />}
                <div style={{ fontSize: 11, color: 'var(--color-fg-muted)', maxWidth: size + 64, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
