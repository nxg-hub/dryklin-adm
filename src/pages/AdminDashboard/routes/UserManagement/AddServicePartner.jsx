import React from "react";
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { X } from "lucide-react"; // Close button icon



const AddServicePartner = ({isOpen, onClose}) => {

    return (
      <div className="fixed inset-0 flex items-center justify-center border-2 border-[#a0a0a0] rounded-md overflow-y-auto p-4 z-50">
         
      <div className="relative bg-white p-11 rounded shadow-lg w-[900px] max-h-[120%] overflow-y-auto">
      <button
          className="absolute top-1 border border-gray-300 rounded-full p-2 right-1 text-gray-700 hover:text-red-500"
          onClick={onClose}
        >
          <X size={25} />
        </button>
      <h2 className="text-xl text-[#E85C19] font-semibold mb-4">
        Add Service Employee
        </h2>
       
        <Formik
          initialValues={{ email: "", name: "", phone: "", amount: "", project: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* First Row - Two Inputs */}
              <div className="flex gap-5">
                <div className="flex flex-col w-1/2">
                

                  <label className="block text-md font-bold mb-1">Company's Name</label>
                  <Field
                    type="text"
                    name="CompanyName"
                    placeholder="Input Company's Name"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage name="CompanyName" component="div" className="text-red-500 text-sm" />
                </div>
    
                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Input Email Address"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
    
              {/* Second Row - Two Inputs */}
              <div className="flex gap-5">
                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">Phone Number</label>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>
    
                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">Conatact Person</label>
                  <Field
                    type="text"
                    name="contact"
                    placeholder="Input Contact Person's Name"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
    
              {/* Third Row - Full Width Textarea */}
              <div className="flex flex-col">
                <label className="block text-md font-bold mb-1">Address</label>
                <Field
                  as="textarea"
                  name="address"
                  placeholder="Input address"
                  className="w-full p-3 border border-gray-600 rounded-lg min-h-[120px] resize-none"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                   className="bg-[#E85C19] text-white px-15 mt-3 py-5 rounded-lg hover:bg-[#c74e10] transition "
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
       
      </div>
    </div>
    

    )

}

export default AddServicePartner
