import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { X } from "lucide-react"; // Close button icon
import FeedbackModal from "../../../../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { AddSubadminSchema } from "../UserManagement/schema/AddSubadminSchema";
import { fetchSubAdmins } from "../../../../redux/Sub-adminSlice";

const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
const ADD_SUB_ADMIN_URL = import.meta.env.VITE_ADD_SUB_ADMIN;

const AddSubAdmin = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();



  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log("Form values:", values); 


    const fullName = values.name || "";
    const [firstName = "", lastName = ""] = fullName.trim().split(" ");
  
    
    const requestBody = {
      firstName,
      lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      confirmPassword: values.confirmPassword,
      dryKlinUserName: values.dryKlinUserName,
      userType: 'SUB_ADMIN',
      countryCode: ''
};
    console.log("Request Body:", requestBody);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}${ADD_SUB_ADMIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setModalConfig({
          show: true,
          type: "success",
          title: "Sub-admin account created sucessfully.",
          description:
            response.message ||
            "You have successfully added a new sub-admin. They will get an email with their login credentials.",
          redirectPath: "/dashboard/users",
        });
        setTimeout(() => {
          onClose();
        }, 2000);
       dispatch(fetchSubAdmins());
      } else {
        setModalConfig({
          show: true,
          type: "error",
          title: "Action failed",
          description: response.message || "Failed to add sub-admin.",
          redirectPath: onClose,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred. Please try again later.";

      setModalConfig({
        show: true,
        type: "error",
        title: "Error",
        description: errorMessage,
        redirectPath: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center border-2 border-[#a0a0a0] rounded-md overflow-y-auto p-4 z-50">
      <div className="relative bg-white p-11 rounded-[3%] shadow-lg w-[1100px] max-h-[120%] overflow-y-auto">
        <button
          className="absolute top-3 border border-gray-700  rounded-full p-2 right-2 text-gray-700 hover:text-red-500"
          onClick={onClose}>
          <X size={25} />
        </button>
        <h2 className="text-xl text-[#E85C19] font-semibold mb-4">
          Add New Sub-Admin
        </h2>

        <Formik
          initialValues={{
            email: "",
            name: "",
            dryKlinUserName: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
          }}
          validationSchema={AddSubadminSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* First Row - Two Inputs */}
              <div className="flex gap-5">
                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Input Full Name"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="dryKlinUserName"
                    placeholder="Input username"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage
                    name="dryKlinUserName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Second Row - Two Inputs */}
              <div className="flex gap-5">
                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Input Email Address"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Third Row - Full Width Textarea */}
              <div className="flex gap-5">
              <div className="flex flex-col w-1/2">         
                     <label className="block text-md font-bold mb-1">Create Password</label>
                <Field
                  type="text"
                  name="password"
                  placeholder="Input Password"
                  className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col w-1/2">         
                <label className="block text-md font-bold mb-1">Re-enter Password</label>
                <Field
                  type="text"
                  name="confirmPassword"
                  placeholder="Re-enter Password"
                  className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#E85C19] flex justify-end text-white px-15 mt-3 py-5 rounded-lg hover:bg-[#c74e10] transition "
                  disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {modalConfig.show && (
        <FeedbackModal
          type={modalConfig.type}
          title={modalConfig.title}
          description={modalConfig.description}
          buttonText={modalConfig.type === "success" ? "Continue" : "Try Again"}
          redirectPath={modalConfig.redirectPath}
          onClose={closeModal}
          onButtonClick={modalConfig.type === "success" ? null : closeModal}
          primaryColor="#E85C13"
        />
      )}
    </div>
  );
};

export default AddSubAdmin;
