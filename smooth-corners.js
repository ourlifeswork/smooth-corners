class SmoothCorners {
	static get inputProperties() {
		return ['--smooth-radius', 'border-radius'];
	}

	paint(ctx, size, properties) {
		// Safely get the border-radius property
		let borderRadius = 0;
		try {
			// Attempt to retrieve and parse the border-radius
			const borderRadiusProp = properties.get('border-radius');
			borderRadius = borderRadiusProp ? parseFloat(borderRadiusProp.toString()) : 0;
		} catch (error) {
			console.warn("Could not retrieve border-radius property, defaulting to 0:", error);
		}

		const smoothRadius = parseFloat(properties.get('--smooth-radius').toString()) || 0.6;

		const width = size.width;
		const height = size.height;

		// Draw the smooth-cornered shape
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

if (typeof registerPaint !== 'undefined') {
	registerPaint('smooth-corners', SmoothCorners);
}
