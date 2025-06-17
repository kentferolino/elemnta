import * as Yup from "yup";

export const personValidationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  preferred_name: Yup.string(),
  date_of_birth: Yup.date().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  marital_status: Yup.string().required("Marital status is required"),
  mobile_number: Yup.string().required("Mobile number is required"),
  home_email: Yup.string()
    .email("Invalid email")
    .required("Home email is required"),
  office_email: Yup.string()
    .email("Invalid email")
    .required("Office email is required"),
  home_address: Yup.string().required("Home address is required"),
  office_address: Yup.string().required("Office address is required"),
});
