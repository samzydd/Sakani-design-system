import type { Meta, StoryObj } from '@storybook/react';
import { OrderConfirmationBlock } from './OrderConfirmationBlock';
import mug from '../../assets/products/card-mug.jpg';

const items = [
  { image: mug, name: 'Ceramic Pour-Over Mug', variant: 'Color: Sand', price: 28 },
];

const meta = {
  title: 'Blocks/E-commerce/Order Confirmation',
  component: OrderConfirmationBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire the "Continue shopping"/"Track
order" actions to your real navigation in place of the no-op callbacks
here.

Matches Figma "Order Confirmation" (2 states: Default, With Tracking) --
same "derive from data" pattern used throughout this library (CartItem's
sale price, CheckoutFlowBlock's card brand badge): whether the tracking
row + "Track order" button render is fully driven by whether
\`estimatedDelivery\` was passed, not a manual style prop -- there's no
other axis distinguishing the two Figma states.

Composed entirely from components already in this library: Divider and
Button. The order's line items are rendered as a lightweight read-only
row here rather than reusing CartItem (E-commerce) -- CartItem always
ships its own quantity stepper and remove button, neither of which
belongs on a confirmation screen the user can no longer edit.` } } },
  args: { orderNumber: 'SK-40218', items, total: 28 },
} satisfies Meta<typeof OrderConfirmationBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTracking: Story = {
  args: { estimatedDelivery: 'Aug 28–30' },
};

export const DarkMode: Story = {
  args: { estimatedDelivery: 'Aug 28–30' },
  decorators: [(S) => <div className="dark"><S /></div>],
};
