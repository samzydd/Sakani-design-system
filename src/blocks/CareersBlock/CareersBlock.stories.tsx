import type { Meta, StoryObj } from '@storybook/react';
import { CareersBlock } from './CareersBlock';

const meta = {
  title: 'Blocks/Marketing/Careers',
  component: CareersBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CareersBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Careers',
    title: 'Come build with us',
    subtitle: "We're a small, remote-friendly team. Here's what's open right now.",
    jobs: [
      {
        title: 'Senior Product Designer',
        description: 'Lead end-to-end product design from discovery through delivery, shaping intuitive experiences that drive business impact.',
        department: 'Design',
        employmentType: 'Full-time',
        location: 'Lagos, Nigeria',
        locationStatus: 'active',
      },
      {
        title: 'Staff Engineer, Design Systems',
        description: 'Own the architecture of our component library and drive Figma-to-code parity across the product.',
        department: 'Engineering',
        employmentType: 'Full-time',
        location: 'Remote — Worldwide',
        locationStatus: 'remote',
      },
      {
        title: 'Content Marketing Lead',
        description: 'Shape the voice and editorial strategy behind our blog, docs, and product launches.',
        department: 'Marketing',
        employmentType: 'Full-time',
        location: 'Lagos, Nigeria',
        locationStatus: 'active',
      },
    ],
  },
};

export const DarkMode: Story = {
  args: Default.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
