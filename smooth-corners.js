registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['--smooth-corners'];
  }

  paint(ctx, size, styleMap) {
    // Get the smoothness value
    const exp = styleMap.get('--smooth-corners').toString();
    let n = parseFloat(exp);
    if (isNaN(n)) n = 1; // Fallback to 1 if invalid
    n = Math.max(0.00000000001, Math.min(n, 100)); // Clamp between reasonable bounds

    // Calculate radii based on the element's dimensions
    const w = size.width;
    const h = size.height;

    const rX = w / 2; // Radius for width
    const rY = h / 2; // Radius for height

    ctx.beginPath();

    // Top-right to bottom-left smoothing
    for (let i = 0; i <= 2 * rX; i++) {
      const x = (i - rX) + rX;
      const y = rY - Math.pow(Math.abs(Math.pow(rY, n) - Math.pow(Math.abs(i - rX), n)), 1 / n);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    // Bottom-right to top-left smoothing
    for (let i = 2 * rX; i <= 4 * rX; i++) {
      const x = (3 * rX - i) + rX;
      const y = rY + Math.pow(Math.abs(Math.pow(rY, n) - Math.pow(Math.abs(3 * rX - i), n)), 1 / n);
      ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();
  }
});
