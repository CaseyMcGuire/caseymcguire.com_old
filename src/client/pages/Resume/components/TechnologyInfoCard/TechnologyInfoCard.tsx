import * as React from "react";
import "./TechnologyInfoCard.scss";

interface Props {
  programmingLanguages: string[],
  technologiesAndTools: string[]
}

export default class TechnologyInfoCard extends React.Component<Props, object> {

  render() {
    return (
      <div className={"technology-info-card-container"}>
        <TechnologySection title={"Programming Languages"} elements={this.props.programmingLanguages}/>
        <TechnologySection title={"Technologies & Tools"} elements={this.props.technologiesAndTools} />
      </div>
    )
  }
}

function TechnologySection(props: {title: string, elements: string[]}) {
  return (
    <div className={"technology-section-container"}>
      <div className={"technology-section-title-container"}>
        <span className={"technology-info-card-title"}>{props.title}:</span>
      </div>
      <div className={"technology-section-content-container"}>
        {formatElements(props.elements)}
      </div>
    </div>
  )
}

function formatElements(elements: string[]): string {
  if (elements.length === 1) {
    return elements[0];
  }
  let mergedElements = "";
  for (let i = 0; i < elements.length; i++) {
    if (i === elements.length - 1) {
      mergedElements += "and " + elements[i];
    }
    else {
      mergedElements += elements[i] + ", ";
    }
  }
  return mergedElements;
}