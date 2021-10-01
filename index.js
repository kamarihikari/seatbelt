function execFunctionWrapper(fn) {
  return new Promise((resolve, reject) => {
    let ret;

    try { ret = fn(); }
    catch(exception) { return reject(exception); }

    return resolve(ret);
  });
}
function execErrorHandler(err, errHandler){
  return errHandler
        ? errHandler(err)
        : [err, null];
}

function execResolveHandler(data, errHandler){
  return errHandler
        ? data
        : [null, data];
}

function seatbelt(fn, errHandler) {
  return new Promise((resolve, reject) => {
    if (!fn || typeof fn !== 'function') return reject(new Error('First argument must be a function'));
    if (arguments.length > 1 && typeof errHandler !== 'function') return reject(new Error('Error handler must be a function'));
  
    return resolve(execFunctionWrapper(fn));
  })
  .then(data => execResolveHandler(data, errHandler))
  .catch(exception => execErrorHandler(exception, errHandler));
}

module.exports = seatbelt;
