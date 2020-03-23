import React from "react";

function useFormValidation(initialState, validate, authenticate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
    // console.log("useFormValidation.js - useEffect");
  }, [errors, authenticate, isSubmitting]);

  function handleChange(event) {
    event.persist();
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value
    }));
    // console.log("useFormValidation.js - handleChange");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    // console.log("handleSubmit: " + { values });
    // console.log("useFormValidation.js - handleSubmit");
  }

  return { handleSubmit, handleChange, values, errors, isSubmitting };
}

export default useFormValidation;
