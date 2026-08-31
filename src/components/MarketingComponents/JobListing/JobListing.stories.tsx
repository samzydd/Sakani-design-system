import type { Meta, StoryObj } from '@storybook/react';
import { JobListing } from './JobListing';

const meta = {
  title: 'Marketing/Job Listing',
  component: JobListing,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Job Listing" (Marketing primitives set, 2 styles: Card,
Row). \`layout\` stays a real, explicit prop (Figma's own axis) -- a
genuine layout choice:
- **'card'** — bg/surface + border/subtle + radius/lg card chrome, column layout, "Apply now" on its own row below the meta.
- **'row'** — no card chrome at all (Figma's own Row preview has none), horizontal layout with the title/description/meta column on the left (flex:1) and "Apply now" aligned to the bottom-right.

Department pill reuses the shared Badge (accent/subtle); employment
type pill reuses Badge (neutral/subtle, its default). "Apply now"
reuses the shared Button (variant="secondary", size="sm" -- bg/subtle
+ fg/default is an exact match here, same as
BlogListingFeaturedCard's own "Read article").

The location line reuses the shared LocationDot component (also
Marketing primitives) rather than a local dot+label -- broken out into
its own component specifically so any marketing component needing a
location can reuse it instead of re-implementing the pattern.` } } },
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
