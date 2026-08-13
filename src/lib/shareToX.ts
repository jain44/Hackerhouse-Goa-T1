import { generateCardImage, downloadImage, getFilename, dataUrlToBlob } from './imageGenerator';

export function getCaptionText(name: string, builderTitle: string): string {
  return `Just got my HH Goa 2026 Builder ID ⚡\n\n${builderTitle}\n\nBuilding, shipping and vibing in Goa. 🌴\n\n#FrameInGoa #HHGoa2026`;
}

export interface ShareResult {
  sharedViaWebShare: boolean;
  copiedImage: boolean;
  downloaded: boolean;
  message: string;
}

export async function shareToX(
  name: string,
  builderTitle: string,
  element?: HTMLElement | null,
  format: 'id-card' | 'pfp' = 'id-card'
): Promise<ShareResult> {
  const caption = getCaptionText(name, builderTitle);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;

  if (!element) {
    window.open(tweetUrl, '_blank');
    return {
      sharedViaWebShare: false,
      copiedImage: false,
      downloaded: false,
      message: 'Opening X post window...',
    };
  }

  try {
    // 1. Generate the card PNG data URL & blob
    const filename = getFilename(name, format);
    const dataUrl = await generateCardImage(element, format);
    const blob = dataUrlToBlob(dataUrl);
    const file = new File([blob], filename, { type: 'image/png' });

    // 2. Try native Web Share API (Mobile Safari/Chrome support sharing PNG directly to X app)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'HH Goa 2026 Builder ID',
          text: caption,
        });
        return {
          sharedViaWebShare: true,
          copiedImage: false,
          downloaded: false,
          message: 'Shared card PNG directly to X!',
        };
      } catch (shareErr: any) {
        if (shareErr.name === 'AbortError') {
          return {
            sharedViaWebShare: true,
            copiedImage: false,
            downloaded: false,
            message: 'Share cancelled.',
          };
        }
      }
    }

    // 3. Fallback for Desktop Browsers:
    // Automatically trigger PNG download so user has the image ready
    downloadImage(dataUrl, filename);

    // 4. Copy PNG image blob to clipboard (allows user to Ctrl+V paste PNG in Twitter composer!)
    let copiedImage = false;
    if (navigator.clipboard && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        copiedImage = true;
      } catch (err) {
        console.warn('Clipboard image copy not supported on this browser', err);
      }
    }

    if (!copiedImage) {
      try {
        await navigator.clipboard.writeText(caption);
      } catch (err) {
        // ignore
      }
    }

    // 5. Open Twitter web intent
    window.open(tweetUrl, '_blank');

    return {
      sharedViaWebShare: false,
      copiedImage,
      downloaded: true,
      message: copiedImage
        ? '📸 PNG Card downloaded & copied to clipboard! Press Ctrl+V (or Cmd+V) to paste the PNG image in your tweet.'
        : '📥 PNG Card downloaded! Attach the saved file to your post on X.',
    };
  } catch (err) {
    console.error('Error preparing card PNG for X:', err);
    window.open(tweetUrl, '_blank');
    return {
      sharedViaWebShare: false,
      copiedImage: false,
      downloaded: false,
      message: 'Opening X post window...',
    };
  }
}

export async function copyCaption(name: string, builderTitle: string): Promise<boolean> {
  const text = getCaptionText(name, builderTitle);
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard', error);
    return false;
  }
}

