function error(messag, code){
    let e = new Error(messag);
    if(code){
        e.statusCode = code;
    }
    return e;
}

module.exports = error;