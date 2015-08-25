/**
 * This approach reduces the canvas in tiles of different sizes. Once the
 * approach finds a "good tile" it zooms in it and explore it with a lower
 * granularity level.
 */
function solveExhaustiveIncremental() {
	console.log("Exhaustive Incremental Solver");
	console.log("Starting...");
	
	/* Steps to use for zooming */
	var STEP_SIZES = [150, 75, 30, 15, 7, 4, 2, 1];
	
	/* Get the canvas stuff */
	var canvas = document.getElementById("captcha");
	
	/* Best variables */
	var best = {};
	best.score = 0;
	best.x = -1;
	best.y = -1;
	
	/* Starting coordinates */
	var fromX = 0;
	var toX = canvas.width;
	var fromY = 0;
	var toY = canvas.height;
	
	/* Iteration for all the tiles sizes */
	for (i_step = 0; i_step < STEP_SIZES.length; i_step++) {
	
		var STEP_SIZE = STEP_SIZES[i_step];
		console.log("=== USING STEP_SIZE = " + STEP_SIZE + " ===");
		best = checkIncremental(canvas, best, fromX, toX, fromY, toY, STEP_SIZE);
		console.log("The best configuration for this STEP_SIZE seems (" + best.x + ", " + best.y + "), score: " + best.score);

		fromX = Math.round(Math.max(0, best.x - (STEP_SIZE / 2)));
		toX = Math.round(Math.min(canvas.width, best.x + (STEP_SIZE / 2)));
		fromY = Math.round(Math.max(0, best.y - (STEP_SIZE / 2)));
		toY = Math.round(Math.min(canvas.height, best.y + (STEP_SIZE / 2)));
	}
	
	console.log("Done!");
	
	/* Draw the best configuration */
	disegna(best.x, best.y);
	console.log("The best configuration seems (" + best.x + ", " + best.y + "), score: " + best.score);
	clickOnCanvasPosition(document.getElementById("captcha"), best.x, best.y);
	
	/* Click the calculated position */
	//clickOnCanvasPosition(canvas, best.x, best.y);
}

function checkIncremental(canvas, best, fromX, toX, fromY, toY, STEP_SIZE) {
	/* Iterate through each possible configuration */
	for (canvas_i = fromX; canvas_i < toX; canvas_i += STEP_SIZE) {
		for (canvas_j = fromY; canvas_j < toY; canvas_j += STEP_SIZE) {
			/* Compute the score for the current configuration */
			var score = evaluate(canvas, canvas_i, canvas_j);
			console.log("Mouse at (" + canvas_i + ", " + canvas_j + "), score " + score);
		
			/* Check if new score is better than the previous */
			if (score > best.score) {
				best.score = score;
				best.x = canvas_i;
				best.y = canvas_j;
			}
		}
	}
	return best;
}

alert("The tester requires about 90 seconds. Once clicked OK, just wait for the solution (or check the console for progress)!");

var start = new Date().getTime();
solveExhaustiveIncremental();
var end = new Date().getTime();

alert("The candidate solution is painted! (took " + ((end - start)/1000) + "s)");

