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
  Search, Inbox, AtSign, FileText, Archive, MailOpen, Hash, User,
  Settings, MessageCircleMore, Phone, Video, PanelRight,
} from 'lucide-react';
import { Input } from '../../components/Input';
import { Divider } from '../../components/Divider';
import { Avatar } from '../../components/Avatar';
import { SidebarHeader } from '../../components/SidebarHeader';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarGroupLabel } from '../../components/SidebarGroupLabel';
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
const NAV_GROUPS = [
  { label: 'Messages', items: [
    { icon: Inbox,    label: 'Inbox',    active: true, badge: '12' },
    { icon: MailOpen, label: 'Unread',   badge: '3' },
    { icon: AtSign,   label: 'Mentions' },
    { icon: FileText, label: 'Drafts' },
    { icon: Archive,  label: 'Archived' },
  ]},
  { label: 'Channels', items: [
    { icon: Hash, label: 'general' },
    { icon: Hash, label: 'design' },
    { icon: Hash, label: 'engineering' },
    { icon: Hash, label: 'product' },
  ]},
  { label: 'Direct', items: [
    { icon: User, label: 'Amara Chen' },
    { icon: User, label: 'Daniel Osei' },
    { icon: User, label: 'Priya Raman' },
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
  { name: 'Marketing team', initials: 'MT', time: 'Yesterday', preview: 'Campaign assets are ready',          state: 'default' },
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
          collapsed={collapsed}
        />

        <div className={styles.nav__body}>
          {!collapsed && (
            <Input size="sm" leadingIcon={<Search size={16} />} placeholder="Search" />
          )}

          {NAV_GROUPS.map((group, gi) => (
            <React.Fragment key={group.label}>
              {gi > 0 && <Divider />}
              <div className={styles.nav__group}>
                {!collapsed && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={item.active}
                    badge={collapsed ? undefined : item.badge}
                    collapsed={collapsed}
                  />
                ))}
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
