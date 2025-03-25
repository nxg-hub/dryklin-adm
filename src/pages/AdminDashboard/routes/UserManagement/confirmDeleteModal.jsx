import { useState } from "react";
import { X } from "lucide-react"; // Close button icon
import DeleteModal from "./deleteModal";
import { FaCheck } from "react-icons/fa";




const ConfirmDeleteModal = ({onClose, back}) => {
       const [isDeleteModalOpen, setIsDeleteModalOpen] = useState('')

  const handleDelete = () => {
    setIsDeleteModalOpen (true)
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
Delete Permanently
    </div>
    </div>
    <div className="mt-5 flex items-center  text-lg text-gray-500 justify-center">Are you sure you want to permanently delete this account? This action cannot be undone.</div>
    <button     className="bg-red-600 text-white text-2xl font-bold px-5 mt-7 py-2 rounded-lg w-full hover:bg-[#c74e10] transition flex items-center justify-center"
    onClick={handleDelete}>Proceed</button>

        </div>
        {isDeleteModalOpen && (
            <DeleteModal
            isOpen= {isDeleteModalOpen}
            onClose= {()  => setIsDeleteModalOpen(false)}
            back={back}

            />
        )}
</div>
    )
}


export default ConfirmDeleteModal;