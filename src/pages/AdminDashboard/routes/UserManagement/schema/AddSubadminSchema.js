import * as Yup from 'yup';

export const AddSubadminSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
  .min(8, 'Must be 8 characters or more')
  .max(20, 'Must not exceed 21 characters')
  .required('Password is required'),
confirmPassword: Yup.string()
  .min(8, 'Must be 8 characters or more')
  .max(20, 'Must not exceed 20 characters')
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .required('Password is required'),
name: Yup.string().required('Full name is required'),
phoneNumber: Yup.number().required('Phone Number is required'),
dryKlinUserName: Yup.string().required('Username is required'),
});
