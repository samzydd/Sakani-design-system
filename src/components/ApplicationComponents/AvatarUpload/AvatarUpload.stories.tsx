import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarUpload } from './AvatarUpload';
import samplePhoto from '../../../assets/avatars/activity-amara-kalu.jpg';

const meta = {
  title: 'Application/Avatar Upload',
  component: AvatarUpload,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
  },
} satisfies Meta<typeof AvatarUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalEmpty: Story = {};
export const VerticalFilled: Story = { args: { src: samplePhoto, alt: 'Amara Kalu' } };
export const HorizontalEmpty: Story = { args: { orientation: 'horizontal' } };
export const HorizontalFilled: Story = {
  args: { orientation: 'horizontal', src: samplePhoto, alt: 'Amara Kalu', onRemove: () => {} },
};

/** A file picked here is previewed immediately, same as a real consumer wiring src to state. */
export const Interactive: Story = {
  render: (args) => {
    const [src, setSrc] = React.useState<string | undefined>(args.src);
    return (
      <AvatarUpload
        {...args}
        src={src}
        onFileSelect={(file) => setSrc(URL.createObjectURL(file))}
        onRemove={() => setSrc(undefined)}
      />
    );
  },
};

export const DarkMode: Story = {
  args: { src: samplePhoto, alt: 'Amara Kalu' },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
