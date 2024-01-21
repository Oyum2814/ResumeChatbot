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
import useUser from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import useExperiences from "@/hooks/useExperiences";
import useEducations from "@/hooks/useEducations";




const Resume:React.FC = ()=>{
    const {data:currentUser,mutate:mutateCurrentUser} = useCurrentUser();
    const {data:currentEducations,mutate:mutateCurrentEducations} = useEducations(currentUser?.id);

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
   
    const [experiences, setExperiences] = useState([ {
        title:'<<role>>',
        organization:'<<companyName>>',
        location:'<<location>>',
        startDate:'',
        endDate:'',
        description:'<<description>>'
    }]);
    const [educations, setEducations] = useState(currentEducations);

    const [projects, setProjects] = useState([
        {
            title:'<<projectTitle>>',
            link:'<<projectLink>>',
            description:'<<projectDescription>>',
            startDate:'',
            endDate:'',
        }
    ]);
    const [skills, setSkills] = useState([
        {
            title:''
        }
    ]);
    const [socials, setSocials] = useState([
        {
            platform:'Github',
            username:'JohnDoe',
            link:'/',
        }
    ]);

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
        console.log(currentEducations);
    }, [currentEducations]);

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
            await mutateCurrentEducations();
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
                                            <label htmlFor="" className="form-label">Middle Name <span
                                                    className="opt-text">(optional)</span></label>
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
                                            <label htmlFor="" className="form-label">Last Name</label>
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
                                        {/* <div className="form-elem">
                                            <label htmlFor="" className="form-label">Your Image</label>
                                            <input name="image" type="file" className="form-control image" id="" accept="image/*"
                                                onChange={handleImageChange} />
                                        </div> */}
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Designation</label>
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
                                            <label htmlFor="" className="form-label">My Story</label>
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
                                        {/* <div className="form-elem">
                                            <label htmlFor="" className="form-label">Email</label>
                                            <input name="email" type="text" className="form-control email" id=""
                                                 placeholder="e.g. johndoe@gmail.com"
                                                 onChange={(e)=>{
                                                    setInfo((prevInfo) => ({
                                                        ...prevInfo,
                                                        mail: e.target.value,
                                                      }));
                                                 }}/>
                                            <span className="form-text"></span>
                                        </div> */}
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Phone No:</label>
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
                                            <label htmlFor="" className="form-label">Objective</label>
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
                                                                    });
                                                                    mutateCurrentEducations();
                                                                    }} />
                                                            <span className="form-text xl:block"></span>
                                                        </div>
                                                    </div>

                                                    <button data-repeater-delete type="button"
                                                        className="repeater-remove-btn"
                                                        onClick={()=>{
                                                            setEducations((prevEducations:any) => prevEducations.slice(0, -1));
                                                            mutateCurrentEducations();
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
                                            projects.map((project,index)=>(
                                                <div data-repeater-item key={index}>
                                                    <div className="cv-form-row cv-form-row-experience">
                                                        <div className="cols-3">
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Project Name</label>
                                                                <input name="proj_title" type="text" className="form-control proj_title"
                                                                    id="" 
                                                                    onChange={(e) => {
                                                                        setProjects((prevProjects) => {
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
                                                                        setProjects((prevProjects) => {
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
                                                                <label htmlFor="" className="form-label">Description</label>
                                                                <input name="proj_description" type="text"
                                                                    className="form-control proj_description" id=""
                                                                    onChange={(e) => {
                                                                        setProjects((prevProjects) => {
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
                                                        <div className="cols-3">
                                                        <div className="form-elem">
                                                            <label htmlFor="" className="form-label">Start Date</label>
                                                            <input name="exp_start_date" type="date"
                                                                className="form-control exp_start_date" id="" 
                                                                onChange={(e) => {
                                                                    setProjects((prevProjects) => {
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
                                                            <input name="exp_end_date" type="date" className="form-control exp_end_date"
                                                                id="" 
                                                                onChange={(e) => {
                                                                    setProjects((prevProjects) => {
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
                                                        <button data-repeater-delete type="button"
                                                            className="repeater-remove-btn"
                                                            onClick={()=>{
                                                                setProjects((prevProjects) => prevProjects.slice(0, -1));
                                                            }}>-</button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        
                                    </div>
                                    <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                    onClick={()=>{
                                        setProjects((prevProjects)=>[
                                            ...prevProjects,
                                            {
                                                title:'',
                                                link:'',
                                                description:'',
                                                startDate:'',
                                                endDate:'',
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
                                        {skills.map((skill,index)=>(
                                            <div data-repeater-item key={index}>
                                                <div className="cv-form-row cv-form-row-skills">
                                                    <div className="form-elem">
                                                        <label htmlFor="" className="form-label">Skill</label>
                                                        <input name="skill" type="text" className="form-control skill" id=""
                                                           onChange={(e) => {
                                                            setSkills((prevSkills) => {
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
                                                            setSkills((prevSkills) => prevSkills.slice(0, -1));
                                                        }}>-</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                    onClick={()=>{
                                        setSkills((prevSkills)=>[
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
                                    <h3>Socials Profile</h3>
                                </div>

                                <div className="row-separator repeater">
                                    <div className="repeater" data-repeater-list="group-d">
                                        {
                                            socials.map((social,index)=>(
                                                <div data-repeater-item key={index}>
                                                    <div className="cv-form-row cv-form-row-experience">
                                                        <div className="cols-3">
                                                            <div className="form-elem">
                                                                <label htmlFor="" className="form-label">Platform</label>
                                                                <input name="proj_title" type="text" className="form-control proj_title"
                                                                    id="" 
                                                                    onChange={(e) => {
                                                                        setSocials((prevSocials) => {
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
                                                                        setSocials((prevProjects) => {
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
                                                                        setSocials((prevSocials) => {
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
                                                                setSocials((prevSocials) => prevSocials.slice(0, -1));
                                                            }}>-</button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        
                                    </div>
                                    <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                    onClick={()=>{
                                        setSocials((prevSocials)=>[
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
                                
                            <button 
                            onClick={saveProfile}
                            className="text-xl px-4 py-2 bg-blue-600 text-white font-[600] rounded-md">
                                Save
                           </button>
                        </form>
                    </div>
                </div>
            </section>

            <section id="preview-sc" className="h-screen
             overflow-y-auto print_area w-[50%] bg-gray-500 
             flex justify-center items-center relative roboto">
             
                <div className="w-[592px] h-[842px] bg-white  flex flex-col items-center py-8 px-4 text-[10px]">
                    <div className="w-full flex items-center justify-start">
                        <h1 className="w-[40%] px-4 font-[700] text-[16px] uppercase">{info?.firstName} {info?.middleName} {info?.lastName}</h1>
                        <p className="w-[30%] px-4 font-[400]">{info?.phone}</p>
                        {/* <p className="w-[30%] px-4 font-[400]">{info?.email}</p> */}
                    </div>
                    <div className="w-full flex items-center justify-start mt-1">
                        <h1 className="w-[40%] px-4 font-[400] tracking-[0.1rem] uppercase text-[12px]">{info?.designation}</h1>
                        <p className="w-[30%] px-4 font-[400]">{info?.address}</p>
                        <p className="w-[30%] px-4 font-[400]">{info?.site}</p>
                    </div>
                    <hr className="w-[94%] mt-3 border-[1px] border-black mb-4"/>
                    <div className="w-[94%]">
                        <h2 className="font-[700] text-[13px] uppercase text-neutral-600">My Story</h2>
                        <div className="flex items-center mt-1">
                            <div className="h-[13px] w-[5px] mr-2 bg-neutral-400" />
                            <p className="text-black font-[400]">{info?.story}</p>
                        </div>
                    </div>
                    <div className="w-[94%] mt-3">
                        <h2 className="font-[700] text-[13px] uppercase text-neutral-600">Objective</h2>
                        <div className="flex items-center mt-1">
                            <div className="h-[13px] w-[5px] mr-2 bg-neutral-400" />
                            <p className="text-black font-[400]">{info?.summary}</p>
                        </div>
                    </div>
                    <div className="w-[94%] mt-6 flex ">
                        <div className="w-[70%]">
                            <div>
                                <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">Academic Profile</h2>
                                <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2"/>
                                {educations?.map((education:any,i:any)=>(
                                    <div key={i} className="py-1">
                                        <div className="text-black font-[600] mb-1 uppercase">
                                            {education?.degree}  
                                        </div>
                                        <div >
                                           <span>{education?.school}</span> 
                                            <span>, </span>
                                            <span>{education?.city}</span>
                                        </div>
                                        <div>
                                            Year of Passing -  
                                            <span>
                                                {formatDate(education?.graduationDate)}
                                            </span>
                                        </div>
                                        <div>
                                            {education?.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">Internship Profile</h2>
                                <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2"/>
                                {experiences?.map((experience:any,i:any)=>(
                                    <div key={i} className="py-1">
                                        <div className="text-black font-[600] mb-1 flex items-center">
                                            {experience?.title}  
                                            <div className="w-[3px] h-[10px] bg-neutral-400 mx-1"/>
                                            {experience?.organization} 
                                        </div>
                                        <div>
                                            {experience?.location} | {formatDate(experience?.startDate)} - {experience?.endDate? (formatDate(experience?.endDate)) : 'Present'}
                                        </div>
                                        <div>
                                            {experience?.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">Project Profile</h2>
                                <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2"/>
                                {projects?.map((project,i)=>(
                                    <div key={i} className="py-1">
                                        <a className="cursor-pointer" href={project?.link}>
                                            <div className="text-black font-[600] mb-1">
                                                {project?.title} | {formatDate(project?.startDate)} - {project?.endDate? (formatDate(project?.endDate)) : 'Present'}
                                            </div>
                                            <div>
                                                {project?.description}
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-[30%]">
                            <div>
                                <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">Skills Profile</h2>
                                <hr className="border-[1.5px] border-neutral-400 w-[66%] mt-[4px] mb-2"/>
                                {skills.map((skill,i)=>(
                                    <div key={i} className="py-1">
                                        <li className="">{skill.title}</li>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">Socials Profile</h2>
                                <hr className="border-[1.5px] border-neutral-400 w-[66%] mt-[4px] mb-2"/>
                                {socials.map((social,i)=>(
                                    <div key={i} className="py-1">
                                        <div className="font-[700] text-[11px] text-black">{social?.platform}</div>
                                        <a href={social?.link} className="underline">{social?.username}</a>
                                    </div>
                                ))}
                            </div>
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