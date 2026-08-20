const {getUser} = require("../service/auth")

function checkForAuthentication(){
    req.user=null;
     const authorizationHeaderValue = req.headers["Authorization"];
     if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer'))
        return next();
    const token = authorizationHeaderValue.split("Bearer")[1];
    const user = getUser(token)
    req.user= user;
    return next()
}
function restrictTo(roles){
    return function(req,res,next){
        if(!res.user)return res.redirect("/login");
        if(roles.includes(req.user.role)) return res.end("UndAuthorized")
            return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo,
}