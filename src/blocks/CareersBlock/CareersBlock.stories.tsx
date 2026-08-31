import type { Meta, StoryObj } from '@storybook/react';
import { CareersBlock } from './CareersBlock';

const meta = {
  title: 'Blocks/Marketing/Careers',
  component: CareersBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire "Apply now" to your real ATS/
application flow in place of the callback here.

Matches Figma "Careers". Composed entirely from existing
library components -- SectionHeading (Marketing, the "Careers" eyebrow
+ title + subtitle) and JobListing (Marketing, layout="row", already
covering the row's own title/description/meta-badges/LocationDot/
Apply-button treatment) -- no new visual primitives, this block is
purely heading + a bordered list of rows.

The border between rows, the row's own 24px padding, and overriding
JobListing's own max-width:480px (a standalone-usage default, far
narrower than this block's actual row width) are all owned by this
block -- JobListing's "row" layout intentionally has no chrome at all
by design, meant to be dropped into whatever list context needs it.
The divider border applies to every row except the first, matching
Figma's own list export.` } }, layout: 'fullscreen' },
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
