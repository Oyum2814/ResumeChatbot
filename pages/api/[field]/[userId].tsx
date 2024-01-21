import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

async function fetchData(field: string, userId: string) {
  switch (field) {
    case 'educations':
      return await prismadb.education.findMany({
        where: {
          userId,
        },
      });
    case 'experiences':
      return await prismadb.experience.findMany({
        where: {
          userId,
        },
      });
    case 'projects':
    return await prismadb.project.findMany({
        where: {
        userId,
        },
    });
    case 'skills':
    return await prismadb.skill.findMany({
        where: {
        userId,
        },
    });
    case 'socials':
        return await prismadb.social.findMany({
            where: {
            userId,
            },
    });
    default:
      throw new Error(`Invalid field: ${field}`);
  }
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='GET'){
        return res.status(405).end();
    }
    const {field, userId} = req.query;
    try{
        const userData = await fetchData(String(field), String(userId));
        res.status(200).json(userData);
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}