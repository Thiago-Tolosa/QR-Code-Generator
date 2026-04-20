import type { RefObject } from "react";

type Props = {
  qrRef: RefObject<HTMLDivElement | null>;
};

export function QrPreview({
  qrRef,
}: Props) {
  return (
    <div className="preview-box">
      <div
        ref={qrRef}
        className="qr-mount"
      />
    </div>
  );
}