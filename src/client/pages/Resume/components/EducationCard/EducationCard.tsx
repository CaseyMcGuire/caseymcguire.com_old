import * as React from "react";
import "./EducationCard.scss";

interface Props {
  universityName: string,
  major: string,
  minor?: string,
  graduationDate: string
}

export default class EducationCard extends React.Component<Props, object> {

  render() {
    const {
      universityName,
      major,
      minor,
      graduationDate
    } = this.props;
    return (
      <div className={"education-card-container"}>
        <div className={"school-info-container"}>
          <div className={"university-name-container"}>
            <span className={"university-name"}>{universityName}</span>
          </div>
          <div className={"major-container"}>
            <span>{major}</span>
          </div>
          <div className={"minor-container"}>
            <span>{minor}</span>
          </div>        </div>
        <div className={"graduation-date-container"}>
          <span className={"graduation-date"}>Graduated {graduationDate}</span>
        </div>
      </div>
    )
  }
}