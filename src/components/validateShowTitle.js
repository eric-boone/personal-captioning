function validateShowTitle(values) {
  let errors = {};

  if (!values.showTitle) {
    errors.showTitle = "Show title required";
  }

  return errors;
}

export default validateShowTitle;