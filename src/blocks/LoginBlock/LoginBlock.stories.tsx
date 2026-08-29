import type { Meta, StoryObj } from '@storybook/react';
import { LoginBlock, type LoginSocialProvider } from './LoginBlock';

/** Generic placeholder marks -- Figma's own reference uses real
 * Google/Apple/GitHub logos, which this component deliberately doesn't
 * ship or reproduce (see LoginBlock.tsx). `socialProviders` is just a
 * consumer-supplied slot in real usage, same pattern as StockMarket's logo. */
const badge = (letter: string) => (
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', background: '#141414', color: '#fff', fontSize: 10, fontWeight: 600 }}>
    {letter}
  </span>
);

const socialProviders: LoginSocialProvider[] = [
  { icon: badge('G'), label: 'Continue with Google' },
  { icon: badge('A'), label: 'Continue with Apple' },
  { icon: badge('H'), label: 'Continue with GitHub' },
];

const meta = {
  title: 'Blocks/Authentication/Login',
  component: LoginBlock,
  tags: ['autodocs'],
  args: { socialProviders },
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof LoginBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ValidationError: Story = { args: { initialStatus: 'validation-error', initialEmail: 'sam@sakani' } };
export const ServerError: Story = { args: { initialStatus: 'server-error' } };
export const Loading: Story = { args: { initialStatus: 'loading' } };
export const Skeleton: Story = { args: { initialStatus: 'skeleton' } };

export const DarkMode: Story = {
  args: { initialStatus: 'server-error' },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
