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
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ success: true, user: rest });

       
    }catch(err){
        next(err)
    }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};


