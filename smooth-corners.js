class SmoothCornersPainter {
  static get inputProperties() {
    return ['border-radius', '--smooth-radius'];
  }

  paint(ctx, size, properties) {
    // Safely get the border-radius value, or fallback to 20px
    const borderRadiusProp = properties.get('border-radius');
    const borderRadius = borderRadiusProp && borderRadiusProp.value
      ? parseFloat(borderRadiusProp.toString())
      : 20;

    // Safely get the custom smooth radius, or fallback to 0.6 (60%)
    const smoothnessProp = properties.get('--smooth-radius');
    const smoothness = smoothnessProp && smoothnessProp.value
      ? parseFloat(smoothnessProp.toString())
      : 0.6;

    const width = size.width;
    const height = size.height;

    // Ensure the radius does not exceed half of the element's width or height
    const radius = Math.min(borderRadius, width / 2, height / 2);
    const smoothedRadius = radius * smoothness;

    ctx.beginPath();

    // Top-left corner
    ctx.moveTo(0, smoothedRadius);
    ctx.arcTo(0, 0, smoothedRadius, 0, smoothedRadius);

    // Top-right corner
    ctx.lineTo(width - smoothedRadius, 0);
    ctx.arcTo(width, 0, width, smoothedRadius, smoothedRadius);

    // Bottom-right corner
    ctx.lineTo(width, height - smoothedRadius);
    ctx.arcTo(width, height, width - smoothedRadius, height, smoothedRadius);

    // Bottom-left corner
    ctx.lineTo(smoothedRadius, height);
    ctx.arcTo(0, height, 0, height - smoothedRadius, smoothedRadius);

    ctx.closePath();
    ctx.fill();
  }
}

registerPaint('smooth-corners', SmoothCornersPainter);
