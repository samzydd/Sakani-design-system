import type { Meta, StoryObj } from '@storybook/react';
import { JobListing } from './JobListing';

const meta = {
  title: 'Marketing/Job Listing',
  component: JobListing,
  tags: ['autodocs'],
} satisfies Meta<typeof JobListing>;

export default meta;
type Story = StoryObj<typeof meta>;

const base = {
  title: 'Senior Product Designer',
  description: 'Lead end-to-end product design from discovery through delivery, shaping intuitive experiences that drive business impact.',
  department: 'Design',
  employmentType: 'Full-time',
  location: 'Remote — Worldwide',
};

export const Card: Story = { args: { ...base, layout: 'card' } };
export const Row: Story = { args: { ...base, layout: 'row' } };

export const DarkMode: Story = {
  args: { ...base, layout: 'card' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
