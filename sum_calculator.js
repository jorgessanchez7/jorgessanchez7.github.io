
function factorialCalculator() {
	var inputValue = parseFloat(document.getElementById('inputValue').value);
	var resultDIV = document.getElementById('result');
	var str = inputValue.toString();
	
	var outputValue = factorial(inputValue);
	outputValue = outputValue.toString();
	
	if (isNaN(outputValue) == true) {
		resultDIV.innerHTML="<p>"+ inputValue + " is not an Integer or a Positive Integer. Please, enter a Positive Integer." + "</p>"
		console.log(inputValue + " is not an Integer or a Positive Integer. Please, enter a Positive Integer.");
	} else	{
		resultDIV.innerHTML="<p>"+ inputValue + "!" + " is equal to " + outputValue + "</p>"
		console.log(inputValue + "!" + " is equal to " + outputValue);
	}
}

function factorial(n, memo) {
	
	memo = memo || {};
	
	if (memo[n]) {
		return memo[n];
	}
	
	if (n == 0 || n == 1){
		return 1
	}
	
	if (n%1 !== 0 || n < 0) {
		return NaN;
	}
	
	return memo[n] = n * factorial(n - 1, memo);
	
}


