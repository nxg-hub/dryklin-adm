import * as Yup from 'yup';

export const AddSPSchema = Yup.object().shape({
    companyName: Yup.string().required('This field is required'),
    contactPersonName: Yup.string().required('This field is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  
});