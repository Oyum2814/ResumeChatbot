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
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
      fontWeight: 100,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
      fontWeight: 200,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
      fontWeight: 300,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
      fontWeight: 400,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
      fontWeight: 500,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
      fontWeight: 600,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
      fontWeight: 700,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
      fontWeight: 800,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
      fontWeight: 900,
    },
  ],
});

const formatDate = (date: any): any | null => {
  if (!date) {
    return null;
  }
  return format(new Date(date), "MMMM yyyy");
};

const formatBullets = (sentence:any):any|null=>{
  if(!sentence.includes('|'))
  {
    return <Text style={styles.text}>{sentence.trim()}</Text>
  }
  const items = sentence.split('|').map((item:any, index:any) => (
    <View key={index} style={{ flexDirection: "row", marginBottom: 4,marginLeft:-12 }}>
              <Text style={{ marginHorizontal: 3 }}>•</Text>
              <Text style={styles.text}>{item.trim()}</Text>
    </View>
  ));
  return <ul className="list-outside">{items}</ul>;
}
Font.registerHyphenationCallback(word => [word]) //This prevents ugly line breaks 


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
    textTransform: "uppercase",
    fontSize: 19,
    fontFamily:"Inter",
    marginBottom: 10,
    fontWeight: 600,
    color: 'black',
    letterSpacing:"2.5px",
  },
  text: {
    fontSize: 11,
    fontFamily:"Inter",
    fontWeight:300,
    color: 'black',
    margin:'2px 0px'
  },
  subHeader:{
    fontSize: 14,
    fontFamily:"Inter",
    fontWeight:600,
    color: 'black',
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
        </View>
      </View>
    </Page>
  </Document>
  );
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





export const Preview2 : React.FC<ResumeProps>=({
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
        <View>
          <Text style={{
            fontWeight:700,
            fontFamily: "Inter",
            letterSpacing: "10px",
            fontSize:'28px',
          }}>
            {info?.firstName} {info?.middleName} {info?.lastName}
          </Text>
        </View>

        <View>
          <Text style={{
            fontWeight:400,
            marginTop:'4px',
            fontFamily:"Inter",
            fontSize:'16px',
            letterSpacing:'2px'
          }}>
            {info?.designation}
          </Text>
        </View>

        <View style={{display:'flex',flexDirection:'row',marginTop:'54px'}}>          
          <View style={{width:'40%'}}>
            <View style={{marginBottom:'16px'}}>
              <View><Text style={styles.header}>Contact</Text></View>
              <View style={{marginBottom:'2px'}}><Text style={styles.subHeader}>{info?.phone}</Text></View>
              <View style={{marginBottom:'2px'}}><Text style={styles.subHeader}>{info?.address}</Text></View>
              <View style={{marginBottom:'2px'}}><Text style={styles.subHeader}>{info?.site}</Text></View>
            </View>

            <View style={{marginBottom:'16px'}}>
              <View><Text style={styles.header}>Academic</Text></View>
              {educations?.map((education,i)=>(
                <View key={i} style={{marginBottom:'8px'}}>
                  <View><Text style={styles.subHeader}>{education?.degree}</Text></View>
                  <View ><Text style={styles.subHeader}>{education?.school} , {education?.city}</Text></View>
                  <View style={{marginTop:'4px'}}><Text style={styles.text}>Year of Passing - {formatDate(education?.graduationDate)}</Text></View>
                  <View >{formatBullets(education?.description)}</View>
                </View>
              ))}
            </View>

            <View style={{marginBottom:'16px'}}>
              <View><Text style={styles.header}>Skills</Text></View>
              {titles?.map((title,i)=>(
                  <Text style={styles.text} key={i}>{title}</Text>
              ))}
            </View>

            <View style={{marginBottom:'16px'}}>
              <View><Text style={styles.header}>Socials</Text></View>
              {socials?.map((social,i)=>(
                  <View key={i} style={{marginBottom:'8px',display:'flex',flexDirection:'row'}}>
                    <Text style={styles.text}>{social?.platform} -  </Text>
                    <Text style={styles.text}>
                      <Link src={social?.link} style={{color:'black'}}>{social?.username}</Link>
                    </Text>
                  </View>
              ))}
            </View>
          </View>

          <View style={{height:'100%',backgroundColor:'black',width:'0.5px',marginLeft:'10%',marginRight:'10%'}}>

          </View>

          <View style={{width:'50%'}}>
          <View style={{marginBottom:'16px'}}>
              <View><Text style={styles.header}>My Story</Text></View>
              <Text style={styles.text}>{info?.summary}</Text>
            </View>

            <View style={{marginBottom:'16px'}}>
              <View><Text style={styles.header}>Internship</Text></View>
              {experiences?.map((experience,i)=>(
                <View key={i} style={{marginBottom:'8px'}}>
                  <View><Text style={styles.subHeader}>{experience?.title}</Text></View>
                  <View ><Text style={styles.subHeader}>{experience?.organization} , {experience?.location}</Text></View>
                  <View style={{marginTop:'4px'}}>
                    <Text style={styles.text}>
                      {formatDate(experience?.startDate)} - {experience?.endDate? formatDate(experience.endDate):'Present'}
                    </Text>
                  </View>
                  <View >{formatBullets(experience?.description)}</View>
                </View>
              ))}
            </View>

            <View style={{marginBottom:'16px'}}>
              <View><Text style={styles.header}>projects</Text></View>
              {projects?.map((project,i)=>(
                <View key={i} style={{marginBottom:'8px'}}>
                  <View><Text style={styles.subHeader}>
                   <Link src={project?.link} style={{color:'black'}}>{project?.title}</Link>
                  </Text></View>
                  <View style={{marginTop:'4px'}}>
                    <Text style={styles.text}>
                      {formatDate(project?.startDate)} - {project?.endDate? formatDate(project.endDate):'Present'}
                    </Text>
                  </View>
                  <View >{formatBullets(project?.description)}</View>
                </View>
              ))}
            </View>
          </View>
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
    <PDFViewer doc = {pdf(<Preview2
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