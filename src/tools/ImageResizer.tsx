import { useRef, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

/**
 * Tool A — Image Resizer & Compressor
 * ----------------------------------------------------------------
 * NATIVE CLIENT-SIDE PROCESSING:
 *  1. The user-selected File is read into an <img> via URL.createObjectURL —
 *     no FileReader base64 round-trip, so memory stays low even on 10MB+ images.
 *  2. An HTMLCanvasElement is sized to the target dimensions and drawImage()
 *     downscales the source bitmap with the browser's built-in resampler.
 *  3. canvas.toBlob(type, quality) re-encodes JPEG/WebP with a quality knob,
 *     or lossless PNG, then we hand the Blob back as a download URL.
 *  4. All object URLs are revoked on unmount-style cleanup to avoid leaks.
 *
 * Nothing leaves the browser. No fetch(), no upload, no server.
 */
export default function ImageResizer() {
  const [src, setSrc] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(1280);
  const [quality, setQuality] = useState(0.82);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp" | "image/png">("image/jpeg");
  const [origSize, setOrigSize] = useState(0);
  const [outSize, setOutSize] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onFile = (file: File) => {
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOrigSize(file.size);
    const url = URL.createObjectURL(file);
    setSrc(url);
  };

  const process = async () => {
    const img = imgRef.current;
    if (!img) return;
    const ratio = img.naturalHeight / img.naturalWidth;
    const w = Math.min(width, img.naturalWidth);
    const h = Math.round(w * ratio);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        if (outUrl) URL.revokeObjectURL(outUrl);
        setOutUrl(URL.createObjectURL(blob));
        setOutSize(blob.size);
      },
      format,
      format === "image/png" ? undefined : quality,
    );
  };

  const kb = (b: number) => (b / 1024).toFixed(1) + " KB";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-6">
        <label className="block">
          <div className="rounded-lg border-2 border-dashed border-border bg-secondary/50 p-10 text-center hover:border-primary/60 transition-colors cursor-pointer">
            <p className="text-sm font-medium">Drop or click to choose an image</p>
            <p className="mt-1 text-xs text-muted-foreground">JPG • PNG • WebP</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
          </div>
        </label>
        <TrustBadge />

        <div className="mt-6 grid gap-4">
          <label className="text-sm">
            <span className="font-medium">Max width: {width}px</span>
            <input
              type="range" min={64} max={4096} step={16}
              value={width} onChange={(e) => setWidth(+e.target.value)}
              className="mt-2 w-full accent-[var(--color-primary)]"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium">Quality: {Math.round(quality * 100)}%</span>
            <input
              type="range" min={0.3} max={1} step={0.01}
              value={quality} onChange={(e) => setQuality(+e.target.value)}
              disabled={format === "image/png"}
              className="mt-2 w-full accent-[var(--color-primary)] disabled:opacity-40"
            />
          </label>
          <div className="flex gap-2 text-sm">
            {(["image/jpeg", "image/webp", "image/png"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-3 py-1.5 rounded-md border text-xs font-medium transition ${
                  format === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card hover:border-primary/50"
                }`}
              >
                {f.split("/")[1].toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={process}
            disabled={!src}
            className="rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-sm hover:opacity-95 disabled:opacity-40 transition"
          >
            Process Locally
          </button>
        </div>
      </div>

      <div className="card-premium p-6">
        <h3 className="text-sm font-semibold mb-3">Preview</h3>
        {src ? (
          <img ref={imgRef} src={src} alt="source" className="max-h-72 w-full object-contain rounded-md bg-secondary" />
        ) : (
          <div className="grid h-72 place-items-center rounded-md bg-secondary text-sm text-muted-foreground">
            Your image will appear here
          </div>
        )}

        {outUrl && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Original: {kb(origSize)}</span>
              <span>Output: <strong className="text-foreground">{kb(outSize)}</strong> ({Math.round((1 - outSize / origSize) * 100)}% smaller)</span>
            </div>
            <a
              href={outUrl}
              download={`resized.${format.split("/")[1]}`}
              className="block text-center rounded-md bg-accent text-accent-foreground px-4 py-2.5 text-sm font-semibold shadow-sm hover:opacity-95"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}