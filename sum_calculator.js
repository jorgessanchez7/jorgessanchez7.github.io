
function sumCalculator() {
	var inputValue1 = parseFloat(document.getElementById('inputValue1').value);
	var inputValue2 = parseFloat(document.getElementById('inputValue2').value);
	var resultDIV = document.getElementById('result');
	
	if (inputValue1 > inputValue2) {
		resultDIV.innerHTML="<p>"+ inputValue1 + " is less than " + inputValue2 + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit" + "</p>"
		console.log(inputValue1 + " is less than " + inputValue2 + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit");
	} else {
		
		var outputValue1 = gaussSum(inputValue1);
		var outputValue2 = gaussSum(inputValue2);
		var outputValue = outputValue2 - outputValue1 + inputValue1
		outputValue1 = outputValue1.toString();
		outputValue2 = outputValue2.toString();
		outputValue = outputValue.toString();
		
		if (isNaN(outputValue1) == true) {
			resultDIV.innerHTML="<p>"+ inputValue1 + " is not an Integer or a Positive Integer. Please, enter a Positive Integer." + "</p>"
			console.log(inputValue1 + " is not an Integer or a Positive Integer. Please, enter a Positive Integer.");
		} else if (isNaN(outputValue2) == true) {
			resultDIV.innerHTML="<p>"+ inputValue2 + " is not an Integer or a Positive Integer. Please, enter a Positive Integer." + "</p>"
			console.log(inputValue2 + " is not an Integer or a Positive Integer. Please, enter a Positive Integer.");
		} else	{
		resultDIV.innerHTML="<p>"+ "The sum of all integers between " + inputValue1 + " and " + inputValue2 + " is equal to " + outputValue + "</p>"
		console.log("The sum of all integers between " + inputValue1 + " and " + inputValue2 + " is equal to " + outputValue);
		}
	}
}

function gaussSum(n) {
	
	if (n == 0){
		return 0
	}
	
	if (n%1 !== 0 || n < 0) {
		return NaN;
	}
	
	return ((n*(n + 1))/2);
	
}