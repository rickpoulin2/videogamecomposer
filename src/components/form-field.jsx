import React from 'react'

const FormField = ({ name, label, helpText, required = false, type = "text", children }) => {


  const clz = "form-label" + (required ? "  label-required" : "")
  const eLabel = <label htmlFor={name} className={clz}>{label}</label>
  const eHelp = helpText ? <div id={name + "Help"} className="form-text">{helpText}</div> : null

  const addProps = {};
  if (required) {
    addProps.required = true
  }
  if (helpText) {
    addProps['aria-describedby'] = name + "Help";
  }
  const eInput = <input id={name} name={name} className="form-control" type={type} {...addProps} />

  return (
    <div className="field">
      {eLabel}
      {eInput}
      {eHelp}
    </div>
  )
}

export default FormField