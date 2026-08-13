import { toPng } from 'html-to-image';

export async function generateCardImage(element: HTMLElement, format: 'id-card' | 'pfp'): Promise<string> {
  const width = 1080;
  const height = format === 'id-card' ? 1843 : 1080;

  // Get the current element dimensions for pixel ratio calculation
  const rect = element.getBoundingClientRect();
  const scaleX = width / rect.width;
  const scaleY = height / rect.height;
  const scale = Math.max(scaleX, scaleY);

  try {
    // First attempt
    const dataUrl = await toPng(element, {
      width,
      height,
      pixelRatio: scale,
      quality: 1.0,
      cacheBust: true,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      },
    });
    return dataUrl;
  } catch (error) {
    // Retry once — html-to-image can fail on first attempt with images
    console.warn('First attempt failed, retrying...', error);
    const dataUrl = await toPng(element, {
      width,
      height,
      pixelRatio: scale,
      quality: 1.0,
      cacheBust: true,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      },
    });
    return dataUrl;
  }
}

export function downloadImage(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getFilename(name: string, format: 'id-card' | 'pfp'): string {
  const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'builder';
  const suffix = format === 'id-card' ? 'builder-id' : 'pfp';
  return `hh-goa-2026-${sanitizedName}-${suffix}.png`;
}
