import * as yup from "yup";

const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
// min 5 char, 1 uppercase, 1 lowercase, 1number, 1 symbol
const today = new Date();
const maxDate = today.toISOString().split("T")[0];

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const CitizenRegistrationSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  lastname: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(1, "Enter minimum 1 character")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be a 10 digit number")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  dob: yup
    .date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
  aadhar: yup
    .string()
    .matches(/^\d{12}$/, "Aadhaar number must be a 12 digit number")
    .required("Required"),
  password: yup
    .string()
    .matches(
      passwordRule,
      "Password must contain 1 uppercase letter, 1 number, and 1 special character"
    )
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  housename: yup
    .string()

    .min(2, "Enter minimum 2 characters")
    // .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  street: yup
    .string()

    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  district: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  nationality: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode must be a 6 digit number")
    .required("Required"),
  gender: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .required("Required"),
});

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "1 uppercase, 1 number, 1 symbol")
    .max(16)
    .matches(passwordRule, "1 uppercase, 1 number, 1 symbol")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const PoliceRegistrationSchema = yup.object().shape({
  station_name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  station_incharge_officer: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  total_officers: yup.string(),
  email: yup.string().email("Please enter a valid email").required("Required"),
  contact: yup
    .string()
    .matches(/^[0-9]+$/, "Only digits are allowed")
    .matches(/^\d{10}$/, "Phone number must be a 10 digit number")
    .required("Required"),
  district: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(Infinity, "Maximum 20 characters are allowed")
    .required("Required"),

  password: yup
    .string()
    .matches(
      passwordRule,
      "Password must contain 1 uppercase letter, 1 number, and 1 special character"
    )
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const AddCrimeSchema = yup.object().shape({
  district: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(Infinity, "Maximum 20 characters are allowed")
    .required("Required"),
    psId: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(Infinity, "Maximum 20 characters are allowed")
    .required("Required"),
  victimName: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  victimGender: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  victimEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  victimAddress: yup
    .string()
    .required("Address is required"),
  incidentDate: yup
    .date()
    .max(new Date(), "Incident Date cannot be in the future")
    .required("Incident Date is required"),
  incidentTime: yup
    .string()
    .required("Time is required"),
  incidentLocation: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  incidentCity: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  witnessName: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  witnessContact: yup
    .string()
    .matches(/^[0-9]+$/, "Only digits are allowed")
    .matches(/^\d{10}$/, "Phone number must be a 10 digit number")
    .required("Required"),
  witnessAddress: yup
    .string()
    .required("Address is required"),
  witnessStatement: yup
    .string()
    .required("Witness statement is required"),
  caseDescription: yup
    .string()
    .required("Case description is required"),
  caseType: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  theftStolenItems: yup
    .string(),
    // .required("Stolen items description is required"),
  theftStolenSuspected: yup
    .string(),
    // .required("Suspected stolen items description is required"),
  assaultInjuries: yup
    .string(),
    // .required("Assault injuries description is required"),
  assaultMedicalAttention: yup
    .string(),
    // .required("Medical attention description is required"),
  vandalismDescription: yup
    .string(),
    // .required("Vandalism description is required"),
  vandalismCostOfDamage: yup
    .string(),
    // .required("Cost of damage is required"),
  missingPersonName: yup
    .string(),
    // .required("Missing person's name is required"),
  missingPersonDescription: yup
    .string(),
    // .required("Description of the missing person is required"),
  domesticViolenceDescription: yup
    .string(),
    // .required("Domestic violence description is required"),
  domesticViolenceInjuries: yup
    .string(),
    // .required("Domestic violence injuries description is required"),
  fraudDescription: yup
    .string(),
    // .required("Fraud description is required"),
  fraudFinancialLoss: yup
    .string(),
    // .required("Financial loss description is required"),
  others: yup
    .string()
    // .required("Other case details are required")
    ,
    files: yup
    .array()
    .of(
      yup
        .mixed()
        .test(
          "fileType",
          "Unsupported File Format. Supported formats: JPEG, PNG, GIF, MP3, MP4",
          (value) =>
            !value || ["image/jpeg", "image/png", "image/gif", "audio/mpeg", "video/mp4"].includes(value.type)
        )
    )
    .required("Evidence file is required"),
});
