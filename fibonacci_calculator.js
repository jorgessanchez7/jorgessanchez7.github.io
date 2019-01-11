
function fibonacciCalculator() {
	var inputValue = parseFloat(document.getElementById('inputValue').value);
	var resultDIV = document.getElementById('result');
	var str = inputValue.toString();
	
	var outputValue = fibonacci(inputValue);
	
	if (isNaN(outputValue) == true) {
		resultDIV.innerHTML="<p>"+ inputValue + " is not an Integer. Please enter an Integer Number" + "</p>"
		console.log(inputValue + " is not an Integer. Please enter an Integer Number");
	} else if (outputValue == 0) {
		resultDIV.innerHTML="<p>"+ "The element " + inputValue + " for the Fibonacci Serie is: " + outputValue + "</p>"
		console.log("The element " + inputValue + " for the Fibonacci Serie is: " + outputValue);
	} else if (str.substr(str.length-1) == "1" && str.substr(str.length-2, str.length) !== "11"){
		resultDIV.innerHTML="<p>"+ "The " + inputValue +"<sup>st</sup>" + " element for the Fibonacci Serie is: " + outputValue + "</p>"
		console.log("The " + inputValue +"st" + " element for the Fibonacci Serie is: " + outputValue);
	} else if (str.substr(str.length-1) == "2" && str.substr(str.length-2, str.length) !== "12"){
		resultDIV.innerHTML="<p>"+ "The " + inputValue +"<sup>nd</sup>" + " element for the Fibonacci Serie is: " + outputValue + "</p>"
		console.log("The " + inputValue +"nd" + " element for the Fibonacci Serie is: " + outputValue);
	} else if (str.substr(str.length-1) == "3" && str.substr(str.length-2, str.length) !== "13"){
		resultDIV.innerHTML="<p>"+ "The " + inputValue +"<sup>rd</sup>" + " element for the Fibonacci Serie is: " + outputValue + "</p>"
		console.log("The " + inputValue +"rd" + " element for the Fibonacci Serie is: " + outputValue);
	} else	{
		resultDIV.innerHTML="<p>"+ "The " + inputValue +"<sup>th</sup>" + " element for the Fibonacci Serie is: " + outputValue + "</p>"
		console.log("The " + inputValue +"th" + " element for the Fibonacci Serie is: " + outputValue);
	}
}

function fibonacci(n, memo) {
	
	memo = memo || {};
	
	if (memo[n]) {
		return memo[n];
	}
	
	if (n == 0){
		return n
	}
	
	if (n%1 !== 0) {
		return NaN;
	}
	
	if (n < 2){
		return n
	}
	
	return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
	
}


