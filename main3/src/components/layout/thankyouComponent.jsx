import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

export default function ThankYouComponent({ show }) {
  const [myshow, setShow] = useState(show);

  return (
    <Dialog className="" open={show}>
      {" "}
      <DialogContent className="bg-gradient-to-r from-[#076300] via-[#0BB501] to-[#0BB501] border-none  [&>button]:hidden">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col items-center p-0 gap-6 w-full lg:w-[450px] h-[164px] flex-none order-0 grow-0 ">
          {/* Vector (White Circle) */}
          <div className="w-14 h-14 bg-white  rounded-full text-[#076300] flex-none order-0 grow-0">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              stroke="#2ECD24"
              fill="#2ECD24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 56C12.5361 56 0 43.4638 0 28C0 12.5363 12.5363 0 28 0C43.4638 0 56 12.5363 56 28C56 43.4638 43.4638 56 28 56ZM17.8682 29.0411C17.0619 28.2856 15.7964 28.3268 15.0411 29.1325C14.2856 29.9381 14.3261 31.2042 15.1325 31.9596L23.1319 39.4596C23.9913 40.2646 25.3564 40.1571 26.0791 39.228L40.0787 21.228C40.7567 20.3568 40.5998 19.0998 39.7279 18.4218C38.8559 17.7437 37.5996 17.9007 36.9216 18.7726L24.2682 35.0414L17.8682 29.0411Z"
                fill="#2ECD24"
              />
            </svg>
          </div>

          <div className="flex flex-col items-center p-0 gap-3 lg:w-[450px] h-[84px] flex-none order-1 self-stretch grow-0">
            {/* Thank you for registering! */}
            <h2 className="lg:w-[500px] h-[44px] font-inter font-semibold text-[24px] lg:text-[36px] leading-[44px] text-white text-center flex-none order-0 self-stretch grow-0">
              Thank you for registering!
            </h2>
            {/* Text */}
            <p className="lg:w-[450px] h-[28px] font-inter font-normal text-[16px] lg:text-[20px] leading-[28px] text-white text-center flex-none order-1 self-stretch grow-0">
              We're excited to have you on board!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
