/**
 * Approach based on a Hill Climbing search. Each component is compared with its
 * neighbors in order to see if any of them improves the evaluation score. If
 * not, the procedure terminates. It is possible to set the value of the
 * RANDOM_RESTARTS variable in order to start the procedure several times, from
 * different configurations, and see which generates the best approach.
 */
function solveHillClimbing() {
	console.log("Hill Climbing Solver");
	console.log("Starting...");
	
	/* Number of random restarts */
	var RANDOM_RESTARTS = 10;
	/* Step for the other directions */
	var STEP_SIZE = 2;
	
	/* Get the canvas */
	var canvas = document.getElementById("captcha");
	
	/* Best variables */
	var bestScore = 0;
	var bestX = -1;
	var bestY = -1;
	
	/* Iterate for all random restarts */
	for (r = 0; r < RANDOM_RESTARTS; r++) {
		console.log("== RANDOM RESTART #" + (r+1) + " ==");
		
		/* Generate random coordinates */
		var canvas_i = Math.floor(Math.random() * canvas.width) + 1
		var canvas_j = Math.floor(Math.random() * canvas.height) + 1
		var improvement = true;
		
		do {
			/* Starting point */
			var scoreStart = evaluate(canvas, canvas_i, canvas_j);
			console.log("At (" + canvas_i + ", " + canvas_j + ") we have a score of: " + scoreStart);
			
			/* Check if new score is better than the previous */
			if (scoreStart > bestScore) {
				bestScore = scoreStart;
				bestX = canvas_i;
				bestY = canvas_j;
			}
		
			/* Check the neighborhood */
			
			/* Direction E */
			var scoreE = evaluate(canvas, canvas_i - STEP_SIZE, canvas_j);
			console.log("   E score: " + scoreE);
		
			/* Direction N */
			var scoreN = evaluate(canvas, canvas_i, canvas_j - STEP_SIZE);
			console.log("   N score: " + scoreN);
		
			/* Direction W */
			var scoreW = evaluate(canvas, canvas_i + STEP_SIZE, canvas_j);
			console.log("   W score: " + scoreW);
		
			/* Direction S */
			var scoreS = evaluate(canvas, canvas_i, canvas_j + STEP_SIZE);
			console.log("   S score: " + scoreS);
		
			/* Damn, the current point was already the best one */
			if (scoreStart >= scoreE && scoreStart >= scoreN && scoreStart >= scoreW && scoreStart >= scoreS) {
				improvement = false;
			} else {
				if (scoreE >= scoreN && scoreE >= scoreW && scoreE >= scoreS) {
					console.log("Best direction is: EAST");
					canvas_i -= STEP_SIZE;
				
				} else if (scoreN >= scoreE && scoreN >= scoreW && scoreN >= scoreS) {
					console.log("Best direction is: NORTH");
					canvas_j -= STEP_SIZE;
					
				} else  if (scoreW >= scoreN && scoreW >= scoreE && scoreW >= scoreS) {
					console.log("Best direction is: WEST");
					canvas_i += STEP_SIZE;
					
				} else if (scoreS >= scoreN && scoreS >= scoreW && scoreS >= scoreE) {
					console.log("Best direction is: SOUTH");
					canvas_j += STEP_SIZE;
					
				} else {
					improvement = false;
				}
			}
		} while (improvement);
	}
	console.log("Done!");
	
	/* Draw the best configuration */
	disegna(bestX, bestY);
	console.log("The best configuration seems (" + bestX + ", " + bestY + ")");
}

solveHillClimbing();

