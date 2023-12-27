// interface ResumeProps{
//     firstName:string;
//     middleName?:string;
//     lastName:string;
//     designation:string;
//     address:string;
//     email:string;
//     phone:string;
//     summary:string;
//     // achievements need to be an array of objects
//     achievements:[
//         {
//             title:string;
//             description:string;
//         }
//     ];
//     // experiences need to be an array of objects
//     experiences:[
//         {
//             title:string;
//             organization:string;
//             location:string;
//             startDate:string;
//             endDate:string;
//             description:string;
//         }
//     ];
//     // educations need to be an array of objects
//     educations:[
//         {
//             school:string;
//             degree:string;
//             city:string;
//             startDate:string;
//             graduationDate:string;
//             description:string;
//         }
//     ];
//     // projects need to be an array of objects
//     projects:[
//         {
//             title:string;
//             link:string;
//             description:string;
//         }
//     ];
//     // Skills neeed to be an array of objects
//     skills:[
//         {
//             skill:string;
//         }
//     ];
// }

import { ChangeEvent, useState } from "react";

interface Achievement {
    title: string;
    description: string;
}

const Resume:React.FC = ()=>{
    const [image,setImage ] = useState<File | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];
        setImage(selectedImage ?? null);
      };

    const [info,setInfo] = useState({
        firstName:'John',
        middleName:'',
        lastName:'Doe',
        designation:'Role',
        address:'Your Address',
        email:'name@gmail.com',
        phone:'your phone number',
        summary:'Summary ...'
    });
    const [achievements,setAchievements] = useState<Achievement[]>([
        {
        title:'',
        description:''
        }
    ]);
    const [experiences, setExperiences] = useState([
        {
            title:'',
            organization:'',
            location:'',
            startDate:'',
            endDate:'',
            description:''
        }
    ]);
    const [educations, setEducations] = useState([
        {
            school:'',
            degree:'',
            city:'',
            startDate:'',
            graduationDate:'',
            description:''
        },
        {
            school:'',
            degree:'',
            city:'',
            startDate:'',
            graduationDate:'',
            description:''
        }
    ]);
    const [projects, setProjects] = useState([
        {
            title:'',
            link:'',
            description:''
        }
    ]);
    const [skills, setSkills] = useState([
        {
            title:''
        }
    ]);

    const printCV=()=>{
        window.print();
    };
    return(
        <div className="h-screen w-screen flex justify-between absolute overflow-y-hidden">
            <section id="about-sc" className="w-[50%] h-screen overflow-y-auto">
                <div className="container">
                    <div className="about-cnt">
                        <form action="" className="cv-form" id="cv-form">
                            <div className="cv-form-blk">
                                <div className="cv-form-row-title">
                                    <h3>About section</h3>
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
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Your Image</label>
                                            <input name="image" type="file" className="form-control image" id="" accept="image/*"
                                                onChange={handleImageChange} />
                                        </div>
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Designation</label>
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
                                            <label htmlFor="" className="form-label">Summary</label>
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
                                    <h3>achievements</h3>
                                </div>

                                <div className="row-separator repeater">
                                    <div className="repeater" data-repeater-list="group-a">
                                        {achievements.map((achievement,index) =>(
                                            <div key={index} data-repeater-item>
                                                <div className="cv-form-row cv-form-row-achievement">
                                                    <div className="cols-2">
                                                        <div className="form-elem">
                                                            <label htmlFor="" className="form-label">Title</label>
                                                            <input 
                                                            name="achieve_title"
                                                            type="text"
                                                            onChange={(e) => {
                                                                setAchievements((prevAchievements) => {
                                                                    const newAchievements = [...prevAchievements];
                                                                    newAchievements[index] = { ...newAchievements[index], title: e.target.value };
                                                                    return newAchievements;
                                                                });
                                                            }}
                                                            className="form-control achieve_title" id="" 
                                                            placeholder="e.g. johndoe@gmail.com"/>
                                                            <span className="form-text"></span>
                                                        </div>
                                                        <div className="form-elem">
                                                            <label htmlFor="" className="form-label">Description</label>
                                                            <input name="achieve_description" type="text"
                                                                className="form-control achieve_description" id=""
                                                                placeholder="e.g. johndoe@gmail.com"
                                                                onChange={(e) => {
                                                                    setAchievements((prevAchievements) => {
                                                                        const newAchievements = [...prevAchievements];
                                                                        newAchievements[index] = { ...newAchievements[index], description: e.target.value };
                                                                        return newAchievements;
                                                                    });
                                                                }}/>
                                                            <span className="form-text"></span>
                                                        </div>
                                                    </div>
                                                    <button data-repeater-delete type="button"
                                                        className="repeater-remove-btn"
                                                        onClick={()=>{
                                                            setAchievements((prevAchievements) => prevAchievements.slice(0, -1));
                                                        }}>-</button>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                    <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                     onClick={()=>{
                                        setAchievements((prevAchievements)=>[
                                            ...prevAchievements,
                                            {title:'',description:''},
                                        ])
                                    }}>+</button>
                                </div>
                            </div>

                            <div className="cv-form-blk">
                                <div className="cv-form-row-title">
                                    <h3>experience</h3>
                                </div>

                                <div className="row-separator repeater">
                                    <div className="repeater" data-repeater-list="group-b">
                                        {experiences.map((experience,index) =>(
                                            <div data-repeater-item key={index}>
                                                <div className="cv-form-row cv-form-row-experience">
                                                    <div className="cols-3">
                                                        <div className="form-elem">
                                                            <label htmlFor="" className="form-label">Title</label>
                                                            <input name="exp_title" type="text" className="form-control exp_title" id=""
                                                           onChange={(e) => {
                                                            setExperiences((prevExperiences) => {
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
                                                                    setExperiences((prevExperiences) => {
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
                                                                    setExperiences((prevExperiences) => {
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
                                                                    setExperiences((prevExperiences) => {
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
                                                                    setExperiences((prevExperiences) => {
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
                                                                    setExperiences((prevExperiences) => {
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
                                                            setExperiences((prevExperiences) => prevExperiences.slice(0, -1));
                                                        }}>-</button>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                    <button 
                                    type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                    onClick={()=>{
                                        setExperiences((prevExperiences)=>[
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
                                    <h3>education</h3>
                                </div>

                                <div className="row-separator repeater">
                                    <div className="repeater" data-repeater-list="group-c">
                                        {educations.map((education,index)=>(
                                            <div data-repeater-item key={index}>
                                                <div className="cv-form-row cv-form-row-experience">
                                                    <div className="cols-3">
                                                        <div className="form-elem">
                                                            <label htmlFor="" className="form-label">School</label>
                                                            <input name="edu_school" type="text" className="form-control edu_school"
                                                                id="" 
                                                                onChange={(e) => {
                                                                    setEducations((prevEducations) => {
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
                                                                    setEducations((prevEducations) => {
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
                                                            <input name="edu_city" type="text" className="form-control edu_city" id=""
                                                             onChange={(e) => {
                                                                setEducations((prevEducations) => {
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
                                                        <div className="form-elem">
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
                                                        </div>
                                                        <div className="form-elem">
                                                            <label htmlFor="" className="form-label">End Date</label>
                                                            <input name="edu_graduation_date" type="date"
                                                                className="form-control edu_graduation_date" id=""
                                                                onChange={(e) => {
                                                                    setEducations((prevEducations) => {
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
                                                                className="form-control edu_description" id=""
                                                                onChange={(e) => {
                                                                    setEducations((prevEducations) => {
                                                                        const newEducations = [...prevEducations];
                                                                        newEducations[index] = {
                                                                             ...newEducations[index], 
                                                                            description: e.target.value 
                                                                        };
                                                                        return newEducations;
                                                                    })}} />
                                                            <span className="form-text"></span>
                                                        </div>
                                                    </div>

                                                    <button data-repeater-delete type="button"
                                                        className="repeater-remove-btn"
                                                        onClick={()=>{
                                                            setEducations((prevEducations) => prevEducations.slice(0, -1));
                                                        }}>-</button>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                    <button type="button" data-repeater-create value="Add" className="repeater-add-btn bg-blue-400 text-white"
                                    onClick={()=>{
                                        setEducations((prevEducations)=>[
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
                                    <h3>projects</h3>
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
                                                description:''
                                            },
                                        ])
                                    }}>+</button>
                                </div>
                            </div>

                            <div className="cv-form-blk">
                                <div className="cv-form-row-title">
                                    <h3>skills</h3>
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
                        </form>
                    </div>
                </div>
            </section>

            <section id="preview-sc" className="h-screen overflow-y-auto print_area w-[50%] bg-gray-500 pt-36 pb-48 px-16">
                {/* <div className="container">
                    <div className="preview-cnt">
                        <div className="preview-cnt-l bg-green text-white">
                            <div className="preview-blk">
                                <div className="preview-image">
                                    {image && <img src={URL.createObjectURL(image)} alt="Selected" id="image_dsp"/>}
                                </div>
                                <div className="preview-item preview-item-name">
                                    <span className="preview-item-val fw-6" id="fullname_dsp">
                                        {info?.firstName} {info?.middleName} {info?.lastName}
                                    </span>
                                </div>
                                <div className="preview-item">
                                    <span className="preview-item-val text-uppercase fw-6 ls-1" id="designation_dsp">
                                        {info?.designation}
                                    </span>
                                </div>
                            </div>

                            <div className="preview-blk">
                                <div className="preview-blk-title">
                                    <h3>about</h3>
                                </div>
                                <div className="preview-blk-list">
                                    <div className="preview-item">
                                        <span className="preview-item-val" id="phoneno_dsp">
                                            {info?.phone}
                                        </span>
                                    </div>
                                    <div className="preview-item">
                                        <span className="preview-item-val" id="email_dsp">
                                            {info?.email}
                                        </span>
                                    </div>
                                    <div className="preview-item">
                                        <span className="preview-item-val" id="address_dsp">
                                            {info?.address}
                                        </span>
                                    </div>
                                    <div className="preview-item">
                                        <br />
                                        <span className="preview-item-val" id="summary_dsp">
                                            {info?.summary}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="preview-blk">
                                <div className="preview-blk-title">
                                    <h3>skills</h3>
                                </div>
                                <div className="skills-items preview-blk-list" id="skills_dsp">
                                    {skills.map((skill,index)=>(
                                        <div className="preview-item" key={index}>
                                            <span className="preview-item-val">{skill?.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="preview-cnt-r bg-white">
                            
                            {achievements.length>0 && (
                            <div 
                            className="preview-blk"
                            >
                                <div className="preview-blk-title">
                                    <h3>Achievements</h3>
                                </div>
                                <div className="achievements-items preview-blk-list" id="achievements_dsp">
                                    {achievements.map((achievement,i) =>(
                                        <div className="preview-item" key={i}>
                                            <span className="preview-item-val">{achievement?.title}</span>
                                            <span className="preview-item-val">{achievement?.description}</span>
                                        </div>
                                    ))}
                                    
                                    
                                </div>
                            </div>)}
                            {educations.length>0 && (
                                 <div className="preview-blk">
                                    <div className="preview-blk-title">
                                        <h3>educations</h3>
                                    </div>
                                    <div className="educations-items preview-blk-list" id="educations_dsp">
                                        {educations.map((education,index)=>(
                                            <div className="preview-item" key={index}>
                                                <span className="preview-item-val">{education?.school}</span>
                                                <span className="preview-item-val">{education?.degree}</span>
                                                <span className="preview-item-val">{education?.city}</span>
                                                <span className="preview-item-val">{education?.startDate}</span>
                                                - {" "}
                                                <span className="preview-item-val">{education?.graduationDate}</span>
                                                <span className="preview-item-val">{education?.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                           
                            {experiences.length>0 && (
                                <div className="preview-blk">
                                    <div className="preview-blk-title">
                                        <h3>experiences</h3>
                                    </div>
                                    <div className="experiences-items preview-blk-list" id="experiences_dsp">
                                        {experiences.map((experience,index) =>(
                                            <div className="preview-item" key={index}>
                                                <span className="preview-item-val">{experience?.title}</span>
                                                <span className="preview-item-val">{experience?.organization}</span>
                                                <span className="preview-item-val">{experience?.location}</span>
                                                <span className="preview-item-val">{experience?.startDate}</span>
                                                <span className="preview-item-val">{experience?.endDate}</span>
                                                <span className="preview-item-val">{experience?.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                            }
                            {projects.length>0 && (
                                <div className="preview-blk">
                                    <div className="preview-blk-title">
                                        <h3>projects</h3>
                                    </div>
                                    <div className="projects-items preview-blk-list" id="projects_dsp">
                                            {projects.map((project,index)=>(
                                                <div className="preview-item" key={index}>
                                                    <span className="preview-item-val font-semibold ">{project?.title}</span>
                                                    <span className="preview-item-val underline cursor-pointer">{project?.link}</span>
                                                    <span className="preview-item-val">{project?.description}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div> */}
                This section is still under construction
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