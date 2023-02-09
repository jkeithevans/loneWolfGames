const Utilities = (function() {

  nameFormatter = (name) => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
  };

  numberFilter = (string) => {
    let numRemover = string.split('').filter(item => item.match(/\d/g));
    return numRemover.toString();
  }

  return {
   nameFormatter: nameFormatter,
   numberFilter: numberFilter
  };

})();

module.exports = Utilities;