/* Cache with the values computed for the evaluation */
var evaluationCache = {};

/**
 * This function computes the score of the current configuration of the canvas.
 * The overall computation time is extremely influenced by this function and, in
 * particular by the value of the NEIGHBORHOOD_CELLS variable.
 *
 * @param canvas the canvas to use for the evaluation
 * @param x the x coordinate
 * @param y the y coordinate
 * @return the score at the provided coordinates
 */
function evaluate(canvas, x, y) {
	/* Draw the actual configuration */
	disegna(x, y);
	
	/* Check the cache for the value */
	var key = x + "," + y;
	if (evaluationCache.hasOwnProperty(key)) {
		return evaluationCache[key];
	}
		
	/* Neighborhood cells */
	var NEIGHBORHOOD_CELLS = 1;
	/* Minimum white cells in neighborhood threshold */
	var MIN_WHITE_IN_NEIGHBORHOOD = 6;
	
	var ctx = canvas.getContext("2d");
	var score = 0;
	for (i = 0; i <= canvas.width; i += (NEIGHBORHOOD_CELLS + 1)) {
		for (j = 0; j <= canvas.height; j += (NEIGHBORHOOD_CELLS + 1)) {
			var totWhite = 0;
			/* Compute the score for the neighborhood */
			for (h = -NEIGHBORHOOD_CELLS; h <= NEIGHBORHOOD_CELLS; h++) {
				for (v = -NEIGHBORHOOD_CELLS; v <= NEIGHBORHOOD_CELLS; v++) {
					var data = ctx.getImageData(i+h, j+v, 1, 1).data;
					if (data[0] == 255 && data[1] == 255 && data[2] == 255) {
						totWhite++;
					}
				}
			}
			if (totWhite > MIN_WHITE_IN_NEIGHBORHOOD) {
				score++;
			}
		}
	}
	evaluationCache[key] = score;
	return score;
}

