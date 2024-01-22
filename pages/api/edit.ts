import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!='PATCH')
    {
        return res.status(405).end();
    }
    try{
        const {currentUser} = await serverAuth(req, res);
        const {
          firstName,
          middleName,
          lastName,
          designation,
          address,
          phone,
          summary,
          story,
          site,
          experiences,
          educations,
          projects,
          skills,
          socials,
        } = req.body;
        
        const existingUserData = await prismadb.user.findUnique({
            where: {
              id: currentUser.id,
            },
            include: {
              experiences: true,
              educations: true,
              projects: true,
              skills: true,
              socials: true,
            },
        });

        if (!existingUserData) {
        throw new Error("User not found");
        }
        console.log("Existing User Data: "+existingUserData);

        const updatedUser = await prismadb.user.update({
            where:{
                id:currentUser.id
            },
            data: {
                firstName,
                middleName,
                lastName,
                designation,
                address,
                phone,
                summary,
                story,
                site,
                experiences: (experiences.length>0)?
                {
                    deleteMany: {
                        userId: currentUser.id,
                    },
                    createMany: {
                        data: experiences.map((exp: any) => ({
                            title: exp.title,
                            organization: exp.organization,
                            location: exp.location,
                            startDate: exp.startDate,
                            endDate: exp.endDate,
                            description: exp.description,
                        })),
                    },
                }
                :{
                    deleteMany:{
                        userId:currentUser.id,
                    }
                },
                educations: (educations.length>0)?
                {
                    deleteMany: {
                        userId: currentUser.id,
                    },
                    createMany: {
                        data: educations.map((ed: any) => ({
                            school: ed.school,
                            degree: ed.degree,
                            city: ed.city,
                            startDate: ed.startDate,
                            graduationDate: ed.graduationDate,
                            description: ed.description,
                        })),
                    },
                }
                :{
                    deleteMany:{
                        userId:currentUser.id,
                    }
                },
                projects: (projects.length>0)?
                {
                    deleteMany: {
                        userId: currentUser.id,
                    },
                    createMany: {
                        data: projects.map((proj: any) => ({
                            title: proj?.title,
                            link: proj?.link,
                            description: proj?.description,
                            startDate:proj?.startDate,
                            endDate:proj?.endDate
                        })),
                    },
                }
                :{
                    deleteMany:{
                        userId:currentUser.id,
                    }
                }
                ,
                skills: (skills.length>0)?
                {
                    deleteMany: {
                        userId: currentUser.id,
                    },
                    createMany: {
                        data: skills.map((skill: any) => ({
                            title: skill?.title,
                        })),
                    },
                }
                :{
                    deleteMany:{
                        userId:currentUser.id,
                    }
                },
                socials: (socials.length>0)?
                {
                    deleteMany: {
                        userId: currentUser.id,
                    },
                    createMany: {
                        data: socials.map((social: any) => ({
                            platform:social?.platform,
                            username:social?.username,
                            link:social?.link
                        })),
                    },
                }
                :{
                    deleteMany:{
                        userId:currentUser.id,
                    }
                },
            },
        });
        return res.status(200).json(updatedUser);
    }
    catch(error)
    {
        console.log(error);
        res.status(400).end();
    }
}