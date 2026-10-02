import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { House, Inbox, ListChecks, Settings, Bold, Italic, Underline, Link2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { type LiquidGlassEffect, LiquidGlass } from '../lib/LiquidGlass';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { Sidebar } from '../components/Sidebar';
import { SidebarSearch } from '../components/SidebarSearch';
import { SidebarItem } from '../components/SidebarItem';
import { Modal } from '../components/ApplicationComponents/Modal';
import { Card } from '../components/Card';
import balloons from '../assets/marketing/blog-image-balloons.jpg';

/**
 * Liquid glass prototype — Apple-style material on three hero surfaces:
 * a floating toolbar (clear), a sidebar (regular) and a modal (regular).
 *
 * Refraction (the edge bending the backdrop like a lens) and dispersion (a
 * faint color fringe) render in Chrome/Edge only; Safari and Firefox show the
 * frosted fallback with the same rim light and depth. "Safari fallback"
 * forces that fallback so both can be compared in one browser.
 *
 * Refraction only reads over detailed content — text, stripes, hard edges —
 * so the scene is deliberately busy. Drag the toolbar over the headline.
 */
const meta = {
  title: 'Foundations/Liquid glass (prototype)',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Scene = ({ dark, children }: { dark: boolean; children: React.ReactNode }) => (
  <div
    className={dark ? 'dark' : undefined}
    style={{
      position: 'relative', minHeight: '100vh', overflow: 'hidden', fontFamily: 'var(--font-sans)',
      background: dark
        ? `radial-gradient(35% 45% at 20% 25%, #FF4700 0%, transparent 70%),
           radial-gradient(40% 50% at 80% 20%, #7B4BD9 0%, transparent 70%),
           radial-gradient(45% 55% at 60% 90%, #2E90FA 0%, transparent 70%), #0F0E0C`
        : `radial-gradient(35% 45% at 20% 25%, #FF8A57 0%, transparent 70%),
           radial-gradient(40% 50% at 80% 20%, #B49AF0 0%, transparent 70%),
           radial-gradient(45% 55% at 60% 90%, #7CC0FF 0%, transparent 70%), #FFF4EC`,
    }}
  >
    {/* Detail for the lens to bend: stripes, a headline, hard-edged shapes. */}
    <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(90deg, transparent 0 38px, ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(16,15,12,0.06)'} 38px 40px)` }} />
    <h1 style={{ position: 'absolute', top: 70, left: 330, margin: 0, font: '800 88px/0.95 var(--font-sans)', letterSpacing: '-0.03em', color: dark ? '#FAFAF9' : '#141414' }}>
      Liquid<br />glass.
    </h1>
    <div style={{ position: 'absolute', top: 300, left: 360, width: 120, height: 120, borderRadius: 999, background: '#FF4700' }} />
    <div style={{ position: 'absolute', top: 360, left: 560, width: 200, height: 56, borderRadius: 14, background: '#12B76A', transform: 'rotate(-10deg)' }} />
    <div style={{ position: 'absolute', top: 470, left: 720, width: 90, height: 90, background: '#141414', transform: 'rotate(18deg)' }} />
    {children}
  </div>
);

/** A toolbar you can drag across the scene. */
const DraggableToolbar = ({ refraction }: { refraction: 'auto' | 'off' }) => {
  const [pos, setPos] = React.useState({ x: 340, y: 250 });
  const drag = React.useRef<{ dx: number; dy: number } | null>(null);
  return (
    <LiquidGlass
      variant="clear"
      radius={28}
      refraction={refraction}
      style={{ position: 'absolute', left: pos.x, top: pos.y, display: 'flex', gap: 4, padding: 8, cursor: 'grab', touchAction: 'none', zIndex: 5 }}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => { if (drag.current) setPos({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy }); }}
      onPointerUp={() => { drag.current = null; }}
    >
      {[Bold, Italic, Underline, Link2, ImageIcon, Sparkles].map((Icon, i) => (
        <IconButton key={i} icon={Icon} aria-label={['Bold', 'Italic', 'Underline', 'Link', 'Image', 'Ask AI'][i]} variant="ghost" size="md" />
      ))}
    </LiquidGlass>
  );
};

const Prototype = ({ dark, refraction = 'auto' }: { dark: boolean; refraction?: 'auto' | 'off' }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Scene dark={dark}>
      <LiquidGlass variant="regular" radius={24} refraction={refraction} style={{ position: 'absolute', top: 24, left: 24, bottom: 24, width: 264, zIndex: 4 }}>
        <Sidebar>
          <SidebarSearch type="command" placeholder="Search…" />
          <SidebarItem icon={House} label="Home" />
          <SidebarItem icon={Inbox} label="Inbox" badge="12" active activeIndicator={false} />
          <SidebarItem icon={ListChecks} label="Tasks" />
          <SidebarItem icon={Settings} label="Settings" />
        </Sidebar>
      </LiquidGlass>

      <DraggableToolbar refraction={refraction} />

      <div data-surface="liquid" style={{ position: 'absolute', left: 340, top: 340 + 240, zIndex: 4 }}>
        <Button onClick={() => setOpen(true)}>Open liquid modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Archive this project?"
          description="It will move to Archive. You can restore it any time."
          confirmLabel="Archive"
          onConfirm={() => setOpen(false)}
        />
      </div>
    </Scene>
  );
};

export const Light: Story = { render: () => <Prototype dark={false} /> };
export const Dark: Story = { render: () => <Prototype dark /> };
/** What Safari and Firefox show: no refraction, frosted fallback with the same rim and depth. */
export const SafariFallbackLight: Story = { name: 'Safari fallback (light)', render: () => <Prototype dark={false} refraction="off" /> };
export const SafariFallbackDark: Story = { name: 'Safari fallback (dark)', render: () => <Prototype dark refraction="off" /> };

/**
 * Calibration — pixel-for-pixel twin of the Figma frame
 * "🎯 Calibration (code ↔ Figma)" (Liquid glass prototype page): same
 * 1000×600 canvas, same 2px/16px black grid, same panel sizes, positions
 * and radii. Screenshot both at 1x and compare how far the grid bends near
 * each edge; tune the --liquid-* tokens until the two match.
 *
 * Probes (&args=probe:y or probe:x): the grid becomes black-to-white ramps
 * across each edge and the tint, rim and depth are hidden, so a pixel's
 * brightness says exactly where the lens sampled it from (set reg.light:0;
 * clr.light:0). Render the same ramps behind the Figma panels (light 0) to read
 * Figma's bend the same way. probe:flat is plain grey, to compare what the
 * light adds.
 */
type Lens = { refraction: number; depth: number; dispersion: number; frost: number; light: number; tint: number };
type CalibrationArgs = { reg: Lens; clr: Lens; probe?: 'grid' | 'y' | 'x' | 'flat' };

/** Probe backdrops: black-to-white ramps across each edge, as in the Figma probe frames,
 *  so the colour of every pixel in a lens says where the lens sampled it from. */
const ramp = (dir: 'y' | 'x', bands: number[][]) =>
  bands.map(([a, len]) => (dir === 'y'
    ? `linear-gradient(to bottom, #000, #fff) 0 ${a}px / 100% ${len}px no-repeat`
    : `linear-gradient(to right, #000, #fff) ${a}px 0 / ${len}px 100% no-repeat`)).join(', ') + ', #808080';
const PROBE = {
  y: ramp('y', [[40, 120], [250, 70], [320, 80], [480, 120]]),
  x: ramp('x', [[40, 120], [440, 120]]),
};

/** One lens as inline custom properties, so a fitting script can drive it from the URL
 *  (&args=clr.depth:30;reg.light:0). Values are Figma's Glass properties; defaults =
 *  the shipped tokens (the liquid/regular and liquid/clear effect styles). */
const lensVars = (l: Lens) => ({
  '--liquid-refraction': l.refraction, '--liquid-depth': l.depth, '--liquid-dispersion': l.dispersion,
  '--liquid-frost': l.frost, '--liquid-light-intensity': l.light,
  background: `rgba(255, 255, 255, ${l.tint})`,
});

export const Calibration: StoryObj<CalibrationArgs> = {
  parameters: { layout: 'fullscreen' },
  args: {
    reg: { refraction: 0.55, depth: 16, dispersion: 0.3, frost: 4, light: 0.7, tint: 0.66 },
    clr: { refraction: 0.8, depth: 20, dispersion: 0.4, frost: 1, light: 0.8, tint: 0.28 },
    probe: 'grid',
  },
  render: (a) => {
    const panel = (left: number, top: number, width: number, height: number, l: Lens) =>
      ({ position: 'absolute', left, top, width, height, ...lensVars(l) } as React.CSSProperties);
    return (
      <div
        data-probe={a.probe && a.probe !== 'grid' ? a.probe : undefined}
        style={a.probe === 'y' || a.probe === 'x' || a.probe === 'flat' ? { position: 'relative', width: 1000, height: 600, overflow: 'hidden', background: a.probe === 'flat' ? '#808080' : PROBE[a.probe] } : {
          position: 'relative', width: 1000, height: 600, overflow: 'hidden', background: '#fff',
          backgroundImage: 'linear-gradient(to right, #000 2px, transparent 2px), linear-gradient(#000 2px, transparent 2px)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* In a probe, only the Glass effect shows: no tint, shadow or glare. */}
        <style>{'[data-probe] [data-surface="liquid"] { background: transparent !important; box-shadow: none !important; } [data-probe] [data-surface="liquid"]::before, [data-probe] [data-surface="liquid"]::after { display: none; }'}</style>
        <LiquidGlass variant="regular" radius={28} style={panel(100, 100, 400, 200, a.reg)} />
        <LiquidGlass variant="clear" radius={28} style={panel(100, 340, 400, 200, a.clr)} />
        <LiquidGlass variant="regular" radius={28} style={panel(600, 172, 200, 56, a.reg)} />
        <LiquidGlass variant="clear" radius={28} style={panel(600, 412, 200, 56, a.clr)} />
      </div>
    );
  },
};

/**
 * Photo backdrop — the three-layer recipe the Figma documentation describes:
 *   1. Background: the photo.
 *   2. Overlay: one full-size <LiquidGlass variant="clear" radius={0}> sheet
 *      above it (closest tint to Figma's 5% overlay; the library has no
 *      lighter one yet, and `regular` washes the photo out). It is
 *      the only layer that blurs/refracts the photo, so the whole canvas
 *      reads as one consistent glass surface.
 *   3. Components: placed above the overlay inside data-surface="liquid" so
 *      they drop their own fills and sit on that sheet. Content that has to
 *      be read (here a data card) keeps its solid surface.
 */
export const PhotoBackdrop: StoryObj = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        position: 'relative', width: 1000, height: 620, overflow: 'hidden',
        backgroundImage: `url(${balloons})`, backgroundSize: 'cover', backgroundPosition: 'center',
      }}
    >
      <LiquidGlass variant="clear" radius={0} style={{ position: 'absolute', inset: 0 }} />
      <div data-surface="liquid" style={{ position: 'relative', display: 'flex', gap: 24, padding: 32, height: '100%', boxSizing: 'border-box' }}>
        <div style={{ width: 220 }}>
          <Sidebar>
            <SidebarItem icon={House} label="Dashboard" active />
            <SidebarItem icon={Inbox} label="Inbox" badge="4" />
            <SidebarItem icon={ListChecks} label="Tasks" />
            <SidebarItem icon={Settings} label="Settings" />
          </Sidebar>
        </div>
        <div style={{ display: 'grid', gap: 16, alignContent: 'start', width: 360 }}>
          {/* Solid on purpose: this is content to be read, not chrome. */}
          <div data-surface="solid"><Card title="Revenue" description="Solid surface for data"><Button size="sm">View report</Button></Card></div>
          <div style={{ display: 'flex', gap: 8 }}><Button variant="secondary" size="sm">Export</Button><Button size="sm">Share</Button></div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Glass sweep — the code twin of the Figma probe frames used to measure the
 * Glass effect: each panel sets ONE Figma property (via `effect`), over a
 * gradient (displacement), a black/white step (frost) or flat grey (light).
 * Screenshot at 1x and measure both the same way (&args=sheet:frost).
 */
type SweepPanel = { k: string; x: number; y: number; w: number; h: number; radius?: number; e: Partial<LiquidGlassEffect> };
const base: LiquidGlassEffect = { refraction: 0.8, depth: 20, dispersion: 0, frost: 0, lightIntensity: 0, lightAngle: -45 };
const sweepSheets = (() => {
  const disp: SweepPanel[] = [
    ...[0.2, 0.4, 0.6, 0.8, 1].map((v) => ({ k: `refraction=${v}`, e: { refraction: v } })),
    ...[5, 10, 15, 30, 40].map((v) => ({ k: `depth=${v}`, e: { depth: v } })),
    ...[0.2, 0.4, 0.8, 1].map((v) => ({ k: `dispersion=${v}`, e: { dispersion: v } })),
    { k: 'pill', e: {}, h: 56 },
    { k: 'reg', e: { refraction: 0.55, depth: 16 } },
  ].map((o, i) => ({ k: o.k, x: 40 + (i % 4) * 290, y: 40 + Math.floor(i / 4) * 170, w: 240, h: (o as { h?: number }).h ?? 100, e: o.e }));
  const frost: SweepPanel[] = [0, 1, 2, 4, 8].map((v, i) => ({ k: `frost=${v}`, x: 40 + i * 230, y: 40, w: 200, h: 120, e: { frost: v, refraction: 0, depth: 1 } }));
  const light: SweepPanel[] = [
    ...[0, 0.2, 0.4, 0.8, 1].map((v) => ({ k: `light=${v}`, e: { lightIntensity: v } })),
    ...[45, 135, -135, 0, 90].map((a) => ({ k: `angle=${a}`, e: { lightIntensity: 0.8, lightAngle: a } })),
  ].map((o, i) => ({ k: o.k, x: 40 + (i % 5) * 230, y: 40 + Math.floor(i / 5) * 240, w: 200, h: 160, e: o.e }));
  const light2: SweepPanel[] = [
    { k: 'd10', e: { depth: 10 } }, { k: 'd40', e: { depth: 40 } }, { k: 'r0.2', e: { refraction: 0.2 } }, { k: 'r1', e: { refraction: 1 } }, { k: 'r16', e: {}, radius: 16 },
  ].map((o, i) => ({ k: o.k, x: 40 + i * 230, y: 40, w: 200, h: 200, radius: (o as { radius?: number }).radius, e: { lightIntensity: 0.8, lightAngle: 0, ...o.e } }));
  return { disp, frost, light, light2 };
})();

export const GlassSweep: StoryObj<{ sheet: keyof typeof sweepSheets }> = {
  name: 'Glass sweep (measurement)',
  parameters: { layout: 'fullscreen' },
  args: { sheet: 'disp' },
  render: ({ sheet }) => {
    const panels = sweepSheets[sheet];
    const size = { disp: [1200, 900], frost: [1200, 200], light: [1200, 520], light2: [1200, 280] }[sheet];
    const ramps = sheet === 'disp'
      ? [0, 1, 2, 3].map((r) => `linear-gradient(to bottom, #000, #fff) 0 ${10 + r * 170}px / 100% 160px no-repeat`).join(', ') + ', #808080'
      : sheet === 'frost' ? 'linear-gradient(#fff 0 100px, #000 100px 200px)' : '#808080';
    return (
      <div data-probe="sweep" style={{ position: 'relative', width: size[0], height: size[1], overflow: 'hidden', background: ramps }}>
        <style>{'[data-probe] [data-surface="liquid"] { background: transparent !important; box-shadow: none !important; } [data-probe] [data-surface="liquid"]::before, [data-probe] [data-surface="liquid"]::after { display: none; }'}</style>
        {panels.map((p) => (
          <LiquidGlass key={p.k} variant="clear" tint="none" radius={p.radius ?? 28} effect={{ ...base, ...p.e }}
            style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h }} />
        ))}
      </div>
    );
  },
};
