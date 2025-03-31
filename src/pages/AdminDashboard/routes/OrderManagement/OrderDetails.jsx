import React from "react";
import { useSelector } from "react-redux";
import Header from "../../../../shared/Section-Header/header.jsx";
import { IoIosArrowBack } from "react-icons/io";
import { StatusBadge } from "../../../../shared/Status-Badge/status-badge.jsx";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate();
  const selectedOrder = useSelector(
    (state) => state.selectedOrder.selectedOrder
  );

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Header
        title=" Order Management"
        userName="{user.name}"
        userEmail="{user.email}"
        userImage="{user.profileImage}"
      />
      <span
        onClick={handleBack}
        className="flex mt-4 justify-between w-[80px] items-center cursor-pointer ">
        <IoIosArrowBack size={24} />
        <h2 className="font-semibold text-xl">Back</h2>
      </span>

      <section className="mt-11 w-full">
        <div className="flex gap-3 items-center">
          <div className="h-[100px] w-[100px]">
            <img
              className="rounded-full"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="avatar"
            />
          </div>
          <span className="flex flex-col gap-3">
            <h2 className="font-semibold capitalize">
              {selectedOrder.customerName || "name"}
            </h2>
            <p>User Id: {selectedOrder.customerId}</p>
          </span>
        </div>

        <div className="flex flex-col md:flex-row  w-[80%] justify-between mt-8 ">
          <article className="flex gap-3 flex-col ">
            <h2 className="text-[#E86317] font-semibold text-xl  ">
              Order Title/ID
            </h2>
            <p className="font-semibold">{selectedOrder.id}</p>
          </article>
          <article className="flex flex-col md:mr-[120px] gap-3 md:items-center ">
            <h2 className="text-[#E86317] font-semibold text-xl">
              No of Items
            </h2>
            <p className="font-semibold">{selectedOrder.items.length} Items</p>
          </article>
          <article className="flex flex-col gap-3 md:items-center b">
            <h2 className="text-[#E86317] font-semibold text-xl">Amount</h2>
            <p className="font-semibold">₦{selectedOrder.totalAmount}</p>
          </article>
        </div>

        <div className="flex flex-col md:flex-row w-[80%] justify-between mt-8">
          <article className="flex gap-3 flex-col">
            <h2 className="text-[#E86317] font-semibold text-xl">
              Service Type
            </h2>
            <p className="font-semibold">{selectedOrder.serviceType}</p>
          </article>
          <article className="flex flex-col gap-3 md:items-center">
            <h2 className="text-[#E86317] font-semibold text-xl">
              Payment Channel
            </h2>
            <p className="font-semibold">{selectedOrder.items.length} Items</p>
          </article>
          <article className="flex flex-col gap-3 md:items-center">
            <h2 className="text-[#E86317] font-semibold text-xl">
              Order Status
            </h2>
            <div>
              <StatusBadge
                status={selectedOrder.orderStatus}
                variant={selectedOrder.orderStatus}
              />
            </div>
          </article>
        </div>
        <div className=" mt-8 space-y-3">
          <h2 className="text-[#E86317] font-semibold text-xl">
            Payment Status
          </h2>
          <StatusBadge
            status={selectedOrder.paymentStatus}
            variant={selectedOrder.paymentStatus}
          />
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
