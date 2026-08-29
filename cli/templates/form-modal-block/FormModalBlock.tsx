/**
 * FormModalBlock — Blocks / Application / Form Modal
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: swap the fields for your own form.
 *
 * Matches Figma "Form Modal": "Invite a teammate" -- Email input + Role
 * select, Cancel/Send invite footer. Reuses the shared Modal shell (its
 * `children` slot renders the form between the header and the footer's
 * Divider) rather than duplicating Modal's portal/focus-trap/dark-mode
 * plumbing here -- Input and Select are dropped straight in unmodified,
 * both already exact matches for Figma's Input/Select components.
 *
 * Loading isn't a separate manual state either -- submitting sets
 * `confirmLoading` on Modal, which already renders the spinner via Button;
 * only the label text ("Send invite" -> "Sending…") is swapped alongside it.
 */

import React from 'react';
import { Modal } from '@sakaniui/react';
import { Input } from '@sakaniui/react';
import { Select } from '@sakaniui/react';
import styles from './FormModalBlock.module.css';

const ROLE_OPTIONS = [
  { label: 'Admin', value: 'admin' },
  { label: 'Member', value: 'member' },
  { label: 'Viewer', value: 'viewer' },
];

export interface FormModalBlockProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

export const FormModalBlock: React.FC<FormModalBlockProps> = ({ open, onClose, className }) => {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    // Simulated request -- replace with your own submit handler.
    setTimeout(() => { setSubmitting(false); onClose(); }, 1500);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invite a teammate"
      confirmLabel={submitting ? 'Sending…' : 'Send invite'}
      confirmLoading={submitting}
      onConfirm={handleSubmit}
      closeOnEscape={!submitting}
      closeOnBackdropClick={!submitting}
      className={className}
    >
      <div className={styles.form}>
        <Input
          label="Email address"
          type="email"
          placeholder="colleague@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <Select
          label="Role"
          placeholder="Select a role"
          options={ROLE_OPTIONS}
          value={role}
          onChange={setRole}
          disabled={submitting}
        />
      </div>
    </Modal>
  );
};

export default FormModalBlock;
