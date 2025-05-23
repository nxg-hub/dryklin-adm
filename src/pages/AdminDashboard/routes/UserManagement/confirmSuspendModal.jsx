import { useState } from "react";
import { X } from "lucide-react"; // Close button icon
import FeedbackModal from "../../../../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../../redux/UserSlice";

const ConfirmSuspendModal = ({onClose, back}) => {
      const [isLoading, setIsLoading] = useState (false)
      const dispatch = useDispatch();
      const selectedUser = useSelector((state) => state.user.selectedUser);
      const [modalConfig, setModalConfig] = useState({
                show: false,
                type: "success",
                title: "",
                description: "",
            });
      const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
        

  const handleSuspend = async () => {
    setIsLoading(true)

    const token = localStorage.getItem("token");

     try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/${selectedUser?.id}/suspend`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,

          },
          body: JSON.stringify(selectedUser?.id)
        });
  
        const result = await response.text();
        console.log (result)
    
  if (response.ok) {
    setModalConfig({
      show: true,
      type: "success",
      title: "User suspended",
      description:"You have been successfully suspended this user.",
      redirectPath: "/dashboard/users"
  });
 dispatch(fetchUser());

  

  } else {
  setModalConfig({
      show: true,
      type: "error",
      title: "Action failed",
      description: result.message || "Failed to suspend user.",
      redirectPath: onClose,
  });
  }
  } catch (err) {
  const errorMessage = err.result?.data?.message;
  console.log(err)
  
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
<div className="fixed inset-0 flex items-center justify-center border-2 border-[#a0a0a0] bg-black/40 overflow-y-auto p-4 z-[1000]">
            
<div className=" relative bg-white p-8 rounded-[7%] shadow-lg w-[500px] max-h-[200%] overflow-y-auto min-h-[400px] lg:min-h-[400px]">
             <button
          className="absolute top-3 border border-gray-700  rounded-full p-2 right-2 text-gray-700 hover:text-red-500"
          onClick={onClose}
        >
          <X size={25} />
        </button>
        <div className="flex items-center justify-center">

        <div className="flex items-center justify-center mt-10 text-red-600 font-bold text-2xl">
Suspend User
    </div>
    </div>
    <div className="mt-5 flex items-center  text-lg text-gray-500 justify-center">Are you sure you want to suspend this account? This action cannot be undone.</div>
    <button     className="bg-red-600 text-white text-2xl font-bold px-5 mt-7 py-2 rounded-lg w-full hover:bg-[#c74e10] transition flex items-center justify-center"
    onClick={handleSuspend}
    disabled={isLoading}>

                  {isLoading ? 'Please wait...' : 'Proceed'}</button>

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
    )
}


export default ConfirmSuspendModal;