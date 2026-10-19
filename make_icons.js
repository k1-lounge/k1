// Иконки обёртки: лого K1 по центру на тёмном фоне. Запуск: osascript -l JavaScript make_icons.js logo.png outdir
ObjC.import('AppKit');
function run(argv) {
  const logo = $.NSImage.alloc.initWithContentsOfFile(argv[0]);
  const out = [];
  [[180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png'], [32, 'favicon.png']].forEach(([n, name]) => {
    const rep = $.NSBitmapImageRep.alloc.initWithBitmapDataPlanesPixelsWidePixelsHighBitsPerSampleSamplesPerPixelHasAlphaIsPlanarColorSpaceNameBytesPerRowBitsPerPixel(null, n, n, 8, 4, true, false, $.NSDeviceRGBColorSpace, 0, 0);
    $.NSGraphicsContext.saveGraphicsState;
    $.NSGraphicsContext.setCurrentContext($.NSGraphicsContext.graphicsContextWithBitmapImageRep(rep));
    $.NSColor.colorWithSRGBRedGreenBlueAlpha(0x18 / 255, 0x18 / 255, 0x18 / 255, 1).setFill;
    $.NSRectFill($.NSMakeRect(0, 0, n, n));
    const m = n < 64 ? n * 0.04 : n * 0.12, s = n - 2 * m;
    logo.drawInRectFromRectOperationFraction($.NSMakeRect(m, m, s, s), $.NSZeroRect, $.NSCompositingOperationSourceOver, 1);
    $.NSGraphicsContext.restoreGraphicsState;
    const png = rep.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $({}));
    png.writeToFileAtomically(argv[1] + '/' + name, true);
    out.push(name);
  });
  return out.join(' ');
}
