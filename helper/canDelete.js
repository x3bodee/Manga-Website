module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
    }
    else {
        if (req.user.type == "2") {
            next();
        }else{
            res.redirect('/');
        }
        
    }
}