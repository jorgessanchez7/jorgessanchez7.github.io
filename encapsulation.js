

function isNonEmptyString () {
	
	var inputValueNonEmpty = document.getElementById('inputValueNonEmpty').value;
	inputValueNonEmpty = String(inputValueNonEmpty);
	
	var outputValueNonEmpty = validator.isNonEmpty(inputValueNonEmpty);
	
	var resultDIVNonEmpty = document.getElementById('resultNonEmpty');
	
	if (outputValueNonEmpty == false) {
		resultDIVNonEmpty.innerHTML="<p>"+ "The input value is an empty string" +"</p>"
		console.log("The input value is an empty string")
	} else {
		resultDIVNonEmpty.innerHTML="<p>"+ "The input value is not an empty string" +"</p>"
		console.log("The input value is not an empty string")
	}
}

function isNumericString () {
	
	var inputValueNumeric = document.getElementById('inputValueNumeric').value;
	inputValueNumeric = String(inputValueNumeric);
	
	var outputValueNumeric = validator.isNumeric(inputValueNumeric);
	
	var resultDIVNumeric = document.getElementById('resultNumeric');
	
	if (outputValueNumeric == false) {
		resultDIVNumeric.innerHTML="<p>"+ "The input value is not numeric" +"</p>"
		console.log("The input value is not numeric")
	} else {
		resultDIVNumeric.innerHTML="<p>"+ "The input value is numeric" +"</p>"
		console.log("The input value is numeric")
	}
}

function isIntegerString () {
	
	var inputValueInteger = document.getElementById('inputValueInteger').value;
	inputValueInteger = String(inputValueInteger);
	
	var outputValueInteger = validator.isInteger(inputValueInteger);
	
	var resultDIVInteger = document.getElementById('resultInteger');
	
	if (outputValueInteger == false) {
		resultDIVInteger.innerHTML="<p>"+ "The input value is not an integer" +"</p>"
		console.log("The input value is not an integer")
	} else {
		resultDIVInteger.innerHTML="<p>"+ "The input value is an integer" +"</p>"
		console.log("The input value is an integer")
	}
}

function isNegativeIntegerString () {
	
	var inputValueNegativeInteger = document.getElementById('inputValueNegativeInteger').value;
	inputValueNegativeInteger = String(inputValueNegativeInteger);
	
	var outputValueNegativeInteger = validator.isNegativeInteger(inputValueNegativeInteger);
	
	var resultDIVNegativeInteger = document.getElementById('resultNegativeInteger');
	
	if (outputValueNegativeInteger == false) {
		resultDIVNegativeInteger.innerHTML="<p>"+ "The input value is not a negaitive integer" +"</p>"
		console.log("The input value is not a negative integer")
	} else {
		resultDIVNegativeInteger.innerHTML="<p>"+ "The input value is a negative integer" +"</p>"
		console.log("The input value is a negative integer")
	}
}

function isPositiveIntegerString () {
	
	var inputValuePositiveInteger = document.getElementById('inputValuePositiveInteger').value;
	inputValuePositiveInteger = String(inputValuePositiveInteger);
	
	var outputValuePositiveInteger = validator.isPositiveInteger(inputValuePositiveInteger);
	
	var resultDIVPositiveInteger = document.getElementById('resultPositiveInteger');
	
	if (outputValuePositiveInteger == false) {
		resultDIVPositiveInteger.innerHTML="<p>"+ "The input value is not a positive integer" +"</p>"
		console.log("The input value is not a positive integer")
	} else {
		resultDIVPositiveInteger.innerHTML="<p>"+ "The input value is a positive integer" +"</p>"
		console.log("The input value is a positive integer")
	}
}

