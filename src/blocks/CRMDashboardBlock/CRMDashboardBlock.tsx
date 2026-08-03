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
  Plug, Settings, MessageCircle, Search, ChevronDown, ChevronUp, PanelLeftClose, Circle, Filter,
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
import { Tooltip } from '../../components/Tooltip';
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
  // The whole row is the trigger, not just the chevron -- a real <button>
  // nested inside another <button> is invalid HTML, so the chevron here
  // is a plain decorative span rather than a second IconButton, sized and
  // colored to match IconButton's own ghost/sm (32x32, fg-muted, bg-subtle
  // on hover) so it still reads as "the button" even though the click
  // target is the full header.
  const Chevron = isOpen ? ChevronUp : ChevronDown;
  return (
    <button type="button" className={styles.groupHeader} onClick={onToggle} aria-expanded={isOpen}>
      <span className={styles.groupTitle}>{title}</span>
      <span className={styles.groupHeaderIcon} aria-hidden="true">
        <Chevron size={16} strokeWidth={1.5} />
      </span>
    </button>
  );
}

/* Animates a filter section open/closed via CSS Grid's 0fr/1fr trick
 * rather than a plain height transition -- a `height` transition needs a
 * concrete pixel value on both ends, and this content's natural height
 * isn't known up front (it varies per section and can reflow). Content
 * stays mounted at all times so there's something to transition between;
 * grid-template-rows going from 0fr to 1fr is what actually animates.
 *
 * The trick needs overflow:hidden while animating (otherwise content
 * visibly juts out of the shrinking row instead of clipping cleanly),
 * but Industry/Owner/Country each hold a Select whose open dropdown
 * panel is positioned *below* its own box -- overflow:hidden left on
 * permanently would clip that panel the moment it's open. So it's only
 * held during the transition: switched to visible once the open
 * animation actually finishes, and back to hidden the instant a close
 * starts (by which point any dropdown inside should already be closed). */
