export function getCaptionText(name: string, builderTitle: string): string {
  return `Just got my HH Goa 2026 Builder ID ⚡\n\n${builderTitle}\n\nBuilding, shipping and vibing in Goa. 🌴\n\n#FrameInGoa #HHGoa2026`;
}

export function shareToX(name: string, builderTitle: string): void {
  const text = getCaptionText(name, builderTitle);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
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
