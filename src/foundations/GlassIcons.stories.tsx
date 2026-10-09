import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heart } from 'lucide-react';
import * as GlassIcons from '../glass-icons';
import {
  GlassIcon, glassIconNames,
  GlassHeart, GlassFolder, GlassCalendar, GlassCamera, GlassSettings, GlassBell,
  GlassMail, GlassHouse, GlassTrash2, GlassLightbulb, GlassShoppingBasket, GlassSearch,
  type GlassIconComponent,
} from '../glass-icons';

/**
 * Glass icons -- every icon in the Sakani icon set (the Figma "Icons"
 * component set, 1,626 icons) as monochrome frosted glass, 1:1 with the
 * Figma "Glass Icons" component set.
 *
 * Import from `@sakaniui/react/glass-icons`, one component per icon
 * (`GlassHeart`, `GlassCalendar` ...). Each is tree-shaken individually.
 * `<GlassIcon icon={AnyLucideIcon} />` covers Lucide icons added later.
 */
const meta = {
  title: 'Foundations/Glass Icons',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE: GlassIconComponent[] = [
  GlassHeart, GlassFolder, GlassCalendar, GlassCamera, GlassSettings, GlassBell,
  GlassMail, GlassHouse, GlassTrash2, GlassLightbulb, GlassShoppingBasket, GlassSearch,
];

const page: React.CSSProperties = { padding: 40, fontFamily: 'var(--font-sans)', color: 'var(--color-fg-default)' };
const label: React.CSSProperties = { fontSize: 12, color: 'var(--color-fg-muted)', width: 40 };
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 };

/** Light and dark, at 24, 32 and 48px. The icons re-theme inside `.dark` on their own. */
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {[false, true].map((dark) => (
        <div key={String(dark)} className={dark ? 'dark' : undefined} style={{ ...page, background: dark ? '#13151a' : '#fff' }}>
          {[24, 32, 48].map((s) => (
            <div key={s} style={row}>
              <span style={label}>{s}px</span>
              {SAMPLE.map((Icon) => <Icon key={Icon.iconName} size={s} />)}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** `size` takes any CSS length; '1em' follows the surrounding text. */
export const Sizes: Story = {
  render: () => (
    <div style={{ ...page, display: 'flex', gap: 32, alignItems: 'end', justifyContent: 'center' }}>
      {[16, 24, 32, 48, 64, 96].map((s) => (
        <div key={s} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <GlassCalendar size={s} />
          <span style={{ fontSize: 12, color: 'var(--color-fg-muted)' }}>{s}px</span>
        </div>
      ))}
      <p style={{ fontSize: 20, margin: 0 }}>Inline <GlassHeart size="1em" /> text</p>
    </div>
  ),
};

/** Any Lucide component, including ones added to Lucide after this build: drawn as a glass stroke. */
export const AnyLucideIcon: Story = {
  render: () => (
    <div style={{ ...page, display: 'flex', gap: 32, justifyContent: 'center' }}>
      <GlassIcon icon={Heart} size={64} />
      <GlassHeart size={64} />
    </div>
  ),
};

type GalleryArgs = { size: number; dark: boolean };

/** All 1,626 icons. Search by name; change size and theme in the controls. */
export const Gallery: StoryObj<GalleryArgs> = {
  args: { size: 32, dark: false },
  argTypes: { size: { control: { type: 'range', min: 16, max: 96, step: 4 } } },
  render: function Render({ size, dark }) {
    const [q, setQ] = React.useState('');
    const all = GlassIcons as unknown as Record<string, GlassIconComponent>;
    const shown = glassIconNames.filter((n) => n.includes(q.trim().toLowerCase()));
    const comp = (n: string) => all['Glass' + n.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('')];
    return (
      <div className={dark ? 'dark' : undefined} style={{ ...page, background: dark ? '#13151a' : 'var(--color-bg-canvas)', minHeight: '100vh' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${glassIconNames.length} icons`}
          style={{ display: 'block', margin: '0 auto 24px', width: 320, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--color-border-default)', background: 'var(--color-bg-surface)', color: 'inherit' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${size + 64}px, 1fr))`, gap: 8 }}>
          {shown.map((n) => {
            const Icon = comp(n);
            return (
              <div key={n} style={{ display: 'grid', justifyItems: 'center', gap: 8, padding: 8, contentVisibility: 'auto', containIntrinsicSize: `${size + 40}px` } as React.CSSProperties}>
                {Icon && <Icon size={size} />}
                <div style={{ fontSize: 11, color: 'var(--color-fg-muted)', maxWidth: size + 56, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
