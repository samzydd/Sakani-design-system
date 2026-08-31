import type { Meta, StoryObj } from '@storybook/react';
import { Megaphone } from 'lucide-react';
import { SidebarPromo } from './SidebarPromo';

const meta = {
  title: 'Composite/Sidebar/Promo',
  component: SidebarPromo,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Upsell / announcement card. Matches Figma "Sidebar Promo": Type (Upgrade | Announcement).

Figma spec (read from the component):
- card: brand/subtle bg + brand/subtle border, radius-md (8), padding 14, gap 8
- head row: leading icon (brand/fg), title label/sm-strong (brand/fg), dismiss x (fg/subtle)
- description: body/2xs (fg/muted)
- CTA: FULL-WIDTH button, accent/default fill, fg/on-accent label, radius-sm` } } },
  args: { title: 'Upgrade to Pro', description: 'Unlock unlimited projects and advanced analytics.', ctaLabel: 'Upgrade', onDismiss: () => {} },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarPromo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Upgrade: Story = { args: { type: 'upgrade' } };
export const Announcement: Story = { args: { type: 'announcement', title: "What's new", description: 'Check out the latest features in this release.', icon: Megaphone, ctaLabel: undefined } };

/** Dark mode — parts sit on a sidebar surface; .dark flips the token layer. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ width: 248, padding: 12, background: 'var(--color-bg-surface)' }}>
      <S />
    </div>
  )],
};
