/**
 * LiquidDashboardBlock — Blocks / Application / Liquid Glass Dashboard
 *
 * A full dashboard on a photograph, built the way the Sakani glass docs
 * describe it:
 *   1. Background  the photo, as a <LiquidBackdrop>: every lens inside refracts
 *                  the photo itself, so glass on glass still bends real detail
 *                  (as in Figma). Its veil is Figma's 5% overlay fill (a scrim
 *                  in dark mode), seen by every lens.
 *   2. Overlay     one full-size <LiquidGlass variant="regular" radius={0}> sheet.
 *   3. Product UI  Sidebar and TopBar sit on it with no fills of their own
 *                  (data-surface="liquid"); the main panel is a second sheet
 *                  of glass at 76% tint; the cards on it stay solid so data
 *                  stays crisp.
 * The active sidebar item has its own clear-glass lens (it moves only when
 * another item is clicked); a second, softer lens follows hover.
 *
 * Matches the Figma "Dashboard • Liquid" frame (node 2409:26078).
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this folder into
 * your project and edit it directly: swap the sample data, nav and charts.
 * Refraction renders in Chromium (Chrome, Edge); Safari and Firefox get the
 * frosted fallback with the same rim.
 */

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  LayoutPanelTop, ChartColumnBig, CircleUser, Boxes, Megaphone, ChartPie, Settings2,
  UsersRound, PlugZap, Settings, PanelRightClose,
} from 'lucide-react';
import { LiquidGlass, LiquidBackdrop } from '../../lib/LiquidGlass';
import { SakaniLogo } from '../../lib/SakaniLogo';
import { Sidebar } from '../../components/Sidebar';
import { SidebarHeader } from '../../components/SidebarHeader';
import { SidebarGroupLabel } from '../../components/SidebarGroupLabel';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarPromo } from '../../components/SidebarPromo';
import { TopBar } from '../../components/TopBar';
import { Avatar } from '../../components/Avatar';
import { Tooltip } from '../../components/Tooltip';
import { SearchExpand } from './parts/SearchExpand';
import { DashboardContent, type DashboardContentProps } from './DashboardContent';
import styles from './LiquidDashboardBlock.module.css';

const NAV = [
  { label: 'OVERVIEW', items: [
    { icon: LayoutPanelTop, label: 'Dashboard' },
    { icon: ChartColumnBig, label: 'Sales' },
    { icon: CircleUser, label: 'Customers' },
    { icon: Boxes, label: 'Products' },
  ] },
  { label: 'GROWTH', items: [
    { icon: Megaphone, label: 'Marketing' },
    { icon: ChartPie, label: 'Analytics' },
    { icon: Settings2, label: 'Operations' },
  ] },
  { label: 'ADMINISTRATION', items: [
    { icon: UsersRound, label: 'Team' },
    { icon: PlugZap, label: 'Integrations' },
    { icon: Settings, label: 'Settings' },
  ] },
];

type LensBox = { x: number; y: number; w: number; h: number };
type LensState = { active: LensBox | null; hover: LensBox | null; hoverGlide: boolean };

export interface LiquidDashboardBlockProps {
  /** The photograph behind everything. Not bundled: the glass needs something
   * colorful and detailed to bend, and which photo is your call. */
  backgroundImage: string;
  /** Avatar for the account menu in the top bar. */
  accountAvatar?: string;
  /** Photos for the people in the activity feed. */
  people?: DashboardContentProps['people'];
  className?: string;
}

