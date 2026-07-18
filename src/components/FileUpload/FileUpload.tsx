/**
 * FileUpload
 *
 * Dropzone for file uploads. Matches Figma "File Upload":
 *   dashed dropzone (radius-md), upload icon, "Click to upload or drag and drop"
 *   (label/md fg/default) + hint (body/xs fg/muted), plus an uploaded-file row.
 *
 * Functional: click to open the file picker, drag-and-drop with a hover state,
 * and a list of selected files each with a remove button.
 */

import React from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import styles from './FileUpload.module.css';

export interface FileUploadProps {
  /** Accepted file types (passed to the input's accept attr). */
  accept?: string;
  /** Allow multiple files. */
  multiple?: boolean;
  /** Hint line under the main label. */
  hint?: string;
  /** Called whenever the selected file list changes. */
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept, multiple, hint = 'SVG, PNG, JPG or PDF (max. 2MB)', onFilesChange, className,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const update = (next: File[]) => { setFiles(next); onFilesChange?.(next); };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    update(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  };

  const removeFile = (i: number) => update(files.filter((_, idx) => idx !== i));

  return (
    <div className={[styles.wrap, className ?? ''].filter(Boolean).join(' ')}>
      {/* Dropzone */}
      <div
        className={[styles.dropzone, dragging ? styles['dropzone--dragging'] : ''].filter(Boolean).join(' ')}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      >
        <span className={styles.dropzone__icon} aria-hidden="true"><UploadCloud size={22} strokeWidth={1.5} /></span>
        <span className={styles.dropzone__label}>
          <span className={styles.dropzone__link}>Click to upload</span> or drag and drop
        </span>
        <span className={styles.dropzone__hint}>{hint}</span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className={styles.input}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <ul className={styles.files}>
          {files.map((f, i) => (
            <li key={i} className={styles.file}>
              <span className={styles.file__icon} aria-hidden="true"><FileIcon size={16} strokeWidth={1.5} /></span>
              <span className={styles.file__name}>{f.name}</span>
              <button type="button" className={styles.file__remove} onClick={() => removeFile(i)} aria-label={`Remove ${f.name}`}>
                <X size={14} strokeWidth={1.5} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
