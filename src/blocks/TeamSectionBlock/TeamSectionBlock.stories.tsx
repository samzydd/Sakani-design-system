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
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly.

Matches Figma "Team Section". Composed entirely
from existing library components -- SectionHeading (Marketing, the
"Team" eyebrow + title + subtitle, align="center") and a grid of
TeamCard (Marketing, the plain "Card" style -- no \`bio\`, matching
every member shown here) -- no new visual primitives, this block is
purely heading + grid layout.

Figma's own grid instance is 1688px wide (4 cards x 404px + 3x24px
gaps) inside an outer frame cropped to 1280px, clipping the grid's
own right edge in that specific export -- not a real 1280px content
width, just how that particular thumbnail was framed. This block
sizes itself to the grid's actual, uncropped content width instead.

The grid is real CSS Grid with auto-fill (min 404px per card,
matching Figma exactly), not a fixed 4-card row -- it wraps onto
additional rows for any other member count, same reasoning
ProductGridBlock/BlogListingBlock give for their own grids.
TeamCard's own max-width:404px (a standalone-usage default) is
overridden so each card genuinely fills its grid cell rather than
capping below it, same override pattern already established for
ProductCard and BlogListingCard.` } }, layout: 'fullscreen' },
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
