import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

export function useQrCode(
  options: any,
  isModalOpen: boolean
) {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling(options);
    } else {
      qrCodeRef.current.update(options);
    }
  }, [options]);

  useEffect(() => {
    if (!isModalOpen) return;
    if (!qrRef.current || !qrCodeRef.current) return;

    qrRef.current.innerHTML = "";
    qrCodeRef.current.append(qrRef.current);
  }, [options, isModalOpen]);

  const downloadPng = () =>
    qrCodeRef.current?.download({
      extension: "png",
      name: "qr-studio",
    });

  const downloadSvg = () =>
    qrCodeRef.current?.download({
      extension: "svg",
      name: "qr-studio",
    });

  return {
    qrRef,
    downloadPng,
    downloadSvg,
  };
}