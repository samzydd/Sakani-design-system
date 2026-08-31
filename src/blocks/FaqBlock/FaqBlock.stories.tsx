import type { Meta, StoryObj } from '@storybook/react';
import { FaqBlock } from './FaqBlock';

const meta = {
  title: 'Blocks/Marketing/FAQ',
  component: FaqBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file
into your project and edit it directly.

Matches Figma "FAQ" (node 1513:27978, 2 layouts: Single, Two-Column).
Composed entirely from existing components -- SectionHeading (eyebrow
"FAQ", no subtitle in either Figma layout) + the shared Accordion/
AccordionItem (already a real, interactive open/close implementation,
unlike Figma's own static Open/Closed state toggle).

\`columns\` stays a real, explicit prop (1 default, matching "Single"; 2
matches "Two-Column") -- both Figma layouts use the exact same 6
questions, split 3/3 across columns only when columns=2, so column
count genuinely isn't derivable from \`items\` the way e.g.
FeatureGridBlock's own column count is from its feature list length.
When \`items.length\` isn't evenly divisible by 2, the first (odd) half
gets the extra item, matching how Figma's own 6-item split works.` } }, layout: 'fullscreen' },
} satisfies Meta<typeof FaqBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    question: 'Is Sakani free to use?',
    answer: 'Yes — Sakani is fully open source under the MIT license. Use it in personal or commercial projects at no cost.',
    defaultOpen: true,
  },
  {
    question: 'Do I need Tailwind or Radix to use it?',
    answer: 'No. Sakani ships with its own CSS Modules and token layer, so it works independently of any other styling framework.',
  },
  {
    question: 'How closely does Figma match the code?',
    answer: 'Every component, variant, and state in Figma has a 1:1 counterpart in the React library, down to spacing and color tokens.',
  },
  {
    question: 'Can I customize the design tokens?',
    answer: 'Yes — every color, spacing, and radius value is a CSS variable. Override them once and the whole system updates.',
  },
  {
    question: 'Is it accessible?',
    answer: 'Accessibility is an active focus area — see our roadmap for the current state of keyboard and screen-reader support.',
  },
  {
    question: 'How do I contribute?',
    answer: 'Sakani is open source on GitHub — issues and pull requests are welcome.',
  },
];

const args = {
  eyebrow: 'FAQ',
  title: 'Frequently asked questions',
  items,
};

export const Single: Story = {
  args: { ...args, columns: 1 },
};

export const TwoColumn: Story = {
  args: { ...args, columns: 2 },
};

export const DarkMode: Story = {
  args: { ...args, columns: 2 },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
