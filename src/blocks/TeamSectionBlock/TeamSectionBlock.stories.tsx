import type { Meta, StoryObj } from '@storybook/react';
import { TeamSectionBlock } from './TeamSectionBlock';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '../../components/MarketingComponents/TeamCard/TeamSocialIcons';
import marvin from '../../assets/marketing/team-section-marvin-mckinney.jpg';
import chidi from '../../assets/marketing/team-card-chidi-duru.jpg';
import floyd from '../../assets/marketing/team-section-floyd-miles.jpg';
import darlene from '../../assets/marketing/team-section-darlene-robertson.jpg';

const meta = {
  title: 'Blocks/Marketing/Team Section',
  component: TeamSectionBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TeamSectionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const socialLinks = [
  { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
  { icon: <FacebookIcon />, label: 'Facebook', href: '#' },
  { icon: <LinkedinIcon />, label: 'LinkedIn', href: '#' },
];

const args = {
  eyebrow: 'Team',
  title: 'The people building Sakani',
  subtitle: 'A small, distributed team focused on making one design system genuinely excellent.',
  members: [
    { image: marvin, name: 'Marvin McKinney', role: 'Design Lead', location: 'NY, USA', socialLinks },
    { image: chidi, name: 'Chidi Duru', role: 'Design Lead', location: 'Lagos, Nigeria', socialLinks },
    // Figma's own instance pairs this name with a stock photo of a woman
    // (its EXIF description literally reads "Confident business woman
    // portrait") -- kept as-is per "use the same image used in the Figma
    // file", not silently swapped, same as Darlene's photo below.
    { image: floyd, name: 'Floyd Miles', role: 'Pool Hygiene Specialist', location: 'London, England', socialLinks },
    // Mirror image of the Floyd mismatch above: Figma's own instance
    // pairs this name with a stock photo of a man.
    { image: darlene, name: 'Darlene Robertson', role: 'Sonographer', location: 'Lagos, Nigeria', socialLinks },
  ],
};

export const Default: Story = {
  args,
};

export const DarkMode: Story = {
  args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
