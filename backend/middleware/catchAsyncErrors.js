//to maintain the code cleanness and 
//cumpulsulry use of try-catch-Error method with 
//asyn-Await function

//i use this method

module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
  