import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='GET'){
        return res.status(405).end();
    }
    try {
        let templates;
        if(prismadb){
            templates = await prismadb.resumeTemplate.findMany();
        }
        res.status(200).json(templates);
      } catch (error) {
        console.error('Error fetching resume templates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}