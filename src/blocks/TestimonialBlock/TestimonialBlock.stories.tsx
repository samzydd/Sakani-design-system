import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialBlock } from './TestimonialBlock';
import amara from '../../assets/marketing/testimonial-amara-kalu.jpg';
import ravi from '../../assets/marketing/testimonial-ravi-menon.jpg';
import chidi from '../../assets/marketing/testimonial-chidi-duru.jpg';
import jade from '../../assets/marketing/testimonial-jade-silva.jpg';

const meta = {
  title: 'Blocks/Marketing/Testimonial',
  component: TestimonialBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TestimonialBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    testimonials: [
      {
        quote: 'Sakani cut our design-to-dev handoff time in half. Every component already matches what ships — no more guessing at spacing or states.',
        authorName: 'Amara Kalu',
        authorRole: 'Head of Product, Fintra',
        authorAvatar: amara,
      },
    ],
  },
};

export const Grid: Story = {
  args: {
    testimonials: [
      {
        quote: 'The state coverage alone saved us weeks — every error and loading case was already thought through.',
        authorName: 'Ravi Menon',
        authorRole: 'Founder, Loopline',
        authorAvatar: ravi,
      },
      {
        quote: 'Figma and code finally stay in sync. No more components drifting apart after a sprint.',
        authorName: 'Chidi Duru',
        authorRole: 'Design Lead, Bexa',
        authorAvatar: chidi,
      },
      {
        quote: 'We shipped our MVP in three weeks using Sakani blocks instead of building from scratch.',
        authorName: 'Jade Silva',
        authorRole: 'Engineer, Northstack',
        authorAvatar: jade,
      },
    ],
  },
};

export const DarkMode: Story = {
  args: Grid.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
