/**
 * Randomly picks some values and returns the value obtained for the best
 * configuration. The computation time (and the result quality), in this case,
 * depends on the value set for the ITERATIONS variables.
 */
function solveRandom() {
	console.log("Random Solver");
	console.log("Starting...");
	
	/* Number of iterations to perform */
	var ITERATIONS = 20;
	
	/* Get the canvas */
	var canvas = document.getElementById("captcha");
	
	/* Best variables */
	var bestScore = 0;
	var bestX = -1;
	var bestY = -1;
	
	/* Iterate through each possible configuration */
	for (r = 0; r < ITERATIONS; r++) {
		/* Generate random coordinates */
		var canvas_i = Math.floor(Math.random() * canvas.width) + 1
		var canvas_j = Math.floor(Math.random() * canvas.height) + 1
		
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
	console.log("Done!");
	
	/* Draw the best configuration */
	disegna(bestX, bestY);
	console.log("The best configuration seems (" + bestX + ", " + bestY + "), score: " + bestScore);
}

solveRandom();

