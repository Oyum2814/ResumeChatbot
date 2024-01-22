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
              flex justify-center items-center relative roboto"
    >
      <div className="w-[592px] h-[842px] bg-white  flex flex-col items-center py-8 px-4 text-[10px]">
        <div className="w-full flex items-center justify-start">
          <h1 className="w-[40%] px-4 font-[700] text-[16px] uppercase">
            {info?.firstName} {info?.middleName} {info?.lastName}
          </h1>
          <p className="w-[30%] px-4 font-[400]">{info?.phone}</p>
          {/* <p className="w-[30%] px-4 font-[400]">{info?.email}</p> */}
        </div>
        <div className="w-full flex items-center justify-start mt-1">
          <h1 className="w-[40%] px-4 font-[400] tracking-[0.1rem] uppercase text-[12px]">
            {info?.designation}
          </h1>
          <p className="w-[30%] px-4 font-[400]">{info?.address}</p>
          <p className="w-[30%] px-4 font-[400]">{info?.site}</p>
        </div>
        <hr className="w-[94%] mt-3 border-[1px] border-black mb-4" />
        <div className="w-[94%]">
          <h2 className="font-[700] text-[13px] uppercase text-neutral-600">
            My Story
          </h2>
          <div className="flex items-center mt-1">
            <div className="h-[13px] w-[5px] mr-2 bg-neutral-400" />
            <p className="text-black font-[400]">{info?.story}</p>
          </div>
        </div>
        <div className="w-[94%] mt-3">
          <h2 className="font-[700] text-[13px] uppercase text-neutral-600">
            Objective
          </h2>
          <div className="flex items-center mt-1">
            <div className="h-[13px] w-[5px] mr-2 bg-neutral-400" />
            <p className="text-black font-[400]">{info?.summary}</p>
          </div>
        </div>
        <div className="w-[94%] mt-6 flex ">
          <div className="w-[70%]">
            <div>
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Academic Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2" />
              {educations?.map((education: any, i: any) => (
                <div key={i} className="py-1">
                  <div className="text-black font-[600] mb-1 uppercase">
                    {education?.degree}
                  </div>
                  <div>
                    <span>{education?.school}</span>
                    <span>, </span>
                    <span>{education?.city}</span>
                  </div>
                  <div>
                    Year of Passing -{" "}
                    <span>{formatDate(education?.graduationDate)}</span>
                  </div>
                  <div>{education?.description}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Internship Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2" />
              {experiences?.map((experience: any, i: any) => (
                <div key={i} className="py-1">
                  <div className="text-black font-[600] mb-1 flex items-center">
                    {experience?.title}
                    <div className="w-[3px] h-[10px] bg-neutral-400 mx-1" />
                    {experience?.organization}
                  </div>
                  <div>
                    {experience?.location} | {formatDate(experience?.startDate)}{" "}
                    -{" "}
                    {experience?.endDate
                      ? formatDate(experience?.endDate)
                      : "Present"}
                  </div>
                  <div>{experience?.description}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Project Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2" />
              {projects?.map((project: any, i: any) => (
                <div key={i} className="py-1">
                  <a className="cursor-pointer" href={project?.link}>
                    <div className="text-black font-[600] mb-1">
                      {project?.title} | {formatDate(project?.startDate)} -{" "}
                      {project?.endDate
                        ? formatDate(project?.endDate)
                        : "Present"}
                    </div>
                    <div>{project?.description}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[30%]">
            <div>
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Skills Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[66%] mt-[4px] mb-2" />
              {skills?.map((skill: any, i: any) => (
                <div key={i} className="py-1">
                  <li className="">{skill.title}</li>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Socials Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[66%] mt-[4px] mb-2" />
              {socials?.map((social: any, i: any) => (
                <div key={i} className="py-1">
                  <div className="font-[700] text-[11px] text-black">
                    {social?.platform}
                  </div>
                  <a href={social?.link} className="underline">
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
    <section
      id="preview-sc"
      className="h-screen overflow-y-auto print_area w-[50%] bg-gray-500 
              flex justify-center items-center relative roboto"
    >
      <div className="w-[592px] h-[842px] bg-white  flex flex-col items-center py-8 px-4 text-[10px]">
        <div className="w-full flex items-center justify-start">
          <h1 className="w-[40%] px-4 font-[700] text-[16px] uppercase">
            {info?.firstName} {info?.middleName} {info?.lastName}
          </h1>
          <p className="w-[30%] px-4 font-[400]">{info?.phone}</p>
          {/* <p className="w-[30%] px-4 font-[400]">{info?.email}</p> */}
        </div>
        <div className="w-full flex items-center justify-start mt-1">
          <h1 className="w-[40%] px-4 font-[400] tracking-[0.1rem] uppercase text-[12px]">
            {info?.designation}
          </h1>
          <p className="w-[30%] px-4 font-[400]">{info?.address}</p>
          <p className="w-[30%] px-4 font-[400]">{info?.site}</p>
        </div>
        <hr className="w-[94%] mt-3 border-[1px] border-black mb-4" />
        <div className="w-[94%]">
          <h2 className="font-[700] text-[13px] uppercase text-neutral-600">
            My Story
          </h2>
          <div className="flex items-center mt-1">
            <div className="h-[13px] w-[5px] mr-2 bg-neutral-400" />
            <p className="text-black font-[400]">{info?.story}</p>
          </div>
        </div>
        <div className="w-[94%] mt-3">
          <h2 className="font-[700] text-[13px] uppercase text-neutral-600">
            Objective
          </h2>
          <div className="flex items-center mt-1">
            <div className="h-[13px] w-[5px] mr-2 bg-neutral-400" />
            <p className="text-black font-[400]">{info?.summary}</p>
          </div>
        </div>
        <div className="w-[94%] mt-6 flex ">
          <div className="w-[70%]">
            <div>
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Academic Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2" />
              {educations?.map((education: any, i: any) => (
                <div key={i} className="py-1">
                  <div className="text-black font-[600] mb-1 uppercase">
                    {education?.degree}
                  </div>
                  <div>
                    <span>{education?.school}</span>
                    <span>, </span>
                    <span>{education?.city}</span>
                  </div>
                  <div>
                    Year of Passing -{" "}
                    <span>{formatDate(education?.graduationDate)}</span>
                  </div>
                  <div>{education?.description}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Internship Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2" />
              {experiences?.map((experience: any, i: any) => (
                <div key={i} className="py-1">
                  <div className="text-black font-[600] mb-1 flex items-center">
                    {experience?.title}
                    <div className="w-[3px] h-[10px] bg-neutral-400 mx-1" />
                    {experience?.organization}
                  </div>
                  <div>
                    {experience?.location} | {formatDate(experience?.startDate)}{" "}
                    -{" "}
                    {experience?.endDate
                      ? formatDate(experience?.endDate)
                      : "Present"}
                  </div>
                  <div>{experience?.description}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Project Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[36%] mt-[4px] mb-2" />
              {projects?.map((project: any, i: any) => (
                <div key={i} className="py-1">
                  <a className="cursor-pointer" href={project?.link}>
                    <div className="text-black font-[600] mb-1">
                      {project?.title} | {formatDate(project?.startDate)} -{" "}
                      {project?.endDate
                        ? formatDate(project?.endDate)
                        : "Present"}
                    </div>
                    <div>{project?.description}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[30%]">
            <div>
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Skills Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[66%] mt-[4px] mb-2" />
              {skills?.map((skill: any, i: any) => (
                <div key={i} className="py-1">
                  <li className="">{skill.title}</li>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="uppercase text-neutral-600 text-[13px] font-[700]">
                Socials Profile
              </h2>
              <hr className="border-[1.5px] border-neutral-400 w-[66%] mt-[4px] mb-2" />
              {socials?.map((social: any, i: any) => (
                <div key={i} className="py-1">
                  <div className="font-[700] text-[11px] text-black">
                    {social?.platform}
                  </div>
                  <a href={social?.link} className="underline">
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