function CollapsibleSection({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const [overflowVisible, setOverflowVisible] = React.useState(false);
  React.useEffect(() => {
    if (!isOpen) setOverflowVisible(false);
  }, [isOpen]);
  return (
    <div
      className={[styles.collapsible, isOpen ? styles['collapsible--open'] : ''].filter(Boolean).join(' ')}
      style={overflowVisible ? { overflow: 'visible' } : undefined}
      onTransitionEnd={(e) => {
        if (e.propertyName === 'grid-template-rows' && isOpen) setOverflowVisible(true);
      }}
    >
      <div className={styles.collapsibleInner}>{children}</div>
    </div>
  );
}

/* Collapsed sidebar items rely on the icon alone — a tooltip surfaces the
   label on hover/focus instead of the native title attribute. */
function NavItem(props: React.ComponentProps<typeof SidebarItem>) {
  return (
    <Tooltip title={props.label} pointer="center-right">
      <SidebarItem {...props} nativeTooltip={false} />
    </Tooltip>
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

  // The whole filter panel can be tucked away to give the table more room;
  // a floating button takes its place so it can be reopened. The button
  // can be dragged up/down (only) along the sidebar edge to wherever's
  // convenient; horizontal position is fixed by .filtersReopen's own
  // left:0, so there's nothing to clamp on that axis.
  const [filtersOpen, setFiltersOpen] = React.useState(true);
  const [reopenButtonTop, setReopenButtonTop] = React.useState(16);
  const tableRegionRef = React.useRef<HTMLElement>(null);
  // A click still fires on pointerup regardless of how far the pointer
  // travelled in between -- this is what keeps a real drag from also
  // reopening the panel the instant it's released.
  const draggedRef = React.useRef(false);

  const onReopenButtonPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const container = tableRegionRef.current;
    if (!container) return;
    draggedRef.current = false;
    const startClientY = e.clientY;
    const startTop = reopenButtonTop;
    // Keep the same 16px breathing room off both edges that it starts
    // with, rather than letting it dock flush against the corners.
    const minTop = 16;
    const maxTop = Math.max(minTop, container.clientHeight - 32 - 16);

    const onMove = (ev: PointerEvent) => {
      const delta = ev.clientY - startClientY;
      if (Math.abs(delta) > 3) draggedRef.current = true;
      setReopenButtonTop(Math.min(Math.max(startTop + delta, minTop), maxTop));
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  };

  const onReopenButtonClick = () => {
    if (draggedRef.current) return;
    setFiltersOpen(true);
  };

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
        <Tooltip title="Sakani" pointer="center-right">
          <SidebarHeader type="brand" title="Sakani" logo="S" collapsed />
        </Tooltip>
        <SidebarDivider />
        <div className={styles.navScroll}>
          <div className={styles.navGroup}>
            <NavItem collapsed icon={LayoutGrid} label="Dashboard" />
            <NavItem collapsed icon={Mail} label="Inbox" />
            <NavItem collapsed icon={Database} label="Database" active />
            <NavItem collapsed icon={CalendarDays} label="Calendar" />
          </div>
          <SidebarDivider />
          <div className={styles.navGroup}>
            <NavItem collapsed icon={Users} label="Contacts" />
            <NavItem collapsed icon={Workflow} label="Pipelines" />
            <NavItem collapsed icon={Zap} label="Automations" />
            <NavItem collapsed icon={Target} label="Goals" />
          </div>
        </div>
        <SidebarDivider />
        <div className={styles.navGroup}>
          <NavItem collapsed icon={Plug} label="Integrations" />
          <NavItem collapsed icon={Settings} label="Settings" />
          <NavItem collapsed icon={MessageCircle} label="Support" />
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
          <aside className={[styles.filters, !filtersOpen ? styles['filters--closed'] : ''].filter(Boolean).join(' ')}>
            <div className={styles.filtersHead}>
              <div className={styles.filtersHeadRow}>
                <h2 className={styles.filtersTitle}>Filter</h2>
                <IconButton
                  size="sm"
                  variant="outline"
                  icon={PanelLeftClose}
                  aria-label="Collapse filter panel"
                  onClick={() => setFiltersOpen(false)}
                />
              </div>
            </div>

            <div className={styles.filterTabs}>
              <Tabs
                className={styles.filterSegmented}
                bordered={false}
                fill
                value={filterTab}
                onChange={setFilterTab}
                items={[
                  { value: 'active', label: 'Active' },
                  { value: 'archived', label: 'Archived' },
                  { value: 'assigned', label: 'Assigned' },
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
                <CollapsibleSection isOpen={openSections.has('status')}>
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
                </CollapsibleSection>
              </section>

              <Divider />

              {/* Lead source */}
              <section className={styles.group}>
                <FilterGroupHeader title="Lead source" isOpen={openSections.has('source')} onToggle={() => toggleSection('source')} />
                <CollapsibleSection isOpen={openSections.has('source')}>
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
                </CollapsibleSection>
              </section>

              <Divider />

              {/* Industry */}
              <section className={styles.group}>
                <FilterGroupHeader title="Industry" isOpen={openSections.has('industry')} onToggle={() => toggleSection('industry')} />
                <CollapsibleSection isOpen={openSections.has('industry')}>
                  <Select placeholder="Select industry" options={INDUSTRY_OPTIONS} />
                </CollapsibleSection>
              </section>

              <Divider />

              {/* Deal value */}
              <section className={styles.group}>
                <FilterGroupHeader title="Deal value" isOpen={openSections.has('dealValue')} onToggle={() => toggleSection('dealValue')} />
                <CollapsibleSection isOpen={openSections.has('dealValue')}>
                  <div className={styles.dealValueGroup}>
                    <Slider
                      min={0}
                      max={100000}
                      value={dealValue}
                      onChange={(e) => setDealValue(Number(e.target.value))}
                      aria-label="Deal value"
                    />
                    <div className={styles.rangeRow}>
                      <div className={styles.rangeLabel} aria-label="Minimum deal value">$0</div>
                      <div className={styles.rangeLabel} aria-label="Maximum deal value">{formatDealValue(dealValue)}</div>
                    </div>
                  </div>
                </CollapsibleSection>
              </section>

              <Divider />

              {/* Owner */}
              <section className={styles.group}>
                <FilterGroupHeader title="Owner" isOpen={openSections.has('owner')} onToggle={() => toggleSection('owner')} />
                <CollapsibleSection isOpen={openSections.has('owner')}>
                  <Select placeholder="Select owner" options={OWNER_OPTIONS} />
                </CollapsibleSection>
              </section>

              {/* Country */}
              <section className={styles.group}>
                <FilterGroupHeader title="Country" isOpen={openSections.has('country')} onToggle={() => toggleSection('country')} />
                <CollapsibleSection isOpen={openSections.has('country')}>
                  <Select placeholder="Select country" options={COUNTRY_OPTIONS} />
                </CollapsibleSection>
              </section>
            </div>
            )}
          </aside>

          {/* Table region */}
          <main className={styles.tableRegion} ref={tableRegionRef}>
            {!filtersOpen && (
              <IconButton
                size="sm"
                variant="outline"
                icon={Filter}
                aria-label="Show filter panel"
                className={styles.filtersReopen}
                style={{ top: reopenButtonTop }}
                onPointerDown={onReopenButtonPointerDown}
                onClick={onReopenButtonClick}
              />
            )}
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <div className={styles.searchField}>
                  <Input
                    size="sm"
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
