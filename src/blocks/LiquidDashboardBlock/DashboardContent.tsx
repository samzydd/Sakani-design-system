import { memo, useState } from 'react';
import { Package, Warehouse, FileText, Megaphone, Building2, TrendingUp, ChevronRight } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { BarChart } from '../../components/BarChart';
import { LineChart } from '../../components/LineChart';
import { DonutChart } from '../../components/DonutChart';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Table, type TableColumn } from '../../components/Table';
import { Avatar } from '../../components/Avatar';
import { AvatarGroup } from '../../components/AvatarGroup';
import { Panel } from './parts/Panel';
import { LegendRow } from './parts/LegendRow';
import { PeriodDropdown } from './parts/PeriodDropdown';
import { randomRevenue, randomGrowth, randomShares } from './parts/randomChartData';
import styles from './DashboardContent.module.css';

const INITIAL_REVENUE = [
  { label: 'Jan', revenue: 320000 },
  { label: 'Feb', revenue: 356000 },
  { label: 'Mar', revenue: 341000 },
  { label: 'Apr', revenue: 398000 },
  { label: 'May', revenue: 412000 },
  { label: 'Jun', revenue: 452000 },
];

const INITIAL_GROWTH = [
  { label: 'Jan', Acquisition: 4200, Retention: 3800 },
  { label: 'Feb', Acquisition: 4600, Retention: 3950 },
  { label: 'Mar', Acquisition: 4400, Retention: 4100 },
  { label: 'Apr', Acquisition: 5100, Retention: 4300 },
  { label: 'May', Acquisition: 5400, Retention: 4550 },
  { label: 'Jun', Acquisition: 5900, Retention: 4800 },
];

const INITIAL_CHANNELS = [
  { label: 'Website', value: 48 },
  { label: 'Mobile app', value: 27 },
  { label: 'Marketplace', value: 18 },
  { label: 'Retail', value: 7 },
];

interface Order {
  order: string;
  customer: string;
  amount: string;
  payment: string;
  status: 'Active' | 'Failed' | 'Pending' | 'Completed';
}

const orders: Order[] = [
  { order: 'ORD-2481', customer: 'Olivia Carter', amount: '$482', payment: 'Visa', status: 'Active' },
  { order: 'ORD-2482', customer: 'Noah Kim', amount: '$124', payment: 'Paypal', status: 'Failed' },
  { order: 'ORD-2483', customer: 'Sophia Lee', amount: '$318', payment: 'Mastercard', status: 'Pending' },
  { order: 'ORD-2484', customer: 'Ethan Walker', amount: '$1,248', payment: 'Apple Pay', status: 'Completed' },
  { order: 'ORD-2485', customer: 'Amelia Brown', amount: '$86', payment: 'Visa', status: 'Active' },
  { order: 'ORD-2486', customer: 'Lucas Wilson', amount: '$212', payment: 'Mastercard', status: 'Completed' },
];

const STATUS_VARIANT = {
  Active: 'success', Failed: 'danger', Pending: 'warning', Completed: 'neutral',
} as const;

type ActivitySegment = { text: string; muted?: boolean };
type PersonKey = 'emily' | 'michael' | 'sarah';
type ActivityItem = {
  avatar?: PersonKey;
  avatarGroup?: { person: PersonKey; alt: string }[];
  icon?: typeof Package;
  segments: ActivitySegment[];
};

const activity: ActivityItem[] = [
  {
    avatar: 'emily',
    segments: [{ text: 'Emily Johnson ' }, { text: 'created a', muted: true }, { text: ' new product.' }],
  },
  {
    icon: Package,
    segments: [{ text: 'Order ORD-24086 ' }, { text: 'was', muted: true }, { text: ' shipped.' }],
  },
  {
    icon: Warehouse,
    segments: [{ text: 'Warehouse inventory ' }, { text: 'synced', muted: true }, { text: ' successfully.' }],
  },
  {
    avatarGroup: [
      { person: 'michael', alt: 'Michael Evans' },
      { person: 'sarah', alt: 'Sarah Williams' },
    ],
    segments: [{ text: 'Michael Evans ' }, { text: 'invited', muted: true }, { text: ' Sarah Williams.' }],
  },
  {
    icon: FileText,
    segments: [{ text: 'Weekly revenue report generated.' }],
  },
  {
    icon: Megaphone,
    segments: [
      { text: 'Marketing ' }, { text: 'campaign', muted: true },
      { text: ' "Summer Sale" ' }, { text: 'started', muted: true }, { text: '.' },
    ],
  },
  {
    icon: Building2,
    segments: [{ text: 'New', muted: true }, { text: ' enterprise customer ' }, { text: 'onboarded', muted: true }, { text: '.' }],
  },
];

export interface DashboardContentProps {
  /** Photos for the activity feed, keyed by person. Optional: Avatar falls back to a neutral placeholder. */
  people?: Partial<Record<PersonKey, string>>;
}

