export function handleDownQrCode() {
  const image = document.querySelector('.aclass img') as HTMLImageElement;
  const dataUrl = image.src;
  const link = document.createElement('a');
  link.download = 'qr_code' + '.png';
  link.href = dataUrl.replace('image/png', 'image/octet-stream');
  link.click();
}
