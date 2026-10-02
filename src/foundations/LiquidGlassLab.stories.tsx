import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { House, Inbox, ListChecks, Settings } from 'lucide-react';
import { type LiquidGlassEffect, LiquidGlass, LiquidBackdrop } from '../lib/LiquidGlass';
import { Button } from '../components/Button';
import { Sidebar } from '../components/Sidebar';
import { SidebarItem } from '../components/SidebarItem';
import { Card } from '../components/Card';
import balloons from '../assets/marketing/blog-image-balloons.jpg';

/**
 * Lab — the tools used to match Figma's Glass effect: a calibration grid, the
 * probe sheets that measured each property, the photo recipe, and the frosted
 * fallback side by side with refraction.
 */
const meta = {
  title: 'Foundations/Liquid Glass/Lab',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

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
 * Photo backdrop — the three-layer recipe from the Figma documentation:
 *   1. Background: the photo, as a <LiquidBackdrop>, so every lens refracts it.
 *   2. Overlay: one full-size <LiquidGlass variant="regular" radius={0}> sheet.
 *   3. Components above it inside data-surface="liquid"; content to be read (the
 *      data card) keeps its solid surface.
 */
export const PhotoBackdrop: StoryObj = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <LiquidBackdrop src={balloons} style={{ position: 'relative', width: 1000, height: 620, overflow: 'hidden' }}>
      <LiquidGlass variant="regular" tint="subtle" radius={0} style={{ position: 'absolute', inset: 0 }} />
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
          <div data-surface="solid"><Card title="Revenue" description="Solid surface for data"><Button size="sm">View report</Button></Card></div>
          <div style={{ display: 'flex', gap: 8 }}><Button variant="secondary" size="sm">Export</Button><Button size="sm">Share</Button></div>
        </div>
      </div>
    </LiquidBackdrop>
  ),
};

/** What Safari and Firefox show (no SVG filters on the backdrop): the frosted
 *  fallback with a CSS rim, next to the refracting lens, over the same photo. */
export const Fallback: StoryObj = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <LiquidBackdrop src={balloons} position="center 30%" style={{ position: 'relative', width: 1000, height: 560, overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
      {(['auto', 'off'] as const).map((r, i) => (
        <LiquidGlass key={r} variant="clear" radius={32} refraction={r}
          style={{ position: 'absolute', left: 120 + i * 420, top: 150, width: 340, height: 220, display: 'grid', placeItems: 'center', color: '#fff', font: '600 15px/20px var(--font-sans)' }}>
          {r === 'auto' ? 'Refraction (Chromium)' : 'Fallback (Safari, Firefox)'}
        </LiquidGlass>
      ))}
    </LiquidBackdrop>
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
