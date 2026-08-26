/**
 * FileUploadPanelBlock — Blocks / Application / File Upload Panel
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Matches Figma "File Upload Panel": dashed dropzone -> list of files, each
 * showing a different status (Complete / Pending confirmation / Uploading).
 * Empty/With Files isn't a manual prop -- the list section only renders
 * once `files` is non-empty, same "derive from data" pattern used
 * throughout the Application set.
 *
 * The dropzone is NOT a reuse of the shared FileUpload component: FileUpload
 * owns its own internal file list (name + remove button only), which can't
 * show per-file size/status/progress or coexist with this block's richer
 * row -- so the dropzone is rebuilt here directly (same drag/drop/click
 * interaction), and IconButton + Progress are reused for the row controls.
 */

import React from 'react';
import { UploadCloud, File as FileIcon, Check, X } from 'lucide-react';
import { IconButton } from '../../components/IconButton';
import { Progress } from '../../components/Progress';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './FileUploadPanelBlock.module.css';

interface PanelFile {
  id: string;
  name: string;
  size: string;
  status: 'complete' | 'pending' | 'uploading';
  progress?: number;
}

const INITIAL_FILES: PanelFile[] = [
  { id: '1', name: 'design-tokens.json', size: '24 KB', status: 'complete' },
  { id: '2', name: 'brand-guidelines.pdf', size: '2.4 MB', status: 'pending' },
  { id: '3', name: 'logo-assets.zip', size: '4.1 MB', status: 'uploading', progress: 60 },
];

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export type FileUploadPanelBlockState = 'empty' | 'with-files';

export interface FileUploadPanelBlockProps {
  /** Seeds the demo file list. Real usage would drive `files` from actual upload state instead. */
  state?: FileUploadPanelBlockState;
  className?: string;
}

export const FileUploadPanelBlock: React.FC<FileUploadPanelBlockProps> = ({ state = 'with-files', className }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState<PanelFile[]>(state === 'with-files' ? INITIAL_FILES : []);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming: PanelFile[] = Array.from(list).map((f, i) => ({
      id: `${Date.now()}-${i}`,
      name: f.name,
      size: formatSize(f.size),
      status: 'pending',
    }));
    setFiles((current) => [...current, ...incoming]);
  };

  const removeFile = (id: string) => setFiles((current) => current.filter((f) => f.id !== id));
  const confirmFile = (id: string) => setFiles((current) => current.map((f) => (f.id === id ? { ...f, status: 'complete' } : f)));

  return (
    <div className={[styles.panel, className ?? ''].filter(Boolean).join(' ')}>
      <div
        className={[styles.dropzone, dragging ? styles.dropzoneDragging : ''].filter(Boolean).join(' ')}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      >
        <span className={styles.dropzoneIcon} aria-hidden="true">
          <UploadCloud size={20} strokeWidth={iconStrokeWidth(20)} />
        </span>
        <p className={styles.dropzoneLabel}>Click to upload or drag and drop</p>
        <p className={styles.dropzoneHint}>SVG, PNG, JPG or PDF (max. 2MB)</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className={styles.input}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className={styles.list}>
          {files.map((file) => (
            <div key={file.id} className={styles.row}>
              <span className={styles.fileIcon} aria-hidden="true">
                <FileIcon size={16} strokeWidth={iconStrokeWidth(16)} />
              </span>
              <div className={styles.info}>
                <p className={styles.name}>{file.name}</p>
                {file.status === 'uploading' ? (
                  <Progress value={file.progress ?? 0} size="sm" label={`Uploading ${file.name}`} />
                ) : (
                  <p className={styles.meta}>
                    {file.size}{file.status === 'complete' ? ' · Complete' : ''}
                  </p>
                )}
              </div>
              {file.status === 'complete' && (
                <Check size={18} strokeWidth={iconStrokeWidth(18)} className={styles.completeIcon} aria-label="Complete" />
              )}
              {file.status === 'pending' && (
                <div className={styles.rowActions}>
                  <IconButton icon={Check} variant="outline" size="sm" aria-label={`Confirm ${file.name}`} onClick={() => confirmFile(file.id)} />
                  <IconButton icon={X} variant="outline" size="sm" aria-label={`Remove ${file.name}`} onClick={() => removeFile(file.id)} />
                </div>
              )}
              {file.status === 'uploading' && (
                <IconButton icon={X} variant="outline" size="sm" aria-label={`Cancel ${file.name}`} onClick={() => removeFile(file.id)} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadPanelBlock;
