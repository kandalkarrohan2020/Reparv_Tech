export default function TerritoryPartnerMarketSection() {
  return (
    <div className="absolute flex flex-col items-center gap-8 w-full top-[1400px] left-0 lg:top-[1358px] md:top-[1500px]">
      {/* Market Reality Heading  */}
      <div className="flex relative  md:mx-auto lg:mx-0  flex-col justify-center items-center p-0 gap-4 lg:w-[747px] h-[152px]">
        <div className="w-full lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold text-[#004170] text-[28px] lg:text-[40px] leading-[48px]">
          Market Reality
        </div>

        <div className=" lg:w-[534px] p-2 lg:p-0 h-[40px] md:h-[30px] lg:h-[28px] text-[#999999] text-[16px] font-medium leading-[24px] text-center">
          Understanding the challenges in today's real estate market
        </div>

        {/* blue line */}
        <div className="w-[100px] h-0 border-[2px]  border-[#026FBE]"></div>
      </div>

      {/* Market Reality Cards */}
      <div className="flex relative flex-col justify-center w-full mx-auto items-center">
        {/* first row of Cards */}
        <div className="flex p-5 md:p-2 lg:p-0 lg:ml-0 flex-row w-full  overflow-x-auto overflow-y-hidden no-scrollbar lg:overflow-hidden md:w-[750px] md:mx-auto lg:w-full  lg:justify-center p-0 items-center  gap-[30px]   ">
          {/* Card 1 */}
          <div className="flex  flex-col items-start p-4 gap-4 w-full lg:w-[300px]  h-[158px] lg:h-[189px]  bg-white bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 20V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V20H1ZM19 20V17C19 16.2667 18.7958 15.5625 18.3875 14.8875C17.9792 14.2125 17.4 13.6333 16.65 13.15C17.5 13.25 18.3 13.4208 19.05 13.6625C19.8 13.9042 20.5 14.2 21.15 14.55C21.75 14.8833 22.2083 15.2542 22.525 15.6625C22.8417 16.0708 23 16.5167 23 17V20H19ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM19 8C19 9.1 18.6083 10.0417 17.825 10.825C17.0417 11.6083 16.1 12 15 12C14.8167 12 14.5833 11.9792 14.3 11.9375C14.0167 11.8958 13.7833 11.85 13.6 11.8C14.05 11.2667 14.3958 10.675 14.6375 10.025C14.8792 9.375 15 8.7 15 8C15 7.3 14.8792 6.625 14.6375 5.975C14.3958 5.325 14.05 4.73333 13.6 4.2C13.8333 4.11667 14.0667 4.0625 14.3 4.0375C14.5333 4.0125 14.7667 4 15 4C16.1 4 17.0417 4.39167 17.825 5.175C18.6083 5.95833 19 6.9 19 8ZM3 18H15V17.2C15 17.0167 14.9542 16.85 14.8625 16.7C14.7708 16.55 14.65 16.4333 14.5 16.35C13.6 15.9 12.6917 15.5625 11.775 15.3375C10.8583 15.1125 9.93333 15 9 15C8.06667 15 7.14167 15.1125 6.225 15.3375C5.30833 15.5625 4.4 15.9 3.5 16.35C3.35 16.4333 3.22917 16.55 3.1375 16.7C3.04583 16.85 3 17.0167 3 17.2V18ZM9 10C9.55 10 10.0208 9.80417 10.4125 9.4125C10.8042 9.02083 11 8.55 11 8C11 7.45 10.8042 6.97917 10.4125 6.5875C10.0208 6.19583 9.55 6 9 6C8.45 6 7.97917 6.19583 7.5875 6.5875C7.19583 6.97917 7 7.45 7 8C7 8.55 7.19583 9.02083 7.5875 9.4125C7.97917 9.80417 8.45 10 9 10Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[203px]  h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              High Competition
            </div>

            <div className="w-[310px]  lg:lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Saturated market with numerous competing players
            </div>
          </div>
          {/* card 2 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[300px] h-[158px] lg:h-[189px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[233px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Limited Customer Reach
            </div>

            <div className="w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Difficulty accessing potential buyers
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full  lg:w-[300px] h-[158px] lg:h-[189px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            {/* <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[300px] h-[158px] lg:h-[189px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]"> */}
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.85 21C12.95 21 12.1917 20.6917 11.575 20.075C10.9583 19.4583 10.65 18.7167 10.65 17.85C10.65 16.5833 11.1625 15.4375 12.1875 14.4125C13.2125 13.3875 14.4917 12.75 16.025 12.5C15.975 11.9 15.825 11.4458 15.575 11.1375C15.325 10.8292 14.9833 10.675 14.55 10.675C14.05 10.675 13.5083 10.8833 12.925 11.3C12.3417 11.7167 11.65 12.4 10.85 13.35C9.55 14.9 8.59583 15.9083 7.9875 16.375C7.37917 16.8417 6.725 17.075 6.025 17.075C5.175 17.075 4.45833 16.7583 3.875 16.125C3.29167 15.4917 3 14.725 3 13.825C3 12.925 3.19583 12.0042 3.5875 11.0625C3.97917 10.1208 4.64167 8.99167 5.575 7.675C5.89167 7.24167 6.125 6.875 6.275 6.575C6.425 6.275 6.5 6.03333 6.5 5.85C6.5 5.73333 6.47917 5.64583 6.4375 5.5875C6.39583 5.52917 6.33333 5.5 6.25 5.5C6.08333 5.5 5.875 5.60417 5.625 5.8125C5.375 6.02083 5.08333 6.34167 4.75 6.775L3 5C3.53333 4.35 4.075 3.85417 4.625 3.5125C5.175 3.17083 5.71667 3 6.25 3C7.01667 3 7.66667 3.26667 8.2 3.8C8.73333 4.33333 9 5 9 5.8C9 6.28333 8.875 6.81667 8.625 7.4C8.375 7.98333 7.95833 8.68333 7.375 9.5C6.74167 10.4 6.27083 11.1917 5.9625 11.875C5.65417 12.5583 5.5 13.1583 5.5 13.675C5.5 13.9583 5.54583 14.1792 5.6375 14.3375C5.72917 14.4958 5.85833 14.575 6.025 14.575C6.19167 14.575 6.3375 14.5292 6.4625 14.4375C6.5875 14.3458 6.81667 14.125 7.15 13.775C7.36667 13.5417 7.625 13.2542 7.925 12.9125C8.225 12.5708 8.59167 12.15 9.025 11.65C10.075 10.4 11.025 9.50833 11.875 8.975C12.725 8.44167 13.6167 8.175 14.55 8.175C15.6667 8.175 16.5833 8.55 17.3 9.3C18.0167 10.05 18.425 11.075 18.525 12.375H21V14.875H18.525C18.3917 16.7417 17.9042 18.2292 17.0625 19.3375C16.2208 20.4458 15.15 21 13.85 21ZM13.9 18.5C14.4333 18.5 14.8833 18.1958 15.25 17.5875C15.6167 16.9792 15.8667 16.1333 16 15.05C15.2333 15.2333 14.5667 15.5958 14 16.1375C13.4333 16.6792 13.15 17.2167 13.15 17.75C13.15 17.9833 13.2167 18.1667 13.35 18.3C13.4833 18.4333 13.6667 18.5 13.9 18.5Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[233px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Unorganized Market
            </div>

            <div className="w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Fragmented industry lacking standardization
            </div>
          </div>
        </div>

        {/* Second Row Cards with */}
        <div className="flex  lg:mt-5 p-5 md:p-2 lg:ml-0 w-full overflow-x-auto overflow-y-hidden no-scrollbar md:w-[750px] md:mx-auto lg:w-full flex-row lg:justify-center  items-center p-0 gap-[30px]   ">
          {/* Card 1 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[300px]  h-[158px] lg:h-[189px]  bg-white bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V8C2 7.45 2.19583 6.97917 2.5875 6.5875C2.97917 6.19583 3.45 6 4 6H8V4C8 3.45 8.19583 2.97917 8.5875 2.5875C8.97917 2.19583 9.45 2 10 2H14C14.55 2 15.0208 2.19583 15.4125 2.5875C15.8042 2.97917 16 3.45 16 4V6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM10 6H14V4H10V6ZM6 8H4V19H6V8ZM16 19V8H8V19H16ZM18 8V19H20V8H18Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[253px]   h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Lack of Skilled Sales Workforce
            </div>

            <div className="w-[310px] lg:w-[260px] md:w-[310px]  lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[20px] flex-none order-2 self-stretch flex-grow-0">
              Shortage of qualified sales professionals
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[300px] h-[158px] lg:h-[189px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C9.68333 21.4167 7.77083 20.0875 6.2625 18.0125C4.75417 15.9375 4 13.6333 4 11.1V5L12 2L20 5V11.1C20 13.6333 19.2458 15.9375 17.7375 18.0125C16.2292 20.0875 14.3167 21.4167 12 22ZM12 19.9C13.7333 19.35 15.1667 18.25 16.3 16.6C17.4333 14.95 18 13.1167 18 11.1V6.375L12 4.125L6 6.375V11.1C6 13.1167 6.56667 14.95 7.7 16.6C8.83333 18.25 10.2667 19.35 12 19.9Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[203px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Customer Trust Issues
            </div>

            <div className="w-[310px] lg:w-[250px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Skepticism due to industry reputation problems
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[300px] h-[158px] lg:h-[189px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
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
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[293px] lg:w-[200px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Scalability Challenges
            </div>

            <div className="w-[310px] lg:w-[260px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Obstacles to growing business operations
            </div>
          </div>
        </div>

        {/* Third row of Cards */}
        <div className="flex  lg:mt-5  p-5 md:p-2 lg:ml-0 w-full overflow-x-auto overflow-y-hidden no-scrollbar md:w-[750px] md:mx-auto lg:w-full flex-row lg:justify-center items-center p-0 gap-[30px]   ">
          {/* Card 1 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full  lg:w-[300px] h-[158px] lg:h-[189px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0011 20C10.7177 20 10.4802 19.9042 10.2886 19.7125C10.0969 19.5208 10.0011 19.2833 10.0011 19V13L4.20106 5.6C3.95106 5.26667 3.91356 4.91667 4.08856 4.55C4.26356 4.18333 4.56772 4 5.00106 4H19.0011C19.4344 4 19.7386 4.18333 19.9136 4.55C20.0886 4.91667 20.0511 5.26667 19.8011 5.6L14.0011 13V19C14.0011 19.2833 13.9052 19.5208 13.7136 19.7125C13.5219 19.9042 13.2844 20 13.0011 20H11.0011ZM12.0011 12.3L16.9511 6H7.05106L12.0011 12.3Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[293px] lg:w-[260px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Lead Conversion Struggles
            </div>

            <div className="w-[310px] lg:w-[260px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Difficulty turning prospects into clients
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full  lg:w-[300px] h-[158px] lg:h-[189px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 23C6.45 23 5.97917 22.8042 5.5875 22.4125C5.19583 22.0208 5 21.55 5 21V3C5 2.45 5.19583 1.97917 5.5875 1.5875C5.97917 1.19583 6.45 1 7 1H17C17.55 1 18.0208 1.19583 18.4125 1.5875C18.8042 1.97917 19 2.45 19 3V21C19 21.55 18.8042 22.0208 18.4125 22.4125C18.0208 22.8042 17.55 23 17 23H7ZM7 20V21H17V20H7ZM7 18H17V6H7V18ZM7 4H17V3H7V4Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[293px] lg:w-[230px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Technology Adaptation
            </div>
            <div className="w-[310px] lg:w-[260px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Keeping pace with digital transformation
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full  lg:w-[300px] h-[158px] lg:h-[189px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-5 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-10px] ml-[-11px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 20V14H8V20H5ZM11 20V9H14V20H11ZM17 20V4H20V20H17Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[233px] lg:w-[160px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Market Fluctuations
            </div>

            <div className="w-[310px] lg:w-[260px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Navigating volatile market conditions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
