import { useState } from "react";
import { X } from "lucide-react"; // Close button icon
import { FaCheck } from "react-icons/fa";




const DeactivateModal = ({onClose, back}) => {

  

  
    
  
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

        <div className="flex items-center justify-center w-30 h-30 rounded-full border-2 border-green-600 bg-green-100">
      <FaCheck  size={70} className="text-green-200 text-sm" />
    </div>
    </div>
    <div className="mt-5 flex items-center text-[#E85C19] text-2xl font-bold justify-center">User Account Deactivated Successfully</div>
    <div className="mt-5 flex items-center  text-lg text-gray-500 justify-center">You have successfully deactivated this account</div>
    <button     className="bg-[#E85C19] text-white text-2xl font-bold px-5 mt-7 py-2 rounded-lg w-full hover:bg-[#c74e10] transition flex items-center justify-center"
    onClick={back}>Proceed</button>

        </div>
</div>
    )
}


export default DeactivateModal;