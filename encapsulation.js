

function isNonEmptyString () {
	let inputText = document.getElementById('inputValueNonEmpty').value;
	let isNonEmpty = validator.isNonEmpty(inputText) ? " not" : "";
	let resultDIVNonEmpty = document.getElementById("resultNonEmpty");
	resultDIVNonEmpty.innerHTML = `<p>The input value is${isNonEmpty} an empty string</p>`;
    console.log(`The input value is${isNonEmpty} an empty string`);
}

function isNumericString () {
	let inputText = document.getElementById('inputValueNumeric').value;
	let isNumeric = validator.isNumeric(inputText) ? "" : " not";
	let resultDivNumeric = document.getElementById("resultNumeric");
	resultDivNumeric.innerHTML = `<p>The input value is${isNumeric} numeric</p>`;
    console.log(`The input value is${isNumeric} numeric`);
}

function isIntegerString () {
	let inputText = document.getElementById('inputValueInteger').value;
	let isInteger = validator.isInteger(inputText) ? "" : " not";
	let resultDIVInteger = document.getElementById("resultInteger");
	resultDIVInteger.innerHTML = `<p>The input value is${isInteger} an integer</p>`;
    console.log(`The input value is${isInteger} an integer`);
}

function isNegativeIntegerString () {
	let inputText = document.getElementById('inputValueNegativeInteger').value;
	let isNegativeInteger = validator.isNegativeInteger(inputText) ? "" : " not";
	let resultDIVNegativeInteger = document.getElementById("resultNegativeInteger");
	resultDIVNegativeInteger.innerHTML = `<p>The input value is${isNegativeInteger} a negative integer</p>`;
    console.log(`The input value is${isNegativeInteger} a negative integer`);
}

function isPositiveIntegerString () {
	let inputText = document.getElementById('inputValuePositiveInteger').value;
	let isPositiveInteger = validator.isPositiveInteger(inputText) ? "" : " not";
	let resultDIVPositiveInteger = document.getElementById("resultPositiveInteger");
	resultDIVPositiveInteger.innerHTML = `<p>The input value is${isPositiveInteger} a positive integer</p>`;
    console.log(`The input value is${isPositiveInteger} a positive integer`);
}

function isNonNegativeIntegerString () {
	let inputText = document.getElementById('inputValueNonNegativeInteger').value;
	let isInteger = validator.isInteger(inputText);
	let resultDIVNonNegativeInteger = document.getElementById("resultNonNegativeInteger");
	if (isInteger == false) {	
		resultDIVNonNegativeInteger.innerHTML="<p>"+ "The input value is not an integer" +"</p>"
		console.log("The input value is not an integer")
	} else {
		let isNonNegativeInteger = validator.isNonNegativeInteger(inputText)? " a not" : " a";
		resultDIVNonNegativeInteger.innerHTML = `<p>The input value is${isNonNegativeInteger} negative integer</p>`;
		console.log(`The input value is${isNonNegativeInteger} negative integer`);
	}
}

