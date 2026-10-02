import type { Meta, StoryObj } from '@storybook/react';
import { LiquidDashboardBlock } from './LiquidDashboardBlock';
import backdrop from '../../assets/marketing/liquid-dashboard-backdrop.jpg';
import account from '../../assets/avatars/liquid-dashboard-account.png';
import emily from '../../assets/avatars/liquid-dashboard-emily-johnson.png';
import michael from '../../assets/avatars/liquid-dashboard-michael-evans.png';
import sarah from '../../assets/avatars/liquid-dashboard-sarah-williams.png';

const args = {
  backgroundImage: backdrop,
  accountAvatar: account,
  people: { emily, michael, sarah },
};

const meta = {
  title: 'Blocks/Application/Liquid Glass Dashboard',
  component: LiquidDashboardBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A full dashboard on a photograph, built with Sakani's Liquid Glass.

Matches Figma "Dashboard • Liquid" (node 2409:26078). Three layers, in this order:

1. **Background** — the photo, as a \`<LiquidBackdrop>\` (the \`backgroundImage\` prop). Every lens inside refracts
   the photo itself, aligned to the pixel, so glass on glass still bends real detail, as in Figma. Its veil is
   Figma's 5% overlay fill (a scrim in dark mode), seen by every lens.
2. **Overlay** — one full-size \`<LiquidGlass variant="regular" radius={0}>\`: the frosted sheet the chrome sits on.
3. **Product UI** — the sidebar and top bar sit on the overlay with no fills of their own
   (\`data-surface="liquid"\`); the main panel is a second sheet of glass at 76% tint; the cards on it stay
   solid so the data stays crisp.

The **active** sidebar item has its own clear-glass lens and only moves when another item is clicked; it
springs to the new item and stretches along the way, like a droplet. A second, softer lens follows hover and
keyboard focus without changing what is active.

Refraction renders in Chromium (Chrome, Edge). Safari and Firefox get the frosted fallback with the same
rim and depth. With reduced transparency it becomes opaque; with reduced motion the glide and squish stop.

A COMPOSITION EXAMPLE, not a configurable component. Copy this folder into your project and edit it
directly: swap the sample data, nav and charts.` } }, layout: 'fullscreen' },
  decorators: [(S) => <div style={{ height: '100vh' }}><S /></div>],
  args,
} satisfies Meta<typeof LiquidDashboardBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ height: '100vh', background: 'var(--color-bg-canvas)' }}><S /></div>],
};
