import type { Meta, StoryObj } from '@storybook/react';
import { MessageCircle, Upload, Pencil, CircleCheck } from 'lucide-react';
import { ActivityFeed, ActivityFeedHighlight } from './ActivityFeed';
import amaraKalu from '../../../assets/avatars/activity-amara-kalu.jpg';
import chidiDuru from '../../../assets/avatars/activity-chidi-duru.jpg';
import jadeSilva from '../../../assets/avatars/activity-jade-silva.jpg';
import raviMenon from '../../../assets/avatars/activity-ravi-menon.jpg';

const items = [
  {
    actor: 'Amara Kalu',
    description: <>commented on <ActivityFeedHighlight>Design Review</ActivityFeedHighlight></>,
    timestamp: '2m ago',
    icon: <MessageCircle />,
    avatarSrc: amaraKalu,
  },
  {
    actor: 'Chidi Duru',
    description: <>uploaded 3 <ActivityFeedHighlight>files to Assets</ActivityFeedHighlight></>,
    timestamp: '1h ago',
    icon: <Upload />,
    avatarSrc: chidiDuru,
  },
  {
    actor: 'Jade Silva',
    description: <>edited the <ActivityFeedHighlight>Pricing Table</ActivityFeedHighlight> component</>,
    timestamp: '3h ago',
    icon: <Pencil />,
    avatarSrc: jadeSilva,
  },
  {
    actor: 'Ravi Menon',
    description: <>marked <ActivityFeedHighlight>"Fix Table overflow"</ActivityFeedHighlight> as done</>,
    timestamp: 'Yesterday',
    icon: <CircleCheck />,
    avatarSrc: raviMenon,
  },
];

const meta = {
  title: 'Application/Activity Feed',
  component: ActivityFeed,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact'] },
  },
  args: { items },
  decorators: [(S) => <div style={{ width: 440 }}><S /></div>],
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { variant: 'compact' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 440, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
