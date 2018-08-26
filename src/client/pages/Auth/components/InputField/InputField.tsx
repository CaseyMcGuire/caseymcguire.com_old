import * as React from "react";
import "./InputField.scss";

export default function FormField(props: {formName: string, title: string, type: string}) {
  return (
    <div className={"form-container"}>
      <div className={"title-container"}>
        <span>{props.title}:</span>
      </div>
      <div className={"input-container"}>
        <input name={props.formName} type={props.type} />
      </div>
    </div>
  );
}