/**
 * ChatInterfaceBlock — Blocks / Chat / Desktop Chat Interface
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file and edit
 * it: change the nav groups, swap the conversations, edit the thread.
 *
 * Architecture (read from the Figma block, 1440×930):
 *
 *   app sidebar (240 · 64 collapsed)   main
 *   ├─ SidebarHeader (brand + toggle)  ├─ TopBar  type="minimal"  "Messages"
 *   ├─ search Input                    └─ content
 *   ├─ nav group ×3 (label + items)       ├─ header row
 *   └─ Settings · Contact support          │   ├─ SegmentedControl (240)
 *                                          │   └─ TopBar type="chat" (avatar,
 *                                          │       name, presence, actions)
 *                                          └─ panes
 *                                              ├─ conversation list (240)
 *                                              └─ chat card (radius 24,
 *                                                  bg/surface) → thread +
 *                                                  ChatComposer
 *
 * States:
 *   default   · expanded sidebar, conversation open
 *   collapsed · 64px icon rail; the main area reclaims the width
 *   empty     · no conversation selected — the chat header row is hidden
 */

import React from 'react';
import {
  Search, House, ChartPie, Calendar, Mail, Bell,
  Users, Boxes, Merge, Group,
  Settings, MessageCircleMore, Phone, Video, PanelRight,
} from 'lucide-react';
import { Input } from '../../components/Input';
import { Divider } from '../../components/Divider';
import { Avatar } from '../../components/Avatar';
import { SidebarHeader } from '../../components/SidebarHeader';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarGroupLabel } from '../../components/SidebarGroupLabel';
import { SidebarSubItem } from '../../components/SidebarSubItem';
import { SegmentedControl } from '../../components/SegmentedControl';
import { TopBar } from '../../components/TopBar';
import { ConversationItem } from '../../components/ConversationItem';
import { MessageBubble } from '../../components/MessageBubble';
import { ChatComposer } from '../../components/ChatComposer';
import { EmptyState } from '../../components/EmptyState';
import styles from './ChatInterfaceBlock.module.css';

export type ChatInterfaceBlockState = 'default' | 'collapsed' | 'empty';

/* ------------------------------------------------------------------ *
 * Sample data — replace with your own
 * ------------------------------------------------------------------ */
const NAV_GROUPS: Array<{
  label: string;
  items: Array<{ icon?: typeof House; label: string; active?: boolean; badge?: string }>;
}> = [
  { label: 'Menu', items: [
    { icon: House,    label: 'Dashboard' },
    { icon: ChartPie, label: 'Reports' },
    { icon: Calendar, label: 'Schedules' },
    { icon: Mail,     label: 'Messages', active: true, badge: '12' },
    { icon: Bell,     label: 'Notification', badge: '2' },
  ]},
  { label: 'Customer management', items: [
    { icon: Users, label: 'Customers' },
    { icon: Boxes, label: 'Suppliers' },
    { icon: Merge, label: 'Channels' },
    { icon: Group, label: 'Groups' },
  ]},
  // Pipelines entries carry no icon in the design.
  { label: 'Pipelines', items: [
    { label: 'North America' },
    { label: 'EMEA Enterprise' },
    { label: 'APAC Expansion' },
  ]},
];

type ConvState = 'default' | 'active' | 'unread' | 'typing' | 'muted';
const CONVERSATIONS: Array<{
  name: string; initials: string; time: string; preview: string;
  state: ConvState; unread?: number;
}> = [
  { name: 'Amara Chen',     initials: 'AC', time: '12:04',     preview: 'Sounds good — shipping today',      state: 'active' },
  { name: 'Design guild',   initials: 'DG', time: '11:52',     preview: 'Can you review the latest flow?',   state: 'unread', unread: 3 },
  { name: 'Daniel Osei',    initials: 'DO', time: '11:20',     preview: 'On it',                              state: 'typing' },
  { name: 'Priya Raman',    initials: 'PR', time: 'Yesterday', preview: 'Thanks for the handoff',             state: 'default' },
  { name: 'Engineering leadership sync', initials: 'EL', time: 'Yesterday', preview: 'Reminder: the quarterly planning doc needs review before Friday', state: 'default' },
  { name: 'Marcus Reid',    initials: 'MR', time: 'Mon',       preview: 'Let me check the numbers',           state: 'default' },
  { name: 'Zara Ali',       initials: 'ZA', time: 'Mon',       preview: 'Perfect, see you then',              state: 'default' },
  { name: 'Release bot',    initials: 'RB', time: 'Sun',       preview: 'v1.1.0 deployed to production',      state: 'muted' },
];

/* ------------------------------------------------------------------ *
 * The block
 * ------------------------------------------------------------------ */
export interface ChatInterfaceBlockProps {
  state?: ChatInterfaceBlockState;
  className?: string;
}