function isInRangeString () {
	let inputText = document.getElementById('inputValueInRange').value;
	let inputValueInRangeLower = parseFloat(document.getElementById('inputValueInRangeLower').value);
	let inputValueInRangeUpper = parseFloat(document.getElementById('inputValueInRangeUpper').value);
	
	if (isNaN(inputValueInRangeLower)) {
		inputValueInRangeLower = -Infinity;
	}
	if (isNaN(inputValueInRangeUpper)) {
		inputValueInRangeUpper = Infinity;
	}
	
	let resultDIVInRange = document.getElementById("resultInRange");
	
	if (inputValueInRangeLower >= inputValueInRangeUpper) {
		resultDIVInRange.innerHTML="<p>"+ inputValueInRangeUpper + " is less or equal than " + inputValueInRangeLower + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit" + "</p>"
		console.log(inputValueInRangeUpper + " is less or equal than " + inputValueInRangeLower + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit");
	} else {
		let isInRange = validator.isInRange(inputText, inputValueInRangeLower, inputValueInRangeUpper)? "" : " not";
		resultDIVInRange.innerHTML = `<p>The input value ${inputText}, is${isInRange} in range between ${inputValueInRangeLower} and ${inputValueInRangeUpper}</p>`;
		console.log(`The input value ${inputText}, is${isInRange} in range between ${inputValueInRangeLower} and ${inputValueInRangeUpper}`);
	}
}

function isEmail () {
	let inputText = document.getElementById('inputValueEmail').value;
	let isEmail = validator.isValidEmail(inputText)? " a valid" : " an invalid";
	let resultDIVEmail = document.getElementById("resultEmail");
	resultDIVEmail.innerHTML = `<p>The input value is${isEmail} e-mail</p>`;
    console.log(`The input value is${isEmail} e-mail`);
}

function lengthIsInRangeString () {
	let inputText = document.getElementById('inputValueLengthInRange').value;
	let inputValueLengthInRangeLower = parseFloat(document.getElementById('inputValueLengthInRangeLower').value);
	let inputValueLengthInRangeUpper = parseFloat(document.getElementById('inputValueLengthInRangeUpper').value);
	
	if (isNaN(inputValueLengthInRangeLower)) {
		inputValueLengthInRangeLower = -Infinity;
	}
	if (isNaN(inputValueLengthInRangeUpper)) {
		inputValueLengthInRangeUpper = Infinity;
	}
	
	let resultDIVLengthInRange = document.getElementById("resultLengthInRange");
	
	if (inputValueLengthInRangeLower >= inputValueLengthInRangeUpper) {
		resultDIVLengthInRange.innerHTML="<p>"+ inputValueLengthInRangeUpper + " is less or equal than " + inputValueLengthInRangeLower + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit" + "</p>"
		console.log(inputValueLengthInRangeUpper + " is less or equal than " + inputValueLengthInRangeLower + ". Please, enter numbers that guarantee that the lower limit is less than the upper limit");
	} else {
		let lengthIsInRange = validator.lengthIsInRange(inputText, inputValueLengthInRangeLower, inputValueLengthInRangeUpper)? "" : " not";
		resultDIVLengthInRange.innerHTML = `<p>The amount of characters of the word "${inputText}", is${lengthIsInRange} in range between ${inputValueLengthInRangeLower} and ${inputValueLengthInRangeUpper}</p>`;
		console.log(`The amount of characters of the word "${inputText}", is${lengthIsInRange} in range between ${inputValueLengthInRangeLower} and ${inputValueLengthInRangeUpper}`);
	}
}

function matchRegexString () {
	let inputValueRegex = document.getElementById('inputValueRegex').value;
	inputValueRegex = inputValueRegex.substring(inputValueRegex.length-1,1)
	inputValueRegex = RegExp(inputValueRegex)
	let inputValueString = document.getElementById('inputValueString').value;
	inputValueString = String(inputValueString);
	let outputMatchRegexString = validator.matchesRegex(inputValueString, inputValueRegex)? "matches" : "does not match";
	let resultDIVMatchRegexString = document.getElementById("resultMatchRegexString");
	resultDIVMatchRegexString.innerHTML=`<p>The string ${inputValueString}, ${outputMatchRegexString} with the regular expression "${inputValueRegex}"</p>`;
	console.log(`The string ${inputValueString}, ${outputMatchRegexString} with the regular expression "${inputValueRegex}`);
}

let validator = (function () {
    let isValid = true;
    return {
        isNonEmpty: function (str) {
			if (str.length == 0) {
				return isValid = false;
			} else {
				return true;
			}
		},
		isNumeric: function (str) {
			if (isNaN(parseFloat(str))) {
				return isValid = false;
			} else {
				return true;
			}
		},
		isInteger: function (str) {
			if (Number.isInteger(parseFloat(str))) {
				return true;
			} else {
				return isValid = false;
			}
		},
		isNegativeInteger: function (str) {
			if (Number.isInteger(parseFloat(str)) && parseFloat(str) < 0) {
				return true;
			} else {
				return isValid = false;
			}
		},
		isPositiveInteger: function (str) {
			if (Number.isInteger(parseFloat(str)) && parseFloat(str) > 0) {
				return true;
			} else {
				return isValid = false;
			}
		},
		isNonNegativeInteger: function (str) {
			if (Number.isInteger(parseFloat(str)) && parseFloat(str) >= 0) {
				return true;
			} else {
				return isValid = false;
			}
		},
		isInRange: function (str, m, n) {
			if (parseFloat(str)>m && parseFloat(str) < n) {
				return true;
			} else {
				return isValid = false;
			}
		},
		isValidEmail: function (str) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (re.test(str)) {
				return true;
			} else {
				return isValid = false;
			}
		},
		lengthIsInRange: function (str, m, n) {
			if (str.length>=m && str.length <= n) {
				return true;
			} else {
				return isValid = false;
			}
		},
		matchesRegex: function (str, regex) {
			if (regex.test(str)) {
				return true;
			} else {
				return isValid = false;
			}
		},
		isValid: function () {
			return isValid;
		},
		reset: function () {
			true;
		},
	}
}());

	