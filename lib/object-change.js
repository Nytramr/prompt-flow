/**
 * Change the type of the value depending on sertain attributes in the key
 * @param {Object} obj object to be changed
 */
module.exports.changeKeysAndValues = function (obj) {
  
  var keysToChange = Object.keys(obj).map(function (key) {
    var match = /([\w\$]+)(\[\])/.exec(key); //If it is an array

    if (match) {
      var res = match.splice(0,3);
      res.push(obj[key]);
      return res;
    }

    return null;
  });
  
  console.log(keysToChange);
  
  var i = keysToChange.length - 1;
  for (;i >= 0; i--) {
    if (keysToChange[i]) {
      obj[keysToChange[i][1]] = [obj[keysToChange[i][0]]];
      delete obj[keysToChange[i][0]];
    }
  }
};


/**
 * Updates the Object obj with the properties of addition
 * @param {Object} obj      Object to update.
 * @param {Object} addition Object from where to take the updates.
 */
module.exports.updateObject = function (obj, addition) {
  var key;
  var i;
  
  for(key in addition) {
    if (obj[key] !== undefined) {
      var typeObj = obj[key].constructor;
      if (typeObj === addition[key].constructor) {
        if (typeObj === Array) {
          for (i = 0; i < addition[key].length; i++) {
            obj[key].push(addition[key][i]);
          }
          continue;
        } else if (typeObj === Object) {
          objectMerge(obj[key], addition[key]);
          continue;
        } 
      } 
    }
    obj[key] = addition[key];
  }
};
