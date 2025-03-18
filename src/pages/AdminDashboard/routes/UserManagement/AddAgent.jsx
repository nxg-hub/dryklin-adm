import React from "react";
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { X } from "lucide-react"; // Close button icon



const AddAgent = ({isOpen, onClose}) => {

    return (
      <div className="fixed inset-0 flex items-center justify-center border-2 border-[#a0a0a0] rounded-md overflow-y-auto p-4 z-50">
         <button
          className="absolute top-1 border border-gray-300 rounded-full p-2 right-1 text-gray-700 hover:text-red-500"
          onClick={onClose}
        >
          <X size={25} />
        </button>
      <div className="bg-white p-11 rounded shadow-lg w-[900px] max-h-[120%] overflow-y-auto">
      <h2 className="text-xl text-[#E85C19] font-semibold mb-4">
        Add New Delivery Agent
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
                

                  <label className="block text-md font-bold mb-1"> First Name</label>
                  <Field
                    type="text"
                    name="CompanyName"
                    placeholder="Input Agent's First Name"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage name="CompanyName" component="div" className="text-red-500 text-sm" />
                </div>
    
                <div className="flex flex-col w-1/2">
                   <label className="block text-md font-bold mb-1"> Last Name</label>
                  <Field
                    type="text"
                    name="CompanyName"
                    placeholder="Input Agent's Last Name"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage name="CompanyName" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
    
              {/* Second Row - Two Inputs */}
              <div className="flex gap-5">
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
              </div>
    
              {/* Third Row - Full Width Textarea */}
              <div className="flex flex-col">
                <label className="block text-md font-bold mb-1">Address</label>
                <Field
                  as="textarea"
                  name="address"
                  placeholder="Input Address"
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

export default AddAgent;