export const LiquidDashboardBlock: React.FC<LiquidDashboardBlockProps> = ({ backgroundImage, accountAvatar, people, className }) => {
  const [collapsed, setCollapsed] = useState(false);
  // Two lenses, two jobs:
  //  - the ACTIVE lens rests on the active item and only moves when another
  //    item is clicked;
  //  - the HOVER lens (same glass, smaller shadow) appears on whichever other
  //    item the pointer or keyboard focus is on, and gets out of the way when
  //    the pointer leaves. Hovering never changes what is active.
  const [active, setActive] = useState('Dashboard');
  const [hovered, setHovered] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [lens, setLens] = useState<LensState>({ active: null, hover: null, hoverGlide: false });
  const [lensReady, setLensReady] = useState(false);
  // Every glide restarts a droplet stretch (two identical keyframes, alternated).
  const [stretch, setStretch] = useState({ active: 0, hover: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLDivElement>());

  // The hovered item that isn't already active (the active one has its lens).
  const hoverKey = hovered && hovered !== active ? hovered : null;
  // Remembered so the hover lens fades out where it was, instead of snapping away.
  const lastHoverKey = useRef<string | null>(null);
  if (hoverKey) lastHoverKey.current = hoverKey;
  const hoverTarget = lastHoverKey.current;
  const prevHoverKey = useRef<string | null>(null);

  const box = (key: string | null): LensBox | null => {
    const el = key ? itemRefs.current.get(key) : null;
    return el ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight } : null;
  };
  const same = (a: LensBox | null, b: LensBox | null) =>
    a === b || (!!a && !!b && a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h);

  const measure = useCallback(() => {
    const next = { active: box(active), hover: box(hoverTarget) };
    // The hover lens glides item to item, but appears in place on a fresh hover.
    const hoverGlide = prevHoverKey.current !== null && hoverKey !== null;
    setLens((prev) => {
      if (same(prev.active, next.active) && same(prev.hover, next.hover) && prev.hoverGlide === hoverGlide) return prev;
      const movedActive = !!prev.active && !!next.active && prev.active.y !== next.active.y;
      const movedHover = hoverGlide && !!prev.hover && !!next.hover && prev.hover.y !== next.hover.y;
      if (movedActive || movedHover) setStretch((st) => ({ active: st.active + (movedActive ? 1 : 0), hover: st.hover + (movedHover ? 1 : 0) }));
      return { ...next, hoverGlide };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, hoverTarget, hoverKey]);

  useLayoutEffect(() => {
    measure();
    prevHoverKey.current = hoverKey;
    const nav = navRef.current;
    if (!nav) return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [measure, hoverKey, collapsed]);

  // First placement of the active lens jumps; every move after that glides.
  useLayoutEffect(() => {
    if (lens.active && !lensReady) {
      const id = requestAnimationFrame(() => setLensReady(true));
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [lens.active, lensReady]);

  return (
    <LiquidBackdrop src={backgroundImage} veil="var(--liquid-overlay-tint)" className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      {/* 2 · the one glass sheet over the photo (its 5% fill is the backdrop's veil) */}
      <LiquidGlass variant="regular" tint="none" radius={0} className={styles.overlay} />

      <div className={styles.shell}>
        {/* 3 · chrome: transparent, borrows the overlay's glass */}
        <div data-surface="liquid" className={`${styles.sidebarWrap} ${collapsed ? "" : styles.expanded}`}>
          <Sidebar collapsed={collapsed}>
            {/* The design sets the header's text to fg/on-inverse: it sits over the sky. */}
            <div data-on-photo>
              <SidebarHeader
                type="brand-toggle"
                title="csakani"
                subtitle="Workspace"
                logo={<span className={styles.logoDark}><SakaniLogo /></span>}
                collapsed={collapsed}
                onToggle={() => setCollapsed((c) => !c)}
                toggleIcon={PanelRightClose}
              />
            </div>
            <div
              ref={navRef}
              className={styles.navScroll}
              onPointerLeave={() => { setHovered(null); setPressed(false); }}
              onPointerDown={() => setPressed(true)}
              onPointerUp={() => setPressed(false)}
              onPointerCancel={() => setPressed(false)}
              onBlur={() => setHovered(null)}
            >
              {/* both lenses sit behind the items (first children, z-index 0) */}
              {lens.active && (
                <div
                  aria-hidden="true"
                  className={`${styles.lens} ${lensReady ? styles.lensGlide : ''} ${pressed && hoverKey === null ? styles.lensPressed : ''}`}
                  style={{ width: lens.active.w, height: lens.active.h, ['--lx' as string]: `${lens.active.x}px`, ['--ly' as string]: `${lens.active.y}px` }}
                >
                  <LiquidGlass variant="clear" radius={6} className={`${styles.lensGlass} ${stretch.active ? styles[`stretch${stretch.active % 2}`] : ''}`} />
                </div>
              )}
              {lens.hover && (
                <div
                  aria-hidden="true"
                  className={[
                    styles.lens, styles.lensHover,
                    hoverKey ? styles.lensHoverOn : '',
                    lens.hoverGlide ? styles.lensGlide : '',
                    pressed && hoverKey ? styles.lensPressed : '',
                  ].filter(Boolean).join(' ')}
                  style={{ width: lens.hover.w, height: lens.hover.h, ['--lx' as string]: `${lens.hover.x}px`, ['--ly' as string]: `${lens.hover.y}px` }}
                >
                  <LiquidGlass variant="clear" radius={6} className={`${styles.lensGlass} ${styles.lensGlassHover} ${stretch.hover ? styles[`stretch${stretch.hover % 2}`] : ''}`} />
                </div>
              )}
              {NAV.map((group) => (
                <div key={group.label} className={styles.navGroup}>
                  {!collapsed && <div className={styles.groupLabel}><SidebarGroupLabel>{group.label}</SidebarGroupLabel></div>}
                  {group.items.map((item) => {
                    const el = (
                      <SidebarItem
                        icon={item.icon}
                        label={item.label}
                        active={item.label === active}
                        collapsed={collapsed}
                        nativeTooltip={!collapsed}
                        onClick={() => setActive(item.label)}
                      />
                    );
                    return (
                      <div
                        key={item.label}
                        ref={(node) => { if (node) itemRefs.current.set(item.label, node); else itemRefs.current.delete(item.label); }}
                        className={styles.navItem}
                        onPointerEnter={() => setHovered(item.label)}
                        onFocus={() => setHovered(item.label)}
                      >
                        {collapsed
                          ? <Tooltip title={item.label} pointer="center-right">{el}</Tooltip>
                          : el}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {!collapsed && (
              <div className={styles.promoWrap} data-on-photo>
                <LiquidGlass variant="clear" tint="subtle" radius={16}>
                  <SidebarPromo
                    title="Upgrade to Pro"
                    description="Unlock unlimited projects and advanced analytics."
                    ctaLabel="Upgrade"
                  />
                </LiquidGlass>
              </div>
            )}
          </Sidebar>
        </div>

        <div className={styles.main}>
          <div data-surface="liquid" data-on-photo>
            <TopBar
              type="minimal"
              showToggle={false}
              left={
                <div className={styles.topbarLeft}>
                  <LayoutPanelTop size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span className={styles.topbarTitle}>Dashboard</span>
                </div>
              }
              rightSlot={<SearchExpand />}
              showActions
              showHelp={false}
              hasUnread
              account={<Avatar size="md" src={accountAvatar} alt="Account" />}
            />
          </div>

          {/* the main panel: its own sheet of glass, 76% tint; cards stay solid */}
          <div className={styles.panelWrap}>
            <LiquidGlass variant="regular" radius={24} className={styles.panel}>
              <div className={styles.panelScroll}>
                <DashboardContent people={people} />
              </div>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </LiquidBackdrop>
  );
};

export default LiquidDashboardBlock;
