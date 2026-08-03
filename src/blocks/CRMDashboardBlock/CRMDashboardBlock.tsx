/**
 * CRMDashboardBlock — Blocks / Application / CRM Dashboard
 *
 * A full-page CRM leads view assembled entirely from Sakani components:
 *   Sidebar (icon rail) · TopBar · Breadcrumb · Tabs · Checkbox · Select ·
 *   Slider · Input · FilterChip · Button · Table · Pagination · Badge · Avatar.
 *
 * Matches the Figma "CRM dashboard" block (node 889:35330): icon-rail sidebar,
 * breadcrumb top bar, entity tabs, a collapsible filter panel, and a data
 * table with toolbar + footer pagination.
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly — swap the sample data, change columns,
 * add or remove filter groups. No new primitives are introduced here.
 */

import React from 'react';
import {
  LayoutGrid, Mail, Database, CalendarDays, Users, Workflow, Zap, Target,
  Plug, Settings, MessageCircle, Search, ChevronDown, ChevronUp, PanelLeftClose, Circle,
} from 'lucide-react';

import { Sidebar } from '../../components/Sidebar';
import { SidebarHeader } from '../../components/SidebarHeader';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarDivider } from '../../components/SidebarDivider';
import { TopBar } from '../../components/TopBar';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Tabs } from '../../components/Tabs';
import { Avatar } from '../../components/Avatar';
import { Badge, type BadgeVariant } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { Divider } from '../../components/Divider';
import { FilterChip } from '../../components/FilterChip';
import { IconButton } from '../../components/IconButton';
import { Input } from '../../components/Input';
import { Pagination } from '../../components/Pagination';
import { Select } from '../../components/Select';
import { Skeleton } from '../../components/Skeleton';
import { Slider } from '../../components/Slider';
import { Table, type TableColumn } from '../../components/Table';

import styles from './CRMDashboardBlock.module.css';

/* ------------------------------------------------------------------ *
 * Sample data — replace with your own
 * ------------------------------------------------------------------ */
type LeadStatus = 'Qualified' | 'Negotiation' | 'Lost' | 'Contacted' | 'Proposal sent' | 'Won';

interface Lead {
  company: string;
  contact: string;
  email: string;
  status: LeadStatus;
  source: string;
  owner: string;
  value: string;
  lastActivity: string;
  nextFollowUp: string;
}

const LEADS: Lead[] = [
  { company: 'Figma',      contact: 'Novák Balázs',      email: 'alma.lawson@example.com',      status: 'Qualified',     source: 'Website',    owner: 'Kende Attila',     value: '$18,560',    lastActivity: '18 hrs ago',  nextFollowUp: 'Feb 11' },
  { company: 'Invision',   contact: 'Szabó Jakab',       email: 'dolores.chambers@example.com', status: 'Proposal sent', source: 'Cold email', owner: 'Orosz Boldizsár', value: '$218,560',   lastActivity: '6 mins ago',  nextFollowUp: 'Aug 2'  },
  { company: 'Infogenix',  contact: 'Bogdán Norbert',    email: 'tim.jennings@example.com',     status: 'Negotiation',   source: 'LinkedIn',   owner: 'Simon Árpád',      value: '$11,000',    lastActivity: '13 secs ago', nextFollowUp: 'Mar 23' },
  { company: 'Google',     contact: 'Rámai Ivette',      email: 'georgia.young@example.com',    status: 'Contacted',     source: 'Website',    owner: 'Novák Balázs',     value: '$200.00',    lastActivity: '13 secs ago', nextFollowUp: 'Apr 28' },
  { company: 'Lendio',     contact: 'Csatár Géza',       email: 'jessica.hanson@example.com',   status: 'Won',           source: 'Paid ads',   owner: 'Rámai Ivette',     value: '$1200.00',   lastActivity: '6 mins ago',  nextFollowUp: 'Nov 28' },
  { company: 'Google',     contact: 'Veres Viktor',      email: 'michael.mitc@example.com',     status: 'Won',           source: 'Paid ads',   owner: 'Király Vince',     value: '$1201.00',   lastActivity: '18 hrs ago',  nextFollowUp: 'Oct 31' },
  { company: 'Infogenix',  contact: 'Hajdú Szilveszter', email: 'bill.sanders@example.com',     status: 'Qualified',     source: 'Website',    owner: 'Szigmund Kálmán',  value: '$20,000.50', lastActivity: '6 mins ago',  nextFollowUp: 'Oct 25' },
  { company: 'Trello',     contact: 'Kende Attila',      email: 'michelle.rivera@example.com',  status: 'Won',           source: 'LinkedIn',   owner: 'Bogdán Norbert',   value: '$13,091.20', lastActivity: '18 hrs ago',  nextFollowUp: 'Jul 14' },
  { company: 'Invision',   contact: 'Apród Endre',       email: 'nathan.roberts@example.com',   status: 'Negotiation',   source: 'LinkedIn',   owner: 'Antal András',     value: '$1220.00',   lastActivity: '18 hrs ago',  nextFollowUp: 'Nov 7'  },
];

