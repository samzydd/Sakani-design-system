import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Composite/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 480 }}><S /></div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="What is Sakani?" defaultOpen>
        A token-driven React design system for SaaS products.
      </AccordionItem>
      <AccordionItem title="Is it open source?">
        Yes — it is MIT licensed and available on GitHub.
      </AccordionItem>
      <AccordionItem title="Does it support dark mode?">
        Dark mode is built in via the semantic token layer.
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Click to expand">Hidden content revealed on click.</AccordionItem>
    </Accordion>
  ),
};
