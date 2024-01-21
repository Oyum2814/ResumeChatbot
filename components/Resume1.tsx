

interface UserProfile {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    designation?: string;
    address?: string;
    phone?: string;
    summary?: string;
    story?:string;
    site?:string;
    experiences?: any[]; // Adjust the type based on your actual data structure
    educations?: any[]; // Adjust the type based on your actual data structure
    projects?: any[]; // Adjust the type based on your actual data structure
    skills?: any[]; // Adjust the type based on your actual data structure
    socials?: any[]; // Adjust the type based on your actual data structure
}

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import { format } from "date-fns";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import useInfo from "@/hooks/useInfo";




const Resume:React.FC = ()=>{
    const {data:currentUser,mutate:mutateCurrentUser} = useCurrentUser();
    const {data:currentEducations,mutate:mutateCurrentEducations} = useInfo(currentUser?.id,'educations');
    const {data:currentExperiences,mutate:mutateCurrentExperiences} = useInfo(currentUser?.id,'experiences');
    const {data:currentProjects,mutate:mutateCurrentProjects} = useInfo(currentUser?.id,'projects');
    const {data:currentSocials,mutate:mutateCurrentSocials} = useInfo(currentUser?.id,'socials');
    const {data:currentSkills,mutate:mutateCurrentSkills} = useInfo(currentUser?.id,'skills');


    const formatDate = (date: any): any | null => {
        if (!date) {
          return null;
        }
        return format(new Date(date), 'MMMM yyyy');
    };

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
    },[currentUser]);

    useEffect(() => {
        if (currentEducations) {
            setEducations(currentEducations);
        }
        if (currentExperiences) {
            setExperiences(currentExperiences);
        }
        if (currentProjects) {
            setProjects(currentProjects);
        }
        if (currentSocials) {
            setSocials(currentSocials);
        }
        if (currentSkills) {
            setSkills(currentSkills);
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
            await mutateCurrentUser((updatedUser:any) => ({
                ...updatedUser,
                ...userProfile,
            }));
            // await mutateCurrentExperiences();
            // await mutateCurrentEducations();
            // await mutateCurrentProjects();
            // await mutateCurrentSocials();
            toast.success('Saved');
            console.log('User profile updated successfully:', response.data);
            // Handle updated user data as needed
        } catch (error:any) {
          console.error('Error updating user profile:', error.message);
        }
      }, [userProfile]);
    
    return(
        <div className="h-screen w-screen flex justify-between absolute overflow-y-hidden">
                     <section id="about-sc" className="w-[50%] h-screen overflow-y-auto">
                         <div className="container">
                            <div className="about-cnt">
                                <form action="" className="cv-form" id="cv-form">
                                  <div className="cv-form-blk">
                                        <div className="cv-form-row-title">
                                    <h2 className="font-[600] uppercase tracking-[1.5px] text-2xl">About section</h2>
                                         </div>
                                         <div className="cv-form-row cv-form-row-about">
                                             <div className="cols-3">
                                                 <div className="form-elem">
                                                     <label htmlFor="" className="form-label">First Name</label>
                                                    <input name="firstname" type="text" className="form-control firstname" id=""
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
                                                    <label htmlFor="" className="form-label">Middle Name <span
                                                            className="opt-text">(optional)</span></label>
                                                    <input name="middlename" type="text" className="form-control middlename" id=""
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
                                                    <label htmlFor="" className="form-label">Last Name</label>
                                                    <input name="lastname" type="text" className="form-control lastname" id=""
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
                                                {/* <div className="form-elem">
                                                    <label htmlFor="" className="form-label">Your Image</label>
                                                    <input name="image" type="file" className="form-control image" id="" accept="image/*"
                                                        onChange={handleImageChange} />
                                                </div> */}
                                                <div className="form-elem">
                                                    <label htmlFor="" className="form-label">My Story</label>
                                                    <input name="designation" type="text" className="form-control designation" id=""
                                                         placeholder="e.g. Sr.Accountants"
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
                                                         onChange={(e)=>{
                                                            setInfo((prevInfo) => ({
                                                                ...prevInfo,
                                                                address: e.target.value,
                                                              }));
                                                         }}/>
                                                    <span className="form-text"></span>
                                                </div>
                                            </div>
        
                                            <div className="cols-3">
                                                <div className="form-elem">
                                                    <label htmlFor="" className="form-label">Email</label>
                                                    <input name="email" type="text" className="form-control email" id=""
                                                         placeholder="e.g. johndoe@gmail.com"
                                                         onChange={(e)=>{
                                                            setInfo((prevInfo) => ({
                                                                ...prevInfo,
                                                                email: e.target.value,
                                                              }));
                                                         }}/>
                                                    <span className="form-text"></span>
                                                </div>
                                                <div className="form-elem">
                                                    <label htmlFor="" className="form-label">Phone No:</label>
                                                    <input name="phoneno" type="text" className="form-control phoneno" id=""
                                                         placeholder="e.g. 456-768-798, 567.654.002"
                                                         onChange={(e)=>{
                                                            setInfo((prevInfo) => ({
                                                                ...prevInfo,
                                                                phone: e.target.value,
                                                              }));
                                                         }}/>
                                                    <span className="form-text"></span>
                                                </div>
                                                <div className="form-elem">
                                                    <label htmlFor="" className="form-label">Objective</label>
                                                    <input name="summary" type="text" className="form-control summary" id=""
                                                         placeholder="e.g. Doe"
                                                         onChange={(e)=>{
                                                            setInfo((prevInfo) => ({
                                                                ...prevInfo,
                                                                summary: e.target.value,
                                                              }));
                                                         }}/>
                                                    <span className="form-text"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div className="cv-form-blk">
                                        <div className="cv-form-row-title">
                                            <h3>Academic Profile</h3>
                                        </div>
        
                                        <div className="row-separator repeater">
                                            <div className="repeater" data-repeater-list="group-c">
                                                {educations?.map((education:any,index:any)=>(
                                                    <div data-repeater-item key={index}>
                                                        <div className="cv-form-row cv-form-row-experience">
                                                            <div className="cols-3">
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Institution</label>
                                                                    <input name="edu_school" type="text" className="form-control edu_school"
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
                                                            </div>
        
                                                            <div className="cols-3">
                                                                {/* <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Start Date</label>
                                                                    <input name="edu_start_date" type="date"
                                                                        className="form-control edu_start_date" id="" 
                                                                        onChange={(e) => {
                                                                            setEducations((prevEducations) => {
                                                                                const newEducations = [...prevEducations];
                                                                                newEducations[index] = {
                                                                                     ...newEducations[index], 
                                                                                    startDate: e.target.value 
                                                                                };
                                                                                return newEducations;
                                                                            })}}/>
                                                                    <span className="form-text"></span>
                                                                </div> */}
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">End Date</label>
                                                                    <input name="edu_graduation_date" type="date"
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
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Description</label>
                                                                    <input name="edu_description" type="text"
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
                                                                            })}} />
                                                                    <span className="form-text xl:block"></span>
                                                                </div>
                                                            </div>
        
                                                            <button data-repeater-delete type="button"
                                                                className="repeater-remove-btn"
                                                                onClick={()=>{
                                                                    setEducations((prevEducations:any) => prevEducations.slice(0, -1));
                                                                }}>-</button>
                                                        </div>
                                                    </div>
                                                ))}
                                                
                                            </div>
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
                                                ])
                                            }}>+</button>
                                        </div>
                                    </div>
        
                                    <div className="cv-form-blk xl:block">
                                        <div className="cv-form-row-title">
                                            <h3>Skill Profile</h3>
                                        </div>
        
                                        <div className="row-separator repeater">
                                            <div className="repeater" data-repeater-list="group-e">
                                                {skills?.map((skill:any,index:any)=>(
                                                    <div data-repeater-item key={index}>
                                                        <div className="cv-form-row cv-form-row-skills">
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Skill</label>
                                                                <input name="skill" type="text" className="form-control skill" id=""
                                                                   onChange={(e) => {
                                                                    setSkills((prevSkills:any) => {
                                                                        const newSkills = [...prevSkills];
                                                                        newSkills[index] = {
                                                                             ...newSkills[index], 
                                                                            title: e.target.value 
                                                                        };
                                                                        return newSkills;
                                                                    })}} />
                                                                <span className="form-text"></span>
                                                            </div>
        
                                                            <button data-repeater-delete type="button"
                                                                className="repeater-remove-btn"
                                                                onClick={()=>{
                                                                    setSkills((prevSkill:any) => prevSkill.slice(0, -1));
                                                                }}>-</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                            onClick={()=>{
                                                setSkills((prevSkills:any)=>[
                                                    ...prevSkills,
                                                    {
                                                        title:''
                                                    },
                                                ])
                                            }}>+</button>
                                        </div>
                                    </div>
        
                                    <div className="cv-form-blk">
                                        <div className="cv-form-row-title">
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
                                                                    <input name="exp_title" type="text" className="form-control exp_title" id=""
                                                                   onChange={(e) => {
                                                                    setExperiences((prevExperiences:any) => {
                                                                        const newExperiences = [...prevExperiences];
                                                                        newExperiences[index] = {
                                                                             ...newExperiences[index], 
                                                                            title: e.target.value 
                                                                        };
                                                                        return newExperiences;
                                                                    })}}/>
                                                                    <span className="form-text"></span>
                                                                </div>
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Company / Organization</label>
                                                                    <input name="exp_organization" type="text"
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
                                                                    <input name="exp_location" type="text" className="form-control exp_location"
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
        
                                                            <div className="cols-3">
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Start Date</label>
                                                                    <input name="exp_start_date" type="date"
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
                                                                    <input name="exp_end_date" type="date" className="form-control exp_end_date"
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
                                                                <div className="form-elem">
                                                                    <label htmlFor="" className="form-label">Description</label>
                                                                    <input name="exp_description" type="text"
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
        
                                                            <button data-repeater-delete type="button"
                                                                className="repeater-remove-btn"
                                                                onClick={()=>{
                                                                    setExperiences((prevExperiences:any) => prevExperiences.slice(0, -1));
                                                                }}>-</button>
                                                        </div>
                                                    </div>
                                                ))}
                                                
                                            </div>
                                            <button 
                                            type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
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
                                                ])
                                            }}>+</button>
                                        </div>
                                    </div>
        
                                    <div className="cv-form-blk">
                                        <div className="cv-form-row-title">
                                            <h3>Projects Profile</h3>
                                        </div>
        
                                        <div className="row-separator repeater">
                                            <div className="repeater" data-repeater-list="group-d">
                                                {
                                                    projects?.map((project:any,index:any)=>(
                                                        <div data-repeater-item key={index}>
                                                            <div className="cv-form-row cv-form-row-experience">
                                                                <div className="cols-3">
                                                                    <div className="form-elem">
                                                                        <label htmlFor="" className="form-label">Project Name</label>
                                                                        <input name="proj_title" type="text" className="form-control proj_title"
                                                                            id="" 
                                                                            onChange={(e) => {
                                                                                setProjects((prevProjects:any) => {
                                                                                    const newProjects = [...prevProjects];
                                                                                    newProjects[index] = {
                                                                                         ...newProjects[index], 
                                                                                        title: e.target.value 
                                                                                    };
                                                                                    return newProjects;
                                                                                })}}/>
                                                                        <span className="form-text"></span>
                                                                    </div>
                                                                    <div className="form-elem">
                                                                        <label htmlFor="" className="form-label">Project link</label>
                                                                        <input name="proj_link" type="text" className="form-control proj_link" id=""
                                                                            onChange={(e) => {
                                                                                setProjects((prevProject:any) => {
                                                                                    const newProjects = [...prevProject];
                                                                                    newProjects[index] = {
                                                                                         ...newProjects[index], 
                                                                                        link: e.target.value 
                                                                                    };
                                                                                    return newProjects;
                                                                                })}}/>
                                                                        <span className="form-text"></span>
                                                                    </div>
                                                                    <div className="form-elem">
                                                                        <label htmlFor="" className="form-label">Description</label>
                                                                        <input name="proj_description" type="text"
                                                                            className="form-control proj_description" id=""
                                                                            onChange={(e) => {
                                                                                setProjects((prevProjects:any) => {
                                                                                    const newProjects = [...prevProjects];
                                                                                    newProjects[index] = {
                                                                                         ...newProjects[index], 
                                                                                        description: e.target.value 
                                                                                    };
                                                                                    return newProjects;
                                                                                })}} />
                                                                        <span className="form-text"></span>
                                                                    </div>
                                                                </div>
                                                                <button data-repeater-delete type="button"
                                                                    className="repeater-remove-btn"
                                                                    onClick={()=>{
                                                                        setProjects((prevProjects:any) => prevProjects.slice(0, -1));
                                                                    }}>-</button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                
                                            </div>
                                            <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                            onClick={()=>{
                                                setProjects((prevProjects:any)=>[
                                                    ...prevProjects,
                                                    {
                                                        title:'',
                                                        link:'',
                                                        description:''
                                                    },
                                                ])
                                            }}>+</button>
                                        </div>
                                    </div>
        
                                    <div className="cv-form-blk">
                                        <div className="cv-form-row-title">
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
                                                                        <input name="proj_title" type="text" className="form-control proj_title"
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
                                                                        <input name="proj_link" type="text" className="form-control proj_link" id=""
                                                                            onChange={(e) => {
                                                                                setSocials((prevProjects:any) => {
                                                                                    const newProjects = [...prevProjects];
                                                                                    newProjects[index] = {
                                                                                         ...newProjects[index], 
                                                                                        link: e.target.value 
                                                                                    };
                                                                                    return newProjects;
                                                                                })}}/>
                                                                        <span className="form-text"></span>
                                                                    </div>
                                                                    <div className="form-elem">
                                                                        <label htmlFor="" className="form-label">Username</label>
                                                                        <input name="proj_description" type="text"
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
                                                                <button data-repeater-delete type="button"
                                                                    className="repeater-remove-btn"
                                                                    onClick={()=>{
                                                                        setSocials((prevSocials:any) => prevSocials.slice(0, -1));
                                                                    }}>-</button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                
                                            </div>
                                            <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                            onClick={()=>{
                                                setSocials((prevSocials:any)=>[
                                                    ...prevSocials,
                                                    {
                                                        platform:'',
                                                        link:'',
                                                        username:''
                                                    },
                                                ])
                                            }}>+</button>
                                        </div>
                                    </div>
                                   
                                </form>
                            </div>
                        </div>
                    </section>
        
                    <section id="preview-sc" className="h-screen
                     overflow-y-auto print_area w-[50%] bg-gray-500 
                     flex justify-center items-center relative">
                     
                        <div className="w-[592px] h-[842px] bg-white  flex flex-col items-center">
                            <h2 className="text-[40px] font-extralight xl:text-[42px]">
                                {info?.firstName} {info?.middleName} {info?.lastName}
                            </h2>
                            <p className="text-[9px] font-medium">
                             {info?.phone} | {info?.address} 
                            </p>
                            <p className="text-[10px] text-center px-4 font-extralight mt-2">
                                {info?.summary}
                            </p>
                            <div className="flex w-[95%] mt-4">
                                <div className="w-[40%] h-full" id="left-side">
                                    <h2 className="text-[#6A6A6A] text-[16px] font-[600]">ACADEMIC</h2>
                                    {educations?.map((education:any,i:any)=>(
                                        <div className="py-1" key={i}>
                                            <h3 className="text-[12px] uppercase inter font-[700]">{education?.school}</h3>
                                            <h3 className="tracking-[.55px] font-[400] text-[11px] uppercase">{education?.degree}</h3>
                                            <p className="text-[8px] tracking-[0.4px] font-weight-[400]">{formatDate(education?.graduationDate)} | {education?.city}</p>
                                            <p className="text-[8px] font-[400] tracking-[0.4px] ">{education?.description}</p>
                                        </div>
                                    ))}
                                    <h2 className="text-[#6A6A6A] text-[16px] font-[600]">Social</h2>
                                    {socials?.map((social:any,i:any)=>(
                                        <div className="py-1" key={i}>
                                            <p className="text-[8px] font-[400] tracking-[0.4px] ">
                                                {social?.platform}
                                                <span> - </span>
                                                <span className="text-black font-[700]"><a href={social?.link}>{social?.username}</a></span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-[60%] h-full" id="right-side">
                                    <h2 className="text-[#6A6A6A] text-[16px] font-[600] uppercase">Internship</h2>
                                    {experiences?.map((experience:any,i:any)=>(
                                        <div className="py-1" key={i}>
                                            <h3 className="text-[12px] uppercase inter font-[700]">{experience?.organization} | {experience?.title} </h3>
                                            <h3 className="font-[400] text-[9px] ">{formatDate(experience?.startDate)} - {experience?.endDate? (formatDate(experience?.endDate)) : 'Present'} | {experience?.location}</h3>
                                            <article className="text-[9px] font-[400] ">
                                                {experience?.description}
                                            </article>
                                        </div>
                                    ))}
        
                                    <h2 className="text-[#6A6A6A] text-[16px] font-[600] uppercase">Projects</h2>
                                    {projects?.map((project:any,i:any)=>(
                                        <div className="py-1" key={i}>
                                           <h3 className="text-[12px] uppercase inter font-[700]">{project?.title}</h3>
                                           <p className="text-[10px] tracking-[0.4px] font-[400]">{project?.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <section className="print-btn-sc absolute">
                        <div className="container">
                            <button type="button" className="print-btn btn btn-primary" onClick={printCV}>Print CV</button>
                        </div>
                    </section>                                 */}
                </div>
    )
}
 
export default Resume;