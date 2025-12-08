import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async(req,res)=>{
    
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
        res.status(500).json(err.message);
    }
}