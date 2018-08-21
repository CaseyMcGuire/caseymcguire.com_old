import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../Page/Page";
import Section from "./components/Section/Section";
import EmploymentCard from "./components/EmploymentCard/EmploymentCard";
import "./Resume.scss";
import EducationCard from "./components/EducationCard/EducationCard";
import TechnologyInfoCard from "./components/TechnologyInfoCard/TechnologyInfoCard";

class ResumePage extends React.Component<object, object> {

  render() {
    return (
      <Page>
        <div className={"resume-container"}>
          <Section title={"EMPLOYMENT"}>
            <EmploymentCard
              title={"Software Development Engineer II"}
              companyName={"Apptio, Inc."}
              location={"Bellevue, WA"}
              employmentDate={"October 2016 - Present"}
              description={[
                "Assisted in the design and complete rewrite of a feature which allows users to visualize how money is spent throughout their IT organization.",
                "Led the design and implementation of a feature that allows users to see how money is either over- and/or under-allocated in their IT financial models.",
                "﻿Participated in the development of a new Selenium-based testing framework, which improved the stability of our application. "
              ]}/>
            <EmploymentCard
              title={"Software Development Engineer I"}
              companyName={"Apptio, Inc."}
              location={"Bellevue, WA"}
              employmentDate={"January 2016 - October 2016"}
              description={[
                "Maintained and added new features to application which allows users to create reports for their IT financial data. ",
                "Mentored intern in the design and implementation of a new treemap chart type that users can add to their reports."
              ]}/>
            <EmploymentCard
              title={"Software Development Engineer, Intern"}
              companyName={"Apptio, Inc."}
              location={"Bellevue, WA"}
              employmentDate={"June 2015 - September 2015"}
              description={[
                "Developed feature that allows clients to design and print reports for Apptio's upcoming flagship web application.",
                "Adapted and debugged existing server-side code to allow for seamless integration of upcoming feature with existing legacy web application."
              ]}/>
          </Section>
          <Section title={"OTHER EXPERIENCE"}>
            <EmploymentCard
              title={"Freelance Developer"}
              companyName={"Printopus"}
              description={[
                "Developed the UI for an Android mobile application, using React Native and Redux, that allows users to have photos on their phones mailed to them in a variety of formats.",
                "https://play.google.com/store/apps/details?id=us.printop.mobile.android.store&hl=en"
              ]}/>
          </Section>
          <Section title={"TECHNOLOGIES"}>
            <TechnologyInfoCard programmingLanguages={["Java", "JavaScript", "TypeScript"]} 
                                technologiesAndTools={["Google Web Toolkit", "ReactJS", "React Native", "Redux", "HTML", "CSS", "Git", "Mercurial"]}/>
          </Section>
          <Section title={"EDUCATION"}>
            <EducationCard universityName={"University of Puget Sound"}
                           major={"B.S. In Computer Science"}
                           minor={"Minor in Mathematics and Economics"}
                           graduationDate={"December 2015"}/>
          </Section>
        </div>
      </Page>
    )
  }
}

window.onload = () => {
  ReactDOM.render(
    <ResumePage />,
    document.getElementById("main")
  );
}