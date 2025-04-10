import * as Yup from 'yup';

export const AddAgentSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    location: Yup.string().required('Address is required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  
});
