/**
 * Button.stories.tsx
 *
 * Storybook stories for the Button component.
 * These are your visual review surface — compare each story against
 * the corresponding variant in Figma while Storybook runs in the browser.
 *
 * Run Storybook: npm run storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/* ─── Meta ───────────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],

  /*
   * argTypes defines the controls panel in Storybook.
   * Each entry maps to a prop on the Button component.
   */
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'Visual style of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size — sm (32px) / md (40px) / lg (48px)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button (maps to Figma State=Disabled)',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state — disables interaction and sets aria-busy',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },

  /* Default args shared by all stories unless overridden */
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Variants ───────────────────────────────────────────────────────────────── */

/** Figma: Variant=Primary — the default action button. */
export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

/** Figma: Variant=Secondary — lower-emphasis action. */
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

/** Figma: Variant=Outline — bordered, no fill. */
export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

/** Figma: Variant=Ghost — no border, no background. Inline-ish. */
export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

/** Figma: Variant=Destructive — irreversible / dangerous actions. */
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete account' },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

/** Figma: Size=sm — 32px target height. */
export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

/** Figma: Size=md — 40px target height. */
export const Medium: Story = {
  args: { size: 'md', children: 'Medium' },
};

/** Figma: Size=lg — 48px target height. */
export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

/** Figma: State=Disabled — rendered at opacity/60. */
export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

/** Loading state — disables button and sets aria-busy. */
export const Loading: Story = {
  args: { loading: true, children: 'Saving…' },
};

/* ─── Icon slots ─────────────────────────────────────────────────────────────── */

/**
 * With left icon — pass any ReactNode.
 * In your projects use a Lucide icon at 16px for sm/md, 18px for lg.
 * This story uses a plain SVG arrow to avoid adding a dependency here.
 */
export const WithLeftIcon: Story = {
  args: {
    children: 'Download',
    leftIcon: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
};

/** With right icon — e.g. an arrow indicating navigation. */
export const WithRightIcon: Story = {
  args: {
    variant: 'outline',
    children: 'Continue',
    rightIcon: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
};

/* ─── All variants at a glance ───────────────────────────────────────────────── */

/**
 * Full variant matrix — useful for a quick side-by-side review against Figma.
 * Each button in this row maps to one Figma variant in the same left-to-right order.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

/**
 * All sizes at a glance.
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * Dark mode preview — wrap in a .dark class to activate the dark semantic tokens.
 * Flip your Figma frame to Dark mode and compare.
 */
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{
          padding: '24px',
          background: 'var(--color-bg-canvas)',
          borderRadius: '12px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </>
  ),
};
