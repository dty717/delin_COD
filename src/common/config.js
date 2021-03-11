


var hasLogin = false;
var setLoginState=(state)=>{
    hasLogin = state
}
var getLoginState = ()=>{
    return hasLogin
}
module.exports = { getLoginState ,setLoginState}
