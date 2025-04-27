export default function TerritorySolutionSection() {
  return (
    <div className=" absolute flex flex-col items-center gap-8 w-full top-[2250px] left-0 lg:top-[2358px] md:top-[3400px]">
      {/*Solutions in Reparv Heading  */}
      <div className="flex relative  md:mx-auto lg:mx-0  flex-col justify-center items-center p-0 gap-4 lg:w-[747px] h-[152px]">
        <div className="w-full lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold  text-[#004170] text-[28px] lg:text-[40px] leading-[48px]">
          Solutions in Reparv
        </div>

        <div className=" lg:w-[534px] h-[40px] md:h-[30px] lg:h-[28px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] text-center">
          How we overcome market challenges together
        </div>

        {/* blue line */}
        <div className="w-[100px] h-0 border-[2px]  border-[#026FBE]"></div>
      </div>
      <div className=" flex relative flex-col mx-auto w-full lg:items-center">
        {/*First Row  Cards */}
        <div className="flex flex-col p-2 lg:ml-0 lg:flex-row items-center p-0 gap-[30px] lg:w-[1134px] ">
          {/* Card 1 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]  h-[172px] lg:h-[240px] p-6 gap-6 bg-[#F0F7FF] border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full  bg-[#E0EEFE] ">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  className="mt-[-10px] ml-[-8px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.675 11.1429L6.55 8.42857L4.25 6.66667H7.1L8 4L8.9 6.66667H11.75L9.425 8.42857L10.3 11.1429L8 9.45238L5.675 11.1429ZM2 20V12.6429C1.36667 11.9762 0.875 11.2143 0.525 10.3571C0.175 9.5 0 8.5873 0 7.61905C0 5.49206 0.775 3.69048 2.325 2.21429C3.875 0.738095 5.76667 0 8 0C10.2333 0 12.125 0.738095 13.675 2.21429C15.225 3.69048 16 5.49206 16 7.61905C16 8.5873 15.825 9.5 15.475 10.3571C15.125 11.2143 14.6333 11.9762 14 12.6429V20L8 18.0952L2 20ZM8 13.3333C9.66667 13.3333 11.0833 12.7778 12.25 11.6667C13.4167 10.5556 14 9.20635 14 7.61905C14 6.03175 13.4167 4.68254 12.25 3.57143C11.0833 2.46032 9.66667 1.90476 8 1.90476C6.33333 1.90476 4.91667 2.46032 3.75 3.57143C2.58333 4.68254 2 6.03175 2 7.61905C2 9.20635 2.58333 10.5556 3.75 11.6667C4.91667 12.7778 6.33333 13.3333 8 13.3333ZM4 17.1667L8 16.1905L12 17.1667V14.2143C11.4167 14.5317 10.7875 14.7817 10.1125 14.9643C9.4375 15.1468 8.73333 15.2381 8 15.2381C7.26667 15.2381 6.5625 15.1468 5.8875 14.9643C5.2125 14.7817 4.58333 14.5317 4 14.2143V17.1667Z"
                    fill="#026FBE"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[283px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Strong Brand & Market Positioning
            </div>

            <div className="w-[310px] lg:mt-10 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Leverage Reparv's established market presence and reputation
            </div>
          </div>
          {/* Card 2 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]  h-[172px] lg:h-[240px] p-6 gap-6 bg-[#FBF8F1] border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-11px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.95 18L16.6 12.35L15.15 10.9L10.925 15.125L8.825 13.025L7.4 14.45L10.95 18ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                    fill="#C0862C"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[283px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[30px] flex-none order-1 flex-grow-0">
              Transparent & Verified Listings
            </div>
            <div className="w-[310px] lg:mt-10 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Access to thoroughly vetted property listings
            </div>
          </div>
          {/* Card 3 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]  h-[172px] lg:h-[240px] p-6 gap-6 bg-[#F0F7FF] border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0EEFE] ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.4 18L2 16.6L7.3 11.3C7.88333 10.7167 8.59167 10.425 9.425 10.425C10.2583 10.425 10.9667 10.7167 11.55 11.3L12.7 12.45C12.9 12.65 13.1375 12.75 13.4125 12.75C13.6875 12.75 13.925 12.65 14.125 12.45L18.575 8H16V6H22V12H20V9.425L15.525 13.875C14.9417 14.4583 14.2333 14.75 13.4 14.75C12.5667 14.75 11.8583 14.4583 11.275 13.875L10.1 12.7C9.91667 12.5167 9.68333 12.425 9.4 12.425C9.11667 12.425 8.88333 12.5167 8.7 12.7L3.4 18Z"
                    fill="#026FBE"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[283px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[20px] lg:leading-[36px] flex-none order-1 flex-grow-0">
              Advanced Marketing & Lead Generation
            </div>

            <div className="w-[310px] mt-5 lg:mt-10 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Cutting-edge strategies to attract qualified prospects
            </div>
          </div>
        </div>

        {/* Second Row Cards with */}

        <div className="flex mt-5 flex-col p-2 lg:ml-0 lg:flex-row items-center p-0 gap-[30px] lg:w-[1134px] ">
          {/* Card 1 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]  h-[172px] lg:h-[240px] p-6 gap-6  bg-[#FBF8F1] border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#F7EFD8]">
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM18 16V13C18 12.2667 17.7958 11.5625 17.3875 10.8875C16.9792 10.2125 16.4 9.63333 15.65 9.15C16.5 9.25 17.3 9.42083 18.05 9.6625C18.8 9.90417 19.5 10.2 20.15 10.55C20.75 10.8833 21.2083 11.2542 21.525 11.6625C21.8417 12.0708 22 12.5167 22 13V16H18ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM18 4C18 5.1 17.6083 6.04167 16.825 6.825C16.0417 7.60833 15.1 8 14 8C13.8167 8 13.5833 7.97917 13.3 7.9375C13.0167 7.89583 12.7833 7.85 12.6 7.8C13.05 7.26667 13.3958 6.675 13.6375 6.025C13.8792 5.375 14 4.7 14 4C14 3.3 13.8792 2.625 13.6375 1.975C13.3958 1.325 13.05 0.733333 12.6 0.2C12.8333 0.116667 13.0667 0.0625 13.3 0.0375C13.5333 0.0125 13.7667 0 14 0C15.1 0 16.0417 0.391667 16.825 1.175C17.6083 1.95833 18 2.9 18 4ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z"
                    fill="#C0862C"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[283px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Sales Team Training & Support
            </div>

            <div className="w-[310px] lg:mt-10 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Shortage of qualified sales professionals
            </div>
          </div>
          {/* Card 2 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]   h-[172px] lg:h-[240px] p-6 gap-6 bg-[#F0F7FF] border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full  bg-[#E0EEFE] ">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  className="mt-[-10px] ml-[-8px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.95 13.55L12.6 7.9L11.175 6.475L6.95 10.7L4.85 8.6L3.425 10.025L6.95 13.55ZM8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.73333 17.35 11.1667 16.25 12.3 14.6C13.4333 12.95 14 11.1167 14 9.1V4.375L8 2.125L2 4.375V9.1C2 11.1167 2.56667 12.95 3.7 14.6C4.83333 16.25 6.26667 17.35 8 17.9Z"
                    fill="#026FBE"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[283px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[30px] flex-none order-1 flex-grow-0">
              Verified Properties & Transparent Deals
            </div>
            <div className="w-[310px] mt-5 lg:mt-10 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Skepticism due to industry reputation problems
            </div>
          </div>
          {/* Card 3 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]  h-[172px] lg:h-[240px] p-6 gap-6 bg-[#FBF8F1]  border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-11px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V8C2 7.45 2.19583 6.97917 2.5875 6.5875C2.97917 6.19583 3.45 6 4 6H8V4C8 3.45 8.19583 2.97917 8.5875 2.5875C8.97917 2.19583 9.45 2 10 2H14C14.55 2 15.0208 2.19583 15.4125 2.5875C15.8042 2.97917 16 3.45 16 4V6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM10 6H14V4H10V6ZM6 8H4V19H6V8ZM16 19V8H8V19H16ZM18 8V19H20V8H18Z"
                    fill="#C0862C"
                  />
                </svg>
              </div>
            </div>

            <div className="lg:w-[333px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[20px] lg:leading-[36px] flex-none order-1 flex-grow-0">
              Business Growth Strategies & Expansion Support
            </div>

            <div className="w-[310px] mt-5 lg:mt-10 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium  leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Obstacles to growing business operations
            </div>
          </div>
        </div>

        {/* Third Row Cards with */}

        <div className="flex mt-5 flex-col p-2 lg:ml-0 lg:flex-row items-center p-0 gap-[30px] lg:w-[1134px] ">
          {/* Card 1 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]  h-[172px] lg:h-[240px] p-6 gap-6 bg-[#F0F7FF] border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full  bg-[#E0EEFE] ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.4 18L2 16.6L7.3 11.3C7.88333 10.7167 8.59167 10.425 9.425 10.425C10.2583 10.425 10.9667 10.7167 11.55 11.3L12.7 12.45C12.9 12.65 13.1375 12.75 13.4125 12.75C13.6875 12.75 13.925 12.65 14.125 12.45L18.575 8H16V6H22V12H20V9.425L15.525 13.875C14.9417 14.4583 14.2333 14.75 13.4 14.75C12.5667 14.75 11.8583 14.4583 11.275 13.875L10.1 12.7C9.91667 12.5167 9.68333 12.425 9.4 12.425C9.11667 12.425 8.88333 12.5167 8.7 12.7L3.4 18Z"
                    fill="#026FBE"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[283px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Lead Conversion Struggles
            </div>

            <div className="w-[310px] lg:mt-10 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Difficulty turning prospects into clients
            </div>
          </div>
          {/* Card 2 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]  h-[172px] lg:h-[240px] p-6 gap-6 bg-[#FBF8F1] border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.24922 22L8.84922 18.8C8.63255 18.7167 8.42839 18.6167 8.23672 18.5C8.04505 18.3833 7.85755 18.2583 7.67422 18.125L4.69922 19.375L1.94922 14.625L4.52422 12.675C4.50755 12.5583 4.49922 12.4458 4.49922 12.3375V11.6625C4.49922 11.5542 4.50755 11.4417 4.52422 11.325L1.94922 9.375L4.69922 4.625L7.67422 5.875C7.85755 5.74167 8.04922 5.61667 8.24922 5.5C8.44922 5.38333 8.64922 5.28333 8.84922 5.2L9.24922 2H14.7492L15.1492 5.2C15.3659 5.28333 15.5701 5.38333 15.7617 5.5C15.9534 5.61667 16.1409 5.74167 16.3242 5.875L19.2992 4.625L22.0492 9.375L19.4742 11.325C19.4909 11.4417 19.4992 11.5542 19.4992 11.6625V12.3375C19.4992 12.4458 19.4826 12.5583 19.4492 12.675L22.0242 14.625L19.2742 19.375L16.3242 18.125C16.1409 18.2583 15.9492 18.3833 15.7492 18.5C15.5492 18.6167 15.3492 18.7167 15.1492 18.8L14.7492 22H9.24922ZM10.9992 20H12.9742L13.3242 17.35C13.8409 17.2167 14.3201 17.0208 14.7617 16.7625C15.2034 16.5042 15.6076 16.1917 15.9742 15.825L18.4492 16.85L19.4242 15.15L17.2742 13.525C17.3576 13.2917 17.4159 13.0458 17.4492 12.7875C17.4826 12.5292 17.4992 12.2667 17.4992 12C17.4992 11.7333 17.4826 11.4708 17.4492 11.2125C17.4159 10.9542 17.3576 10.7083 17.2742 10.475L19.4242 8.85L18.4492 7.15L15.9742 8.2C15.6076 7.81667 15.2034 7.49583 14.7617 7.2375C14.3201 6.97917 13.8409 6.78333 13.3242 6.65L12.9992 4H11.0242L10.6742 6.65C10.1576 6.78333 9.67839 6.97917 9.23672 7.2375C8.79505 7.49583 8.39089 7.80833 8.02422 8.175L5.54922 7.15L4.57422 8.85L6.72422 10.45C6.64089 10.7 6.58255 10.95 6.54922 11.2C6.51589 11.45 6.49922 11.7167 6.49922 12C6.49922 12.2667 6.51589 12.525 6.54922 12.775C6.58255 13.025 6.64089 13.275 6.72422 13.525L4.57422 15.15L5.54922 16.85L8.02422 15.8C8.39089 16.1833 8.79505 16.5042 9.23672 16.7625C9.67839 17.0208 10.1576 17.2167 10.6742 17.35L10.9992 20ZM12.0492 15.5C13.0159 15.5 13.8409 15.1583 14.5242 14.475C15.2076 13.7917 15.5492 12.9667 15.5492 12C15.5492 11.0333 15.2076 10.2083 14.5242 9.525C13.8409 8.84167 13.0159 8.5 12.0492 8.5C11.0659 8.5 10.2367 8.84167 9.56172 9.525C8.88672 10.2083 8.54922 11.0333 8.54922 12C8.54922 12.9667 8.88672 13.7917 9.56172 14.475C10.2367 15.1583 11.0659 15.5 12.0492 15.5Z"
                    fill="#CB9A4C"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[233px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[30px] flex-none order-1 flex-grow-0">
              Technology Adaptation
            </div>
            <div className="w-[310px] lg:mt-10 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Keeping pace with digital transformation
            </div>
          </div>
          {/* Card 3 */}
          <div className="w-[340px] lg:w-[358px] md:w-[500px] sm:w-[500px]   h-[172px] lg:h-[240px] p-6 gap-6 bg-[#F0F7FF] border border-gray-200 shadow-lg rounded-br-2xl rounded-tl-none">
            <div className="w-[40px]  h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full  bg-[#E0EEFE] ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-13px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 20V14H8V20H5ZM11 20V9H14V20H11ZM17 20V4H20V20H17Z"
                    fill="#026FBE"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[283px] mt-5 h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Market Fluctuations
            </div>

            <div className="w-[310px] lg:mt-5 h-[144px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Navigating volatile market conditions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