function DashboardContentImpl({ people = {} }: DashboardContentProps) {
  const [revenue, setRevenue] = useState(INITIAL_REVENUE);
  const [growth, setGrowth] = useState(INITIAL_GROWTH);
  const [channels, setChannels] = useState(INITIAL_CHANNELS);

  const columns: TableColumn<Order>[] = [
    { key: 'order', header: 'Order' },
    { key: 'customer', header: 'Customer' },
    { key: 'amount', header: 'Amount', align: 'right' },
    { key: 'payment', header: 'Payment' },
    {
      key: 'status', header: 'Status',
      render: (r) => <Badge variant={STATUS_VARIANT[r.status]} emphasis="subtle">{r.status}</Badge>,
    },
  ];

  return (
    <>
      <div className={styles.kpiRow}>
        <StatCard title="Total revenue" value="$2,483,920" delta="18.2%" trend="up" description="vs last month" />
        <StatCard title="Net profit" value="$712,480" delta="12.2%" trend="up" description="vs last month" />
        <StatCard title="Orders today" value="18,432" delta="9.8%" trend="up" description="vs last month" />
        <StatCard title="Active customers" value="24,981" delta="1.5%" trend="up" description="vs last month" />
      </div>

      <div className={styles.threeCol}>
        <Panel
          title="Revenue trend"
          description={'Track monthly revenue growth and identify\nsales trends.'}
          className={styles.panelCanvas}
          actions={<>
            <Badge variant="success" emphasis="subtle" leftIcon={<TrendingUp size={14} strokeWidth={2} />}>
              6.4% up this month
            </Badge>
            <PeriodDropdown onChange={() => setRevenue(randomRevenue())} />
          </>}
        >
          <div className={styles.chartH176}>
            <BarChart data={revenue.map((r) => ({ label: r.label, value: r.revenue }))} size="sm" />
          </div>
        </Panel>

        <Panel
          title="Customer growth"
          description="Measures customer acquisition, retention, and overall audience growth over time."
          className={styles.panelCanvas}
          actions={<>
            <div className={styles.legendRowLeft}>
              <span className={styles.legendItem}><span className={styles.dot} style={{ background: 'var(--color-chart-1)' }} />Acquisition</span>
              <span className={styles.legendItem}><span className={styles.dot} style={{ background: 'var(--color-chart-2)' }} />Retention</span>
            </div>
            <PeriodDropdown onChange={() => setGrowth(randomGrowth())} />
          </>}
        >
          <div className={styles.chartH176}>
            <LineChart data={growth} series={['Acquisition', 'Retention']} size="sm" />
          </div>
        </Panel>

        <Panel
          title="Sales channel"
          description="Compare revenue contribution across your primary sales channels."
          className={styles.panelCanvas}
          actions={<>
            <Badge variant="success" emphasis="subtle" leftIcon={<TrendingUp size={14} strokeWidth={2} />}>
              1.4% this month
            </Badge>
            <PeriodDropdown
              defaultValue="This month"
              options={['This month', 'Last month', 'This quarter', 'This year']}
              formatLabel={(v) => v}
              onChange={() => setChannels(randomShares(INITIAL_CHANNELS))}
            />
          </>}
        >
          <div className={styles.chartLegendRow}>
            <div className={styles.chartFixed} style={{ width: 160 }}>
              <DonutChart data={channels} size="sm" centerValue="$2.44M" centerCaption="of revenue" />
            </div>
            <div className={styles.legendList}>
              {channels.map((c, i) => (
                <LegendRow key={c.label} colorIndex={i + 1} label={c.label} value={`${c.value}%`} />
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className={styles.ordersActivityRow}>
      <Panel
        title="Recent orders"
        description="Track recent customer purchases and order progress."
        actions={<Button variant="outline" size="sm">View all</Button>}
        actionsInline
        className={styles.spanTwo}
      >
        <div className={styles.panelScroll}>
          <Table<Order> columns={columns} rows={orders} rowKey={(r) => r.order} />
        </div>
      </Panel>

      <Panel title="Recent activity" description="Latest system and team activity." actionsInline>
        <div className={`${styles.activityList} ${styles.panelScroll}`}>
          {activity.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className={styles.activityRow}>
                {a.avatarGroup ? (
                  <AvatarGroup size="sm" avatars={a.avatarGroup.map((m) => ({ src: people[m.person] ?? '', alt: m.alt }))} />
                ) : a.avatar ? (
                  <Avatar size="sm" src={people[a.avatar]} alt="" />
                ) : Icon ? (
                  <span className={styles.activityIconWrap}><Icon size={18} strokeWidth={1.5} /></span>
                ) : null}
                <p className={styles.activityText}>
                  {a.segments.map((s, j) => (
                    <span key={j} className={s.muted ? styles.activityMuted : undefined}>{s.text}</span>
                  ))}
                </p>
                <ChevronRight size={16} strokeWidth={1.5} className={styles.activityChevron} />
              </div>
            );
          })}
        </div>
      </Panel>
      </div>
    </>
  );
}

/** Memoized: the sidebar toggles, lens measurements and hover state re-render the block
 *  many times a second, and none of it touches these charts and tables. */
export const DashboardContent = memo(DashboardContentImpl);
