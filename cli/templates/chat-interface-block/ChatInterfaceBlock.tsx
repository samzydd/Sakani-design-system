/**
 * ChatInterfaceBlock - Blocks / Chat / Desktop Chat Interface
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file and edit
 * it: change the nav groups, swap the conversations, edit the thread.
 *
 * Architecture (read from the Figma block, 1440x930):
 *
 *   app sidebar (240  64 collapsed)   main
 *   ├─ SidebarHeader (brand + toggle)  ├─ TopBar  type="minimal"  "Messages"
 *   ├─ search Input                    └─ content
 *   ├─ nav group x3 (label + items)       ├─ header row
 *   └─ Settings  Contact support          │   ├─ SegmentedControl (240)
 *                                          │   └─ TopBar type="chat" (avatar,
 *                                          │       name, presence, actions)
 *                                          └─ panes
 *                                              ├─ conversation list (240)
 *                                              └─ chat card (radius 24,
 *                                                  bg/surface) → thread +
 *                                                  ChatComposer
 *
 * States:
 *   default    expanded sidebar, conversation open
 *   collapsed  64px icon rail; the main area reclaims the width
 *   empty      no conversation selected - the chat header row is hidden
 */

import React from 'react';
import {
  Search, House, ChartPie, Calendar, Mail, Bell,
  Users, Boxes, Merge, Group,
  Settings, MessageCircleMore, Phone, Video, PanelRight,
} from 'lucide-react';
import { Input } from '@sakaniui/react';
import { Divider } from '@sakaniui/react';
import { Avatar } from '@sakaniui/react';
import { SidebarHeader } from '@sakaniui/react';
import { SidebarItem } from '@sakaniui/react';
import { SidebarGroupLabel } from '@sakaniui/react';
import { SidebarSubItem } from '@sakaniui/react';
import { SegmentedControl } from '@sakaniui/react';
import { TopBar } from '@sakaniui/react';
import { ConversationItem } from '@sakaniui/react';
import { MessageBubble } from '@sakaniui/react';
import { ChatComposer } from '@sakaniui/react';
import { EmptyState } from '@sakaniui/react';
import styles from './ChatInterfaceBlock.module.css';

export type ChatInterfaceBlockState = 'default' | 'collapsed' | 'empty';

