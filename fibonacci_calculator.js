

function fibonacciCalculator() {
	var inputValue = parseFloat(document.getElementById('inputValue').value);
	let n = inputValue;
	
	var outputValue = (function fibonacci(n) {
		
		if (n%1 !== 0) {
			return NaN;
		}
		
		if (n < 2){
			return n
		}
		
		return fibonacci(n - 1) + fibonacci(n - 2)
	});
	
	var resultDIV = document.getElementById('result')
	resultDIV.innerHTML="<p>"+ "The " + inputValue +"i<sup>th</sup>" + " element for the Fibonacci Serie is: " + outputValue + "</p>"
	//console.log("The" + inputValue +"i<sup>th</sup>" + " element for the Fibonacci Serie is: " + outputValue);
}

