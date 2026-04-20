import { useEffect, useMemo, useState } from "react";
import "./App.css";

import { Hero } from "./components/Hero";
import { QrModal } from "./components/QrModal";
import { useQrCode } from "./hooks/useQrCode";
import { DEFAULT_DATA } from "./constants/qrDefaults";

import type {
  DotType,
  CornerSquareType,
  CornerDotType,
  FileImageState,
} from "./types/qr";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(DEFAULT_DATA);
  const [isCustomEnabled, setIsCustomEnabled] = useState(false);
  const [dotsType, setDotsType] = useState<DotType>("square");
  const [cornersSquareType, setCornersSquareType] =
    useState<CornerSquareType>("square");
  const [cornersDotType, setCornersDotType] =
    useState<CornerDotType>("square");
  const [dotsColor, setDotsColor] = useState("#111827");
  const [cornersSquareColor, setCornersSquareColor] =
    useState("#111827");
  const [cornersDotColor, setCornersDotColor] =
    useState("#111827");
  const [backgroundColor, setBackgroundColor] =
    useState("#ffffff");
  const [qrSize, setQrSize] = useState(320);
  const [margin, setMargin] = useState(8);
  const [imageState, setImageState] =
    useState<FileImageState>({
      previewUrl: "",
    });

  const effectiveImage = isCustomEnabled
    ? imageState.previewUrl
    : "";

  const qrOptions = useMemo(
    () => ({
      width: qrSize,
      height: qrSize,
      type: "svg" as const,
      data: data.trim() || DEFAULT_DATA,
      margin,
      qrOptions: {
        errorCorrectionLevel: "H" as const,
      },
      image: effectiveImage || undefined,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 6,
        imageSize: 0.28,
        hideBackgroundDots: true,
      },
      dotsOptions: {
        type: isCustomEnabled ? dotsType : "square",
        color: isCustomEnabled ? dotsColor : "#000000",
      },
      cornersSquareOptions: {
        type: isCustomEnabled
          ? cornersSquareType
          : "square",
        color: isCustomEnabled
          ? cornersSquareColor
          : "#000000",
      },
      cornersDotOptions: {
        type: isCustomEnabled
          ? cornersDotType
          : "square",
        color: isCustomEnabled
          ? cornersDotColor
          : "#000000",
      },
      backgroundOptions: {
        color: isCustomEnabled
          ? backgroundColor
          : "#ffffff",
      },
    }),
    [
      data,
      qrSize,
      margin,
      effectiveImage,
      isCustomEnabled,
      dotsType,
      dotsColor,
      cornersSquareType,
      cornersSquareColor,
      cornersDotType,
      cornersDotColor,
      backgroundColor,
    ]
  );

  const { qrRef, downloadPng, downloadSvg } =
    useQrCode(qrOptions, isModalOpen);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      if (imageState.previewUrl) {
        URL.revokeObjectURL(imageState.previewUrl);
      }
    };
  }, [imageState.previewUrl]);

  function removeCenterImage() {
    if (imageState.previewUrl) {
      URL.revokeObjectURL(imageState.previewUrl);
    }

    setImageState({ previewUrl: "" });
  }

  function resetCustomization() {
    setIsCustomEnabled(false);
    setDotsType("square");
    setCornersSquareType("square");
    setCornersDotType("square");
    setDotsColor("#111827");
    setCornersSquareColor("#111827");
    setCornersDotColor("#111827");
    setBackgroundColor("#ffffff");
    setQrSize(320);
    setMargin(8);
    removeCenterImage();
  }

  return (
    <main className="app-shell">
      <Hero openModal={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <QrModal
          close={() => setIsModalOpen(false)}
          data={data}
          setData={setData}
          isCustomEnabled={isCustomEnabled}
          setIsCustomEnabled={setIsCustomEnabled}
          dotsType={dotsType}
          setDotsType={setDotsType}
          cornersSquareType={cornersSquareType}
          setCornersSquareType={setCornersSquareType}
          cornersDotType={cornersDotType}
          setCornersDotType={setCornersDotType}
          dotsColor={dotsColor}
          setDotsColor={setDotsColor}
          cornersSquareColor={cornersSquareColor}
          setCornersSquareColor={setCornersSquareColor}
          cornersDotColor={cornersDotColor}
          setCornersDotColor={setCornersDotColor}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          qrSize={qrSize}
          setQrSize={setQrSize}
          margin={margin}
          setMargin={setMargin}
          imageState={imageState}
          setImageState={setImageState}
          removeCenterImage={removeCenterImage}
          qrRef={qrRef}
          downloadPng={downloadPng}
          downloadSvg={downloadSvg}
          resetCustomization={resetCustomization}
        />
      )}
    </main>
  );
}

export default App;