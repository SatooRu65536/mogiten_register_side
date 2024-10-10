import styles from './index.module.scss';
import { ReactElement, useCallback, useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactElement;
}

export default function Drawer({ open, setOpen, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickContent = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  useEffect((): void => {
    const dialogElement = dialogRef.current;
    if (dialogElement == undefined) return;

    if (open) {
      if (dialogElement.hasAttribute('open')) return;
      dialogElement.showModal();
    } else {
      if (!dialogElement.hasAttribute('open')) return;
      dialogElement.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClick={handleClose}>
      <div className={styles.content} onClick={handleClickContent}>
        {children}
      </div>
    </dialog>
  );
}
