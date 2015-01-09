# CAPTCHaStar Tester

This project aims at testing the [CAPTCHaStar](http://starcaptcha.math.unipd.it/):

> Solve a CAPTCHaStar is simple!
> You just need to move the mouse over the black square, and click when those little white dots forms a recognizable shape.
> In practice, you need to find the correct position of the mouse cursor inside the box, as in the example below.

The project consists of two types of files:
* `evaluate.js` contains the evaluation function;
* `test_*.js` each file contains a different policy for the test of the CAPTCHA.

In order to test the project, you can use the JavaScript console of your browser. First, you have to load the content of the `evaluate.js` file, and then you can load the content of the file with policy you want to test.
