/**
 * Exhaustive search for all configurations possible, in order to find the best
 * one. This approach can take some time in order to be processes (depending on
 * the value set for the STEP_SIZE variable).
 */
function solveExhaustive() {
	console.log("Exhaustive Solver");
	console.log("Starting...");
	
	/* Step to use for the matrix check */
	var STEP_SIZE = 10;
	
	/* Get the canvas stuff */
	var canvas = document.getElementById("captcha");
	
	/* Best variables */
	var bestScore = 0;
	var bestX = -1;
	var bestY = -1;
	
	/* Iterate through each possible configuration */
	for (canvas_i = 0; canvas_i <= canvas.width; canvas_i += STEP_SIZE) {
		for (canvas_j = 0; canvas_j <= canvas.height; canvas_j += STEP_SIZE) {
			/* Compute the score for the current configuration */
			var score = evaluate(canvas, canvas_i, canvas_j);
			console.log("Mouse at (" + canvas_i + ", " + canvas_j + "), score " + score);
			
			/* Check if new score is better than the previous */
			if (score > bestScore) {
				bestScore = score;
				bestX = canvas_i;
				bestY = canvas_j;
			}
		}
	}
	console.log("Done!");
	
	/* Draw the best configuration */
	disegna(bestX, bestY);
	console.log("The best configuration seems (" + bestX + ", " + bestY + "), score: " + bestScore);
}

solveExhaustive();

