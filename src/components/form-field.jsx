import React from 'react'

const FormField = ({ name, label, helpText, required = false, type = "text", rows = 5, children }) => {


  const clz = "form-label" + (required ? "  label-required" : "")
  const eLabel = <label htmlFor={name} className={clz}>{label}</label>
  const eHelp = helpText ? <div id={name + "Help"} className="form-text">{helpText}</div> : null

  const addProps = {
    id: name,
    name: name,
    className: "form-control"
  };
  if (required) {
    addProps.required = true
  }
  if (helpText) {
    addProps['aria-describedby'] = name + "Help";
  }

  let eInput = null;
  if (type === "textarea") {
    eInput = <textarea rows={rows} {...addProps}></textarea>
  } else if (type === "select") {
    addProps.className = 'form-select';
    eInput = (<select defaultValue="" {...addProps}>
      <option value="" disabled>- Please select an option -</option>
      {children}
    </select>)
  } else {
    eInput = <input type={type} {...addProps} />
  }

  return (
    <div className="field">
      {eLabel}
      {eInput}
      {eHelp}
    </div>
  )
}

export default FormField