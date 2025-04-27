import MobilebackgroundImg from "/src/assets/salesmobile.png";
import backgroundImage from "../../assets/saleshero.png";

export default function SalesHeroSection() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formSection = document.getElementById("salespartnerjoin");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="max-w-full flex flex-col m-0 p-0">
      <div className="flex flex-col lg:flex-row p-[24px_16px] lg:p-20 items-center gap-[57.16px] absolute w-full h-[390px]  top-[63px] lg:top-[134px]">
        {/* Image part */}
        <div className=" hidden lg:flex flex-col items-start p-0 w-[539.42px] h-[390.1px] rounded-[8.57358px] flex-none order-0 flex-grow-1">
          <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="w-[539.42px] h-[390.1px] bg-cover  rounded-lg flex-none order-0 self-stretch flex-grow-0"
          ></div>
        </div>

        <div className="flex flex-col  justify-center items-start p-0 gap-[57px] w-full lg:w-[539.42px] h-[299px] flex-none order-1 flex-grow-1">
          {/* Text Container */}
          <div className="flex flex-col items-start p-0 gap-[16px] lg:w-[539.42px] h-[184px] flex-none order-0 self-stretch flex-grow-0">
            {/* Title */}
            <h1 className="lg:w-[539.42px] mx-auto h-[58px] lg:h-[96px] font-inter font-semibold text-[24px] sm:text-[30px] md:text-[35px] lg:text-[40px] leading-[29px] lg:leading-[48px] text-[#076300] flex-none order-0 self-stretch flex-grow-0">
              Be a Trusted Partner in Real Estate Success!
            </h1>

            {/* Paragraph */}
            <p className="lg:w-[509.42px]  lg:mx-0 md:mx-auto md:w-[600px]  h-[54px] lg:h-[72px] font-inter font-medium text-[12px] sm:text-[16px] md:text-[16px] lg:text-[16px] leading-[150%] text-[#00000066] flex-none order-1 self-stretch flex-grow-0">
              Join Reparv as a trusted sales partner to build credibility, earn
              ethically, and help investors find the perfect properties with
              transparency and success.
            </p>
          </div>
          {/* Mobile screen Image */}
          <div
            style={{ backgroundImage: `url(${MobilebackgroundImg})` }}
            className=" lg:hidden   transform sm:-translate-x-1/2 sm:w-[600px]  sm:-translate-y-1/2 md:-translate-x-1/2 md:-translate-y-1/2 sm:left-1/2 sm:top-1/2 md:left-1/2  absolute  w-full left-0 lg:w-[358px] h-[258px] items-center md:w-[500px]  top-[205px] sm:top-[330px] md:top-[330px] bg-cover bg-center"
          ></div>

          {/* Button */}
          <div className="relative lg:static top-[200px] hover:shadow-lg  focus:shadow-lg active:shadow-lg  flex flex-row lg:mx-0  mx-auto justify-center items-center py-[14px] px-[24px] gap-[10px] w-[169px] lg:w-[237px] h-[48px] lg:h-[58px] bg-[#2ECD24] rounded-[8px] flex-none order-1 flex-grow-0">
            {/* Register Now */}
            <button
              onClick={handleScrollToForm}
              className=" w-[105px] h-[24px] text-[16px] leading-[24px] lg:w-[155px] lg:h-[29px] font-inter font-semibold lg:text-[24px] lg:leading-[29px] text-center text-[#FFFFFF] flex-none order-0 flex-grow-0"
            >
              Register Now
            </button>

            {/* Arrow Icon */}
            <div className="w-[24px] h-[24px] flex-none order-1 flex-grow-0">
              {/* Vector Icon, you can replace it with an actual icon component or image */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5781 18.5L13.1781 17.05L16.7281 13.5H4.57812V11.5H16.7281L13.1781 7.95L14.5781 6.5L20.5781 12.5L14.5781 18.5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Partner Section */}
      <div className="absolute w-full lg:w-[1113px] h-[412px] lg:left-[calc(50%-1113px/2+0.5px)] top-[624px] bg-white flex flex-col items-center gap-6 p-0">
        <div className="flex flex-col items-center gap-4 lg:w-[747px] h-[175px]">
          {/* Title */}
          <div className="lg:w-[456px] h-[48px] font-semibold text-[28px] lg:text-[40px] leading-[48px] text-center text-[#076300]">
            <h1>Who is a Sales Partner?</h1>
          </div>

          {/* Paragraph */}
          <div className="w-full md:w-[600px]  md:mx-auto lg:w-[627px] h-[140px] lg:h-[95px] font-medium  px-5 text-[16px] leading-[19px] lg:text-center  text-black/40 self-stretch grow-0">
            <p>
              A Reparv Sales Partner is an independent professional who directly
              connects with customers, understands their needs, and recommends
              the best available properties. They guide clients through the
              entire buying journey—from selection to final possession—ensuring
              a smooth and trustworthy experience. In return, they earn high
              guaranteed commissions for every successful deal.
            </p>
          </div>

          {/* green line */}
          <div className="w-[100px] mt-15 lg:mt-5 h-[0px] border-[2px] border-[#2ECD24]"></div>
        </div>

        {/* Cards */}
        <div className="flex  w-full mt-30 lg:mt-0 flex-col lg:flex-row md:w-[500px] items-center   p-2 gap-8 lg:w-[1113px] h-[213px]">
          {/* Flex for mobile */}
          <div className="flex  p-2 items-center sm:w-full md:w-full w-[358px] gap-[16px] lg:w-full">
            {/* Card 1 */}
            <div className="flex flex-col  justify-center items-center p-2 gap-2 lg:gap-4 w-full lg:w-[343px] sm:w-[350px] md:w-[350px] h-[194px] border border-[#D1D1D1] rounded-r-[12px]">
              <div className="relative w-[40px] h-[40px] rounded-full p-5 lg:p-0 mt-1 lg:mt-0 bg-[#E0E5EB]  ">
                {/* Icons */}
                <div className="absolute w-[24px] h-[24px] left-[8px] top-[8px] ">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 12C11.4 12 10.4583 11.6083 9.675 10.825C8.89167 10.0417 8.5 9.1 8.5 8C8.5 6.9 8.89167 5.95833 9.675 5.175C10.4583 4.39167 11.4 4 12.5 4C13.6 4 14.5417 4.39167 15.325 5.175C16.1083 5.95833 16.5 6.9 16.5 8C16.5 9.1 16.1083 10.0417 15.325 10.825C14.5417 11.6083 13.6 12 12.5 12ZM4.5 20V17.2C4.5 16.6333 4.64583 16.1125 4.9375 15.6375C5.22917 15.1625 5.61667 14.8 6.1 14.55C7.13333 14.0333 8.18333 13.6458 9.25 13.3875C10.3167 13.1292 11.4 13 12.5 13C13.6 13 14.6833 13.1292 15.75 13.3875C16.8167 13.6458 17.8667 14.0333 18.9 14.55C19.3833 14.8 19.7708 15.1625 20.0625 15.6375C20.3542 16.1125 20.5 16.6333 20.5 17.2V20H4.5ZM6.5 18H18.5V17.2C18.5 17.0167 18.4542 16.85 18.3625 16.7C18.2708 16.55 18.15 16.4333 18 16.35C17.1 15.9 16.1917 15.5625 15.275 15.3375C14.3583 15.1125 13.4333 15 12.5 15C11.5667 15 10.6417 15.1125 9.725 15.3375C8.80833 15.5625 7.9 15.9 7 16.35C6.85 16.4333 6.72917 16.55 6.6375 16.7C6.54583 16.85 6.5 17.0167 6.5 17.2V18ZM12.5 10C13.05 10 13.5208 9.80417 13.9125 9.4125C14.3042 9.02083 14.5 8.55 14.5 8C14.5 7.45 14.3042 6.97917 13.9125 6.5875C13.5208 6.19583 13.05 6 12.5 6C11.95 6 11.4792 6.19583 11.0875 6.5875C10.6958 6.97917 10.5 7.45 10.5 8C10.5 8.55 10.6958 9.02083 11.0875 9.4125C11.4792 9.80417 11.95 10 12.5 10Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>

              <div className=" text-[16px] lg:text-[24px] leading-[36px] font-inter font-medium text-black flex-none order-0 grow-0">
                Connect
              </div>
              <div className="lg:w-[295px] font-inter font-medium  text-[12px] lg:text-[16px] leading-[15px] lg:leading-[19px] text-black/40 flex-none order-1 grow-0 text-center">
                Directly engage with potential buyers and understand their
                property needs
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col justify-center items-center p-2 gap-2 lg:gap-4 w-full lg:w-[343px] h-[194px] sm:w-[350px] md:w-[350px] border border-[#D1D1D1] rounded-r-[12px]">
              <div className="relative w-[40px] h-[40px]  rounded-full p-5 lg:p-0 mt-[-5px] lg:mt-0 bg-[#E0E5EB]  ">
                {/* Icons */}
                <div className="absolute  absolute w-[24px] h-[24px] left-[8px]   top-[8px] ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>

              <div className=" text-[16px] lg:text-[24px] leading-[36px] font-inter font-medium text-black flex-none order-0 grow-0">
                Guide
              </div>
              <div className=" lg:w-[295px] font-inter  mx-0  font-medium text-[12px] lg:text-[16px] leading-[15px] lg:leading-[19px] text-black/40 flex-none order-1 grow-0 text-center">
                Support clients through the entire property buying process with
                expertise
              </div>
            </div>
          </div>
          <div className="flex lg:ml-[-25px] lg:items-start lg:justify-start mx-auto justify-center items-center sm:w-full md:w-full w-[171px] gap-[16px] lg:w-full">
            {/* Card 3 */}
            <div className="flex flex-col justify-center items-center p-2 gap-2 lg:gap-4 w-full lg:w-[343px] sm:w-[350px] md:w-[350px] h-[194px] border border-[#D1D1D1] rounded-r-[12px]">
              <div className="relative w-[40px] h-[40px]  rounded-full p-5 lg:p-0 mt-[-5px] lg:mt-0 bg-[#E0E5EB]  ">
                {/* Icons */}
                <div className="absolute  absolute w-[24px] h-[24px] left-[8px]   top-[8px] ">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.725 21.5L7 14.5V12.5H10.5C11.3833 12.5 12.1458 12.2125 12.7875 11.6375C13.4292 11.0625 13.8167 10.35 13.95 9.5H6V7.5H13.65C13.3667 6.91667 12.9458 6.4375 12.3875 6.0625C11.8292 5.6875 11.2 5.5 10.5 5.5H6V3.5H18V5.5H14.75C14.9833 5.78333 15.1917 6.09167 15.375 6.425C15.5583 6.75833 15.7 7.11667 15.8 7.5H18V9.5H15.975C15.8417 10.9167 15.2583 12.1042 14.225 13.0625C13.1917 14.0208 11.95 14.5 10.5 14.5H9.775L16.5 21.5H13.725Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>

              <div className=" text-[16px] lg:text-[24px] leading-[36px] font-inter font-medium text-black flex-none order-0 grow-0">
                Earn
              </div>
              <div className="  lg:w-[295px] font-inter  mx-0  font-medium text-[12px] lg:text-[16px] leading-[15px] lg:leading-[19px] text-black/40 flex-none order-1 grow-0 text-center">
                Receive high guaranteed commissions for each successful property
                deal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
