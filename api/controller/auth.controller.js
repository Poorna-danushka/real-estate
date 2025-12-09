import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async(req,res,next)=>{
    
    // console.log(req.body)
    // to save in data dease
    const {username,email,password}=req.body;
    const hashedpassword = bcryptjs.hashSync(password,10)


    //create new user to save
    const newUser=new User({username,email,password:hashedpassword})
    //save
    //newUser.save();

    //reduce errors wait until this one finsh if add await function need to change to async
    // await newUser.save();

    // //if create send res[once 201 ane jason]
    // res.status(201).json({ message: "created successfully" });

    try{
        await newUser.save();
        res.status(201).json({ message: "created successfully" });
    }catch(err){
    //     res.status(500).json(err.message);
    // }//up is not the best way to handle errors 

    //instead of this up part use middleware
        next(err);
    }
}

export const signin = async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser=await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401,'Wrong credentials!'));
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET)
         const {password:pass, ...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
       
    }catch(err){
        next(err)
    }
}
