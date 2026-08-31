import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingBag, Zap, Coffee, Grid3x3 } from 'lucide-react';
import { Expenses } from './Expenses';

const categories = [
  { icon: <ShoppingBag size={20} strokeWidth={1.5} />, label: 'Shopping', amount: 840.20 },
  { icon: <Zap size={20} strokeWidth={1.5} />, label: 'Utilities', amount: 620.10 },
  { icon: <Coffee size={20} strokeWidth={1.5} />, label: 'Food & drink', amount: 480.50 },
  { icon: <Grid3x3 size={20} strokeWidth={1.5} />, label: 'Entertainment', amount: 310.99 },
];

const meta = {
  title: 'Application/Expenses',
  component: Expenses,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Spending-by-category list. Matches Figma "Expenses":
- **Default** — icon + label + amount, with an 8px bar underneath each row sized relative to the largest category in the list
- **Compact** — the same rows with the bars omitted

Unlike most of this Application set, the variant here isn't derivable
from the data -- both styles use exactly the same rows, so it's a real
display-density toggle, not a data-driven state.

The bar reuses the existing Progress component (size="lg" is Figma's
exact 8px track height, fill already binds to accent/default) rather
than a bespoke one -- accepting its bg/subtle track over Figma's literal
bg/canvas here, since the two are barely distinguishable off-whites and
Progress has no style-override escape hatch to fix that without either
fighting CSS cascade order or forking the component for one token.` } } },
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact'] },
  },
  args: { categories },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
} satisfies Meta<typeof Expenses>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { variant: 'compact' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 360, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
