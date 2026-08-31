import type { Meta, StoryObj } from '@storybook/react';
import { ChatInterfaceBlock } from './ChatInterfaceBlock';

const meta = {
  title: 'Blocks/Chat/Desktop Chat Interface',
  component: ChatInterfaceBlock,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file and edit
it: change the nav groups, swap the conversations, edit the thread.

Architecture (read from the Figma block, 1440x930):

\`\`\`
app sidebar (240 / 64 collapsed)         main
├─ SidebarHeader (brand + toggle)        ├─ TopBar type="minimal" "Messages"
├─ search Input                          └─ content
├─ nav group x3 (label + items)             ├─ header row
└─ Settings / Contact support               │   ├─ SegmentedControl (240)
                                             │   └─ TopBar type="chat" (avatar,
                                             │       name, presence, actions)
                                             └─ panes
                                                 ├─ conversation list (240)
                                                 └─ chat card (radius 24,
                                                     bg/surface) → thread +
                                                     ChatComposer
\`\`\`

States:
- **default** — expanded sidebar, conversation open
- **collapsed** — 64px icon rail; the main area reclaims the width
- **empty** — no conversation selected, the chat header row is hidden` } }, layout: 'fullscreen' },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'collapsed', 'empty'] },
  },
} satisfies Meta<typeof ChatInterfaceBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { state: 'default' } };
export const CollapsedSidebar: Story = { args: { state: 'collapsed' } };
export const NoConversation: Story = { args: { state: 'empty' } };
export const DarkMode: Story = {
  args: { state: 'default' },
  decorators: [(S) => (<div className="dark"><S /></div>)],
};

