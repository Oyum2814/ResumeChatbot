import { format } from "date-fns";
import { Page, Text, View, Document, StyleSheet, Font ,Link, pdf } from '@react-pdf/renderer';

import { useCallback, useEffect } from "react";
import PDFViewer from "./PDFViewer";
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

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12
  },
  section: {
   
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    textTransform: "capitalize",
    fontSize: 36,
    marginBottom: 10,
    fontWeight: 800,
    color: '#333333',
    letterSpacing:"1.5px"
  },
  text: {
    fontSize: 12,
    fontWeight:300,
    marginBottom: 5,
    color: 'black'
  },
  sectionTitle: {
    
    fontSize: 16,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing:'1px',
    fontWeight: 800,
    color: '#ee2e33'
  },
});

export const Resume1: React.FC<ResumeProps> = ({
  info,
  experiences,
  educations,
  projects,
  skills,
  socials,
}) => {
  
  return (
    <PDFViewer doc = {pdf(<Preview1 
      info={info}
      experiences={experiences}
      projects={projects}
      educations={educations}
      skills={skills}
      socials={socials} />)
    }
    info={info}
      experiences={experiences}
      projects={projects}
      educations={educations}
      skills={skills}
      socials={socials}/>
  );
};



export const Preview1 : React.FC<ResumeProps>=({
  info,
  experiences,
  educations,
  projects,
  skills,
  socials,
})=>{
  const titles = skills?.map(skill => skill.title);
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ ...styles.header, width: "100%" }}>
            {info?.firstName} {info?.middleName} {info?.lastName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "2px solid #ee2e33",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexBasis: "auto",
              marginRight: "20px",
            }}
          >
            <Text
              style={{
                ...styles.text,
                fontWeight: 500,
                letterSpacing: "1.1px",
              }}
            >
              (+91) {info?.phone}
            </Text>
          </View>
          <View
            style={{
              flexBasis: "auto",
              marginRight: "20px",
            }}
          >
            <Text
              style={{
                ...styles.text,
                fontWeight: 500,
                letterSpacing: "1.1px",
                textTransform: "lowercase",
              }}
            >
              {info?.mail? info.mail : 'demo@gmail.com'}
            </Text>
          </View>
          <View
            style={{
              flexBasis: "auto",
              marginRight: "20px",
            }}
          >
            <Text
              style={{
                ...styles.text,
                fontWeight: 500,
                letterSpacing: "1.1px",
              }}
            >
              {info?.designation}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={{ ...styles.text, lineHeight: "1.4px" }}>
            {info?.summary}
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: "50%", marginRight: "10px" }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experiences?.map((exp, index) => (
                <View key={index} style={{ marginBottom: 5 }}>
                  <Text
                    style={{
                      ...styles.text,
                      fontWeight: "bold",
                      fontSize: "14",
                    }}
                  >
                    {"\u2022"} {exp.title ? exp.title : ""}
                  </Text>
                  <Text style={{ ...styles.text, fontWeight: "bold" }}>
                    {exp.organization}, {exp.location}
                  </Text>
                  <Text style={styles.text}>{exp.startDate}</Text>
                  <Text style={styles.text}>{exp.description}</Text>
                </View>
              ))}
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.sectionTitle}>Education</Text>
              {educations?.map((edu, index) => (
                <View key={index} style={{ marginBottom: 5 }}>
                  <Text
                    style={{
                      ...styles.text,
                      fontSize: "13",
                      fontWeight: "bold",
                    }}
                  >
                    {edu.degree}
                  </Text>
                  <Text style={styles.text}>{edu.school}</Text>
                  <Text style={styles.text}>{edu.graduationDate}</Text>
                </View>
              ))}
            </View>
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.text}>{titles?.join(", ")}</Text>
            </View>
          </View>
          {/* Achievement section not avaiable */}
          {/* <View style={{ maxWidth: "50%" }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              {achievements?.map((pro, index) => (
                <View key={index}>
                  <Text
                    style={{
                      ...styles.text,
                      fontWeight: "400",
                      fontWeight: "500",
                      textTransform: "capitalise",
                      fontSize: "12",
                    }}
                  >
                    {"\u2022"} {pro ? pro : ""}
                  </Text>
                </View>
              ))}
            </View>

            <View style={{ marginBottom: 5 }}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {formData.projects.map((pro, index) => (
                <View key={index} style={{ marginBottom: 5 }}>
                  <Text
                    style={{
                      ...styles.text,
                      fontWeight: "bold",
                      textTransform: "capitalise",
                      fontSize: "13",
                    }}
                  >
                    {"\u2022"} {pro.title ? pro.title : ""}
                  </Text>

                  <Text style={styles.text}>{pro.description}</Text>
                </View>
              ))}
            </View>

            <View style={{ marginBottom: 5 }}>
              <Text style={styles.sectionTitle}>Coding Profiles</Text>
              {formData.codingProfiles.map((profile, index) => (
                <View key={index} style={{ marginBottom: 5 }}>
                  <Text style={{ ...styles.text, fontWeight: "bold" }}>
                    {profile.label}
                  </Text>
                  <Link
                    style={{ ...styles.text, color: "blue" }}
                    src={profile.profileLink}
                  >
                    {profile.profileLink}
                  </Link>
                </View>
              ))}
            </View>
          </View> */}
        </View>
      </View>
    </Page>
  </Document>
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
    <section id="preview-sc" className="h-screen overflow-y-auto  w-[100%] md:w-[50%]  md:bg-gray-500 
                     flex flex-row md:flex-col justify-center items-center relative">
        <div className=" print_area w-[420px] h-[594px] bg-white  flex flex-col items-center" id="resume">
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
                            <h3 className="text-[10px] uppercase  font-[700]">{education?.school}</h3>
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
                            <h3 className="text-[8px]  font-[700]">{project?.title} | <span className="text-[6px] font-[400]"><a href={project?.link}>Link</a></span></h3>
                            <p className="text-[7px] tracking-[0.4px] font-[400]">{formatBullets(project?.description)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </section>
  );
};