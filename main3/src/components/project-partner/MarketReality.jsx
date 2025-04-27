export default function MarketReality() {
  return (
    <div className="absolute flex flex-col justify-between items-center p-0 gap-8  w-full  h-[518px]  top-[1100px] lg:top-[1358px]">
      {/* Market Reality Heading  */}
      <div className="flex relative md:mx-auto lg:mx-0  flex-col justify-center items-center p-0 gap-4 lg:w-[747px] h-[152px]">
        <div className="w-full lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold text-[#076300] text-[28px] lg:text-[40px] leading-[48px]">
          Market Reality
        </div>

        <div className="p-2 sm:p-5 sm:w-[450px] lg:w-[534px] h-[78px] text-[#999999] text-[16px] font-medium leading-[24px] text-center">
          The current real estate market faces significant challenges that
          impact investors and businesses.
        </div>

        {/* green line */}
        <div className="w-[100px] h-0 border-[2px]  border-[#0BB501]"></div>
      </div>
      <div className="flex relative flex-col mx-auto w-full items-center">
        {/* Cards */}
        <div className="flex flex-col p-2 lg:ml-0 lg:flex-row items-center  p-0 gap-[30px] lg:w-[1134px] ">
          <div className="block  grid grid-rows-2 gap-5  sm:block sm:grid sm:grid-rows-2 sm:gap-5  md:flex lg:flex lg:gap-8 md:gap-5">
            {/* Card 1 */}
            <div className="flex flex-col items-start p-4 gap-4  lg:w-[358px]   h-[280px]  bg-white bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
              <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
                <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                  <svg
                    width="20"
                    height="12"
                    className="ml-[-8px] mt-[-6px]"
                    viewBox="0 0 20 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 12V10H16.6L11.4 4.85L7.4 8.85L0 1.4L1.4 0L7.4 6L11.4 2L18 8.6V6H20V12H14Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>

              <div className="w-full  h-[36px] text-black text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
                Unorganized Market
              </div>

              <div className="w-[310px] h-[144px] text-[#999999] text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
                Unorganized real estate market is plagued by inconsistent
                pricing, lack of regulatory enforcement, fraudulent dealings,
                and complex legal procedures, making property transactions risky
                and challenging for buyers and investors.
              </div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-start p-4 gap-4 lg:w-[358px] h-[280px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
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

              <div className="w-full  h-[36px] text-black text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
                Lack of Transparency
              </div>

              <div className="w-[310px] h-[144px] text-[#999999] text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
                A lack of transparency in the real estate business leads to
                hidden costs, unclear property titles, misleading information,
                and fraudulent dealings, making it difficult for buyers and
                investors to make informed decisions.
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 gap-4 lg:w-[358px] h-[280px] bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                <svg
                  width="20"
                  height="12"
                  className="mt-[-6px] ml-[-12px]"
                  viewBox="0 0 20 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.4 12L0 10.6L5.3 5.3C5.88333 4.71667 6.59167 4.425 7.425 4.425C8.25833 4.425 8.96667 4.71667 9.55 5.3L10.7 6.45C10.9 6.65 11.1375 6.75 11.4125 6.75C11.6875 6.75 11.925 6.65 12.125 6.45L16.575 2H14V0H20V6H18V3.425L13.525 7.875C12.9417 8.45833 12.2333 8.75 11.4 8.75C10.5667 8.75 9.85833 8.45833 9.275 7.875L8.1 6.7C7.91667 6.51667 7.68333 6.425 7.4 6.425C7.11667 6.425 6.88333 6.51667 6.7 6.7L1.4 12Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full h-[36px] text-black text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Scalability Challenges
            </div>

            <div className="w-[310px] h-[144px] text-[#999999] text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Scalability challenges in the real estate business arise due to
              high capital requirements, market fluctuations, and the difficulty
              of standardizing operations across different locations..
            </div>
          </div>
        </div>

        {/* Second Row Cards with */}
        <div className=" flex flex-col p-2 lg:ml-0 lg:flex-row items-center md:mt-5 lg:mt-10  gap-[30px] lg:w-[746px] h-[300px]">
          <div className="block  grid grid-rows-2 gap-5  sm:block sm:grid sm:grid-rows-2 sm:gap-5  md:flex lg:flex lg:gap-8 md:gap-5">
            <div className="flex flex-col items-start p-4 gap-[16px] lg:w-[358px] h-[280px] bg-white border border-[rgba(0,0,0,0.1)] shadow-[0px_6px_16px_rgba(0,0,0,0.125)] rounded-[0px_12px_12px_12px]">
              {/* Icon */}
              <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
                <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                  <svg
                    width="22"
                    height="22"
                    className="mt-[-10px] ml-[-11px]"
                    viewBox="0 0 24 24"
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

              <div className="w-[229px] h-[36px] font-inter font-medium text-[24px] leading-[150%] text-black flex-none order-1 flex-grow-0">
                No Customer Reach
              </div>

              <div className="w-[310px] h-[120px] font-inter font-medium text-[16px] leading-[150%] text-[rgba(0,0,0,0.4)] flex-none order-2 align-self-stretch flex-grow-0">
                Many real estate businesses struggle to reach potential buyers
                due to ineffective marketing, weak digital presence, and a lack
                of strong networks, resulting in low sales and missed
                opportunities.
              </div>
            </div>

            <div className="flex flex-col items-start p-4 gap-[16px] lg:w-[358px] h-[280px] bg-white border border-[rgba(0,0,0,0.1)] shadow-[0px_6px_16px_rgba(0,0,0,0.125)] rounded-[0px_12px_12px_12px]">
              {/* Icon 2 */}
              <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
                <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#E0E5EB]">
                  <svg
                    width="22"
                    height="22"
                    className="mt-[-10px] ml-[-10px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_656_120)">
                      <path
                        d="M12.5 11.95C12.9833 11.4167 13.3542 10.8083 13.6125 10.125C13.8708 9.44167 14 8.73333 14 8C14 7.26667 13.8708 6.55833 13.6125 5.875C13.3542 5.19167 12.9833 4.58333 12.5 4.05C13.5 4.18333 14.3333 4.625 15 5.375C15.6667 6.125 16 7 16 8C16 9 15.6667 9.875 15 10.625C14.3333 11.375 13.5 11.8167 12.5 11.95ZM18 20V17C18 16.4 17.8667 15.8292 17.6 15.2875C17.3333 14.7458 16.9833 14.2667 16.55 13.85C17.4 14.15 18.1875 14.5375 18.9125 15.0125C19.6375 15.4875 20 16.15 20 17V20H18ZM24 11H18V9H24V11ZM8 12C6.9 12 5.95833 11.6083 5.175 10.825C4.39167 10.0417 4 9.1 4 8C4 6.9 4.39167 5.95833 5.175 5.175C5.95833 4.39167 6.9 4 8 4C9.1 4 10.0417 4.39167 10.825 5.175C11.6083 5.95833 12 6.9 12 8C12 9.1 11.6083 10.0417 10.825 10.825C10.0417 11.6083 9.1 12 8 12ZM0 20V17.2C0 16.6333 0.145833 16.1125 0.4375 15.6375C0.729167 15.1625 1.11667 14.8 1.6 14.55C2.63333 14.0333 3.68333 13.6458 4.75 13.3875C5.81667 13.1292 6.9 13 8 13C9.1 13 10.1833 13.1292 11.25 13.3875C12.3167 13.6458 13.3667 14.0333 14.4 14.55C14.8833 14.8 15.2708 15.1625 15.5625 15.6375C15.8542 16.1125 16 16.6333 16 17.2V20H0ZM8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM2 18H14V17.2C14 17.0167 13.9542 16.85 13.8625 16.7C13.7708 16.55 13.65 16.4333 13.5 16.35C12.6 15.9 11.6917 15.5625 10.775 15.3375C9.85833 15.1125 8.93333 15 8 15C7.06667 15 6.14167 15.1125 5.225 15.3375C4.30833 15.5625 3.4 15.9 2.5 16.35C2.35 16.4333 2.22917 16.55 2.1375 16.7C2.04583 16.85 2 17.0167 2 17.2V18Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_656_120">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="w-full  h-[36px] font-inter font-medium text-[24px] leading-[150%] text-black flex-none order-1 flex-grow-0">
                No Skilled Sales Workforce
              </div>

              <div className="w-[310px] h-[144px] font-inter font-medium text-[16px] leading-[150%] text-[rgba(0,0,0,0.4)] flex-none order-2 align-self-stretch flex-grow-0">
                The real estate industry often faces a shortage of a skilled
                sales workforce, leading to poor client handling, ineffective
                deal closures, and lost opportunities, ultimately affecting
                revenue and customer trust.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
