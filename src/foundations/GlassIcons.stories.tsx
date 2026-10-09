import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heart } from 'lucide-react';
import * as GlassIcons from '../glass-icons';
import {
  GlassIcon, GLASS_ICON_TONES, glassIconNames,
  GlassHeart, GlassFolder, GlassBookmark, GlassHouse, GlassStar, GlassMessageCircle,
  GlassBell, GlassSettings, GlassCalendar, GlassCamera, GlassRocket, GlassMail,
  type GlassIconTone, type GlassIconVariant, type GlassIconComponent,
} from '../glass-icons';

/**
 * Glass icons -- every icon in the Sakani icon set (the Figma "Icons"
 * component set, 1,626 icons) in a frosted-glass style.
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
  GlassHeart, GlassFolder, GlassBookmark, GlassHouse, GlassStar, GlassMessageCircle,
  GlassBell, GlassSettings, GlassCalendar, GlassCamera, GlassRocket, GlassMail,
];
const TONES = Object.keys(GLASS_ICON_TONES) as GlassIconTone[];

const page: React.CSSProperties = { padding: 40, fontFamily: 'var(--font-sans)', color: 'var(--color-fg-default)' };
const grid = (cols: number, cell: number): React.CSSProperties => ({
  display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: 24, justifyContent: 'center',
});
const label: React.CSSProperties = { fontSize: 12, color: 'var(--color-fg-muted)', textAlign: 'center', marginTop: 8 };

/** The twelve sample icons across every tone. */
export const Tones: Story = {
  render: () => (
    <div style={{ ...page, background: 'var(--color-bg-canvas)' }}>
      <div style={grid(6, 112)}>
        {SAMPLE.map((Icon, i) => {
          const tone = TONES[i % TONES.length];
          return (
            <div key={Icon.iconName} style={{ display: 'grid', justifyItems: 'center' }}>
              <Icon size={72} tone={tone} title={Icon.iconName} />
              <div style={label}>{tone}</div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

/** Same icons in the dark theme: the glass lightens and the line drawing turns white. */
export const Dark: Story = {
  render: () => (
    <div className="dark" style={{ ...page, background: '#141821' }}>
      <div style={grid(6, 112)}>
        {SAMPLE.map((Icon, i) => (
          <div key={Icon.iconName} style={{ display: 'grid', justifyItems: 'center' }}>
            <Icon size={72} tone={TONES[i % TONES.length]} />
          </div>
        ))}
      </div>
    </div>
  ),
};

/** The tile variant: the icon on a rounded glass plate. */
export const Tile: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {[false, true].map((dark) => (
        <div key={String(dark)} className={dark ? 'dark' : undefined} style={{ ...page, background: dark ? '#141821' : 'var(--color-bg-canvas)' }}>
          <div style={grid(4, 88)}>
            {SAMPLE.slice(0, 8).map((Icon, i) => (
              <Icon key={Icon.iconName} size={72} variant="tile" tone={TONES[(i + 2) % TONES.length]} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Sizes from 24 to 96. The effect is tuned to hold up at small sizes too. */
export const Sizes: Story = {
  render: () => (
    <div style={{ ...page, display: 'flex', gap: 32, alignItems: 'end', justifyContent: 'center' }}>
      {[24, 32, 48, 64, 96].map((s) => (
        <div key={s} style={{ display: 'grid', justifyItems: 'center' }}>
          <GlassCalendar size={s} tone="blue" />
          <div style={label}>{s}px</div>
        </div>
      ))}
    </div>
  ),
};

/** Any Lucide component, including ones added to Lucide after this build. Outlines only: a component can't say which parts are closed. */
export const AnyLucideIcon: Story = {
  render: () => (
    <div style={{ ...page, display: 'flex', gap: 32, justifyContent: 'center' }}>
      <GlassIcon icon={Heart} size={72} tone="pink" />
      <GlassHeart size={72} tone="pink" />
    </div>
  ),
};

type PlaygroundArgs = { tone: GlassIconTone; variant: GlassIconVariant; detail: boolean; size: number; dark: boolean };

/** All 1,626 icons. Search by name; change tone, variant and theme in the controls. */
export const Gallery: StoryObj<PlaygroundArgs> = {
  args: { tone: 'violet', variant: 'frosted', detail: true, size: 48, dark: false },
  argTypes: {
    tone: { control: 'select', options: TONES },
    variant: { control: 'inline-radio', options: ['frosted', 'tile'] },
    size: { control: { type: 'range', min: 24, max: 96, step: 4 } },
  },
  render: function Render({ tone, variant, detail, size, dark }) {
    const [q, setQ] = React.useState('');
    const all = GlassIcons as unknown as Record<string, GlassIconComponent>;
    const shown = glassIconNames.filter((n) => n.includes(q.trim().toLowerCase()));
    const comp = (n: string) => all['Glass' + n.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('')];
    return (
      <div className={dark ? 'dark' : undefined} style={{ ...page, background: dark ? '#141821' : 'var(--color-bg-canvas)', minHeight: '100vh' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${glassIconNames.length} icons`}
          style={{ display: 'block', margin: '0 auto 24px', width: 320, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--color-border-default)', background: 'var(--color-bg-surface)', color: 'inherit' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${size + 56}px, 1fr))`, gap: 8 }}>
          {shown.map((n) => {
            const Icon = comp(n);
            return (
              <div key={n} style={{ display: 'grid', justifyItems: 'center', padding: 8, contentVisibility: 'auto', containIntrinsicSize: `${size + 40}px` } as React.CSSProperties}>
                {Icon && <Icon size={size} tone={tone} variant={variant} detail={detail} />}
                <div style={{ ...label, fontSize: 11, maxWidth: size + 48, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
