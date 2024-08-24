class SmoothCornersPainter {
  static get inputProperties() {
    return ['border-radius', '--smooth-radius'];
  }

  paint(ctx, size, properties) {
    const borderRadius = parseFloat(properties.get('border-radius').toString()) || 0;
    const smoothness = parseFloat(properties.get('--smooth-radius').toString()) || 0.6;

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
