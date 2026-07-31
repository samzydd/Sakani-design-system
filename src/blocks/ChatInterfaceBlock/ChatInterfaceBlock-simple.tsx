import React from 'react';
import { Search, House, ChartPie, Calendar, Mail, Bell, Users, Boxes, Merge, Group, Settings, MessageCircleMore, Phone, Video, PanelRight } from 'lucide-react';
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

export interface ChatInterfaceBlockProps {
  state?: ChatInterfaceBlockState;
  className?: string;
}

const NAV_GROUPS = [
  { label: 'Menu', items: [
    { icon: House, label: 'Dashboard' },
    { icon: ChartPie, label: 'Reports' },
    { icon: Calendar, label: 'Schedules' },
    { icon: Mail, label: 'Messages', active: true, badge: '12' },
    { icon: Bell, label: 'Notification', badge: '2' },
  ]},
  { label: 'Customer management', items: [
    { icon: Users, label: 'Customers' },
    { icon: Boxes, label: 'Suppliers' },
    { icon: Merge, label: 'Channels' },
    { icon: Group, label: 'Groups' },
  ]},
  { label: 'Pipelines', items: [
    { label: 'North America' },
    { label: 'EMEA Enterprise' },
    { label: 'APAC Expansion' },
  ]},
];

const CONVERSATIONS = [
  { name: 'Amara Chen', initials: 'AC', time: '12:04', preview: 'Sounds good - shipping today', state: 'active', unread: 0 },
  { name: 'Design guild', initials: 'DG', time: '11:52', preview: 'Can you review the latest flow?', state: 'unread', unread: 3 },
  { name: 'Daniel Osei', initials: 'DO', time: '11:20', preview: 'On it', state: 'typing', unread: 0 },
];

export const ChatInterfaceBlock: React.FC<ChatInterfaceBlockProps> = ({ state = 'default', className }) => {
  const collapsed = state !== 'default';
  const showThread = state !== 'empty';
  const [selectedConv, setSelectedConv] = React.useState(0);
  const currentConv = CONVERSATIONS[selectedConv];

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <aside className={[styles.nav, collapsed ? styles['nav--collapsed'] : ''].filter(Boolean).join(' ')}>
        <SidebarHeader type="brand-toggle" title="Sakani" subtitle="Workspace" logo={<span className={styles.logoMark}>S</span>} collapsed={collapsed} />
        <div className={styles.nav__body}>
          {!collapsed && <Input size="sm" leadingIcon={<Search size={16} />} placeholder="Search" />}
          {NAV_GROUPS
            .filter((group) => !collapsed || group.items.some((i) => 'icon' in i))
            .map((group, gi) => (
              <React.Fragment key={group.label}>
                {gi > 0 && <Divider />}
                <div className={styles.nav__group}>
                  {!collapsed && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
                  {group.items.map((item) =>
                    'icon' in item ? (
                      <SidebarItem key={item.label} icon={item.icon} label={item.label} active={item.active} badge={collapsed ? undefined : item.badge} collapsed={collapsed} />
                    ) : (
                      <SidebarSubItem key={item.label} label={item.label} active={item.active} />
                    )
                  )}
                </div>
              </React.Fragment>
            ))}
        </div>
      </aside>

      <div className={styles.main}>
        <TopBar type="minimal" title="Messages" density="md" />
        <div className={styles.content}>
          <div className={styles.panes}>
            <div className={styles.list}>
              {!collapsed && <SegmentedControl options={[{ label: 'Inbox', value: 'inbox' }, { label: 'Archived', value: 'archived' }]} value="inbox" onChange={() => {}} />}
              <div style={{ marginTop: '12px' }}>
                {CONVERSATIONS.map((c, idx) => (
                  <button key={c.name} onClick={() => setSelectedConv(idx)} style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', padding: 0 }}>
                    <ConversationItem state={selectedConv === idx ? 'active' : c.state as any} avatar={<Avatar size="md" initials={c.initials} />} name={c.name} timestamp={c.time} preview={c.preview} unreadCount={c.unread} />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.chatColumn}>
              {showThread && (
                <div className={styles.headerRow}>
                  <div className={styles.headerRow__chat}>
                    <TopBar type="chat" density="sm" avatar={<Avatar size="md" initials={currentConv.initials} />} title={currentConv.name} subtitle={currentConv.state === 'typing' ? 'Typing...' : 'Active now'} actions={<><button type="button" className={styles.chatAction} aria-label="Call"><Phone size={16} /></button><button type="button" className={styles.chatAction} aria-label="Video call"><Video size={16} /></button><button type="button" className={styles.chatAction} aria-label="Details"><PanelRight size={16} /></button></>} />
                  </div>
                </div>
              )}

              <div className={styles.chat}>
                {showThread ? (
                  <>
                    <div className={styles.thread}>
                      <div className={styles.dateRow}>
                        <Divider />
                        <MessageBubble type="system">Today</MessageBubble>
                        <Divider />
                      </div>

                      <div className={styles.msgRow}>
                        <MessageBubble type="received" avatar={<Avatar size="sm" initials={currentConv.initials} />} authorName={currentConv.name} timestamp="12:04">
                          Can you review the latest flow when you get a chance?
                        </MessageBubble>
                      </div>

                      <div className={[styles.msgRow, styles['msgRow--sent']].join(' ')}>
                        <MessageBubble type="sent" timestamp="12:06" read>Just pushed the update - should be live now.</MessageBubble>
                      </div>
                    </div>
                    <ChatComposer placeholder={`Message ${currentConv.name}...`} />
                  </>
                ) : (
                  <div className={styles.chatEmpty}>
                    <EmptyState type="no-data" title="No conversation selected" description="Choose a conversation from the list to start reading." />
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
