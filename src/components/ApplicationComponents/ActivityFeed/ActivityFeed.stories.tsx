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
  parameters: { docs: { description: { component: `Timeline of recent activity. Matches Figma "Activity Feed":
- **Style: Default** — icon-in-circle rail with a connector stub between dots, content wraps onto multiple lines if long. | Compact — avatar-led single-line row, timestamp right-aligned.

Figma's latest update highlights more than just the actor: the specific
object being acted on (a doc name, a file, a quoted task title) is also
colored fg/default within an otherwise fg/muted sentence, while the verb
connecting them ("commented on", "uploaded", "marked") stays muted. Since
which words get highlighted is per-item and doesn't follow a rule (compare
"uploaded 3 [files to Assets]" vs. "edited the [Pricing Table]"), that
can't be derived from a plain string -- \`description\` accepts ReactNode
instead, and the exported \`ActivityFeedHighlight\` wraps whichever span the
caller wants colored.` } } },
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
