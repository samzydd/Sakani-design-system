import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from './AvatarGroup';

const people = [
  { src: 'https://i.pravatar.cc/96?img=1', alt: 'A' },
  { src: 'https://i.pravatar.cc/96?img=2', alt: 'B' },
  { initials: 'SO', alt: 'Sam' },
  { src: 'https://i.pravatar.cc/96?img=4', alt: 'D' },
  { src: 'https://i.pravatar.cc/96?img=5', alt: 'E' },
  { initials: 'JK', alt: 'JK' },
];

const meta = {
  title: 'Core/Avatar Group',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
  args: { avatars: people, max: 4, size: 'md' },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithOverflow: Story = { args: { max: 3 } };
export const Large: Story = { args: { size: 'lg', max: 4 } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