const STATUS_VARIANT: Record<LeadStatus, BadgeVariant> = {
  Qualified:       'accent',
  Negotiation:     'warning',
  Lost:            'danger',
  Contacted:       'neutral',
  'Proposal sent': 'info',
  Won:             'success',
};

/** Figma colors each status checkbox individually (chart/success/warning/danger/brand
 *  tokens) rather than a single accent. Scope `--color-accent-default` per instance so
 *  the shared Checkbox component picks up the right fill without any component changes. */
const STATUS_CHECK_CLASS: Record<LeadStatus, string> = {
  Qualified:       styles.checkSuccess,
  Negotiation:     styles.checkWarning,
  Lost:            styles.checkDanger,
  Contacted:       styles.checkNeutral,
  'Proposal sent': styles.checkBrand,
  Won:             styles.checkSuccessSolid,
};

const STATUS_OPTIONS: LeadStatus[] = ['Qualified', 'Negotiation', 'Lost', 'Contacted', 'Proposal sent', 'Won'];
const SOURCE_OPTIONS = ['Website', 'LinkedIn', 'Cold email', 'Referral', 'Paid ads', 'Events'];

const INDUSTRY_OPTIONS = [
  { label: 'SaaS', value: 'saas' },
  { label: 'Fintech', value: 'fintech' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'E-commerce', value: 'ecommerce' },
];
const OWNER_OPTIONS = [
  { label: 'Kende Attila', value: 'kende' },
  { label: 'Simon Árpád', value: 'simon' },
  { label: 'Rámai Ivette', value: 'ramai' },
];
const COUNTRY_OPTIONS = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Hungary', value: 'hu' },
  { label: 'Nigeria', value: 'ng' },
];

const TAB_LABEL: Record<string, string> = {
  leads: 'leads',
  contacts: 'contacts',
  companies: 'companies',
  deals: 'deals',
};

const initialsOf = (name: string) => name.split(' ').map((p) => p[0]).slice(0, 2).join('');

/** Filter section header: title + collapse chevron. Mirrors Figma "Page Header".
 *  Chevron points up while the section is open (click to collapse) and down
 *  while it's closed (click to expand). */
function FilterGroupHeader({ title, isOpen, onToggle }: { title: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={styles.groupHeader}>
      <span className={styles.groupTitle}>{title}</span>
      <IconButton
        size="sm"
        variant="ghost"
        icon={isOpen ? ChevronUp : ChevronDown}
        aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
        aria-expanded={isOpen}
        onClick={onToggle}
      />
    </div>
  );
}

/** Formats a raw dollar amount as the deal-value range's display figure. */
const formatDealValue = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

const FILTER_SECTIONS = ['status', 'source', 'industry', 'dealValue', 'owner', 'country'] as const;
type FilterSection = (typeof FILTER_SECTIONS)[number];

