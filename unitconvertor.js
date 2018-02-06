//
//



function lengthUnitConverter (inputValue, inputUnits, outputUnits) {
	
	var outputValue = 0;
	
	if (inputUnits == "centimeters") {
		if (outputUnits == "centimeters") {
			outputValue = inputValue;
		}
		if (outputUnits == "inches") {
			outputValue = inputValue/2.54;
		}
		if (outputUnits == "feet") {
			outputValue = inputValue/30.48;
		}
		if (outputUnits == "yards") {
			outputValue = inputValue/91.44;
		}
		if (outputUnits == "meters") {
			outputValue = inputValue/100;
		}
		if (outputUnits == "kilometers") {
			outputValue = inputValue/100000;
		}
		if (outputUnits == "miles") {
			outputValue = inputValue/160934;
		}
	}
	
	if (inputUnits == "inches") {
		if (outputUnits == "centimeters") {
			outputValue = 2.54*inputValue;
		}
		if (outputUnits == "inches") {
			outputValue = inputValue;
		}
		if (outputUnits == "feet") {
			outputValue = inputValue/12;
		}
		if (outputUnits == "yards") {
			outputValue = inputValue/36;
		}
		if (outputUnits == "meters") {
			outputValue = inputValue/39.3701;
		}
		if (outputUnits == "kilometers") {
			outputValue = inputValue/39370.1;
		}
		if (outputUnits == "miles") {
			outputValue = inputValue/63360;
		}
	}
	
	if (inputUnits == "feet") {
		if (outputUnits == "centimeters") {
			outputValue = 30.48*inputValue;
		}
		if (outputUnits == "inches") {
			outputValue = 12*inputValue;
		}
		if (outputUnits == "feet") {
			outputValue = inputValue;
		}
		if (outputUnits == "yards") {
			outputValue = inputValue/3;
		}
		if (outputUnits == "meters") {
			outputValue = inputValue*0.3048;
		}
		if (outputUnits == "kilometers") {
			outputValue = inputValue*0.0003048;
		}
		if (outputUnits == "miles") {
			outputValue = inputValue/5280;
		}
	}
	
	if (inputUnits == "yards") {
		if (outputUnits == "centimeters") {
			outputValue = 91.44*inputValue;
		}
		if (outputUnits == "inches") {
			outputValue = 36*inputValue;
		}
		if (outputUnits == "feet") {
			outputValue = 3*inputValue;
		}
		if (outputUnits == "yards") {
			outputValue = inputValue;
		}
		if (outputUnits == "meters") {
			outputValue = inputValue*0.9144;
		}
		if (outputUnits == "kilometers") {
			outputValue = inputValue*0.0009144;
		}
		if (outputUnits == "miles") {
			outputValue = inputValue/1760;
		}
	}
	
	if (inputUnits == "meters") {
		if (outputUnits == "centimeters") {
			outputValue = 100*inputValue;
		}
		if (outputUnits == "inches") {
			outputValue = inputValue/0.0254;
		}
		if (outputUnits == "feet") {
			outputValue = inputValue/0.3048;
		}
		if (outputUnits == "yards") {
			outputValue = inputValue/0.9144;
		}
		if (outputUnits == "meters") {
			outputValue = inputValue;
		}
		if (outputUnits == "kilometers") {
			outputValue = inputValue/1000;
		}
		if (outputUnits == "miles") {
			outputValue = inputValue/1609.34;
		}
	}
	
	if (inputUnits == "kilometers") {
		if (outputUnits == "centimeters") {
			outputValue = 100000*inputValue;
		}
		if (outputUnits == "inches") {
			outputValue = inputValue/0.0000254;
		}
		if (outputUnits == "feet") {
			outputValue = inputValue/0.0003048;
		}
		if (outputUnits == "yards") {
			outputValue = inputValue/0.0009144;
		}
		if (outputUnits == "meters") {
			outputValue = 1000*inputValue;
		}
		if (outputUnits == "kilometers") {
			outputValue = inputValue;
		}
		if (outputUnits == "miles") {
			outputValue = inputValue/1.60934;
		}
	}
	
	if (inputUnits == "miles") {
		if (outputUnits == "centimeters") {
			outputValue = 160934*inputValue;
		}
		if (outputUnits == "inches") {
			outputValue = 63360*inputValue;
		}
		if (outputUnits == "feet") {
			outputValue = 5280*inputValue;
		}
		if (outputUnits == "yards") {
			outputValue = 1760*inputValue;
		}
		if (outputUnits == "meters") {
			outputValue = 1609.34*inputValue;
		}
		if (outputUnits == "kilometers") {
			outputValue = 1.60934*inputValue;
		}
		if (outputUnits == "miles") {
			outputValue = inputValue;
		}
	}
	
	return (outputValue)
}
	