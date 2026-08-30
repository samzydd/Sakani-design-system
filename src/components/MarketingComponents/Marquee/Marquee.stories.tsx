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
