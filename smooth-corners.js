registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['--smooth-corners', 'border-radius'];
  }

  paint(ctx, size, styleMap) {
    const exp = parseFloat(styleMap.get('--smooth-corners')?.toString() || "1");
    const n = Math.max(0.00000000001, Math.min(exp, 100)); // Clamp between reasonable bounds

    // Safely get the border-radius property value, fallback to 16px if it's not set
    const borderRadiusValue = styleMap.get('border-radius') ? styleMap.get('border-radius').toString().split(" ") : ["16px"];

    // Parse the border-radius values for each corner, default to 16px if necessary
    const rTopLeft = parseFloat(borderRadiusValue[0]) || 16;
    const rTopRight = parseFloat(borderRadiusValue[1] || borderRadiusValue[0]) || 16;
    const rBottomRight = parseFloat(borderRadiusValue[2] || borderRadiusValue[0]) || 16;
    const rBottomLeft = parseFloat(borderRadiusValue[3] || borderRadiusValue[1] || borderRadiusValue[0]) || 16;

    const width = size.width;
    const height = size.height;

    ctx.beginPath();

    // Top-left corner
    ctx.moveTo(rTopLeft, 0);
    ctx.arcTo(0, 0, 0, rTopLeft, rTopLeft);

    // Top-right corner
    ctx.lineTo(width - rTopRight, 0);
    ctx.arcTo(width, 0, width, rTopRight, rTopRight);

    // Bottom-right corner
    ctx.lineTo(width, height - rBottomRight);
    ctx.arcTo(width, height, width - rBottomRight, height, rBottomRight);

    // Bottom-left corner
    ctx.lineTo(rBottomLeft, height);
    ctx.arcTo(0, height, 0, height - rBottomLeft, rBottomLeft);

    ctx.closePath();
    ctx.fill();
  }
});
