import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as Sicons from '../sicons';
import {
  siconNames,
  SiconHouse, SiconSearch, SiconBell, SiconSettings, SiconUser, SiconMail, SiconCalendar, SiconFolder,
  SiconHeart, SiconStar, SiconBookmark, SiconCamera, SiconLock, SiconShieldCheck, SiconShoppingCart,
  SiconTrash2, SiconDownload, SiconChartColumn, SiconPlus, SiconCheck, SiconArrowRight, SiconX,
  type SiconFC,
} from '../sicons';

/**
 * Sicons -- Sakani's own icon set: the same 1,626 icons as the Figma "Icons"
 * component set, at a 1.5 stroke with softened corners.
 *
 * Import from `@sakaniui/react/sicons`, one component per icon
 * (`SiconHeart`, `SiconCalendar` ...). Each is tree-shaken individually.
 * Props follow lucide-react: size, color, strokeWidth, absoluteStrokeWidth.
 */
const meta = {
  title: 'Foundations/Sicons',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE: SiconFC[] = [
  SiconHouse, SiconSearch, SiconBell, SiconSettings, SiconUser, SiconMail, SiconCalendar, SiconFolder,
  SiconHeart, SiconStar, SiconBookmark, SiconCamera, SiconLock, SiconShieldCheck, SiconShoppingCart,
  SiconTrash2, SiconDownload, SiconChartColumn, SiconPlus, SiconCheck, SiconArrowRight, SiconX,
];

const page: React.CSSProperties = { padding: 32, fontFamily: 'var(--font-sans)', color: 'var(--color-fg-default)' };
const label: React.CSSProperties = { fontSize: 12, color: 'var(--color-fg-muted)', width: 48 };
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 };

/** Light and dark, at 24, 32 and 48px. Colour is currentColor. */
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {[false, true].map((dark) => (
        <div key={String(dark)} className={dark ? 'dark' : undefined} style={{ ...page, background: dark ? '#13151a' : '#fff' }}>
          {[24, 32, 48].map((s) => (
            <div key={s} style={row}>
              <span style={label}>{s}px</span>
              {SAMPLE.slice(0, s === 48 ? 12 : 22).map((Icon) => <Icon key={Icon.iconName} size={s} />)}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Close-up at 96px: the softened corners (check, arrow tip, star, roof, bookmark). */
export const CloseUp: Story = {
  render: () => (
    <div style={{ ...page, display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {[SiconCheck, SiconArrowRight, SiconStar, SiconHouse, SiconShieldCheck, SiconBookmark].map((Icon) => (
        <div key={Icon.iconName} style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
          <Icon size={96} />
        </div>
      ))}
    </div>
  ),
};

/** Weight and colour follow props; absoluteStrokeWidth keeps the weight constant as size grows. */
export const Props: Story = {
  render: () => (
    <div style={{ ...page, display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
      <SiconHeart size={48} strokeWidth={1} />
      <SiconHeart size={48} />
      <SiconHeart size={48} strokeWidth={2} />
      <SiconHeart size={48} color="#e11d48" />
      <p style={{ fontSize: 20, margin: 0 }}>Inline <SiconHeart size="1em" /> text</p>
    </div>
  ),
};

type GalleryArgs = { size: number; dark: boolean };

/** All 1,626 icons. Search by name; change size and theme in the controls. */
export const Gallery: StoryObj<GalleryArgs> = {
  args: { size: 24, dark: false },
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 96, step: 4 } },
  },
  render: function Render({ size, dark }) {
    const [q, setQ] = React.useState('');
    const all = Sicons as unknown as Record<string, SiconFC>;
    const shown = siconNames.filter((n) => n.includes(q.trim().toLowerCase()));
    const comp = (n: string) => all['Sicon' + n.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('')];
    return (
      <div className={dark ? 'dark' : undefined} style={{ ...page, background: dark ? '#13151a' : 'var(--color-bg-canvas)', minHeight: '100vh' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${siconNames.length} icons`}
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
