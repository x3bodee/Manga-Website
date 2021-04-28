module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
    }
    else {
        if (req.user.type == "2" || req.user.type == "3" ) {
            next();
        }else{
            res.render('err/index',{err:"you don't have permission to access this page"});
        }
        
    }
}