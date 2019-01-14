
function coinsCalculator() {
	var inputValue = parseFloat(document.getElementById('inputValue').value);
	var resultDIV = document.getElementById('result');
	
	var outputValue = coinscounter(inputValue);
	
	if (outputValue == 1) {
		resultDIV.innerHTML="<p>"+ "You do not need coins to complete 0 cents" + "</p>"
		console.log("You do not need coins to complete 0 cents");
	} else if (outputValue == 0) {
		resultDIV.innerHTML="<p>"+ inputValue + " is not an Integer or a Positive Integer. Please, enter a Positive Integer." + "</p>"
		console.log(inputValue + " is not an Integer or a Positive Integer. Please, enter a Positive Integer.");
	} else	{
		if (inputValue ==1) {
			resultDIV.innerHTML="<p>"+ "To complete " + inputValue + " cent; you need " + outputValue + "</p>"
			console.log("To complete " + inputValue + " cent; you need " + outputValue);
		} else {
			resultDIV.innerHTML="<p>"+ "To complete " + inputValue + " cents; you need " + outputValue + "</p>"
			console.log("To complete " + inputValue + " cents; you need " + outputValue);
		}
	}
}

function coinscounter(n) {
	
	if (n == 0){
		return 1
	} else if (n%1 !== 0 || n < 0) {
		return 0;
	} else {
		var numberOfQuarters = Math.trunc(n/25);
		var numberOfDimes = Math.trunc((n%25)/10);
		var numberOfNickels = Math.trunc(((n%25)%10)/5);
		var numberOfPennies = Math.trunc(((n%25)%10)%5);
		
		if (numberOfQuarters == 0) {
			var strNumberOfQuarters = "";
		} else if (numberOfQuarters == 1) {
			var strNumberOfQuarters = "1 quarter";
		} else {
			numberOfQuarters = numberOfQuarters.toString();
			var strNumberOfQuarters = numberOfQuarters + " quarters";
		}
		
		if (numberOfDimes == 0) {
			var strNumberOfDimes = "";
		} else if (numberOfDimes == 1) {
			var strNumberOfDimes = "1 dime";
		} else {
			numberOfDimes = numberOfDimes.toString();
			var strNumberOfDimes = numberOfDimes + " dimes";
		}
		
		if (numberOfNickels == 0) {
			var strNumberOfNickels = "";
		} else if (numberOfNickels == 1) {
			var strNumberOfNickels = "1 nickel";
		} else {
			numberOfNickels = numberOfNickels.toString();
			var strNumberOfNickels = numberOfNickels + " nickels";
		}
		
		if (numberOfPennies == 0) {
			var strNumberOfPennies = "";
		} else if (numberOfPennies == 1) {
			var strNumberOfPennies = "1 penny";
		} else {
			numberOfPennies = numberOfPennies.toString();
			var strNumberOfPennies = numberOfPennies + " pennies";
		}
		
		var output = [strNumberOfQuarters, strNumberOfDimes, strNumberOfNickels, strNumberOfPennies];
		var textOut = "";
		
		for (i = 0; i < output.length; i++) {
			if (output[i] !== ""){
				textOut += output[i] + ", ";
			}
		}
		
		textOut = textOut.substring(0, textOut.length - 1);
		textOut = textOut.replace(/.$/,".");
		
		return textOut
	}
	
}


