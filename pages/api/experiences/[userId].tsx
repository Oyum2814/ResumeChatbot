import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='GET'){
        return res.status(405).end();
    }
    const {userId} = req.query;
    try{
            const userExperiences = await prismadb.experience.findMany({
                where: {
                  userId: String(userId),
                },
              }); 
              res.status(200).json(userExperiences);
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}