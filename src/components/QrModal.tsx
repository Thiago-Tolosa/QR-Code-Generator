import { QrControls } from "./QrControls";
import { QrPreview } from "./QrPreview";
import type {
  DotType,
  CornerDotType,
  CornerSquareType,
  FileImageState,
} from "../types/qr";

type Props = {
  close: () => void;

  data: string;
  setData: (value: string) => void;

  isCustomEnabled: boolean;
  setIsCustomEnabled: (value: boolean) => void;

  dotsType: DotType;
  setDotsType: (value: DotType) => void;

  cornersSquareType: CornerSquareType;
  setCornersSquareType: (value: CornerSquareType) => void;

  cornersDotType: CornerDotType;
  setCornersDotType: (value: CornerDotType) => void;

  dotsColor: string;
  setDotsColor: (value: string) => void;

  cornersSquareColor: string;
  setCornersSquareColor: (value: string) => void;

  cornersDotColor: string;
  setCornersDotColor: (value: string) => void;

  backgroundColor: string;
  setBackgroundColor: (value: string) => void;

  qrSize: number;
  setQrSize: (value: number) => void;

  margin: number;
  setMargin: (value: number) => void;

  imageState: FileImageState;
  setImageState: (value: FileImageState) => void;

  removeCenterImage: () => void;
  qrRef: React.RefObject<HTMLDivElement | null>;
  downloadPng: () => void;
  downloadSvg: () => void;
  resetCustomization: () => void;
};

export function QrModal({
  close,
  data,
  setData,
  isCustomEnabled,
  setIsCustomEnabled,
  dotsType,
  setDotsType,
  cornersSquareType,
  setCornersSquareType,
  cornersDotType,
  setCornersDotType,
  dotsColor,
  setDotsColor,
  cornersSquareColor,
  setCornersSquareColor,
  cornersDotColor,
  setCornersDotColor,
  backgroundColor,
  setBackgroundColor,
  qrSize,
  setQrSize,
  margin,
  setMargin,
  imageState,
  setImageState,
  removeCenterImage,
  qrRef,
  downloadPng,
  downloadSvg,
  resetCustomization,
}: Props) {
  return (
    <div
      className="modal-overlay"
      onClick={close}
      aria-hidden="true"
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close"
          onClick={close}
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="modal-grid">
          <section className="panel panel-form">
            <QrControls
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
            />
          </section>

          <aside className="panel panel-preview">
            <QrPreview qrRef={qrRef} />

            <div className="preview-actions">
              <button className="btn btn-primary" onClick={downloadPng}>
                Baixar PNG
              </button>

              <button className="btn btn-secondary" onClick={downloadSvg}>
                Baixar SVG
              </button>

              <button className="btn btn-ghost" onClick={resetCustomization}>
                Resetar
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}