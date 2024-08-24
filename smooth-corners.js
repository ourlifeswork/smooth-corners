registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['--smooth-corners', 'border-radius'];
  }

  paint(ctx, size, styleMap) {
    const exp = parseFloat(styleMap.get('--smooth-corners').toString());
    const n = Math.max(0.00000000001, Math.min(exp, 100)); // Clamp between reasonable bounds

    // Get the border-radius property value
    const borderRadiusValue = styleMap.get('border-radius').toString().split(" ");

    // Handle different border-radius values for each corner
    const rTopLeft = parseFloat(borderRadiusValue[0]) || 0;
    const rTopRight = parseFloat(borderRadiusValue[1] || borderRadiusValue[0]) || 0;
    const rBottomRight = parseFloat(borderRadiusValue[2] || borderRadiusValue[0]) || 0;
    const rBottomLeft = parseFloat(borderRadiusValue[3] || borderRadiusValue[1] || borderRadiusValue[0]) || 0;

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
