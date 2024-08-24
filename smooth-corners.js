registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['--smooth-corners', 'border-radius'];
  }

  paint(ctx, size, styleMap) {
    // Get the smoothing factor from the custom property
    const exp = parseFloat(styleMap.get('--smooth-corners')?.toString() || "1");
    const n = Math.max(0.00000000001, Math.min(exp, 100)); // Clamp between reasonable bounds

    // Safely get the border-radius property value, fallback to 16px if it's not set
    const borderRadius = parseFloat(styleMap.get('border-radius')?.toString() || "16px");

    const width = size.width;
    const height = size.height;

    ctx.beginPath();

    // Top-left corner: Explicitly handle this corner to ensure it's drawn correctly
    ctx.moveTo(borderRadius, 0);
    ctx.arcTo(0, 0, 0, borderRadius, borderRadius);

    // Top-right corner
    ctx.lineTo(width - borderRadius, 0);
    ctx.arcTo(width, 0, width, borderRadius, borderRadius);

    // Bottom-right corner
    ctx.lineTo(width, height - borderRadius);
    ctx.arcTo(width, height, width - borderRadius, height, borderRadius);

    // Bottom-left corner
    ctx.lineTo(borderRadius, height);
    ctx.arcTo(0, height, 0, height - borderRadius, borderRadius);

    // Close the path back to the top-left corner
    ctx.lineTo(0, borderRadius);

    ctx.closePath();
    ctx.fill();
  }
});
