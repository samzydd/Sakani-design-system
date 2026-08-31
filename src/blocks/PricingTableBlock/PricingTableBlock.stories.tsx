import type { Meta, StoryObj } from '@storybook/react';
import { PricingTableBlock } from './PricingTableBlock';

const meta = {
  title: 'Blocks/Marketing/Pricing Table',
  component: PricingTableBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire each plan's CTA to your real
checkout/contact flow in place of the callbacks here.

Matches Figma "Pricing Table" (node 1509:28031, 2 previews:
Tiers=2/3). The tier COUNT is fully derived from \`plans.length\`
(Figma's own axis name is just describing how many plans its two
examples happen to show, not an independent choice) -- but the two
examples also disagree on layout for that reason: 3 plans stretch
(flex:1) to fill the full row, while 2 plans are fixed-width (360px)
and centered instead of stretched edge-to-edge. Both behaviors are
kept, switched on \`plans.length <= 2\`, since an edge-to-edge stretch
of just 2 cards across a 1280px row would look sparse compared to
Figma's own deliberate choice to keep a 2-plan comparison narrower
and centered.

Which plan is "Most popular" is derived from that plan's own
\`highlighted: true\`, not a separate index/id lookup -- the elevated
shadow, accent border, "Most popular" badge, and switching its CTA
to Button variant="primary" (every other plan uses variant="outline")
all derive from that one flag. The header's own "Pricing" eyebrow
badge is accent/SOLID emphasis, not accent/subtle like every other
eyebrow badge elsewhere in this library (SectionHeading,
BlogListingFeaturedCard's "Featured") -- confirmed as this block's
own deliberately bolder treatment, not a copy-paste mismatch, since
both of Figma's own tier examples use the same solid badge here.

The non-highlighted CTA button is Button variant="outline" -- Figma's
own two examples actually disagree here too (the 2-tier export's
button is bg/subtle, matching variant="secondary"; the 3-tier
export's is bg/surface+border/subtle, closer to variant="outline"),
a real inconsistency between two separately-authored examples rather
than a deliberate difference. Resolved to variant="outline" (visually
near-identical to bg/subtle against this card's own white background,
and it's what the more detailed 3-tier export actually specifies).
The checkmark reuses lucide's Check icon (24px, fg/muted, matching
the feature label's own color) -- Figma names it just "Icons" with no
further spec, so no dedicated shared icon was warranted here.` } }, layout: 'fullscreen' },
} satisfies Meta<typeof PricingTableBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  eyebrow: 'Pricing',
  title: 'Simple, transparent pricing',
  subtitle: 'Choose the plan that fits how your team builds.',
};

export const ThreeTiers: Story = {
  args: {
    ...args,
    plans: [
      {
        name: 'Starter',
        price: '$0',
        period: '/month',
        description: 'For solo builders exploring the system.',
        ctaLabel: 'Get started',
        features: ['Up to 3 projects', 'Core components', 'Community support', 'MIT license'],
      },
      {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'For teams shipping product.',
        ctaLabel: 'Start free trial',
        highlighted: true,
        features: ['Unlimited projects', 'All components & blocks', 'Priority support', 'Figma team library', 'Early access to new blocks'],
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For organizations with advanced needs.',
        ctaLabel: 'Contact sales',
        features: ['Everything in Pro', 'Dedicated support', 'Custom theming', 'SLA & security review', 'Onboarding assistance'],
      },
    ],
  },
};

export const TwoTiers: Story = {
  args: {
    ...args,
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: '/month',
        description: 'Get started with the essentials.',
        ctaLabel: 'Get started',
        features: ['Core components', 'Community support', 'MIT license'],
      },
      {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'Unlock the full system.',
        ctaLabel: 'Start free trial',
        highlighted: true,
        features: ['All components & blocks', 'Priority support', 'Figma team library', 'Early access to new blocks'],
      },
    ],
  },
};

export const DarkMode: Story = {
  args: ThreeTiers.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
