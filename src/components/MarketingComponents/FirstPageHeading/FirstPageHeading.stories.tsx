import type { Meta, StoryObj } from '@storybook/react';
import { FirstPageHeading } from './FirstPageHeading';
import avatar1 from '../../../assets/avatars/activity-amara-kalu.jpg';
import avatar2 from '../../../assets/avatars/activity-chidi-duru.jpg';
import avatar3 from '../../../assets/avatars/activity-jade-silva.jpg';

const meta = {
  title: 'Marketing/First Page Heading',
  component: FirstPageHeading,
  tags: ['autodocs'],
} satisfies Meta<typeof FirstPageHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

const avatars = [
  { src: avatar1, alt: 'Amara Kalu' },
  { src: avatar2, alt: 'Chidi Duru' },
  { src: avatar3, alt: 'Jade Silva' },
];

const shared = {
  badgeLabel: 'Features',
  title: 'Documentation',
  description: 'Everything you need to install, customize, and ship with Sakani.',
  primaryCta: { label: 'Get started' },
  secondaryCta: { label: 'Watch demo' },
  avatars,
  avatarsCaption: '21.3K happy users',
};

export const Center: Story = { args: { ...shared, align: 'center' } };
export const Left: Story = { args: { ...shared, align: 'left' } };

export const MinimalCenter: Story = {
  args: {
    title: 'Documentation',
    description: 'Everything you need to install, customize, and ship with Sakani.',
    align: 'center',
  },
};

export const DarkMode: Story = {
  args: { ...shared, align: 'center' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
