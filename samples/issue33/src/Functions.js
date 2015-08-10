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
  }
};

module.exports = Functions;
