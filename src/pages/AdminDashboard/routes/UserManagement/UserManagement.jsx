// import React, { useState }from "react";
// import {  FaSearch } from 'react-icons/fa';

// import { DataTable } from "../../../../shared/Table/data-table";
// const UserManagement = () => {
//   const [activeSection, setActiveSection] = useState(null);

//   const handleClick = (section) => {
//     setActiveSection(section);
//   };


//   const userData = [
//     {
//       customer: "Chinedu Okafor",
//       id: "0081727",
//       email: "olivia@untitledui.com",
//       contact: "09162577076",
//       balance: "$18,000",
//     },
//   ]
//   const usersColumns = [
//     { key: "customer", title: "Customer Name" },
//     { key: "id", title: "Customer ID No" },
//     { key: "email", title: "Email address" },
//     { key: "contact", title: "Contact Number" },
//     { key: "balance", title: "Wallet Balance" },
    
//   ]
//   const servicePartnersData = [
//     {
//       company: "Kaothar Wash",
//       id: "0081727",
//       email: "olivia@untitledui.com",
//       contactPerson: "Buba Kaothar",
//       contact: "08173957359",
//     },
    
//   ]
 
//   const SPColumns = [
//     { key: "company", title: "Name of Company" },
//     { key: "id", title: " ID No." },
//     { key: "email", title: "Email address" },
//     { key: "contactPerson", title: "Contact Person's Name" },
//     { key: "contact", title: "Contact Number" },
//      ]

//      const DeliveryAgentsData = [
//       {
//         name: "Omobolanle Dende",
//         id: "0081727",
//         email: "olivia@untitledui.com",
//         contact: "08173957359",
//       },
      
//     ]
//     const DAColumns = [
//       { key: "name", title: "Agent's Name" },
//       { key: "id", title: "Agent's ID No." },
//       { key: "email", title: "Email address" },
//       { key: "contact", title: "Contact Number" },
//        ]
  
// return (
//     <div className="container mx-auto py-6 px-4">

//       <div className="font-bold text-3xl">User Management</div>

//       <div className="flex border border-gray-400 rounded-md relative mt-15 bottom-[0px] w-[70%]  md:w-[30%] ">
//             <input
//               type="text"
//               // onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search here"
//               className="text-md text-gray-500  py-2 px-8 
//                 shadow-md cursor-pointer w-full"
//             />
//             <FaSearch color="#E85C13" className="absolute left-2  mt-3 text-lightBlue font-bold" />
//           </div>
//       <div className="container mx-auto mb-2 ml-3 flex mt-20 gap-10 text-gray-600">
      
//       {/* Section 1 */}
//       <div className="group">
//       <div className="cursor-pointer" onClick={() => handleClick("customers")}>
//     <h1
//       className={`relative text-lg  transition-colors duration-500
//         ${activeSection === "customers" ? "text-[#E85C13]" : "text-gray-600"}
//       `}
//     >
//       Customers
//       <span
//         className={`absolute left-0 right-0 top-8 h-[1px] bg-[#E85C13] transition-all duration-500
//           ${activeSection === "customers" ? "w-full" : "w-0"}
//         `}
//       />
//     </h1>
//   </div>
//       </div>
  
//       {/* Section 2 */}
//       <div className="group">
//       <h1 className="relative group-hover:before:w-[120%] before:w-0 before:h-[3px] before:bg-red-500 before:absolute before:top-0 before:left-0 before:transition-all before:duration-300">
//       Service Partners
//         </h1>
//       </div>
  
//       {/* Section 3 */}
//       <div className="group">
//       <h1 className="relative group-hover:before:w-[95%] before:w-0 before:h-[3px] before:bg-red-500 before:absolute before:top-0 before:left-0 before:transition-all before:duration-300">
//       Delivery Agents
//         </h1>
//       </div>
//     </div>

//       <div className="relative w-4/4 mx-auto">
//     <div className="w-full h-0.5 bg-gray-100 " ></div>
    

//   </div>

//       {/* Recent Orders */}
//       <div className="mt-5 mb-8">
        
//         <DataTable
//           columns={usersColumns}
//           // showFooter={true}
//           showFooter={false}
//           data={userData}
//           actionColumn={{
//             title: "",
//             render: (row) => (
//               <a href="#" className="text-[#e86317] text-sm hover:underline">
//                 View Details
//               </a>
//             ),
//           }}
//           onRowClick={(row) => console.log("Row clicked:", row)}
//         />
//       </div>

//      pictures, conditionally render add button, add modal, view details page
      
    
//   );
// }


// export default UserManagement;



import { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { DataTable } from "../../../../shared/Table/data-table";
import AddServicePartner from "./AddServicePartner";
import AddAgent from "./AddAgent";

const UserManagement = () => {
  const [activeSection, setActiveSection] = useState("customers");
  const [isAddSPModalOpen, setIsAddSPModalOpen] = useState('')
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState('')

  const handleClick = (section) => {
    setActiveSection(section);
  };
  const handleAddSPClick = () => {
    setIsAddSPModalOpen(true)
  }
  const handleAddAgentClick = () => {
    setIsAddAgentModalOpen(true)
  }

  // Define column and data mappings
  const columnsMap = {
    customers: [
      {
        key: "customer",
        title: "Customer Name",
        render: (row) => {
          console.log("Row data:", row); // This should show the full object, including image
          return (
            <div className="flex items-center gap-3">
              <img
                src={row.image}
                alt={row.customer}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
                onError={(e) => (e.target.src = "https://i.pravatar.cc/40")} // Fallback image
              />
              <span className="text-gray-700 font-medium">{row.customer}</span>
            </div>
          );
        }
        },  { key: "id", title: "Customer ID No" },
      { key: "email", title: "Email address" },
      { key: "contact", title: "Contact Number" },
      { key: "balance", title: "Wallet Balance" },
    ],
    servicePartners: [
      { key: "company", title: "Name of Company" },
      { key: "id", title: "ID No." },
      { key: "email", title: "Email address" },
      { key: "contactPerson", title: "Contact Person's Name" },
      { key: "contact", title: "Contact Number" },
    ],
    deliveryAgents: [
      { key: "name", title: "Agent's Name" },
      { key: "id", title: "Agent's ID No." },
      { key: "email", title: "Email address" },
      { key: "contact", title: "Contact Number" },
    ],
  };

  const dataMap = {
    customers: [
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000",     image: "https://i.pravatar.cc/40", // Placeholder image URL
      },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000", image: "https://images.pexels.com/photos/30277093/pexels-photo-30277093/free-photo-of-portrait-of-woman-with-cherry-blossoms-in-spring.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      { customer: "Chinedu Okafor", id: "0081727", email: "olivia@untitledui.com", contact: "09156389367", balance: "$20,000", image: "https://images.pexels.com/photos/30277093/pexels-photo-30277093/free-photo-of-portrait-of-woman-with-cherry-blossoms-in-spring.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },

    ],
    servicePartners: [
      { company: "Kaothar Wash", id: "0081727", email: "orlando@untitledui.com", contactPerson: "Buba Kaothar", contact: "08134567890" },
      { company: "Kaothar Wash", id: "0081727", email: "orlando@untitledui.com", contactPerson: "Buba Kaothar", contact: "08134567890" },
      { company: "Kaothar Wash", id: "0081727", email: "orlando@untitledui.com", contactPerson: "Buba Kaothar", contact: "08134567890" },
      { company: "Kaothar Wash", id: "0081727", email: "orlando@untitledui.com", contactPerson: "Buba Kaothar", contact: "08134567890" },

    ],
    deliveryAgents: [
      { name: "Omobolanle Dende", id: "0081727", email: "olivia@untitledui.com", contact: "09134234562" },
      { name: "Omobolanle Dende", id: "0081727", email: "olivia@untitledui.com", contact: "09134234562" },
      { name: "Omobolanle Dende", id: "0081727", email: "olivia@untitledui.com", contact: "09134234562" },

    ],
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="font-bold text-3xl">User Management</div>

      {/* Search Input */}
      <div className="relative flex flex-col">
      <div className="flex border border-gray-400 rounded-md relative mt-4 w-[70%] md:w-[30%]">
        <input type="text" placeholder="Search here" className="text-md text-gray-500 py-2 px-8 shadow-md cursor-pointer w-full" />
        <FaSearch color="#E85C13" className="absolute left-2 mt-3 text-lightBlue font-bold" />
      </div>
      {activeSection !== "customers" && (
        <button     className="bg-[#E85C19] text-white px-15 mt-3 py-5 rounded-lg absolute right-10 hover:bg-[#c74e10] transition flex items-center gap-2"

        onClick={activeSection === "servicePartners" ? handleAddSPClick : handleAddAgentClick}
>
        <FaPlus size={20} />
                    {activeSection === "servicePartners" ? "Add Service Partner" : "Add Delivery Agent"}
          </button>
        )}
  </div>

      {/* Section Tabs */}
      <div className="container mx-auto mb-2 ml-3 flex mt-10 gap-10 text-gray-600">
        {["customers", "servicePartners", "deliveryAgents"].map((section) => (
          <div key={section} className="group cursor-pointer" onClick={() => handleClick(section)}>
            <h1 className={`relative text-lg transition-colors duration-500 ${activeSection === section ? "text-[#E85C13]" : "text-gray-600"}`}>
              {section.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              <span className={`absolute left-0 right-0 top-8 h-[1px] bg-[#E85C13] transition-all duration-500 ${activeSection === section ? "w-full" : "w-0"}`} />
            </h1>
          </div>
        ))}
        {isAddSPModalOpen && (
        <AddServicePartner
          isOpen={isAddSPModalOpen}
          onClose={() => setIsAddSPModalOpen(false)}
        />
      )}
      {isAddAgentModalOpen && (
        <AddAgent
          isOpen={isAddAgentModalOpen}
          onClose={() => setIsAddAgentModalOpen(false)}
        />
      )}
      </div>

      <div className="relative w-full mx-auto">
        <div className="w-full h-0.5 bg-gray-100"></div>
      </div>

      {/* Data Table */}
      <div className="mt-5 mb-8">
        <DataTable
          columns={columnsMap[activeSection]}
          data={dataMap[activeSection]}
          actionColumn={{
            title: "",
            render: (row) => (
              <a href="#" className="text-[#e86317] text-sm hover:underline">
                View Details
              </a>
            ),
          }}
          onRowClick={(row) => console.log("Row clicked:", row)}
        />
      </div>
    </div>
  );
};

export default UserManagement;
