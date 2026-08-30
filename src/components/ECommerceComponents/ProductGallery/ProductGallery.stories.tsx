import type { Meta, StoryObj } from '@storybook/react';
import { ProductGallery } from './ProductGallery';
import mug from '../../../assets/products/card-mug.jpg';
import tableRunner from '../../../assets/products/card-table-runner.jpg';
import servingBoard from '../../../assets/products/card-serving-board.jpg';

const images = [
  { src: mug, alt: 'Ceramic Pour-Over Mug, front view' },
  { src: tableRunner, alt: 'Ceramic Pour-Over Mug, on a table runner' },
  { src: servingBoard, alt: 'Ceramic Pour-Over Mug, styled with a serving board' },
  { src: mug, alt: 'Ceramic Pour-Over Mug, detail view' },
];

const meta = {
  title: 'E-commerce/Product Gallery',
  component: ProductGallery,
  tags: ['autodocs'],
  args: { images },
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bottom: Story = {
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
};

export const Left: Story = {
  args: { thumbsPosition: 'left' },
  decorators: [(S) => <div style={{ width: 500 }}><S /></div>],
};

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
