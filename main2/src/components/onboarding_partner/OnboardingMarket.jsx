export default function OnboardingMarketReality() {
  return (
    <div className="absolute flex flex-col justify-between items-center p-0 gap-8  w-full  h-[518px] md:mt-5 top-[1100px]  lg:top-[1080px]">
      {/* Onboarding Market Reality Title  */}
      <div className="flex relative md:mx-auto lg:mx-0  flex-col justify-center items-center p-0 gap-4 lg:w-[747px] h-[152px]">
        <div className="w-full lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold text-[#1E1E1E] text-[28px] lg:text-[40px] leading-[48px]">
          Market Reality
        </div>

        <div className="p-2 lg:w-[614px] h-[60px] md:h-[30px] lg:h-[43px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] text-center">
          The challenges that onboarding partners typically face in the real
          estate market
        </div>

        {/* Orange line */}
        <div className="w-[100px] h-0 border-[2px]  border-[#1E1E1E]"></div>
      </div>
      <div className="flex relative flex-col mx-auto w-full items-center">
        {/* first row of Cards */}
        <div className="flex flex-col p-2 lg:ml-0 lg:flex-row w-full sm:w-[500px] md:w-[500px] items-center p-0 gap-[30px] lg:w-[1134px] ">
          {/* Card 1 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] h-[158px] lg:h-[239px]  bg-white bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                <svg
                  width="23"
                  height="23"
                  className="mt-[-12px] ml-[-12px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 21L12 2L23 21H1ZM4.45 19H19.55L12 6L4.45 19ZM12 18C12.2833 18 12.5208 17.9042 12.7125 17.7125C12.9042 17.5208 13 17.2833 13 17C13 16.7167 12.9042 16.4792 12.7125 16.2875C12.5208 16.0958 12.2833 16 12 16C11.7167 16 11.4792 16.0958 11.2875 16.2875C11.0958 16.4792 11 16.7167 11 17C11 17.2833 11.0958 17.5208 11.2875 17.7125C11.4792 17.9042 11.7167 18 12 18ZM11 15H13V10H11V15Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full  h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Property Owner Trust Issues
            </div>

            <div className="w-[310px] lg:lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Owners hesitate to list properties due to concerns about
              transparency, hidden costs, or unfair deals.
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] h-[158px] lg:h-[239px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
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

            <div className="w-[233px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Limited Property Visibility
            </div>

            <div className="w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Many listings fail to reach the right buyers due to poor marketing
              or low platform reach.
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] h-[158px] lg:h-[239px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3 16.7L16.7 15.3L13 11.6V7H11V12.4L15.3 16.7ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="lg:w-[233px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Delayed Sales & Earnings
            </div>

            <div className="lg:w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Onboarding partners often face long sales cycles, delaying their
              commission payouts.
            </div>
          </div>
        </div>

        {/* Second Row Cards with */}
        <div className="flex mt-5 flex-col p-2 lg:ml-0 lg:flex-row w-full sm:w-[500px] md:w-[500px] items-center p-0 gap-[30px] lg:w-[1134px] ">
          {/* Card 1 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] h-[158px] lg:h-[239px]  bg-white bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 20.5V17.7C1 17.1333 1.14583 16.6125 1.4375 16.1375C1.72917 15.6625 2.11667 15.3 2.6 15.05C3.63333 14.5333 4.68333 14.1458 5.75 13.8875C6.81667 13.6292 7.9 13.5 9 13.5C10.1 13.5 11.1833 13.6292 12.25 13.8875C13.3167 14.1458 14.3667 14.5333 15.4 15.05C15.8833 15.3 16.2708 15.6625 16.5625 16.1375C16.8542 16.6125 17 17.1333 17 17.7V20.5H1ZM19 20.5V17.5C19 16.7667 18.7958 16.0625 18.3875 15.3875C17.9792 14.7125 17.4 14.1333 16.65 13.65C17.5 13.75 18.3 13.9208 19.05 14.1625C19.8 14.4042 20.5 14.7 21.15 15.05C21.75 15.3833 22.2083 15.7542 22.525 16.1625C22.8417 16.5708 23 17.0167 23 17.5V20.5H19ZM9 12.5C7.9 12.5 6.95833 12.1083 6.175 11.325C5.39167 10.5417 5 9.6 5 8.5C5 7.4 5.39167 6.45833 6.175 5.675C6.95833 4.89167 7.9 4.5 9 4.5C10.1 4.5 11.0417 4.89167 11.825 5.675C12.6083 6.45833 13 7.4 13 8.5C13 9.6 12.6083 10.5417 11.825 11.325C11.0417 12.1083 10.1 12.5 9 12.5ZM19 8.5C19 9.6 18.6083 10.5417 17.825 11.325C17.0417 12.1083 16.1 12.5 15 12.5C14.8167 12.5 14.5833 12.4792 14.3 12.4375C14.0167 12.3958 13.7833 12.35 13.6 12.3C14.05 11.7667 14.3958 11.175 14.6375 10.525C14.8792 9.875 15 9.2 15 8.5C15 7.8 14.8792 7.125 14.6375 6.475C14.3958 5.825 14.05 5.23333 13.6 4.7C13.8333 4.61667 14.0667 4.5625 14.3 4.5375C14.5333 4.5125 14.7667 4.5 15 4.5C16.1 4.5 17.0417 4.89167 17.825 5.675C18.6083 6.45833 19 7.4 19 8.5ZM3 18.5H15V17.7C15 17.5167 14.9542 17.35 14.8625 17.2C14.7708 17.05 14.65 16.9333 14.5 16.85C13.6 16.4 12.6917 16.0625 11.775 15.8375C10.8583 15.6125 9.93333 15.5 9 15.5C8.06667 15.5 7.14167 15.6125 6.225 15.8375C5.30833 16.0625 4.4 16.4 3.5 16.85C3.35 16.9333 3.22917 17.05 3.1375 17.2C3.04583 17.35 3 17.5167 3 17.7V18.5ZM9 10.5C9.55 10.5 10.0208 10.3042 10.4125 9.9125C10.8042 9.52083 11 9.05 11 8.5C11 7.95 10.8042 7.47917 10.4125 7.0875C10.0208 6.69583 9.55 6.5 9 6.5C8.45 6.5 7.97917 6.69583 7.5875 7.0875C7.19583 7.47917 7 7.95 7 8.5C7 9.05 7.19583 9.52083 7.5875 9.9125C7.97917 10.3042 8.45 10.5 9 10.5Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full lg:w-[243px]  h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Competition & Market Saturation
            </div>

            <div className="w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              High competition makes it challenging to secure exclusive property
              listings.
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] h-[158px] lg:h-[239px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.95 18L16.6 12.35L15.15 10.9L10.925 15.125L8.825 13.025L7.4 14.45L10.95 18ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Verification & Documentation Hassles
            </div>

            <div className="w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Ensuring property authenticity and managing paperwork can be
              time-consuming.
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] h-[158px] lg:h-[239px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.725 21L7 14V12H10.5C11.3833 12 12.1458 11.7125 12.7875 11.1375C13.4292 10.5625 13.8167 9.85 13.95 9H6V7H13.65C13.3667 6.41667 12.9458 5.9375 12.3875 5.5625C11.8292 5.1875 11.2 5 10.5 5H6V3H18V5H14.75C14.9833 5.28333 15.1917 5.59167 15.375 5.925C15.5583 6.25833 15.7 6.61667 15.8 7H18V9H15.975C15.8417 10.4167 15.2583 11.6042 14.225 12.5625C13.1917 13.5208 11.95 14 10.5 14H9.775L16.5 21H13.725Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Unclear Earning Potential
            </div>

            <div className="lg:w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Many platforms lack structured incentive programs, making earnings
              unpredictable.
            </div>
          </div>
        </div>

        {/* Third row of Cards */}
        <div className="flex mt-5 flex-col p-2 lg:ml-0 lg:flex-row  justify-center items-center p-0 w-full sm:w-[500px] md:w-[500px] gap-[30px] lg:w-[1134px] ">
          <div className="flex flex-col items-start p-4 gap-4 w-full sm:w-[490px] lg:w-[358px] h-[158px] lg:h-[239px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 16C7.28333 16 8.04583 16.0875 8.7875 16.2625C9.52917 16.4375 10.2667 16.7 11 17.05V7.2C10.3167 6.8 9.59167 6.5 8.825 6.3C8.05833 6.1 7.28333 6 6.5 6C5.9 6 5.30417 6.05833 4.7125 6.175C4.12083 6.29167 3.55 6.46667 3 6.7V16.6C3.58333 16.4 4.1625 16.25 4.7375 16.15C5.3125 16.05 5.9 16 6.5 16ZM13 17.05C13.7333 16.7 14.4708 16.4375 15.2125 16.2625C15.9542 16.0875 16.7167 16 17.5 16C18.1 16 18.6875 16.05 19.2625 16.15C19.8375 16.25 20.4167 16.4 21 16.6V6.7C20.45 6.46667 19.8792 6.29167 19.2875 6.175C18.6958 6.05833 18.1 6 17.5 6C16.7167 6 15.9417 6.1 15.175 6.3C14.4083 6.5 13.6833 6.8 13 7.2V17.05ZM12 20C11.2 19.3667 10.3333 18.875 9.4 18.525C8.46667 18.175 7.5 18 6.5 18C5.8 18 5.1125 18.0917 4.4375 18.275C3.7625 18.4583 3.11667 18.7167 2.5 19.05C2.15 19.2333 1.8125 19.225 1.4875 19.025C1.1625 18.825 1 18.5333 1 18.15V6.1C1 5.91667 1.04583 5.74167 1.1375 5.575C1.22917 5.40833 1.36667 5.28333 1.55 5.2C2.31667 4.8 3.11667 4.5 3.95 4.3C4.78333 4.1 5.63333 4 6.5 4C7.46667 4 8.4125 4.125 9.3375 4.375C10.2625 4.625 11.15 5 12 5.5C12.85 5 13.7375 4.625 14.6625 4.375C15.5875 4.125 16.5333 4 17.5 4C18.3667 4 19.2167 4.1 20.05 4.3C20.8833 4.5 21.6833 4.8 22.45 5.2C22.6333 5.28333 22.7708 5.40833 22.8625 5.575C22.9542 5.74167 23 5.91667 23 6.1V18.15C23 18.5333 22.8375 18.825 22.5125 19.025C22.1875 19.225 21.85 19.2333 21.5 19.05C20.8833 18.7167 20.2375 18.4583 19.5625 18.275C18.8875 18.0917 18.2 18 17.5 18C16.5 18 15.5333 18.175 14.6 18.525C13.6667 18.875 12.8 19.3667 12 20Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Lack of Training & Support
            </div>

            <div className="lg:w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Onboarding partners may struggle without proper guidance on
              listing optimization and client handling.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
