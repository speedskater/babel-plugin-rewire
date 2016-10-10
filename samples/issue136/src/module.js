var varA, varB, varC;

function setVarA(bool) {
	if(bool) {
		varA = varB;
	}
	else {
		varA = varC;
	}
}

function setVarB(v) {
	varB = v;
}

function setVarC(v) {
	varC = v;
}

export {
	varA,
	setVarA,
	setVarB,
	setVarC
}
