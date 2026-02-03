import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const signin = async(req: Request, res: Response): Promise<void> => {
    try{
        const {email, password} = req.body;

        //cari apakah ada email di database
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message: "User not found"});
            return;
        }

        //validasi password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({message: "Invalid password"});
            return;
        }

        //buat token jwt
        const token = jwt.sign({id: user._id, email: user.email, name: user.name}, JWT_SECRET, {
            expiresIn: "1d"
        });

        res.status(200).json({token, user: {
            id: user._id,
            email: user.email,
            name: user.name
        }});
        return ;
    }catch(error){
        console.log("Error while signing in : ", error);
        res.status(500).json({message: "Error while signing in"});
    }
}

export const initiateAdmin = async(req: Request, res: Response): Promise<void> => {
    try{
        const {email, password, name} = req.body;

        //cek apakah ada data admin pada database
        const count = await User.countDocuments({});

        if(count > 0){
            res.status(400).json({message: "Admin already exists"});
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            name
        })

        await newUser.save();
        res.status(201).json({message: "Admin created successfully"});
        return;
    }catch(error){
        console.log("Error while making admin : ", error);
        res.status(500).json({message: "Error while making admin"});
    }
}