/* ------------------------------------------------------------------ *
 * The block
 * ------------------------------------------------------------------ */
export interface CRMDashboardBlockProps {
  className?: string;
}

export const CRMDashboardBlock: React.FC<CRMDashboardBlockProps> = ({ className }) => {
  const [tab, setTab] = React.useState('leads');
  const [filterTab, setFilterTab] = React.useState('active');
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(1);

  // Figma shows all statuses checked, sources unchecked.
  const [statuses, setStatuses] = React.useState<Set<LeadStatus>>(new Set(STATUS_OPTIONS));
  const [sources, setSources] = React.useState<Set<string>>(new Set());

  // All filter sections start expanded; clicking a header's chevron collapses
  // just that section.
  const [openSections, setOpenSections] = React.useState<Set<FilterSection>>(new Set(FILTER_SECTIONS));
  const toggleSection = (key: FilterSection) => setOpenSections((prev) => toggle(prev, key));

  const [dealValue, setDealValue] = React.useState(70000);

  const toggle = <T,>(set: Set<T>, key: T) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  };

  const columns: TableColumn<Lead>[] = React.useMemo(() => [
    {
      key: 'company', header: 'Company', width: '13%',
      render: (r) => (
        <span className={styles.cellInline}>
          <Avatar size="sm" initials={r.company.slice(0, 2)} />
          <span className={styles.cellText}>{r.company}</span>
        </span>
      ),
    },
    {
      key: 'contact', header: 'Contact', width: '17%',
      render: (r) => (
        <span className={styles.cellInline}>
          <Avatar size="sm" initials={initialsOf(r.contact)} />
          <span className={styles.cellStack}>
            <span className={styles.cellText}>{r.contact}</span>
            <span className={styles.cellSub}>{r.email}</span>
          </span>
        </span>
      ),
    },
    {
      key: 'status', header: 'Status', width: '12%',
      render: (r) => (
        <Badge variant={STATUS_VARIANT[r.status]} emphasis="subtle"
          leftIcon={<Circle size={8} fill="currentColor" stroke="none" />}>
          {r.status}
        </Badge>
      ),
    },
    {
      key: 'source', header: 'Source', width: '9%',
      render: (r) => <Badge variant="neutral" emphasis="subtle">{r.source}</Badge>,
    },
    {
      key: 'owner', header: 'Owner', width: '15%',
      render: (r) => (
        <span className={styles.cellInline}>
          <Avatar size="sm" initials={initialsOf(r.owner)} />
          <span className={styles.cellText}>{r.owner}</span>
        </span>
      ),
    },
    { key: 'value', header: 'Value', width: '9%', align: 'right' },
    {
      key: 'lastActivity', header: 'Last activity', width: '9%',
      render: (r) => <span className={styles.cellSub}>{r.lastActivity}</span>,
    },
    {
      key: 'nextFollowUp', header: 'Next follow-up', width: '9%',
      render: (r) => <span className={styles.cellSub}>{r.nextFollowUp}</span>,
    },
  ], []);

  const filtered = React.useMemo(() => LEADS.filter((l) => {
    if (statuses.size && !statuses.has(l.status)) return false;
    if (sources.size && !sources.has(l.source)) return false;
    if (query) {
      const q = query.toLowerCase();
      if (![l.company, l.contact, l.email].some((f) => f.toLowerCase().includes(q))) return false;
    }
    return true;
  }), [statuses, sources, query]);

  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      {/* ---- Sidebar (icon rail) ---- */}
      <Sidebar collapsed>
        <SidebarHeader type="brand" title="Sakani" logo="S" collapsed />
        <SidebarDivider />
        <div className={styles.navScroll}>
          <div className={styles.navGroup}>
            <SidebarItem collapsed icon={LayoutGrid} label="Dashboard" />
            <SidebarItem collapsed icon={Mail} label="Inbox" />
            <SidebarItem collapsed icon={Database} label="Database" active />
            <SidebarItem collapsed icon={CalendarDays} label="Calendar" />
          </div>
          <SidebarDivider />
          <div className={styles.navGroup}>
            <SidebarItem collapsed icon={Users} label="Contacts" />
            <SidebarItem collapsed icon={Workflow} label="Pipelines" />
            <SidebarItem collapsed icon={Zap} label="Automations" />
            <SidebarItem collapsed icon={Target} label="Goals" />
          </div>
        </div>
        <SidebarDivider />
        <div className={styles.navGroup}>
          <SidebarItem collapsed icon={Plug} label="Integrations" />
          <SidebarItem collapsed icon={Settings} label="Settings" />
          <SidebarItem collapsed icon={MessageCircle} label="Support" />
        </div>
        <SidebarDivider />
      </Sidebar>

      {/* ---- Main column ---- */}
      <div className={styles.main}>
        <TopBar
          type="breadcrumb"
          density="sm"
          showToggle
          toggleIcon={Database}
          showActions
          hasUnread
          left={<Breadcrumb items={[{ label: 'Database', href: '#' }, { label: 'CRM', href: '#' }, { label: 'Leads' }]} />}
          account={<Avatar size="sm" initials="JD" />}
        />

        {/* ---- Entity tabs ---- */}
        <div className={styles.tabsBar}>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: 'leads', label: 'Leads' },
              { value: 'contacts', label: 'Contacts' },
              { value: 'companies', label: 'Companies' },
              { value: 'deals', label: 'Deals' },
            ]}
          />
        </div>

        {/* ---- Filter panel + table ---- */}
        <div className={styles.body}>
          {/* Filter panel */}
          <aside className={styles.filters}>
            <div className={styles.filtersHead}>
              <div className={styles.filtersHeadRow}>
                <h2 className={styles.filtersTitle}>Filter</h2>
                <IconButton size="sm" variant="outline" icon={PanelLeftClose} aria-label="Collapse filter panel" />
              </div>
            </div>

            <div className={styles.filterTabs}>
              <Tabs
                className={styles.filterSegmented}
                value={filterTab}
                onChange={setFilterTab}
                items={[
                  { value: 'active', label: 'Active' },
                  { value: 'archived', label: 'Archived' },
                  { value: 'assigned', label: 'Assigned to me' },
                ]}
              />
            </div>

            {filterTab !== 'active' ? (
              // Archived / Assigned-to-me filter sets aren't implemented in
              // this example — show a loading skeleton in place of the real
              // filter sections rather than the (wrong) Active set.
              <div className={styles.filtersScroll}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={styles.filterSkeletonGroup}>
                    <Skeleton variant="text" width={90} height={14} />
                    <Skeleton variant="rect" width="100%" height={32} />
                  </div>
                ))}
              </div>
            ) : (
            <div className={styles.filtersScroll}>
              {/* Lead status */}
              <section className={styles.group}>
                <FilterGroupHeader title="Lead status" isOpen={openSections.has('status')} onToggle={() => toggleSection('status')} />
                {openSections.has('status') && (
                  <div className={styles.checkGrid}>
                    {STATUS_OPTIONS.map((s) => (
                      <Checkbox
                        key={s}
                        className={STATUS_CHECK_CLASS[s]}
                        label={s}
                        checked={statuses.has(s)}
                        onChange={() => setStatuses((prev) => toggle(prev, s))}
                      />
                    ))}
                  </div>
                )}
              </section>

              <Divider />

              {/* Lead source */}
              <section className={styles.group}>
                <FilterGroupHeader title="Lead source" isOpen={openSections.has('source')} onToggle={() => toggleSection('source')} />
                {openSections.has('source') && (
                  <div className={styles.checkGrid}>
                    {SOURCE_OPTIONS.map((s) => (
                      <Checkbox
                        key={s}
                        label={s}
                        checked={sources.has(s)}
                        onChange={() => setSources((prev) => toggle(prev, s))}
                      />
                    ))}
                  </div>
                )}
              </section>

              <Divider />

              {/* Industry */}
              <section className={styles.group}>
                <FilterGroupHeader title="Industry" isOpen={openSections.has('industry')} onToggle={() => toggleSection('industry')} />
                {openSections.has('industry') && (
                  <Select placeholder="Select industry" options={INDUSTRY_OPTIONS} />
                )}
              </section>

              <Divider />

              {/* Deal value */}
              <section className={styles.group}>
                <FilterGroupHeader title="Deal value" isOpen={openSections.has('dealValue')} onToggle={() => toggleSection('dealValue')} />
                {openSections.has('dealValue') && (
                  <>
                    <Slider
                      min={0}
                      max={100000}
                      value={dealValue}
                      onChange={(e) => setDealValue(Number(e.target.value))}
                      aria-label="Deal value"
                    />
                    <div className={styles.rangeRow}>
                      <Input size="sm" value="$0" readOnly aria-label="Minimum deal value" />
                      <Input size="sm" value={formatDealValue(dealValue)} readOnly aria-label="Maximum deal value" />
                    </div>
                  </>
                )}
              </section>

              <Divider />

              {/* Owner */}
              <section className={styles.group}>
                <FilterGroupHeader title="Owner" isOpen={openSections.has('owner')} onToggle={() => toggleSection('owner')} />
                {openSections.has('owner') && (
                  <Select placeholder="Select owner" options={OWNER_OPTIONS} />
                )}
              </section>

              {/* Country */}
              <section className={styles.group}>
                <FilterGroupHeader title="Country" isOpen={openSections.has('country')} onToggle={() => toggleSection('country')} />
                {openSections.has('country') && (
                  <Select placeholder="Select country" options={COUNTRY_OPTIONS} />
                )}
              </section>
            </div>
            )}
          </aside>

          {/* Table region */}
          <main className={styles.tableRegion}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <div className={styles.searchField}>
                  <Input
                    placeholder="Search customers, email, phone..."
                    leadingIcon={<Search size={16} />}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <FilterChip type="add">Add filter</FilterChip>
              </div>
              <div className={styles.toolbarRight}>
                <Button variant="outline" size="sm" rightIcon={<ChevronDown size={16} />}>Assign owner</Button>
                <Button variant="outline" size="sm" rightIcon={<ChevronDown size={16} />}>Change status</Button>
                <Button variant="outline" size="sm" rightIcon={<ChevronDown size={16} />}>Add tags</Button>
              </div>
            </div>

            {tab === 'leads' ? (
              <Table<Lead>
                columns={columns}
                rows={filtered}
                selectable
                selectedRows={selected}
                onSelectionChange={setSelected}
                rowKey={(row) => row.email}
              />
            ) : (
              // Contacts / Companies / Deals aren't implemented in this example —
              // a loading skeleton communicates that rather than showing stale
              // Leads rows under the wrong tab. One loader per real column
              // (not just the first few), so every row reads as "loading the
              // whole table" rather than a partial placeholder.
              <div className={styles.panel}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={styles.skeletonRow}>
                    <Skeleton variant="rect" width={16} height={16} />
                    {columns.map((col) => (
                      <span key={col.key} className={styles.skeletonCell} style={{ width: col.width }}>
                        {(col.key === 'company' || col.key === 'contact' || col.key === 'owner') && (
                          <Skeleton variant="circle" width={24} height={24} />
                        )}
                        <Skeleton variant="text" width="60%" height={12} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.footer}>
              <p className={styles.footerText}>
                {tab === 'leads'
                  ? `Showing 1–${filtered.length} of ${filtered.length} leads`
                  : `Loading ${TAB_LABEL[tab]}…`}
              </p>
              <Pagination total={10} page={page} onPageChange={setPage} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CRMDashboardBlock;
