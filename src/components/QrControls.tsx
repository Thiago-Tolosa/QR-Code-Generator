import type { ChangeEvent } from "react";
import type {
  DotType,
  CornerSquareType,
  CornerDotType,
  FileImageState,
} from "../types/qr";

type Props = {
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

  imageState: FileImageState;
  setImageState: (value: FileImageState) => void;

  removeCenterImage: () => void;
  applyQrChanges: () => void;
};

export function QrControls({
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

  imageState,
  setImageState,

  removeCenterImage,
  applyQrChanges,
}: Props) {
  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (imageState.previewUrl) {
      URL.revokeObjectURL(imageState.previewUrl);
    }

    const previewUrl = URL.createObjectURL(file);

    setImageState({
      file,
      previewUrl,
    });
  }

  return (
    <>
      <div className="panel-header">
        <h2>Criar QR Code</h2>
        <p>Digite um link e personalize se quiser.</p>
      </div>

      <label className="field">
        <span>Link ou texto</span>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="https://seusite.com"
        />
      </label>

      <label className="toggle-row">
        <div>
          <strong>Personalizar QR Code</strong>
          <p>Ative para mudar formato, cores e imagem central.</p>
        </div>

        <button
          type="button"
          className={`toggle ${isCustomEnabled ? "on" : ""}`}
          onClick={() => setIsCustomEnabled(!isCustomEnabled)}
        >
          <span className="toggle-thumb" />
        </button>
      </label>

      {isCustomEnabled && (
        <>
          <div className="field-grid">
            <label className="field">
              <span>Pontos</span>
              <select
                value={dotsType}
                onChange={(e) =>
                  setDotsType(e.target.value as DotType)
                }
              >
                <option value="square">Quadrado</option>
                <option value="dots">Dots</option>
                <option value="rounded">Arredondado</option>
                <option value="extra-rounded">Extra rounded</option>
                <option value="classy">Classy</option>
                <option value="classy-rounded">Classy rounded</option>
              </select>
            </label>

            <label className="field">
              <span>Canto externo</span>
              <select
                value={cornersSquareType}
                onChange={(e) =>
                  setCornersSquareType(
                    e.target.value as CornerSquareType
                  )
                }
              >
                <option value="square">Quadrado</option>
                <option value="dot">Dot</option>
                <option value="extra-rounded">Extra rounded</option>
              </select>
            </label>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Canto interno</span>
              <select
                value={cornersDotType}
                onChange={(e) =>
                  setCornersDotType(
                    e.target.value as CornerDotType
                  )
                }
              >
                <option value="square">Quadrado</option>
                <option value="dot">Dot</option>
              </select>
            </label>

            <label className="field">
              <span>Imagem no centro</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="field-grid colors-grid">
            <label className="field color-field">
              <span>Cor dos pontos</span>
              <input
                type="color"
                value={dotsColor}
                onChange={(e) => setDotsColor(e.target.value)}
              />
            </label>

            <label className="field color-field">
              <span>Canto externo</span>
              <input
                type="color"
                value={cornersSquareColor}
                onChange={(e) =>
                  setCornersSquareColor(e.target.value)
                }
              />
            </label>

            <label className="field color-field">
              <span>Canto interno</span>
              <input
                type="color"
                value={cornersDotColor}
                onChange={(e) =>
                  setCornersDotColor(e.target.value)
                }
              />
            </label>

            <label className="field color-field">
              <span>Fundo</span>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) =>
                  setBackgroundColor(e.target.value)
                }
              />
            </label>
          </div>

          {imageState.previewUrl && (
            <div className="image-chip-row">
              <span className="image-chip">
                {imageState.file?.name ?? "Imagem selecionada"}
              </span>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={removeCenterImage}
              >
                Remover imagem
              </button>
            </div>
          )}
        </>
      )}

      <div className="preview-actions" style={{ marginTop: "1rem" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={applyQrChanges}
        >
          Atualizar QR
        </button>
      </div>
    </>
  );
}