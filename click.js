/**
 * This function simulate the click on the canvas at the provided coordinates.
 * Still not working, maybe the event is not properly defined.
 *
 * @param canvas the canvas to use for the evaluation
 * @param x the x coordinate
 * @param y the y coordinate
 */
function clickOnCanvasPosition(canvas, x, y) {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	evt.clientX = x;
	evt.clientY = y;
	canvas.dispatchEvent(evt);
}
