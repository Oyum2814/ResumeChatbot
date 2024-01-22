import { format } from "date-fns";

interface ResumeProps {
  info?: any;
  experiences?: any[]; // Adjust the type based on your actual data structure
  educations?: any[]; // Adjust the type based on your actual data structure
  projects?: any[]; // Adjust the type based on your actual data structure
  skills?: any[]; // Adjust the type based on your actual data structure
  socials?: any[]; // Adjust the type based on your actual data structure
}

const formatDate = (date: any): any | null => {
  if (!date) {
    return null;
  }
  return format(new Date(date), "MMMM yyyy");
};

const formatBullets = (sentence:any):any|null=>{
  if(!sentence.includes('|'))
  {
    return <p>{sentence.trim()}</p>
  }
  const items = sentence.split('|').map((item:any, index:any) => (
    <li className="list-disc ml-2" key={index}>{item.trim()}</li>
  ));
  return <ul className="list-outside">{items}</ul>;
}

export const Resume1: React.FC<ResumeProps> = ({
  info,
  experiences,
  educations,
  projects,
  skills,
  socials,
}) => {
  
  return (
    <section
      id="preview-sc"
      className="h-screen overflow-y-auto print_area w-[50%] bg-gray-500 
              flex justify-center items-center relative roboto  py-24 "
    >
      <div 
      id="resume"
      className="w-[420px] h-[594px] bg-white  flex flex-col items-center py-4 px-2 text-[10px]">
        <div className="w-full flex items-center justify-start">
          <h1 className="w-[40%] px-4 font-[700] text-[11px] uppercase">
            {info?.firstName} {info?.middleName} {info?.lastName}
          </h1>
          <p className="w-[30%] px-4 font-[400] text-[8px]">{info?.phone}</p>
          {/* <p className="w-[30%] px-4 font-[400]">{info?.email}</p> */}
        </div>
        <div className="w-full flex items-center justify-start mt-1">
          <h1 className="w-[40%] px-4 font-[400] tracking-[0.1rem] uppercase text-[8px]">
            {info?.designation}
          </h1>
          <p className="w-[30%] px-4 font-[400] text-[8px]">{info?.address}</p>
          <p className="w-[30%] px-4 font-[400] text-[8px]">{info?.site}</p>
        </div>
        <hr className="w-[94%] mt-2 border-[1px] border-black mb-3" />
        <div className="w-[94%]">
          <h2 className="font-[700] text-[8px] uppercase text-neutral-600">
            My Story
          </h2>
          <div className="flex items-center mt-1">
            <div className="h-[13px] w-[5px] mr-2 bg-neutral-400" />
            <p className="text-black font-[400]">{info?.story}</p>
          </div>
        </div>
        <div className="w-[94%] mt-3">
          <h2 className="font-[700] text-[8px] uppercase text-neutral-600">
            Objective
          </h2>
          <div className="flex items-center mt-1">
            <div className="h-[13px] w-[5px] mr-2 bg-neutral-400" />
            <p className="text-black font-[400]">{info?.summary}</p>
          </div>
        </div>
        <div className="w-[94%] mt-3 flex ">
          <div className="w-[70%]">
            <div>
              <h2 className="uppercase text-neutral-600 text-[10px] font-[700]">
                Academic Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[2px] mb-2" />
              {educations?.map((education: any, i: any) => (
                <div key={i} className="py-[2px]">
                  <div className="text-black font-[600]  uppercase text-[8px]">
                    {education?.degree}
                  </div>
                  <div>
                    <span className="text-[7px]">{education?.school}</span>
                    {education?.city && (<span>, </span>)}
                    <span className="text-[7px]">{education?.city}</span>
                  </div>
                  <div className="text-[7px]">
                    Year of Passing -{" "}
                    <span>{formatDate(education?.graduationDate)}</span>
                  </div>
                  <div className="text-[7px]">{formatBullets(education?.description)}</div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <h2 className="uppercase text-neutral-600 text-[10px] font-[700]">
                Internship Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[2px] mb-2" />
              {experiences?.map((experience: any, i: any) => (
                <div key={i} className="py-1">
                  <div className="text-black font-[600] mb-1 flex items-center text-[8px]">
                    {experience?.title}
                    <div className="w-[3px] h-[10px] bg-neutral-400 mx-1" />
                    {experience?.organization}
                  </div>
                  <div className="text-[7px]">
                    {experience?.location} | {formatDate(experience?.startDate)}{" "}
                    -{" "}
                    {experience?.endDate
                      ? formatDate(experience?.endDate)
                      : "Present"}
                  </div>
                  <div className="text-[7px]">{formatBullets(experience?.description)}</div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <h2 className="uppercase text-neutral-600 text-[10px] font-[700]">
                Project Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[2px] mb-2" />
              {projects?.map((project: any, i: any) => (
                <div key={i} className="py-[2px]">
                  <a className="cursor-pointer" href={project?.link}>
                    <div className="text-black font-[600]  text-[8px]">
                      {project?.title} | {formatDate(project?.startDate)} -{" "}
                      {project?.endDate
                        ? formatDate(project?.endDate)
                        : "Present"}
                    </div>
                    <div className="text-[7px]">{formatBullets(project?.description)}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[30%]">
            <div>
              <h2 className="uppercase text-neutral-600 text-[10px] font-[700]">
                Skills Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[66%] mt-[4px] mb-2" />
              {skills?.map((skill: any, i: any) => (
                <div key={i} className="py-[2px] text-[7px]">
                  <li className="">{skill.title}</li>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="uppercase text-neutral-600 text-[10px] font-[700]">
                Socials Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[66%] mt-[4px] mb-2" />
              {socials?.map((social: any, i: any) => (
                <div key={i} className="py-1">
                  <div className="font-[700]  text-black text-[8px]">
                    {social?.platform}
                  </div>
                  <a href={social?.link} className="underline text-[7px]">
                    {social?.username}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export const Resume2: React.FC<ResumeProps> = ({
  info,
  experiences,
  educations,
  projects,
  skills,
  socials,
}) => {
  return (
    <section id="preview-sc" className="h-screen overflow-y-auto print_area w-[50%] bg-gray-500 
                     flex justify-center items-center relative">
        <div className="w-[420px] h-[594px] bg-white  flex flex-col items-center" id="resume">
            <h2 className="text-[26px] font-extralight xl:text-[28px]">
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
                    <h2 className="text-[#6A6A6A] text-[13px] font-[600] mb-1">ACADEMIC</h2>
                    {educations?.map((education:any,i:any)=>(
                        <div className="py-[2px]" key={i}>
                            <h3 className="text-[10px] uppercase inter font-[700]">{education?.school}</h3>
                            <h3 className="tracking-[.55px] font-[400] text-[7px] uppercase">{education?.degree}</h3>
                            <p className="text-[7px] tracking-[0.4px] font-weight-[400]">{formatDate(education?.graduationDate)} | {education?.city}</p>
                            <p className="text-[7px] font-[400] tracking-[0.4px] ">{formatBullets(education?.description)}</p>
                        </div>
                    ))}
                    <h2 className="text-[#6A6A6A] text-[13px] font-[600] uppercase mt-2 mb-1">Skills</h2>
                    {skills?.map((skill:any,i:any)=>(
                        <div className="py-[2px]" key={i}>
                            <li className="text-[8px] font-[400] tracking-[0.4px] ">
                                {skill?.title}
                            </li>
                        </div>
                    ))}
                    <h2 className="text-[#6A6A6A] text-[13px] font-[600] uppercase mt-2 mb-1">Socials</h2>
                    {socials?.map((social:any,i:any)=>(
                        <div className="py-[2px]" key={i}>
                            <p className="text-[8px] font-[400] tracking-[0.4px] ">
                                {social?.platform}
                                <span> - </span>
                                <span className="text-black font-[700]"><a href={social?.link}>{social?.username}</a></span>
                            </p>
                        </div>
                    ))}
                </div>

                <div className="w-[60%] h-full" id="right-side">
                    <h2 className="text-[#6A6A6A] text-[13px] font-[600] uppercase mb-1">Internship</h2>
                    {experiences?.map((experience:any,i:any)=>(
                        <div className="py-[2px]" key={i}>
                            <h3 className="text-[8px] uppercase inter font-[700]">{experience?.organization} | {experience?.title} </h3>
                            <h3 className="font-[400] text-[7px] ">{formatDate(experience?.startDate)} - {experience?.endDate? (formatDate(experience?.endDate)) : 'Present'} | {experience?.location}</h3>
                            <article className="text-[7px] max-w-[80%] font-[400] ">
                                {formatBullets(experience?.description)}
                            </article>
                        </div>
                    ))}

                    <h2 className="text-[#6A6A6A] text-[13px] font-[600] uppercase mt-2 mb-1">Projects</h2>
                    {projects?.map((project:any,i:any)=>(
                        <div className="py-[2px]" key={i}>
                            <h3 className="text-[8px] inter font-[700]">{project?.title} | <span className="text-[6px] font-[400]"><a href={project?.link}>Link</a></span></h3>
                            <p className="text-[7px] tracking-[0.4px] font-[400]">{formatBullets(project?.description)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </section>
  );
};