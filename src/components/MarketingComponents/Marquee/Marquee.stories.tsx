import type { Meta, StoryObj } from '@storybook/react';
import { Marquee } from './Marquee';
import vercel from '../../../assets/marketing/brands/vercel.svg';
import netlify from '../../../assets/marketing/brands/netlify.svg';
import github from '../../../assets/marketing/brands/github.svg';
import figma from '../../../assets/marketing/brands/figma.svg';
import notion from '../../../assets/marketing/brands/notion.svg';
import linear from '../../../assets/marketing/brands/linear.svg';
import stripe from '../../../assets/marketing/brands/stripe.svg';
import docker from '../../../assets/marketing/brands/docker.svg';

const meta = {
  title: 'Marketing/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Marquee" (Marketing primitives set, 2 content previews:
Logos, Text). Figma's own mock is a static frame, but a marquee by
definition scrolls -- same reasoning Ticker already established in
this library -- so this renders a genuine infinite horizontal loop:
the item row is duplicated back-to-back, and the visible copy is
translated by exactly one copy's own measured width (via
ResizeObserver) before wrapping back to 0 for a seamless loop.

\`content\` is NOT a manual style prop: Logos vs. Text are just two
different sets of consumer-supplied \`items\` (ReactNode, not a fixed
shape) -- a brand icon or a text fragment are both just children to
this component, so it stays fully content-agnostic, same reasoning
LoginBlock gives for keeping its own social-icon slot consumer-
supplied rather than hardcoding brand marks into the library itself.
\`gap\` is exposed separately since Figma's own two previews use a
genuinely different value (32px logos, 12px text) that has nothing to
do with the content's own shape.

Unlike Ticker (which pauses outright on hover via a CSS animation-
play-state toggle), this slows to 20% of its normal speed on hover
rather than stopping -- and that ruled out a CSS @keyframes animation
entirely: swapping \`animation-duration\` on a *running* CSS animation
doesn't preserve its visual position, because progress is computed as
elapsed-time / duration -- jump the duration up 5x mid-flight and the
same elapsed time suddenly reads as a much earlier point in the loop,
which looked like the marquee "restarting from the beginning" on
hover (confirmed bug, not a one-off glitch). Fixed by driving the
scroll with a manual tick loop instead: a plain mutable position (in
a ref, not React state, so a hover doesn't even trigger a re-render)
accumulates by \`speed * deltaTime\` every tick and is applied straight
to \`transform: translateX\`, wrapping modulo the row's own width for
the loop. Changing \`speed\` between ticks (hover in/out, read from a
ref) just changes the per-tick increment going forward -- the
position itself is never recomputed from scratch, so there is no
jump, only a smooth change in rate exactly where the scroll already
was. \`prefers-reduced-motion\` skips starting the loop at all, same
intent as Ticker's own CSS media-query disable.

The loop uses setTimeout, not requestAnimationFrame: real elapsed
time (via performance.now()) still drives the per-tick distance, so
motion is smooth regardless of the exact fire interval -- rAF is
throttled or fully suspended in some embedded/backgrounded contexts
in ways setTimeout isn't, and there's no vsync-sync benefit worth
trading away for a slow, decorative horizontal scroll.` } } },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

const brands = [
  { name: 'Vercel', src: vercel },
  { name: 'Netlify', src: netlify },
  { name: 'GitHub', src: github },
  { name: 'Figma', src: figma },
  { name: 'Notion', src: notion },
  { name: 'Linear', src: linear },
  { name: 'Stripe', src: stripe },
  { name: 'Docker', src: docker },
];

export const Logos: Story = {
  args: {
    gap: 32,
    items: brands.map((b) => <img key={b.name} src={b.src} alt={b.name} width={24} height={24} />),
  },
};

const textItems = [
  'Open source', '·', 'Figma-to-code parity', '·', 'MIT licensed', '·', '60+ components', '·', 'Full state coverage',
];

export const Text: Story = {
  args: {
    gap: 12,
    items: textItems.map((t, i) => <span key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: '20px', fontWeight: 600, color: 'var(--color-fg-muted)', whiteSpace: 'nowrap' }}>{t}</span>),
  },
};

export const DarkMode: Story = {
  args: {
    gap: 32,
    items: brands.map((b) => <img key={b.name} src={b.src} alt={b.name} width={24} height={24} />),
  },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
