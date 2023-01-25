const UserModel =require ('./model/user.js')

let routeGuard = async ( req,res,next)=> {
    let user = await UserModel.findOne({_id: req.session.userId})
    if ( user){
        next()
    }else {
        res.redirect('/')
    }
 
}

module.exports = routeGuard