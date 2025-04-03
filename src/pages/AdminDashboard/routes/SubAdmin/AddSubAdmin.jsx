import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { X } from "lucide-react"; // Close button icon
import FeedbackModal from "../../../../components/modal";

const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
const ADD_AGENT_URL = import.meta.env.VITE_ADD_AGENT;

const AddSubAdmin = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);


  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log("Form values:", values); // Debugging

    const fullName = values.fullName || "";
    const [firstName = "", lastName = ""] = fullName.trim().split(" ");

    // Reconstruct fullName before sending to the backend
    const requestBody = {
      fullName: `${values.firstName} ${values.lastName}`.trim(),
      email: values.email,
      phoneNumber: values.phoneNumber,
      location: values.location,
    };
    console.log("Request Body:", requestBody);

    try {
      const response = await fetch(`${API_BASE_URL}${ADD_AGENT_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setModalConfig({
          show: true,
          type: "success",
          title: "Delivery Agent Added",
          description:
            response.message ||
            "You have been successfully added a new delivery agent.",
          redirectPath: "/dashboard/users",
        });
        setTimeout(() => {
          onClose();
        }, 2000);

      } else {
        setModalConfig({
          show: true,
          type: "error",
          title: "Action failed",
          description: response.message || "Failed to add delivery agent.",
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
            firstName: "",
            lastName: "",
            phoneNumber: "",
            location: "",
          }}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* First Row - Two Inputs */}
              <div className="flex gap-5">
                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">
                    {" "}
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Input Agent's First Name"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label className="block text-md font-bold mb-1">
                    {" "}
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Input Agent's Last Name"
                    className="w-full p-3 border border-gray-600 rounded-lg"
                  />
                  <ErrorMessage
                    name="lastName"
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
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Third Row - Full Width Textarea */}
              <div className="flex flex-col">
                <label className="block text-md font-bold mb-1">Address</label>
                <Field
                  as="textarea"
                  name="location"
                  placeholder="Input Address"
                  className="w-full p-3 border border-gray-600 rounded-lg min-h-[120px] resize-none"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
