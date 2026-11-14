import { Dialog } from "@ark-ui/solid/dialog";
import { Portal } from "solid-js/web";
import { css } from "styled-system/css";
import { button, quietButton } from "./Page";

const styles = {
  backdrop: css({ position: "fixed", inset: 0, zIndex: "overlay", bg: "rgba(0,0,0,.45)" }),
  positioner: css({
    position: "fixed",
    inset: 0,
    zIndex: "sheet",
    display: "flex",
    alignItems: { base: "flex-end", sm: "center" },
    justifyContent: "center",
    p: { base: 0, sm: "20px" },
  }),
  content: css({
    w: "100%",
    maxW: { base: "100%", sm: "420px" },
    bg: "surface",
    color: "ink",
    rounded: { base: "22px 22px 0 0", sm: "lg" },
    p: "22px 20px calc(22px + env(safe-area-inset-bottom))",
    boxShadow: "sheet",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }),
  title: css({ fontSize: "18px", fontWeight: "650" }),
  description: css({ fontSize: "14.5px", color: "ink.muted", lineHeight: "1.5" }),
  actions: css({
    mt: "10px",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
  }),
};

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/** A yes/no question: a bottom sheet on phones, a centred dialog on larger screens. */
export function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Dialog.Root
      open={props.open}
      onOpenChange={(d) => {
        if (!d.open) props.onCancel();
      }}
      role="alertdialog"
    >
      <Portal>
        <Dialog.Backdrop class={styles.backdrop} />
        <Dialog.Positioner class={styles.positioner}>
          <Dialog.Content class={styles.content}>
            <Dialog.Title class={styles.title}>{props.title}</Dialog.Title>
            <Dialog.Description class={styles.description}>{props.description}</Dialog.Description>
            <div class={styles.actions}>
              <Dialog.CloseTrigger class={quietButton}>
                {props.cancelLabel ?? "Cancel"}
              </Dialog.CloseTrigger>
              <button type="button" class={button} onClick={() => props.onConfirm()}>
                {props.confirmLabel}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
