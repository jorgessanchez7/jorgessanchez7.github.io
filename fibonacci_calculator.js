
function fibonacciCalculator() {
	var inputValue = parseFloat(document.getElementById('inputValue').value);
	var resultDIV = document.getElementById('result');
	
	var outputValue = (function fibonacci() {
		
		var n = inputValue;
		
		if (n < 2){
			return n
		}
		
		if (n%1 !== 0) {
			return NaN;
		}
		
		return fibonacci(n - 1) + fibonacci(n - 2)
	})();
	
	resultDIV.innerHTML="<p>"+ "The " + inputValue +"<sup>th</sup>" + " element for the Fibonacci Serie is: " + outputValue + "</p>"
	//console.log("The" + inputValue +"i<sup>th</sup>" + " element for the Fibonacci Serie is: " + outputValue);
}

