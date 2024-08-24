registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['border-radius', '--smooth-corners'];
  }

  paint(ctx, size, styleMap) {
    // Get the border-radius value or default to 20px if not found
    const borderRadiusProp = styleMap.get('border-radius');
    const borderRadius = borderRadiusProp?.value ? parseFloat(borderRadiusProp.toString()) : 20;

    // Get the --smooth-corners custom property or default to 6 if not found
    const smoothnessProp = styleMap.get('--smooth-corners');
    const smoothness = smoothnessProp?.value ? parseFloat(smoothnessProp.toString()) : 6;

    // Calculate the control point offset based on the smoothness value
    const smoothRadius = borderRadius * smoothness;

    // Define the dimensions of the element
    const width = size.width;
    const height = size.height;

    ctx.fillStyle = 'black'; // Set the fill style
    ctx.beginPath();

    // Top-left corner
    ctx.moveTo(smoothRadius, 0);
    ctx.arcTo(0, 0, 0, smoothRadius, smoothRadius);

    // Bottom-left corner
    ctx.lineTo(0, height - smoothRadius);
    ctx.arcTo(0, height, smoothRadius, height, smoothRadius);

    // Bottom-right corner
    ctx.lineTo(width - smoothRadius, height);
    ctx.arcTo(width, height, width, height - smoothRadius, smoothRadius);

    // Top-right corner
    ctx.lineTo(width, smoothRadius);
    ctx.arcTo(width, 0, width - smoothRadius, 0, smoothRadius);

    ctx.closePath();
    ctx.fill();
  }
});
