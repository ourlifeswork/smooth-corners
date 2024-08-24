// Register the paint worklet for smooth corners
class SmoothCorners {
  static get inputProperties() {
	return ['--smooth-radius', 'border-radius'];
  }

  paint(ctx, size, properties) {
	const smoothRadius = parseFloat(properties.get('--smooth-radius').toString()) || 0.5;
	const borderRadius = parseFloat(properties.get('border-radius').toString()) || 0;
	
	const width = size.width;
	const height = size.height;

	ctx.beginPath();
	ctx.moveTo(borderRadius, 0);
	ctx.lineTo(width - borderRadius, 0);
	ctx.quadraticCurveTo(width, 0, width, borderRadius);
	ctx.lineTo(width, height - borderRadius);
	ctx.quadraticCurveTo(width, height, width - borderRadius, height);
	ctx.lineTo(borderRadius, height);
	ctx.quadraticCurveTo(0, height, 0, height - borderRadius);
	ctx.lineTo(0, borderRadius);
	ctx.quadraticCurveTo(0, 0, borderRadius, 0);
	ctx.fill();
  }
}

// Register the class as a worklet
if (typeof registerPaint !== 'undefined') {
  registerPaint('smooth-corners', SmoothCorners);
}