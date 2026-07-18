import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { Badge } from '../Badge/Badge';

interface User { name: string; email: string; role: string; status: 'active' | 'invited' | 'suspended'; }

const rows: User[] = [
  { name: 'Sam Okpere', email: 'sam@sakani.com', role: 'Owner', status: 'active' },
  { name: 'Ada Obi', email: 'ada@sakani.com', role: 'Admin', status: 'active' },
  { name: 'John Bull', email: 'john@sakani.com', role: 'Member', status: 'invited' },
  { name: 'Zara Ali', email: 'zara@sakani.com', role: 'Member', status: 'suspended' },
];

const statusColor = { active: 'success', invited: 'info', suspended: 'danger' } as const;

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status', render: (r: User) => (
    <Badge variant={statusColor[r.status]} emphasis="subtle">{r.status}</Badge>
  ) },
] as const;

const meta = {
  title: 'Composite/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 720 }}><S /></div>],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Table columns={columns as any} rows={rows} /> };
export const Selectable: Story = { render: () => <Table columns={columns as any} rows={rows} selectable /> };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 720, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
  render: () => <Table columns={columns as any} rows={rows} selectable />,
};
