registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['--smooth-radius', 'border-radius'];
  }

  paint(ctx, size, styleMap) {
    // Get the smoothing factor (similar to the corner smoothing percentage in Figma)
    const smoothness = parseFloat(styleMap.get('--smooth-radius')?.toString() || "0.6");
    
    // Get the uniform border-radius value (assume all corners have the same radius)
    const borderRadius = parseFloat(styleMap.get('border-radius')?.toString() || "16px");

    const width = size.width;
    const height = size.height;

    // Calculate the smooth radius (percentage of the border radius)
    const smoothRadius = borderRadius * smoothness;

    ctx.beginPath();

    // Top-left corner
    ctx.moveTo(borderRadius, 0);
    ctx.quadraticCurveTo(0, 0, 0, smoothRadius);

    // Top-right corner
    ctx.lineTo(width - borderRadius, 0);
    ctx.quadraticCurveTo(width, 0, width, smoothRadius);

    // Bottom-right corner
    ctx.lineTo(width, height - borderRadius);
    ctx.quadraticCurveTo(width, height, width - smoothRadius, height);

    // Bottom-left corner
    ctx.lineTo(smoothRadius, height);
    ctx.quadraticCurveTo(0, height, 0, height - borderRadius);

    ctx.closePath();
    ctx.fill();
  }
});
