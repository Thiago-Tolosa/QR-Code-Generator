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
  const [imageState, setImageState] =
    useState<FileImageState>({
      previewUrl: "",
    });

  const effectiveImage = isCustomEnabled
    ? imageState.previewUrl
    : "";

  const buildQrOptions = () => ({
    width: 420,
    height: 420,
    type: "svg" as const,
    data: data.trim() || DEFAULT_DATA,
    margin: 0,
    qrOptions: {
      errorCorrectionLevel: "H" as const,
    },
    image: effectiveImage || undefined,
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 6,
      imageSize: 0.65,
      hideBackgroundDots: true,
    },
    dotsOptions: {
      type: isCustomEnabled ? dotsType : "square",
      color: isCustomEnabled ? dotsColor : "#000000",
    },
    cornersSquareOptions: {
      type: isCustomEnabled ? cornersSquareType : "square",
      color: isCustomEnabled ? cornersSquareColor : "#000000",
    },
    cornersDotOptions: {
      type: isCustomEnabled ? cornersDotType : "square",
      color: isCustomEnabled ? cornersDotColor : "#000000",
    },
    backgroundOptions: {
      color: isCustomEnabled ? backgroundColor : "#ffffff",
    },
  });

  const [appliedQrOptions, setAppliedQrOptions] = useState(
    buildQrOptions()
  );

  const memoAppliedQrOptions = useMemo(
    () => appliedQrOptions,
    [appliedQrOptions]
  );

  const { qrRef, downloadPng, downloadSvg } =
    useQrCode(memoAppliedQrOptions, isModalOpen);

  function applyQrChanges() {
    setAppliedQrOptions(buildQrOptions());
  }

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
    removeCenterImage();

    setAppliedQrOptions({
      width: 420,
      height: 420,
      type: "svg",
      data: DEFAULT_DATA,
      margin: 0,
      qrOptions: {
        errorCorrectionLevel: "H",
      },
      image: undefined,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 6,
        imageSize: 0.65,
        hideBackgroundDots: true,
      },
      dotsOptions: {
        type: "square",
        color: "#000000",
      },
      cornersSquareOptions: {
        type: "square",
        color: "#000000",
      },
      cornersDotOptions: {
        type: "square",
        color: "#000000",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
    });

    setData(DEFAULT_DATA);
  }

  return (
    <main className="app-shell">
      <div className="app-content">
        <Hero openModal={() => setIsModalOpen(true)} />

        <footer className="app-footer">
          <p>© 2026 QR Studio • Thiago Tolosa</p>
        </footer>
      </div>

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
          imageState={imageState}
          setImageState={setImageState}
          removeCenterImage={removeCenterImage}
          applyQrChanges={applyQrChanges}
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