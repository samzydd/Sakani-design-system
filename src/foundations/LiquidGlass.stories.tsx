import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { House, Inbox, ListChecks, Settings, Bold, Italic, Underline, Link2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { LiquidGlass } from '../lib/LiquidGlass';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { Sidebar } from '../components/Sidebar';
import { SidebarSearch } from '../components/SidebarSearch';
import { SidebarItem } from '../components/SidebarItem';
import { Modal } from '../components/ApplicationComponents/Modal';

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
