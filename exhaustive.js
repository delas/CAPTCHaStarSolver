function solve() {
	console.log("Starting...");
	/* Step to use for the matrix check */
	var STEP_SIZE = 20;
	/* Neighborhood cells */
	var NEIGHBORHOOD_CELLS = 1;
	/* Minimum white cells in neighborhood threshold */
	var MIN_WHITE_IN_NEIGHBORHOOD = 5;
	
	/* Get the canvas stuff */
	var canvas = document.getElementById("captcha");
	var ctx = canvas.getContext("2d");
	
	/* Best variables */
	var bestScore = 0;
	var bestX = -1;
	var bestY = -1;
	
	/* Iterate through each possible configuration */
	for (canvas_i = 0; canvas_i < canvas.width; canvas_i += STEP_SIZE) {
		for (canvas_j = 0; canvas_j < canvas.height; canvas_j += STEP_SIZE) {
			/* Draw the actual configuration */
			disegna(canvas_i, canvas_j);
			
			/* Compute the score for the current configuration */
			var score = 0;
			for (i = 0; i < canvas.width; i++) {
				for (j = 0; j < canvas.height; j++) {
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
			console.log("At (" + canvas_i + ", " + canvas_j + ") we have a score of: " + score);
			/* Check if new score is better than the previous */
			if (score > bestScore) {
				bestX = canvas_i;
				bestY = canvas_j;
			}
		}
	}
	console.log("Done!");
	
	/* Draw the best configuration */
	disegna(bestX, bestY);
	console.log("The best configuration seems (" + bestX + ", " + bestY + ")");
}

solve();

