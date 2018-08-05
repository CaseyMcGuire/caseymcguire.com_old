import * as React from "react";
import "./EmploymentCard.scss";

interface Props {
  title: string,
  employmentDate?: string,
  companyName: string,
  location?: string,
  description: string[]
}

export default class EmploymentCard extends React.Component<Props, object> {
  render() {
    const { title, employmentDate, companyName, location, description} = this.props;
    return (
      <div className={"employment-card-container"}>
        <div className="header">
          <div className="title-company-container">
            <div>
              <span className={"title"}>{title}</span>
            </div>
            <div>
              <span className={"company-name"}>{companyName}</span>
            </div>
          </div>
          <div className="date-location-container">
            <div>
              <span className={"employment-date"}>{employmentDate}</span>
            </div>
            <div className={"location-container"}>
              <span className={"location"}>{location}</span>
            </div>
          </div>
        </div>
        <ul>
          {
            description.map(elem => <li>{elem}</li> )
          }
        </ul>
      </div>
    )
  }
}