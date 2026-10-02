import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { House, Inbox, ListChecks, Settings, Copy, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Menu, MenuDivider } from '../components/Menu';
import { MenuItem } from '../components/MenuItem';
import { Sidebar } from '../components/Sidebar';
import { SidebarSearch } from '../components/SidebarSearch';
import { SidebarItem } from '../components/SidebarItem';
import { Modal } from '../components/ApplicationComponents/Modal';

/**
 * Glass pilot: the Surface layer (Solid | Glass) on six components --
 * Button, Input, Card, Menu, Modal, Sidebar (+ SidebarSearch/SidebarItem).
 *
 * Glass only reads as glass over something with color and detail behind it;
 * on the flat canvas it looks almost identical to Solid. So every cell sits
 * on the same busy gradient backdrop.
 */
const meta = {
  title: 'Foundations/Glass (pilot)',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const backdrop = (dark: boolean): React.CSSProperties => ({
  position: 'relative',
  padding: 24,
  borderRadius: 16,
  overflow: 'hidden',
  background: dark
    ? `radial-gradient(40% 50% at 15% 20%, #FF4700 0%, transparent 70%),
       radial-gradient(45% 55% at 85% 25%, #7B4BD9 0%, transparent 70%),
       radial-gradient(50% 60% at 60% 90%, #2E90FA 0%, transparent 70%),
       #0F0E0C`
    : `radial-gradient(40% 50% at 15% 20%, #FF8A57 0%, transparent 70%),
       radial-gradient(45% 55% at 85% 25%, #B49AF0 0%, transparent 70%),
       radial-gradient(50% 60% at 60% 90%, #7CC0FF 0%, transparent 70%),
       #FFF4EC`,
});

/* A few shapes with hard edges, so the blur is visible (a smooth gradient
   looks the same blurred or not). */
const Shapes = () => (
  <>
    <div style={{ position: 'absolute', top: 40, left: 150, width: 90, height: 90, borderRadius: 999, background: '#FF4700' }} />
    <div style={{ position: 'absolute', top: 210, left: 330, width: 140, height: 44, borderRadius: 12, background: '#12B76A', transform: 'rotate(-12deg)' }} />
    <div style={{ position: 'absolute', bottom: 30, right: 60, width: 70, height: 70, background: '#141414', transform: 'rotate(18deg)' }} />
  </>
);

const Composition = () => (
  <div style={{ position: 'relative', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
    {/* The radius goes on the Sidebar itself: a backdrop-filter isn't clipped
        by an ancestor's rounded overflow, so a rounded wrapper leaves square
        frosted corners poking out. */}
    <style>{'.glassDemoSidebar { border-radius: 12px; }'}</style>
    <div style={{ height: 300 }}>
      <Sidebar className="glassDemoSidebar">
        <SidebarSearch type="command" placeholder="Search…" />
        <SidebarItem icon={House} label="Home" />
        <SidebarItem icon={Inbox} label="Inbox" badge="12" active />
        <SidebarItem icon={ListChecks} label="Tasks" />
        <SidebarItem icon={Settings} label="Settings" />
      </Sidebar>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Card title="Invite teammates" description="They'll get an email with a link to join.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input placeholder="name@company.com" leadingIcon={<Search size={16} />} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button size="sm">Send</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
            <Button size="sm" variant="outline">Outline</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
          </div>
        </div>
      </Card>
      <Menu minWidth={200}>
        <MenuItem icon={<Copy size={16} />} shortcut="⌘C">Duplicate</MenuItem>
        <MenuItem icon={<Pencil size={16} />}>Rename</MenuItem>
        <MenuDivider />
        <MenuItem icon={<Trash2 size={16} />} state="destructive">Delete</MenuItem>
      </Menu>
    </div>
  </div>
);

const Cell = ({ dark, surface }: { dark: boolean; surface: 'solid' | 'glass' }) => (
  <div className={dark ? 'dark' : undefined} data-surface={surface} style={backdrop(dark)}>
    <Shapes />
    <p style={{ position: 'relative', margin: '0 0 12px', font: '600 12px var(--font-sans)', letterSpacing: '0.04em', color: dark ? '#FAFAF9' : '#141414' }}>
      {dark ? 'DARK' : 'LIGHT'} · {surface.toUpperCase()}
    </p>
    <Composition />
  </div>
);

/** Solid (today) next to Glass, in light and dark, over the same backdrop. */
export const SideBySide: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, max-content)', gap: 20, padding: 24 }}>
      <Cell dark={false} surface="solid" />
      <Cell dark={false} surface="glass" />
      <Cell dark surface="solid" />
      <Cell dark surface="glass" />
    </div>
  ),
};

const ModalDemo = ({ dark }: { dark: boolean }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={dark ? 'dark' : undefined} data-surface="glass" style={{ ...backdrop(dark), minHeight: 360 }}>
      <Shapes />
      <div style={{ position: 'relative' }}>
        <Button onClick={() => setOpen(true)}>Open glass modal</Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Archive this project?"
        description="It will move to Archive. You can restore it any time."
        confirmLabel="Archive"
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
};

/** Modal portals to <body>; it carries the glass scope with it (usePortalSurface). */
export const ModalLight: Story = { render: () => <div style={{ padding: 24 }}><ModalDemo dark={false} /></div> };
export const ModalDark: Story = { render: () => <div style={{ padding: 24 }}><ModalDemo dark /></div> };
