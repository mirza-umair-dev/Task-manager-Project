import User from "../models/user.js";
import jwt from 'jsonwebtoken';
export const protect = async (req,res,next) => {
    let token ;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({message:'Not authorized or Invalid Token '});
        }

        
    }
    if(!token){
            return res.status(401).json({message:'Not authorized or Invalid Token '});
        }
}

export const adminOnly = async (req,res,next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    }
    else{
        res.status(403).json({message:'Access denied. Admin only'})
    }
}