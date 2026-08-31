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
  parameters: { docs: { description: { component: `Matches Figma "Product Gallery" (E-commerce set): a main image plus
selectable thumbnails, click a thumb to make it the main image.

Figma's "Default"/"Vertical Thumbs" style names describe the THUMBS'
own axis, not the gallery's overall flow, which reads confusingly next
to each other -- renamed here to \`thumbsPosition: 'bottom' | 'left'\`:
- **'bottom' (Figma "Default")** — main image on top (400x400), thumb row below it (80x80 each).
- **'left' (Figma "Vertical Thumbs")** — thumb column on the left (64x64 each), main image filling the remaining width (fixed 320 height).

A real, independent layout choice, not something derivable from the
image data, so it stays an explicit prop.

The active thumbnail is a real derived concern (index === activeIndex),
not a manual prop per thumb. \`activeIndex\` follows the same optional-
controlled/uncontrolled-by-default dual mode already established by
AvatarUpload's \`src\` -- most consumers just want a self-contained
gallery, but anything needing to sync selection externally (e.g. a
matching color swatch) can still control it.

Figma's corner radii here (10px main/thumbs in "bottom", 8px/16px in
"left") are unbound literal values in the file itself (no token
variable in the raw export, unlike virtually everything else in this
library), so they're kept as literal px rather than snapped to the
nearest radius token.` } } },
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
