import type { Meta, StoryObj } from '@storybook/react';
import { CtaBannerBlock } from './CtaBannerBlock';

const meta = {
  title: 'Blocks/Marketing/CTA Banner',
  component: CtaBannerBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire the two actions to your real
signup/repo links in place of the callbacks here.

Matches Figma "CTA Banner" (node 1513:28017, 2 styles: Neutral,
Accent). \`variant\` stays a real, explicit prop (Figma's own axis,
renamed from "style" to avoid colliding with the DOM/React \`style\`
prop, same naming choice already made by Badge/FeaturedIcon) -- a
genuine visual choice, not derivable from the banner's own copy.

Both buttons reuse the shared Button component at size="lg" (Figma's
own 20/10px padding + 16px label here matches Button's lg preset far
more closely than its default md), but which VARIANT each one renders
is derived from \`variant\`, not a separate manual prop per button: on
'neutral' the primary action is Button variant="primary" (the usual
dark-accent treatment) and the secondary is variant="secondary"
(bg/subtle) -- but on 'accent' the banner's own background IS that
same dark accent color, so BOTH buttons switch to variant="secondary"
(bg/subtle) instead, or the primary action would vanish into its own
background. Confirmed from Figma's own Accent export, where neither
button is the usual dark "primary" -- both are the light bg/subtle
treatment.

The GitHub icon is a small local \`currentColor\` SVG (lucide-react
ships no brand icons in the version this library uses, same gap
already hit for ProfileCard's and TeamCard's own social marks) --
kept local to this block rather than a shared export, since blocks
are copy-paste composition examples, not part of the strict
component surface. Defaults to 16px: unlike Avatar/FeaturedIcon,
Button does NOT clone-resize whatever it's handed via leftIcon/
rightIcon -- the caller has to size the icon correctly itself.
Button's own doc comment claims lg wants an 18px icon, but that's
NOT what the actual CSS uses (the lg spinner stays at the same 16px
as md, only sm shrinks to 14px) -- confirmed empirically: a hardcoded
20px made this button measurably taller than its sibling (46px vs
42px), 18px still measured 2px taller (44px vs 42px), and only 16px
produces two buttons of identical height, since the flex row's own
height is driven by its tallest child.` } }, layout: 'fullscreen' },
} satisfies Meta<typeof CtaBannerBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  title: 'Ready to build faster?',
  description: 'Start with the free, open-source component library — no account required.',
  primaryAction: { label: 'Get started' },
  secondaryAction: { label: 'View on GitHub' },
  secondaryActionIcon: true,
};

export const Neutral: Story = { args: { ...args, variant: 'neutral' } };
export const Accent: Story = { args: { ...args, variant: 'accent' } };

export const DarkMode: Story = {
  args: { ...args, variant: 'neutral' },
  decorators: [(S) => <div className="dark"><S /></div>],
};
