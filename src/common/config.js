


var hasLogin = false;
var pid = ""
var pType = ""
var setLoginState=(state)=>{
    hasLogin = state
}
var getLoginState = ()=>{
    return hasLogin
}
var setPid_And_PTtye=(_pid="",_pType="")=>{
    pid = _pid;
    pType = _pType
}
var getPid_And_PTtye = ()=>{
    return {pid,pType}
}

module.exports = { getLoginState ,setLoginState , getPid_And_PTtye,setPid_And_PTtye}

