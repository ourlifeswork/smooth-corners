class SmoothCornersPainter {
  static get inputProperties() {
    return ['border-radius', '--smooth-corner-radius'];
  }

  paint(ctx, size, properties) {
    const borderRadiusProp = properties.get('border-radius');
    const smoothnessProp = properties.get('--smooth-corner-radius');

    // Check if borderRadiusProp is defined, if not, default to 20
    const borderRadius = borderRadiusProp.length > 0 ? parseFloat(borderRadiusProp.toString()) : 20;

    // Check if smoothnessProp is defined, if not, default to 0.6
    const smoothness = smoothnessProp.length > 0 ? parseFloat(smoothnessProp.toString()) : 0.6;

    const width = size.width;
    const height = size.height;

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
