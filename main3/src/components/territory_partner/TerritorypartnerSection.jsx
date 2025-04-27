export default function TerritoryPartnerSection() {
  return (
    <div className="max-w-full">
      <div className="absolute   md:top-[850px] w-full h-[700px] lg:h-[636px] top-[650px] lg:top-[660px] flex flex-col items-start gap-[20px] lg:gap-[24px] p-0">
        <p className=" w-full mx-auto lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold text-[#004170] text-[28px] lg:text-[40px] leading-[48px]">
          Who is a Territory Partner?
        </p>

        {/*blue line */}
        <div className="w-[100px] mx-auto  h-0 border-2  border-[#026FBE]"></div>

        <div className="w-full mx-auto lg:gap-[0px] lg:mt-10 item-center flex flex-col lg:flex-row">
          {/* Text content */}

          <div className="flex md:mx-auto flex-col  md:justify-center lg:justify-center items-start gap-6 md:h-[200px] lg:w-[463px] h-[300px] lg:h-[270px]">
            {/* Heading */}
            <div className="w-full lg:w-[387px] h-[36px] font-semibold text-2xl text-center text-black">
              A Role of Responsibility & Growth
            </div>

            {/* Paragraph */}
            <div className="p-3 w-full  md:mx-auto md:w-[600px] lg:w-[533px] h-[210px] font-medium text-[16px] lg:text-[20px] text-gray-600">
              A Territory Partner at Reparv is a responsible leader assigned to
              manage and grow real estate sales in a specific region. They
              oversee the sales team provided by Reparv, ensure effective
              execution of marketing strategies, and drive business expansion
              while maintaining trust and transparency in property investments.
            </div>
          </div>

          {/* Boxes */}

          <div className="flex flex-col  min-h-screen w-full p-1 lg:p-0 lg:gap-[24px] lg:w-[633px] ">
            {/* Row 1 */}
            <div className="flex flex-row items-center justify-center gap-[24px] lg:w-[573px] sm:w-full lg:h-[204px] ">
              {/* box 1 */}
              <div className="w-[170px] md:w-[350px] lg:w-[261px] sm:w-[200px] h-[133.85px] lg:h-[204px] bg-[#F0F7FF] rounded-lg border flex flex-col">
                <div className="w-[40px] mt-3 p-2 md:ml-15 rounded-full ml-3 lg:ml-0 lg:ml-6 bg-[#E0EEFE] h-[40px] flex-none order-0 flex-grow-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z"
                      fill="#026FBE"
                    />
                  </svg>
                </div>
                <div className="mx-auto block">
                  <div className=" ml-3 lg:ml-0 lg:ml-0 lg:mt-3 h-[36px] font-inter font-medium text-[16px] lg:text-[24px] leading-[150%] text-black flex-none order-1 flex-grow-0">
                    Regional Leadership
                  </div>
                  <div className="lg:w-[220px] ml-3 lg:ml-0 lg:mt-2 mx-auto h-[48px] font-inter font-medium text-[12px] lg:text-[16px] leading-[150%] text-[#666666] flex-none order-2 self-stretch flex-grow-0">
                    Lead operations in your assigned territory
                  </div>
                </div>
              </div>
              {/* box2 */}
              <div className="w-[170px] md:w-[350px] lg:w-[261px] sm:w-[200px] h-[133.85px] lg:h-[204px] bg-[#FBF8F1] rounded-lg border flex flex-col">
                <div className="w-[40px] mt-3 p-2 md:ml-15 rounded-full ml-3 lg:ml-0 lg:ml-6  bg-[#F7EFD8] h-[40px] flex-none order-0 flex-grow-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 20V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V20H1ZM19 20V17C19 16.2667 18.7958 15.5625 18.3875 14.8875C17.9792 14.2125 17.4 13.6333 16.65 13.15C17.5 13.25 18.3 13.4208 19.05 13.6625C19.8 13.9042 20.5 14.2 21.15 14.55C21.75 14.8833 22.2083 15.2542 22.525 15.6625C22.8417 16.0708 23 16.5167 23 17V20H19ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM19 8C19 9.1 18.6083 10.0417 17.825 10.825C17.0417 11.6083 16.1 12 15 12C14.8167 12 14.5833 11.9792 14.3 11.9375C14.0167 11.8958 13.7833 11.85 13.6 11.8C14.05 11.2667 14.3958 10.675 14.6375 10.025C14.8792 9.375 15 8.7 15 8C15 7.3 14.8792 6.625 14.6375 5.975C14.3958 5.325 14.05 4.73333 13.6 4.2C13.8333 4.11667 14.0667 4.0625 14.3 4.0375C14.5333 4.0125 14.7667 4 15 4C16.1 4 17.0417 4.39167 17.825 5.175C18.6083 5.95833 19 6.9 19 8ZM3 18H15V17.2C15 17.0167 14.9542 16.85 14.8625 16.7C14.7708 16.55 14.65 16.4333 14.5 16.35C13.6 15.9 12.6917 15.5625 11.775 15.3375C10.8583 15.1125 9.93333 15 9 15C8.06667 15 7.14167 15.1125 6.225 15.3375C5.30833 15.5625 4.4 15.9 3.5 16.35C3.35 16.4333 3.22917 16.55 3.1375 16.7C3.04583 16.85 3 17.0167 3 17.2V18ZM9 10C9.55 10 10.0208 9.80417 10.4125 9.4125C10.8042 9.02083 11 8.55 11 8C11 7.45 10.8042 6.97917 10.4125 6.5875C10.0208 6.19583 9.55 6 9 6C8.45 6 7.97917 6.19583 7.5875 6.5875C7.19583 6.97917 7 7.45 7 8C7 8.55 7.19583 9.02083 7.5875 9.4125C7.97917 9.80417 8.45 10 9 10Z"
                      fill="#C0862C"
                    />
                  </svg>
                </div>
                <div className="mx-auto block">
                  <div className=" ml-3 lg:ml-0 lg:ml-0 lg:mt-3 h-[36px] font-inter font-medium text-[16px] lg:text-[24px] leading-[150%] text-black flex-none order-1 flex-grow-0">
                    Team Management
                  </div>
                  <div className="lg:w-[220px] ml-3 lg:ml-0 lg:mt-2 mx-auto h-[48px] font-inter font-medium text-[12px] lg:text-[16px] leading-[150%] text-[#666666] flex-none order-2 self-stretch flex-grow-0">
                    Guide the sales team provided by Reparv
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-row items-center justify-center gap-[24px] sm:w-full lg:w-[573px] h-[204px] ">
              {/* box1 */}
              <div className="w-[170px] md:w-[350px] lg:w-[261px] sm:w-[200px] h-[133.85px] lg:h-[204px] bg-[#F0F7FF] rounded-lg border flex flex-col">
                <div className="w-[40px] mt-3 p-2 md:ml-15 rounded-full ml-3 lg:ml-0 lg:ml-6 bg-[#E0EEFE] h-[40px] flex-none order-0 flex-grow-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM12 18C10.3333 18 8.91667 17.4167 7.75 16.25C6.58333 15.0833 6 13.6667 6 12C6 10.3333 6.58333 8.91667 7.75 7.75C8.91667 6.58333 10.3333 6 12 6C13.6667 6 15.0833 6.58333 16.25 7.75C17.4167 8.91667 18 10.3333 18 12C18 13.6667 17.4167 15.0833 16.25 16.25C15.0833 17.4167 13.6667 18 12 18ZM12 16C13.1 16 14.0417 15.6083 14.825 14.825C15.6083 14.0417 16 13.1 16 12C16 10.9 15.6083 9.95833 14.825 9.175C14.0417 8.39167 13.1 8 12 8C10.9 8 9.95833 8.39167 9.175 9.175C8.39167 9.95833 8 10.9 8 12C8 13.1 8.39167 14.0417 9.175 14.825C9.95833 15.6083 10.9 16 12 16ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14Z"
                      fill="#026FBE"
                    />
                  </svg>
                </div>
                <div className="mx-auto block">
                  <div className="mx-auto ml-3 lg:ml-0 lg:ml-0 lg:mt-3 h-[36px] font-inter font-medium text-[16px] lg:text-[24px] leading-[150%] text-black flex-none order-1 flex-grow-0">
                    Strategy Execution
                  </div>
                  <div className="lg:w-[220px] ml-3 lg:ml-0 lg:mt-2 mx-auto h-[48px] font-inter font-medium text-[12px] lg:text-[16px] leading-[150%] text-[#666666] flex-none order-2 self-stretch flex-grow-0">
                    Implement effective marketing strategies
                  </div>
                </div>
              </div>
              {/* box2 */}
              <div className="w-[170px] md:w-[350px] lg:w-[261px] sm:w-[200px] h-[133.85px] lg:h-[204px] bg-[#FBF8F1] rounded-lg border flex flex-col">
                <div className="w-[40px] mt-3 p-2 md:ml-15 rounded-full ml-3 lg:ml-0 lg:ml-6 bg-[#F7EFD8] h-[40px] flex-none order-0 flex-grow-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.4 18L2 16.6L7.3 11.3C7.88333 10.7167 8.59167 10.425 9.425 10.425C10.2583 10.425 10.9667 10.7167 11.55 11.3L12.7 12.45C12.9 12.65 13.1375 12.75 13.4125 12.75C13.6875 12.75 13.925 12.65 14.125 12.45L18.575 8H16V6H22V12H20V9.425L15.525 13.875C14.9417 14.4583 14.2333 14.75 13.4 14.75C12.5667 14.75 11.8583 14.4583 11.275 13.875L10.1 12.7C9.91667 12.5167 9.68333 12.425 9.4 12.425C9.11667 12.425 8.88333 12.5167 8.7 12.7L3.4 18Z"
                      fill="#C0862C"
                    />
                  </svg>
                </div>
                <div className="mx-auto block">
                  <div className=" ml-3 lg:ml-0 lg:ml-0 lg:mt-3 h-[36px] font-inter font-medium text-[16px] lg:text-[24px] leading-[150%] text-black flex-none order-1 flex-grow-0">
                    Business Growth
                  </div>
                  <div className="lg:w-[220px] ml-3 lg:ml-0 lg:mt-2 mx-auto h-[48px] font-inter font-medium text-[12px] lg:text-[16px] leading-[150%] text-[#666666] flex-none order-2 self-stretch flex-grow-0">
                    Drive expansion and increase market share
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
