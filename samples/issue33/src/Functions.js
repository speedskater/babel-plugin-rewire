function useBeforeDeclaration() {
	return myFunc();
};

function myFunc() {
  return 2;
};



var mySecondFunc = function() {
  return 2;
};

var Functions = {
  testMyFunc: function() {
    return myFunc();
  },

  testSecondFunc: function() {
    return mySecondFunc();
  },

	testUseBeforeDeclaration: function() {
		return useBeforeDeclaration();
	}
};

module.exports = Functions;
