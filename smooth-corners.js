registerPaint('smooth-corners', class {
  static get inputProperties() {
      return ['--smooth-corners'];
  }

  paint(ctx, size, styleMap) {
    // Get the smooth-corners value from the style map
    const exp = styleMap.get('--smooth-corners').toString();

    // Parse the smoothness value
    let n = parseFloat(exp);
    if (isNaN(n)) n = 1; // Fallback to 1 if the value is not a number

    // Ensure the value of n is clamped between reasonable bounds
    let m = n;
    if (n > 100) m = 100;
    if (n < 0.00000000001) m = 0.00000000001;

    // Get the half width and height of the element
    const w = size.width / 2;
    const h = size.height / 2;

    // Get the smallest radius for circular effect scaling
    const r = Math.min(w, h);

    // Start the drawing
    ctx.beginPath();

    // Draw top-right and bottom-left rounded corners
    for (let i = 0; i <= 2 * r; i++) {
      // Calculate x and y using the smooth-corners formula
      const x = (i - r) + w;
      const y = h - (Math.pow(Math.abs(Math.pow(r, m) - Math.pow(Math.abs(i - r), m)), 1 / m));

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    // Draw bottom-right and top-left rounded corners
    for (let i = 2 * r; i <= 4 * r; i++) {
      const x = (3 * r - i) + w;
      const y = h + (Math.pow(Math.abs(Math.pow(r, m) - Math.pow(Math.abs(3 * r - i), m)), 1 / m));

      ctx.lineTo(x, y);
    }

    // Close the path and fill the shape
    ctx.closePath();
    ctx.fill();
  }
});