function isNonNegativeIntegerString () {
	
	var inputValueNonNegativeInteger = document.getElementById('inputValueNonNegativeInteger').value;
	inputValueNonNegativeInteger = String(inputValueNonNegativeInteger);
	
	var outputValueNonNegativeInteger = validator.isNonNegativeInteger(inputValueNonNegativeInteger);
	
	var resultDIVNonNegativeInteger = document.getElementById('resultNonNegativeInteger');
	
	if (outputValueNonNegativeInteger == true) {
		resultDIVNonNegativeInteger.innerHTML="<p>"+ "The input value is a not negative integer" +"</p>"
		console.log("The input value is a not negaitive integer")
	} else if (parseFloat(inputValueNonNegativeInteger)%1 !== 0) {
		resultDIVNonNegativeInteger.innerHTML="<p>"+ "The input value is not an integer" +"</p>"
		console.log("The input value is not an integer")
	} else {
		resultDIVNonNegativeInteger.innerHTML="<p>"+ "The input value is a negative integer" +"</p>"
		console.log("The input value is a negative integer")
	}
}

function isInRangeString () {
	
	var inputValueInRange = document.getElementById('inputValueInRange').value;
	inputValueInRange = String(inputValueInRange);
	
	var inputValueInRangeLower = parseFloat(document.getElementById('inputValueInRangeLower').value);
	
	var inputValueInRangeUpper = parseFloat(document.getElementById('inputValueInRangeUpper').value);
	
	if (isNaN(inputValueInRangeLower)) {
		inputValueInRangeLower = -Infinity;
	}
	
	if (isNaN(inputValueInRangeUpper)) {
		inputValueInRangeUpper = Infinity;
	}
	
	var resultDIVInRange = document.getElementById('resultInRange');
	
	if (inputValueInRangeLower >= inputValueInRangeUpper) {
		resultDIVInRange.innerHTML="<p>"+ inputValueInRangeUpper + " is less or equal than " + inputValueInRangeLower + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit" + "</p>"
		console.log(inputValueInRangeUpper + " is less or equal than " + inputValueInRangeLower + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit");
	} else {
		
		var outputValueInRange = validator.isInRange(inputValueInRange, inputValueInRangeLower, inputValueInRangeUpper);
		
		if (outputValueInRange == true) {
			resultDIVInRange.innerHTML="<p>"+ inputValueInRange + " is in range between " + inputValueInRangeLower + " and " + inputValueInRangeUpper + "</p>"
			console.log(inputValueInRange + " is in range between " + inputValueInRangeLower + " and " + inputValueInRangeUpper)
		} else {
		resultDIVInRange.innerHTML="<p>"+ inputValueInRange + " is not in range between " + inputValueInRangeLower + " and " + inputValueInRangeUpper +"</p>"
		console.log(inputValueInRange + " is not in range between " + inputValueInRangeLower + " and " + inputValueInRangeUpper)
		}
	}
}

function isEmail () {
	
	var inputValueEmail = document.getElementById('inputValueEmail').value;
	inputValueEmail = String(inputValueEmail);
	
	var outputValueEmail = validator.isValidEmail(inputValueEmail);
	
	var resultDIVEmail = document.getElementById('resultEmail');
	
	if (outputValueEmail == false) {
		resultDIVEmail.innerHTML="<p>"+ inputValueEmail + " is an invalid e-mail" +"</p>"
		console.log(inputValueEmail + " is an invalid e-mail")
	} else {
		resultDIVEmail.innerHTML="<p>"+ inputValueEmail + " is a valid e-mail" +"</p>"
		console.log(inputValueEmail + " is a valid e-mail")
	}
}

function lengthIsInRangeString () {
	
	var inputValueLengthInRange = document.getElementById('inputValueLengthInRange').value;
	inputValueLengthInRange = String(inputValueLengthInRange);
	
	var inputValueLengthInRangeLower = parseFloat(document.getElementById('inputValueLengthInRangeLower').value);
	
	var inputValueLengthInRangeUpper = parseFloat(document.getElementById('inputValueLengthInRangeUpper').value);
	
	if (isNaN(inputValueLengthInRangeLower)) {
		inputValueLengthInRangeLower = -Infinity;
	}
	
	if (isNaN(inputValueLengthInRangeUpper)) {
		inputValueLengthInRangeUpper = Infinity;
	}
	
	var resultDIVLengthInRange = document.getElementById('resultLengthInRange');
	
	if (inputValueLengthInRangeLower >= inputValueLengthInRangeUpper) {
		resultDIVLengthInRange.innerHTML="<p>"+ inputValueLengthInRangeUpper + " is less or equal than " + inputValueLengthInRangeLower + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit" + "</p>"
		console.log(inputValueLengthInRangeUpper + " is less or equal than " + inputValueLengthInRangeLower + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit");
	} else {
		
		var outputValueLengthInRange = validator.lengthIsInRange(inputValueLengthInRange, inputValueLengthInRangeLower, inputValueLengthInRangeUpper);
		
		if (outputValueLengthInRange == true) {
			resultDIVLengthInRange.innerHTML="<p>"+ "The amount of characters of the word '" + inputValueLengthInRange + "' is in range between " + inputValueLengthInRangeLower + " and " + inputValueLengthInRangeUpper + "</p>"
			console.log("The amount of characters of the word '" + inputValueLengthInRange + "' is in range between " + inputValueLengthInRangeLower + " and " + inputValueLengthInRangeUpper)
		} else {
		resultDIVLengthInRange.innerHTML="<p>"+ "The amount of characters of the word '" + inputValueLengthInRange + "' is not in range between " + inputValueLengthInRangeLower + " and " + inputValueLengthInRangeUpper +"</p>"
		console.log("The amount of characters of the word '" + inputValueLengthInRange + "' is not in range between " + inputValueLengthInRangeLower + " and " + inputValueLengthInRangeUpper)
		}
	}
}

function matchRegexString () {
	
	var inputValueRegex = document.getElementById('inputValueRegex').value;
	inputValueRegex = inputValueRegex.substring(inputValueRegex.length-1,1)
	inputValueRegex = RegExp(inputValueRegex)
	
	var inputValueString = document.getElementById('inputValueString').value;
	inputValueString = String(inputValueString);
	
	var outputMatchRegexString = validator.matchesRegex(inputValueString, inputValueRegex);
	
	var resultDIVMatchRegexString = document.getElementById('resultMatchRegexString');
	
	if (outputMatchRegexString == false) {
		resultDIVMatchRegexString.innerHTML="<p>"+ inputValueString + " does not match with the regular expression " + inputValueRegex +"</p>"
		console.log(inputValueString + " does not match with the regular expression " + inputValueRegex)
	} else {
		resultDIVMatchRegexString.innerHTML="<p>"+ inputValueString + " matches with the regular expression " + inputValueRegex +"</p>"
		console.log(inputValueString + " matches with the regular expression " + inputValueRegex)
	}
}

let validator = (function () {
    let isValid = true;
    return {
        isNonEmpty: function (str) {
			if (str.length == 0) {
				return isValid = false;
			} else {
				return isValid = true;
			}
		},
		isNumeric: function (str) {
			if (isNaN(parseFloat(str))) {
				return isValid = false;
			} else {
				return isValid = true;
			}
		},
		isInteger: function (str) {
			if (Number.isInteger(parseFloat(str))) {
				return isValid = true;
			} else {
				return isValid = false;
			}
		},
		isNegativeInteger: function (str) {
			if (Number.isInteger(parseFloat(str)) && parseFloat(str) < 0) {
				return isValid = true;
			} else {
				return isValid = false;
			}
		},
		isPositiveInteger: function (str) {
			if (Number.isInteger(parseFloat(str)) && parseFloat(str) > 0) {
				return isValid = true;
			} else {
				return isValid = false;
			}
		},
		isNonNegativeInteger: function (str) {
			if (Number.isInteger(parseFloat(str)) && parseFloat(str) >= 0) {
				return isValid = true;
			} else {
				return isValid = false;
			}
		},
		isInRange: function (str, m, n) {
			if (parseFloat(str)>m && parseFloat(str) < n) {
				return isValid = true;
			} else {
				return isValid = false;
			}
		},
		isValidEmail: function (str) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (re.test(str)) {
				return isValid = true;
			} else {
				return isValid = false;
			}
		},
		lengthIsInRange: function (str, m, n) {
			if (str.length>=m && str.length <= n) {
				return isValid = true;
			} else {
				return isValid = false;
			}
		},
		matchesRegex: function (str, regex) {
			if (regex.test(str)) {
				return isValid = true;
			} else {
				return isValid = false;
			}
		},
		isValid: function () {
			return isValid;
		},
		reset: function () {
			isValid = true;
		},
	}
}());

	