export const ChatInterfaceBlock: React.FC<ChatInterfaceBlockProps> = ({
  state = 'default',
  className,
}) => {
  const collapsed = state !== 'default';
  const showThread = state !== 'empty';

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      {/* ============ App navigation sidebar ============ */}
      <aside className={[styles.nav, collapsed ? styles['nav--collapsed'] : ''].filter(Boolean).join(' ')}>
        <SidebarHeader
          type="brand-toggle"
          title="Sakani"
          subtitle="Workspace"
          logo={<span className={styles.logoMark}>S</span>}
          collapsed={collapsed}
        />

        <div className={styles.nav__body}>
          {!collapsed && (
            <Input size="sm" leadingIcon={<Search size={16} />} placeholder="Search" />
          )}

          {/* Collapsed rail shows only icon-bearing groups — icon-less entries
              (Pipelines) would render as empty rows, and the design omits them. */}
          {NAV_GROUPS
            .filter((group) => !collapsed || group.items.some((i) => i.icon))
            .map((group, gi) => (
              <React.Fragment key={group.label}>
                {gi > 0 && <Divider />}
                <div className={styles.nav__group}>
                  {!collapsed && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
                  {group.items.map((item) =>
                    item.icon ? (
                      <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        active={item.active}
                        badge={collapsed ? undefined : item.badge}
                        collapsed={collapsed}
                      />
                    ) : (
                      // Pipelines entries use Sidebar Sub Item (dot + label) in the design.
                      <SidebarSubItem key={item.label} label={item.label} active={item.active} />
                    )
                  )}
                </div>
              </React.Fragment>
            ))}
        </div>

        <Divider />
        <div className={styles.nav__footer}>
          <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
          <SidebarItem icon={MessageCircleMore} label="Contact support" collapsed={collapsed} />
        </div>
      </aside>

      {/* ============ Main ============ */}
      <div className={styles.main}>
        <TopBar
          className={styles.appBar}
          type="minimal"
          density="sm"
          showToggle={false}
          hasUnread
          left={<span className={styles.pageTitle}>Messages</span>}
          account={<Avatar size="sm" initials="SO" />}
        />

        <div className={styles.content}>
          {/* ---- header row: list filter + conversation header ---- */}
          {showThread && (
            <div className={styles.headerRow}>
              <div className={styles.headerRow__filter}>
                <SegmentedControl
                  fullWidth
                  defaultValue="all"
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'unread', label: 'Unread' },
                    { value: 'groups', label: 'Groups' },
                  ]}
                />
              </div>
              <div className={styles.headerRow__chat}>
                <TopBar
                  type="chat"
                  density="sm"
                  avatar={<Avatar size="md" initials="AC" />}
                  title="Amara Chen"
                  subtitle="Active now"
                  actions={
                    <>
                      <button type="button" className={styles.chatAction} aria-label="Call"><Phone size={16} /></button>
                      <button type="button" className={styles.chatAction} aria-label="Video call"><Video size={16} /></button>
                      <button type="button" className={styles.chatAction} aria-label="Conversation details"><PanelRight size={16} /></button>
                    </>
                  }
                />
              </div>
            </div>
          )}

          {/* ---- panes ---- */}
          <div className={styles.panes}>
            {/* conversation list */}
            <div className={styles.list}>
              <div className={styles.list__search}>
                <Input size="sm" leadingIcon={<Search size={16} />} placeholder="Search conversations" />
              </div>
              {CONVERSATIONS.map((c) => (
                <ConversationItem
                  key={c.name}
                  state={state === 'empty' && c.state === 'active' ? 'default' : c.state}
                  avatar={<Avatar size="md" initials={c.initials} />}
                  name={c.name}
                  timestamp={c.time}
                  preview={c.preview}
                  unreadCount={c.unread}
                />
              ))}
            </div>

            {/* chat card */}
            <div className={styles.chat}>
              {showThread ? (
                <>
                  <div className={styles.thread}>
                    {/* date divider — rule · label · rule */}
                    <div className={styles.dateRow}>
                      <Divider />
                      <MessageBubble type="system">Today</MessageBubble>
                      <Divider />
                    </div>

                    <div className={styles.msgRow}>
                      <MessageBubble
                        type="received"
                        avatar={<Avatar size="sm" initials="AC" />}
                        authorName="Amara Chen"
                        timestamp="12:04"
                      >
                        Can you review the latest flow when you get a chance?
                      </MessageBubble>
                    </div>

                    <div className={[styles.msgRow, styles['msgRow--sent']].join(' ')}>
                      <MessageBubble type="sent" timestamp="12:06" read>
                        Just pushed the update — should be live now.
                      </MessageBubble>
                    </div>

                    <div className={styles.msgRow}>
                      <MessageBubble
                        type="received"
                        content="image"
                        avatar={<Avatar size="sm" initials="AC" />}
                        authorName="Amara Chen"
                        timestamp="12:09"
                        image={<div className={styles.imagePlaceholder} />}
                      >
                        Latest board attached
                      </MessageBubble>
                    </div>

                    <div className={[styles.msgRow, styles['msgRow--sent']].join(' ')}>
                      <MessageBubble
                        type="sent"
                        content="file"
                        fileName="Sakani-specs.pdf"
                        fileSize="2.4 MB"
                        timestamp="12:11"
                        read
                      />
                    </div>

                    {/* typing indicator */}
                    <div className={styles.msgRow}>
                      <div className={styles.typing} aria-label="Amara is typing">
                        <span /><span /><span />
                      </div>
                    </div>
                  </div>

                  <ChatComposer placeholder="Message Amara…" />
                </>
              ) : (
                <div className={styles.chatEmpty}>
                  <EmptyState
                    type="no-data"
                    title="No conversation selected"
                    description="Choose a conversation from the list to start reading."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterfaceBlock;
