
import Navbar from '@/components/Navbar'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import useInfo from "@/hooks/useInfo";
import { IoIosRemoveCircle } from "react-icons/io";

import {Resume1,Resume2,Resume3, Resume4} from "./ResumeTemplates"

interface ResumeProps{
    resumeName:string;
}

const Resume:React.FC<ResumeProps> = ({resumeName})=>{
    const {data:currentUser,mutate:mutateCurrentUser} = useCurrentUser();
    const {data:currentEducations,mutate:mutateCurrentEducations} = useInfo(currentUser?.id,'educations');
    const {data:currentExperiences,mutate:mutateCurrentExperiences} = useInfo(currentUser?.id,'experiences');
    const {data:currentProjects,mutate:mutateCurrentProjects} = useInfo(currentUser?.id,'projects');
    const {data:currentSocials,mutate:mutateCurrentSocials} = useInfo(currentUser?.id,'socials');
    const {data:currentSkills,mutate:mutateCurrentSkills} = useInfo(currentUser?.id,'skills');
    const [skillInput,setSkillInput] = useState();

    const [info,setInfo] = useState({
        firstName:'John',
        middleName:'',
        lastName:'Doe',
        designation:'Role',
        address:'Your Address',
        phone:'your phone number',
        summary:'Summary ...',
        story:'',
        site:'',
    });
   
    const [experiences, setExperiences] = useState(currentExperiences);
    const [educations, setEducations] = useState(currentEducations);
    const [projects, setProjects] = useState(currentProjects);
    const [skills, setSkills] = useState(currentSkills);
    const [socials, setSocials] = useState(currentSocials);

    useEffect(()=>{
        setInfo((prevInfo)=>({
            ...prevInfo,
            firstName: currentUser?.firstName,
            middleName:currentUser?.middleName,
            lastName: currentUser?.lastName,
            designation: currentUser?.designation,
            address:currentUser?.address,
            phone:currentUser?.phone,
            summary:currentUser?.summary,
            story:currentUser?.story,
            site:currentUser?.site,
        })); 
        mutateCurrentUser();
    },[currentUser]);

    useEffect(() => {
        if (currentEducations) {
            setEducations(currentEducations);
            mutateCurrentEducations();
        }
        if (currentExperiences) {
            setExperiences(currentExperiences);
            mutateCurrentExperiences();
        }
        if (currentProjects) {
            setProjects(currentProjects);
            mutateCurrentProjects();
        }
        if (currentSocials) {
            setSocials(currentSocials);
            mutateCurrentSocials();
        }
        if (currentSkills) {
            setSkills(currentSkills);
            mutateCurrentSkills();
        }
    }, [currentEducations,currentExperiences,currentProjects,currentSocials,currentSkills]);

    useEffect(() => {
        setUserProfile({
            ...info,
            experiences,
            educations,
            projects,
            skills,
            socials,
        });
    }, [info, experiences, educations, projects, skills, socials]);


    const [userProfile, setUserProfile] = useState({
        ...info,
        experiences,
        educations,
        projects,
        skills,
        socials,
      });

    const saveProfile = useCallback(async () => {
        try {
            console.log(userProfile?.educations);
            const response = await axios.patch('/api/edit', userProfile);
            // await mutateCurrentUser((updatedUser:any) => ({
            //     ...updatedUser,
            //     ...userProfile,
            // }));
            await mutateCurrentUser();
            await mutateCurrentEducations();
            await mutateCurrentExperiences();
            await mutateCurrentProjects();
            await mutateCurrentSkills();
            await mutateCurrentSocials();

            toast.success('Saved');
            console.log('User profile updated successfully:', response.data);
        } catch (error:any) {
          console.error('Error updating user profile:', error.message);
        }
      }, [userProfile]);
    
    return(
        <>
            <Navbar resumePage />
            <div className="md:h-screen w-screen flex flex-col-reverse  justify-between absolute md:overflow-y-hidden
            md:flex-row">
                <section id="about-sc" className="non_print_area w-screen md:w-[50%] h-auto md:h-screen md:overflow-y-auto my-16">
                    <div className="container">
                        <div className="about-cnt">
                            <form action="" className="cv-form" id="cv-form">
                                
                                <div className="cv-form-blk">
                                    <div className="cv-form-row-title">
                                        <h2 className="font-[600] uppercase tracking-[1.5px] text-xl">About section</h2>
                                    </div>
                                    <div className="cv-form-row cv-form-row-about">
                                        <div className="cols-3">
                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label required">First Name</label>
                                                <input
                                                value={info?.firstName}
                                                name="firstname" type="text" className="form-control firstname" id=""
                                                    placeholder="e.g. John" 
                                                    onChange={(e)=>{
                                                        setInfo((prevInfo) => ({
                                                            ...prevInfo,
                                                            firstName: e.target.value,
                                                        }));
                                                    }}/>
                                                <span className="form-text"></span>
                                            </div>
                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label">Middle Name</label>
                                                <input
                                                value={info?.middleName}
                                                name="middlename" type="text" className="form-control middlename" id=""
                                                placeholder="e.g. Herbert"
                                                onChange={(e)=>{
                                                    setInfo((prevInfo) => ({
                                                        ...prevInfo,
                                                        middleName: e.target.value,
                                                    }));
                                                }} />
                                                <span className="form-text"></span>
                                            </div>
                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label required">Last Name</label>
                                                <input 
                                                value = {info?.lastName}
                                                name="lastname" type="text" className="form-control lastname" id=""
                                                    placeholder="e.g. Doe" 
                                                    onChange={(e)=>{
                                                        setInfo((prevInfo) => ({
                                                            ...prevInfo,
                                                            lastName: e.target.value,
                                                        }));
                                                    }}/>
                                                <span className="form-text"></span>
                                            </div>
                                        </div>

                                        <div className="cols-3">
                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label required">Designation</label>
                                                <input name="designation" type="text" className="form-control designation" id=""
                                                    placeholder="e.g. Sr.Accountants"
                                                    value = {info?.designation}
                                                    onChange={(e)=>{
                                                        setInfo((prevInfo) => ({
                                                            ...prevInfo,
                                                            designation: e.target.value,
                                                        }));
                                                    }}/>
                                                <span className="form-text"></span>
                                            </div>
                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label">Address</label>
                                                <input name="address" type="text" className="form-control address" id=""
                                                    placeholder="e.g. Lake Street-23"
                                                    value = {info?.address}
                                                    onChange={(e)=>{
                                                        setInfo((prevInfo) => ({
                                                            ...prevInfo,
                                                            address: e.target.value,
                                                        }));
                                                    }}/>
                                                <span className="form-text"></span>
                                            </div>

                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label required">My Story</label>
                                                <input name="story" type="text" className="form-control email" id=""
                                                    placeholder=""
                                                    value = {info?.story}
                                                    onChange={(e)=>{
                                                        setInfo((prevInfo) => ({
                                                            ...prevInfo,
                                                            story: e.target.value,
                                                        }));
                                                    }}/>
                                                <span className="form-text"></span>
                                            </div>
                                        </div>

                                        <div className="cols-3">
                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label required">Phone No:</label>
                                                <input name="phoneno" type="text" className="form-control phoneno" id=""
                                                    placeholder="e.g. 456-768-798, 567.654.002"
                                                    value = {info?.phone}
                                                    onChange={(e)=>{
                                                        setInfo((prevInfo) => ({
                                                            ...prevInfo,
                                                            phone: e.target.value,
                                                        }));
                                                    }}/>
                                                <span className="form-text"></span>
                                            </div>
                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label required">Objective</label>
                                                <input name="summary" type="text" className="form-control summary" id=""
                                                    placeholder="e.g. Doe"
                                                    value = {info?.summary}
                                                    onChange={(e)=>{
                                                        setInfo((prevInfo) => ({
                                                            ...prevInfo,
                                                            summary: e.target.value,
                                                        }));
                                                    }}/>
                                                <span className="form-text"></span>
                                            </div>
                                        </div>

                                        <div className="cols-3">
                                            <div className="form-elem">
                                                <label htmlFor="" className="form-label">Website</label>
                                                <input name="email" type="text" className="form-control email" id=""
                                                    placeholder="www.example.com"
                                                    value = {info?.site}
                                                    onChange={(e)=>{
                                                        setInfo((prevInfo) => ({
                                                            ...prevInfo,
                                                            site: e.target.value,
                                                        }));
                                                    }}/>
                                                <span className="form-text"></span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="cv-form-blk">
                                    <div className="cv-form-row-title flex justify-between items-center">
                                        <h3>Academic Profile</h3>
                                    </div>

                                    <div className="row-separator repeater">
                                        <div className="repeater" data-repeater-list="group-c">
                                            {educations?.map((education:any,index:any)=>(
                                                <div data-repeater-item key={index}>
                                                    <div className="cv-form-row cv-form-row-experience">
                                                        <div className="cols-2">
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Institution</label>
                                                                <input name="edu_school"
                                                                value={education?.school}
                                                                type="text" className="form-control edu_school"
                                                                    id="" 
                                                                    onChange={(e) => {
                                                                        setEducations((prevEducations:any) => {
                                                                            const newEducations = [...prevEducations];
                                                                            newEducations[index] = {
                                                                                ...newEducations[index], 
                                                                                school: e.target.value 
                                                                            };
                                                                            return newEducations;
                                                                        })}}/>
                                                                <span className="form-text"></span>
                                                            </div>
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Degree</label>
                                                                <input name="edu_degree" type="text" className="form-control edu_degree"
                                                                    id="" 
                                                                    value={education?.degree}
                                                                    onChange={(e) => {
                                                                        setEducations((prevEducations:any) => {
                                                                            const newEducations = [...prevEducations];
                                                                            newEducations[index] = {
                                                                                ...newEducations[index], 
                                                                                degree: e.target.value 
                                                                            };
                                                                            return newEducations;
                                                                        })}}/>
                                                                <span className="form-text"></span>
                                                            </div>
                                                        </div>
                                                        <div className="cols-2">
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">City</label>
                                                                <input
                                                                value={education?.city}
                                                                name="edu_city" type="text" className="form-control edu_city" id=""
                                                                onChange={(e) => {
                                                                    setEducations((prevEducations:any) => {
                                                                        const newEducations = [...prevEducations];
                                                                        newEducations[index] = {
                                                                            ...newEducations[index], 
                                                                            city: e.target.value 
                                                                        };
                                                                        return newEducations;
                                                                    })}}   />
                                                                <span className="form-text"></span>
                                                            </div>
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Year of Passing</label>
                                                                <input 
                                                                value = {education?.graduationDate}
                                                                name="edu_graduation_date" type="date"
                                                                    className="form-control edu_graduation_date" id=""
                                                                    onChange={(e) => {
                                                                        setEducations((prevEducations:any) => {
                                                                            const newEducations = [...prevEducations];
                                                                            newEducations[index] = {
                                                                                ...newEducations[index], 
                                                                                graduationDate: e.target.value 
                                                                            };
                                                                            return newEducations;
                                                                        })}} />
                                                                <span className="form-text"></span>
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="cols-1">
                                                            <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Description</label>
                                                                    <textarea
                                                                    value={education?.description}
                                                                    name="edu_description" 
                                                                        placeholder="CGPA/Percentage"
                                                                        className="form-control edu_description" id=""
                                                                        onChange={(e) => {
                                                                            setEducations((prevEducations:any) => {
                                                                                const newEducations = [...prevEducations];
                                                                                newEducations[index] = {
                                                                                    ...newEducations[index], 
                                                                                    description: e.target.value 
                                                                                };
                                                                                return newEducations;
                                                                            });
                                                                            mutateCurrentEducations();
                                                                            }} />
                                                                    <span className="form-text xl:block"></span>
                                                                </div>
                                                        </div>
                                                        <p className="text-xs p-4 font-bold text-neutral-500">Note : Bullet points in Description can be created by seperating two senteces by | sign</p>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                        </div>
                                        <div className="flex justify-end items-center gap-x-5">
                                            <span>
                                                <IoIosRemoveCircle
                                                onClick={()=>{
                                                    setEducations((prevEducations:any) => prevEducations.slice(0, -1));
                                                    mutateCurrentEducations();
                                                }}
                                                size={30} color="red"/>
                                            </span>                            
                                            <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                            onClick={()=>{
                                                setEducations((prevEducations:any)=>[
                                                    ...prevEducations,
                                                    {
                                                        school:'',
                                                        degree:'',
                                                        city:'',
                                                        startDate:'',
                                                        graduationDate:'',
                                                        description:''
                                                    },
                                                ]);
                                                mutateCurrentEducations();
                                            }}>+</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="cv-form-blk">
                                    <div className="cv-form-row-title flex justify-between items-center">
                                        <h3>Internship Profile</h3>
                                    </div>

                                    <div className="row-separator repeater">
                                        <div className="repeater" data-repeater-list="group-b">
                                            {experiences?.map((experience:any,index:any) =>(
                                                <div data-repeater-item key={index}>
                                                    <div className="cv-form-row cv-form-row-experience">
                                                        <div className="cols-3">
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Title</label>
                                                                <input
                                                                value={experience?.title}
                                                                name="exp_title" type="text" className="form-control exp_title" id=""
                                                            onChange={(e) => {
                                                                setExperiences((prevExperiences:any) => {
                                                                    const newExperiences = [...prevExperiences];
                                                                    newExperiences[index] = {
                                                                        ...newExperiences[index], 
                                                                        title: e.target.value 
                                                                    };
                                                                    return newExperiences;
                                                                });
                                                                }}/>
                                                                <span className="form-text"></span>
                                                            </div>
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Organization</label>
                                                                <input 
                                                                value={experience?.organization}
                                                                name="exp_organization" type="text"
                                                                    className="form-control exp_organization" id="" 
                                                                    onChange={(e) => {
                                                                        setExperiences((prevExperiences:any) => {
                                                                            const newExperiences = [...prevExperiences];
                                                                            newExperiences[index] = {
                                                                                ...newExperiences[index], 
                                                                                organization: e.target.value 
                                                                            };
                                                                            return newExperiences;
                                                                        })}}/>
                                                                <span className="form-text"></span>
                                                            </div>
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Location</label>
                                                                <input
                                                                value={experience?.location}
                                                                name="exp_location" type="text" className="form-control exp_location"
                                                                    id="" 
                                                                    onChange={(e) => {
                                                                        setExperiences((prevExperiences:any) => {
                                                                            const newExperiences = [...prevExperiences];
                                                                            newExperiences[index] = {
                                                                                ...newExperiences[index], 
                                                                                location: e.target.value 
                                                                            };
                                                                            return newExperiences;
                                                                        })}}/>
                                                                <span className="form-text"></span>
                                                            </div>
                                                        </div>

                                                        <div className="cols-2">
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Start Date</label>
                                                                <input name="exp_start_date"  type="date"
                                                                value={experience?.startDate}
                                                                    className="form-control exp_start_date" id="" 
                                                                    onChange={(e) => {
                                                                        setExperiences((prevExperiences:any) => {
                                                                            const newExperiences = [...prevExperiences];
                                                                            newExperiences[index] = {
                                                                                ...newExperiences[index], 
                                                                                startDate: e.target.value 
                                                                            };
                                                                            return newExperiences;
                                                                        })}}/>
                                                                <span className="form-text"></span>
                                                            </div>
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">End Date</label>
                                                                <input 
                                                                value={experience?.endDate}
                                                                min={experience?.startDate}
                                                                name="exp_end_date" type="date" className="form-control exp_end_date"
                                                                    id="" 
                                                                    onChange={(e) => {
                                                                        setExperiences((prevExperiences:any) => {
                                                                            const newExperiences = [...prevExperiences];
                                                                            newExperiences[index] = {
                                                                                ...newExperiences[index], 
                                                                                endDate: e.target.value 
                                                                            };
                                                                            return newExperiences;
                                                                        })}}/>
                                                                <span className="form-text"></span>
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="cols-1">
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Description</label>
                                                                <textarea
                                                                value={experience?.description}
                                                                name="exp_description" 
                                                                    className="form-control exp_description" id=""
                                                                    onChange={(e) => {
                                                                        setExperiences((prevExperiences:any) => {
                                                                            const newExperiences = [...prevExperiences];
                                                                            newExperiences[index] = {
                                                                                ...newExperiences[index], 
                                                                                description: e.target.value 
                                                                            };
                                                                            return newExperiences;
                                                                        })}} />
                                                                <span className="form-text"></span>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs p-4 font-bold text-neutral-500">Note : Bullet points in Description can be created by seperating two senteces by | sign</p>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                        </div>
                                        <div className="flex justify-end items-center gap-x-5">
                                            <span>
                                                <IoIosRemoveCircle
                                                onClick={()=>{
                                                    setExperiences((prevExperiences:any) => prevExperiences.slice(0, -1));
                                                    mutateCurrentExperiences();
                                                }}
                                                size={30} color="red"
                                                />
                                            </span>
                                            <button 
                                            type="button" data-repeater-create value="Add" className="repeater-add-btn"
                                            onClick={()=>{
                                                setExperiences((prevExperiences:any)=>[
                                                    ...prevExperiences,
                                                    {
                                                        title:'',
                                                        organization:'',
                                                        location:'',
                                                        startDate: '',
                                                        endDate: '',
                                                        description: ''
                                                    },
                                                ]);
                                                mutateCurrentExperiences();
                                            }}>+</button>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="cv-form-blk">
                                    <div className="cv-form-row-title flex justify-between items-center">
                                        <h3>Projects Profile</h3>
                                    </div>

                                    <div className="row-separator repeater">
                                        <div className="repeater" data-repeater-list="group-d">
                                            {
                                                projects?.map((project:any,index:any)=>(
                                                    <div data-repeater-item key={index}>
                                                        <div className="cv-form-row cv-form-row-experience">
                                                            <div className="cols-2">
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Project Name</label>
                                                                    <input name="proj_title" type="text" className="form-control proj_title"
                                                                    value={project?.title}   id="" 
                                                                        onChange={(e) => {
                                                                            setProjects((prevProjects:any) => {
                                                                                const newProjects = [...prevProjects];
                                                                                newProjects[index] = {
                                                                                    ...newProjects[index], 
                                                                                    title: e.target.value 
                                                                                };
                                                                                return newProjects;
                                                                            });
                                                                            }}/>
                                                                    <span className="form-text"></span>
                                                                </div>

                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Project link</label>
                                                                    <input
                                                                    value={project?.link} 
                                                                    name="proj_link" type="text" className="form-control proj_link" id=""
                                                                        onChange={(e) => {
                                                                            setProjects((prevProjects:any) => {
                                                                                const newProjects = [...prevProjects];
                                                                                newProjects[index] = {
                                                                                    ...newProjects[index], 
                                                                                    link: e.target.value 
                                                                                };
                                                                                return newProjects;
                                                                            });
                                                                            }}/>
                                                                    <span className="form-text"></span>
                                                                </div>
                                                            </div>
                                                            <div className="cols-2">
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Start Date</label>
                                                                    <input name="exp_start_date" type="date"
                                                                    value={project?.startDate} 
                                                                        className="form-control exp_start_date" id="" 
                                                                        onChange={(e) => {
                                                                            setProjects((prevProjects:any) => {
                                                                                const newProjects = [...prevProjects];
                                                                                newProjects[index] = {
                                                                                    ...newProjects[index], 
                                                                                    startDate: e.target.value 
                                                                                };
                                                                                return newProjects;
                                                                            })}}/>
                                                                    <span className="form-text"></span>
                                                                </div>
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">End Date</label>
                                                                    <input name="exp_end_date" type="date" 
                                                                    min={project?.startDate}
                                                                    className="form-control exp_end_date"
                                                                    value={project?.endDate} id="" 
                                                                        onChange={(e) => {
                                                                            setProjects((prevProjects:any) => {
                                                                                const newProjects = [...prevProjects];
                                                                                newProjects[index] = {
                                                                                    ...newProjects[index], 
                                                                                    endDate: e.target.value 
                                                                                };
                                                                                return newProjects;
                                                                            })}}/>
                                                                    <span className="form-text"></span>
                                                                </div>
                                                            </div>
                                                            <div className="cols-1">
                                                                <div className="form-elem">
                                                                        <label htmlFor="" className="form-label">Description</label>
                                                                        <input
                                                                        value={project?.description} 
                                                                        name="proj_description" type="text"
                                                                            className="form-control proj_description" id=""
                                                                            onChange={(e) => {
                                                                                setProjects((prevProjects:any) => {
                                                                                    const newProjects = [...prevProjects];
                                                                                    newProjects[index] = {
                                                                                        ...newProjects[index], 
                                                                                        description: e.target.value 
                                                                                    };
                                                                                    return newProjects;
                                                                                });}} />
                                                                        <span className="form-text"></span>
                                                                </div>
                                                            </div>
                                                            <p className="text-xs p-4 font-bold text-neutral-500">Note : Bullet points in Description can be created by seperating two senteces by | sign</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="flex justify-end items-center gap-x-5 w-full">
                                            <span>
                                                <IoIosRemoveCircle
                                                onClick={()=>{
                                                    setProjects((prevProjects:any) => prevProjects.slice(0, -1));
                                                    mutateCurrentProjects();
                                                }}
                                                size={30} color="red"/>
                                            </span>
                                            <div>
                                                <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                                onClick={()=>{
                                                    setProjects((prevProjects:any)=>[
                                                        ...prevProjects,
                                                        {
                                                            title:'',
                                                            link:'',
                                                            description:'',
                                                            startDate:'',
                                                            endDate:'',
                                                        },
                                                    ]);
                                                    mutateCurrentProjects();
                                                }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="cv-form-blk xl:block">
                                    <div className="cv-form-row-title flex items-center justify-between">
                                        <h3>Skill Profile</h3>
                                    </div>
                                    
                                    <div className="row-separator repeater">
                                        <div className="repeater" data-repeater-list="group-e">
                                            <div >
                                                <div className="cv-form-row cv-form-row-skills">
                                                    <div className="form-elem">
                                                        <label htmlFor="" className="form-label">Skill</label>
                                                        <div className="flex flex-col">
                                                            <input
                                                            value = {skillInput}
                                                            onChange={(e:any)=>{
                                                                setSkillInput(e.target.value);
                                                            }}
                                                            name="skill" type="text" className="form-control  text-center" id=""
                                                            />
                                                            <button type="button" data-repeater-create value="Add" className=" bg-blue-600 text-white font-bold px-4 py-2 text-sm mt-2 rounded-md mx-auto"
                                                                onClick={()=>{
                                                                    setSkills((prevSkills:any)=>[
                                                                        ...prevSkills,
                                                                        {
                                                                            id:'',
                                                                            title:skillInput,
                                                                            userId:'',
                                                                        },
                                                                    ]);
                                                                    mutateCurrentSkills();
                                                                }}>Add Skill
                                                            </button>
                                                        </div>
                                                        <div className='px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg  bg-gray-400 mt-2'>
                                                            {skills?.map((skill:any,index:any)=>(
                                                                    <div key={index}>
                                                                        <span
                                                                            className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer  bg-gray-700 text-gray-200 hover:bg-gray-800 hover:text-gray-100">
                                                                            {skill?.title}
                                                                            <svg onClick={(e:any)=>{
                                                                               setSkills((prevSkills:any) => prevSkills.filter((prevSkill:any) => prevSkill.title !== skill.title));
                                                                               mutateCurrentSkills();
                                                                            }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 hover:text-gray-300" viewBox="0 0 20 20"
                                                                            fill="currentColor" >
                                                                                <path fillRule="evenodd"
                                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                                                    clipRule="evenodd" />
                                                                            </svg>
                                                                        </span>
                                                                    </div>
                                                            ))}  
                                                        </div>
                                                        <span className="form-text"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="cv-form-blk">
                                    <div className="cv-form-row-title flex justify-between items-center">
                                        <h3>Socials Profile</h3>
                                    </div>

                                    <div className="row-separator repeater">
                                        <div className="repeater" data-repeater-list="group-d">
                                            {
                                                socials?.map((social:any,index:any)=>(
                                                    <div data-repeater-item key={index}>
                                                        <div className="cv-form-row cv-form-row-experience">
                                                            <div className="cols-3">
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Platform</label>
                                                                    <input
                                                                    value={social?.platform}
                                                                    name="proj_title" type="text" className="form-control proj_title"
                                                                        id="" 
                                                                        onChange={(e) => {
                                                                            setSocials((prevSocials:any) => {
                                                                                const newSocials = [...prevSocials];
                                                                                newSocials[index] = {
                                                                                    ...newSocials[index], 
                                                                                    platform: e.target.value 
                                                                                };
                                                                                return newSocials;
                                                                            })}}/>
                                                                    <span className="form-text"></span>
                                                                </div>
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Link</label>
                                                                    <input
                                                                    value={social?.link}
                                                                    name="proj_link" type="text" className="form-control proj_link" id=""
                                                                        onChange={(e) => {
                                                                            setSocials((prevSocials:any) => {
                                                                                const newSocials = [...prevSocials];
                                                                                newSocials[index] = {
                                                                                    ...newSocials[index], 
                                                                                    link: e.target.value 
                                                                                };
                                                                                return newSocials;
                                                                            })}}/>
                                                                    <span className="form-text"></span>
                                                                </div>
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Username</label>
                                                                    <input 
                                                                    value={social?.username}
                                                                    name="proj_description" type="text"
                                                                        className="form-control proj_description" id=""
                                                                        onChange={(e) => {
                                                                            setSocials((prevSocials:any) => {
                                                                                const newSocials = [...prevSocials];
                                                                                newSocials[index] = {
                                                                                    ...newSocials[index], 
                                                                                    username: e.target.value 
                                                                                };
                                                                                return newSocials;
                                                                            })}} />
                                                                    <span className="form-text"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="flex justify-end items-center gap-x-5 ">
                                            <span>
                                                <IoIosRemoveCircle
                                                onClick={()=>{
                                                    setSocials((prevSocials:any) => prevSocials.slice(0, -1));
                                                    mutateCurrentSocials();
                                                }}
                                                size={30} color="red"/>
                                            </span>
                                            <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                            onClick={()=>{
                                                setSocials((prevSocials:any)=>[
                                                    ...prevSocials,
                                                    {
                                                        platform:'',
                                                        link:'',
                                                        username:''
                                                    },
                                                ]);
                                                mutateCurrentSocials();
                                            }}>+</button>
                                        </div>
                                    </div>
                                </div>
                                    
                                <div className="w-full flex justify-center mb-12">
                                    <button 
                                    onClick={saveProfile}
                                    className="text-xl px-4 py-2 bg-blue-600 text-white font-[600] rounded-md mx-auto">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <div className="hidden md:block h-full w-[1px] bg-neutral-300">

                </div>
                {(resumeName==='Template1')
                &&(
                    <Resume1
                    info={info}
                    experiences={experiences}
                    projects={projects}
                    educations={educations}
                    skills={skills}
                    socials={socials}
                    />
                )}
                {(resumeName==='Template2')
                &&(
                    <Resume2
                    info={info}
                    experiences={experiences}
                    projects={projects}
                    educations={educations}
                    skills={skills}
                    socials={socials}
                    />
                )}
                {(resumeName==='Template3')
                &&(
                    <Resume3
                    info={info}
                    experiences={experiences}
                    projects={projects}
                    educations={educations}
                    skills={skills}
                    socials={socials}
                    />
                )}
                {(resumeName==='Template4')
                &&(
                    <Resume4
                    info={info}
                    experiences={experiences}
                    projects={projects}
                    educations={educations}
                    skills={skills}
                    socials={socials}
                    />
                )}
                
                
            </div>
        </>
    )
}
 
export default Resume;