/* ------------------------------------------------------------------ *
 * Sample data - replace with your own
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
  { name: 'Amara Chen',     initials: 'AC', time: '12:04',     preview: 'Sounds good - shipping today',      state: 'active' },
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

interface ChatMessage {
  id: string;
  type: 'sent' | 'received';
  text: string;
  timestamp: string;
  authorInitials?: string;
  attachments?: Array<{ name: string; type: string; dataUrl: string }>;
}

export const ChatInterfaceBlock: React.FC<ChatInterfaceBlockProps> = ({
  state = 'default',
  className,
}) => {
  const collapsed = state !== 'default';
  const showThread = state !== 'empty';
  const [selectedConv, setSelectedConv] = React.useState(0);
  const [composerValue, setComposerValue] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [attachedFiles, setAttachedFiles] = React.useState<Array<{ name: string; type: string; dataUrl: string }>>([]);
  const currentConv = CONVERSATIONS[selectedConv];

  // Load messages from localStorage on mount and when conversation changes
  React.useEffect(() => {
    const storageKey = `chat_messages_${selectedConv}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored messages:', e);
        setMessages([]);
      }
    } else {
      // Initialize with default messages for first conversation
      if (selectedConv === 0) {
        const defaultMessages: ChatMessage[] = [
          {
            id: '1',
            type: 'received',
            text: 'Can you review the latest flow when you get a chance?',
            timestamp: '12:04',
            authorInitials: currentConv.initials,
          },
          {
            id: '2',
            type: 'sent',
            text: 'Just pushed the update - should be live now.',
            timestamp: '12:06',
          },
          {
            id: '3',
            type: 'received',
            text: 'Latest board attached',
            timestamp: '12:09',
            authorInitials: currentConv.initials,
          },
        ];
        setMessages(defaultMessages);
        localStorage.setItem(storageKey, JSON.stringify(defaultMessages));
      } else {
        setMessages([]);
      }
    }
    setComposerValue('');
    setAttachedFiles([]);
  }, [selectedConv, currentConv.initials]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (composerValue.trim() || attachedFiles.length > 0) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        type: 'sent',
        text: composerValue,
        timestamp: time,
        attachments: attachedFiles.length > 0 ? attachedFiles : undefined,
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      
      // Save to localStorage
      const storageKey = `chat_messages_${selectedConv}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
      
      // Clear the input and attachments
      setComposerValue('');
      setAttachedFiles([]);
    }
  };

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

          {/* Collapsed rail shows only icon-bearing groups - icon-less entries
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
          {/* ---- panes ---- */}
          <div className={styles.panes}>
            {/* conversation list */}
            <div className={styles.list}>
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
              <div className={styles.list__search}>
                <Input size="sm" leadingIcon={<Search size={16} />} placeholder="Search conversations" />
              </div>
              {CONVERSATIONS.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedConv(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <ConversationItem
                    state={selectedConv === idx ? 'active' : (state === 'empty' && c.state === 'active' ? 'default' : c.state)}
                    avatar={<Avatar size="md" initials={c.initials} />}
                    name={c.name}
                    timestamp={c.time}
                    preview={c.preview}
                    unreadCount={c.unread}
                  />
                </button>
              ))}
            </div>

            {/* chat area: header + messages */}
            <div className={styles.chatColumn}>
              {showThread && (
                <div className={styles.headerRow}>
                  <div className={styles.headerRow__chat}>
                    <TopBar
                      type="chat"
                      density="sm"
                      avatar={<Avatar size="md" initials={currentConv.initials} />}
                      title={currentConv.name}
                      subtitle={currentConv.state === 'typing' ? 'Typing...' : 'Active now'}
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

              {/* chat card */}
              <div className={styles.chat}>
              {showThread ? (
                <>
                  <div className={styles.thread}>
                    {/* date divider */}
                    <div className={styles.dateRow}>
                      <Divider />
                      <MessageBubble type="system">Today</MessageBubble>
                      <Divider />
                    </div>

                    {/* Render all messages from state */}
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={msg.type === 'sent' ? [styles.msgRow, styles['msgRow--sent']].join(' ') : styles.msgRow}
                      >
                        <div>
                          <MessageBubble
                            type={msg.type}
                            avatar={msg.type === 'received' ? <Avatar size="sm" initials={msg.authorInitials || currentConv.initials} /> : undefined}
                            authorName={msg.type === 'received' ? (msg.authorInitials === currentConv.initials ? currentConv.name : 'User') : undefined}
                            timestamp={msg.timestamp}
                            read={msg.type === 'sent'}
                          >
                            {msg.text}
                          </MessageBubble>
                          
                          {/* Display attachments */}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '8px',
                              marginTop: '8px',
                            }}>
                              {msg.attachments.map((file, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    backgroundColor: 'var(--color-bg-muted)',
                                    border: '1px solid var(--color-border-default)',
                                  }}
                                >
                                  {file.type.startsWith('image/') ? (
                                    <img
                                      src={file.dataUrl}
                                      alt={file.name}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <div style={{ textAlign: 'center', padding: '12px' }}>
                                      <div style={{ fontSize: '28px', marginBottom: '4px' }}>📹</div>
                                      <div style={{ fontSize: '10px', color: 'var(--color-fg-muted)' }}>
                                        {file.name.split('.').pop()?.toUpperCase()}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* typing indicator */}
                    {currentConv.state === 'typing' && (
                      <div className={styles.msgRow}>
                        <div className={styles.typing} aria-label={`${currentConv.name} is typing`}>
                          <span /><span /><span />
                        </div>
                      </div>
                    )}
                  </div>

                  <ChatComposer
                    placeholder={`Message ${currentConv.name}...`}
                    value={composerValue}
                    onChange={setComposerValue}
                    onSend={handleSendMessage}
                    onAttachmentsChange={setAttachedFiles}
                  />
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
    </div>
  );
};

export default ChatInterfaceBlock;
