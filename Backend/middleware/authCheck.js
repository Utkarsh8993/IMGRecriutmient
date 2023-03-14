const authCheck = (req  , res , next)=>{
    if(!req?.user) return res.status(401).json({message : 'you must bec logged in' });
    next();
}