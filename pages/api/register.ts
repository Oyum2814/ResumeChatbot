import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!='POST'){
        return res.status(405).end();
    }
    try{
        const {email, name, password} = req.body;
        const existingUser = await prismadb.user.findUnique({
            where:{email,}
        });
        if(existingUser) {
            return res.status(422).json({error: 'Email taken'});
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const user = await(prismadb.user.create({
            data: {
                name,
                firstName:'',
                middleName:'',
                lastName:'',
                designation:'',
                address:'',
                email,
                phone:'',
                summary:'',
                story:'',
                site:'',
                hashedPassword, // Replace 'your_password_here' with the actual password field from your new data structure
                image: '', // You might want to update this based on your new data structure
                emailVerified: new Date(), // Assuming you still have an emailVerified field
                experiences: {
                    create: {
                        title:'',
                        organization: '',
                        location: '' ,
                        startDate: '' ,
                        endDate: '' ,
                        description: '' ,
                    }
                },
                educations: {
                    create: {
                        school: '',
                        degree: '',
                        city: '',
                        startDate: '',
                        graduationDate: '',
                        description: '',
                    }
                },
                projects: {
                  create: {
                    title: '',
                    link: '',
                    description: '',
                  }, // Assuming projects is an array of objects
                },
                skills: {
                  create: {
                    title: '',
                  }, // Assuming skills is an array of objects
                },
                socials: {
                  create: {
                    platform: '',
                    username: '',
                    link: '',
                  }, // Assuming socials is an array of objects
                },
              },
        }));
        return res.status(200).json(user);

    } catch(error){
        return res.status(400).json({error});
    }
}