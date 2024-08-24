registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['--smooth-corners', 'border-radius'];
  }

  paint(ctx, size, styleMap) {
    // Get the smoothing factor from the custom property
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
    for (let i = 0; i <= rTopLeft; i++) {
      const x = i;
      const y = rTopLeft - Math.pow(Math.abs(Math.pow(rTopLeft, n) - Math.pow(Math.abs(i), n)), 1 / n);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    // Top-right corner
    for (let i = 0; i <= rTopRight; i++) {
      const x = width - i;
      const y = rTopRight - Math.pow(Math.abs(Math.pow(rTopRight, n) - Math.pow(Math.abs(i), n)), 1 / n);
      ctx.lineTo(x, y);
    }

    // Bottom-right corner
    for (let i = 0; i <= rBottomRight; i++) {
      const x = width - i;
      const y = height - Math.pow(Math.abs(Math.pow(rBottomRight, n) - Math.pow(Math.abs(i), n)), 1 / n);
      ctx.lineTo(x, y);
    }

    // Bottom-left corner
    for (let i = 0; i <= rBottomLeft; i++) {
      const x = i;
      const y = height - Math.pow(Math.abs(Math.pow(rBottomLeft, n) - Math.pow(Math.abs(i), n)), 1 / n);
      ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();
  }
});
