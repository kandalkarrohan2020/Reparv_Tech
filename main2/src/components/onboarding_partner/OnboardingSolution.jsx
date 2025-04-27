export default function OnboardingSolutionSection() {
  return (
    <div className="absolute flex flex-col justify-between items-center p-0 gap-8  w-full  h-[518px]  top-[2600px]  lg:top-[2100px]">
      {/* Onboarding Market Reality Title  */}
      <div className="flex relative md:mx-auto lg:mx-0  flex-col justify-center items-center p-0 gap-4 lg:w-[747px] h-[152px]">
        <div className="w-full lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold text-[#1E1E1E] text-[28px] lg:text-[40px] leading-[48px]">
          Solution in Reparv
        </div>

        <div className="p-2 lg:w-[614px] h-[60px] lg:h-[48px] text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] text-center">
          How Reparv addresses these challenges and creates opportunities for
          onboarding partners
        </div>

        {/* Orange line */}
        <div className="w-[100px] h-0 border-[2px]  border-[#1E1E1E]"></div>
      </div>
      {/* Solution Cards */}
      <div className=" flex relative flex-col mx-auto w-full items-center">
        {/* first row of Cards */}
        <div className="flex flex-col p-2 lg:ml-0 lg:flex-row items-center  sm:w-[500px] md:w-[500px] p-0 gap-[30px] lg:w-[1134px] ">
          {/* Card 1 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] md:w-[500px] md:ml-2 h-[158px] lg:h-[239px]  bg-white bg-white border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#DBDBDB] hover:bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C9.68333 21.4167 7.77083 20.0875 6.2625 18.0125C4.75417 15.9375 4 13.6333 4 11.1V5L12 2L20 5V11.1C20 13.6333 19.2458 15.9375 17.7375 18.0125C16.2292 20.0875 14.3167 21.4167 12 22ZM12 19.9C13.7333 19.35 15.1667 18.25 16.3 16.6C17.4333 14.95 18 13.1167 18 11.1V6.375L12 4.125L6 6.375V11.1C6 13.1167 6.56667 14.95 7.7 16.6C8.83333 18.25 10.2667 19.35 12 19.9Z"
                    fill=" #1E1E1E"
                  />
                </svg>
              </div>
            </div>

            <div className="lg:w-[303px]  h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Building Trust with Property Owners
            </div>

            <div className="w-full lg:w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Reparv ensures a transparent listing process with fair deals,
              clear terms, and no hidden costs.
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] md:w-[500px] md:mx-auto h-[158px] lg:h-[239px] bg-white hover:bg-[#FBF8F1] active:bg-[#FBF8F1] border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#DBDBDB] hover:bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C10.6333 22 9.34167 21.7375 8.125 21.2125C6.90833 20.6875 5.84583 19.9708 4.9375 19.0625C4.02917 18.1542 3.3125 17.0917 2.7875 15.875C2.2625 14.6583 2 13.3667 2 12C2 10.6167 2.2625 9.32083 2.7875 8.1125C3.3125 6.90417 4.02917 5.84583 4.9375 4.9375C5.84583 4.02917 6.90833 3.3125 8.125 2.7875C9.34167 2.2625 10.6333 2 12 2C13.3833 2 14.6792 2.2625 15.8875 2.7875C17.0958 3.3125 18.1542 4.02917 19.0625 4.9375C19.9708 5.84583 20.6875 6.90417 21.2125 8.1125C21.7375 9.32083 22 10.6167 22 12C22 13.3667 21.7375 14.6583 21.2125 15.875C20.6875 17.0917 19.9708 18.1542 19.0625 19.0625C18.1542 19.9708 17.0958 20.6875 15.8875 21.2125C14.6792 21.7375 13.3833 22 12 22ZM12 19.95C12.4333 19.35 12.8083 18.725 13.125 18.075C13.4417 17.425 13.7 16.7333 13.9 16H10.1C10.3 16.7333 10.5583 17.425 10.875 18.075C11.1917 18.725 11.5667 19.35 12 19.95ZM9.4 19.55C9.1 19 8.8375 18.4292 8.6125 17.8375C8.3875 17.2458 8.2 16.6333 8.05 16H5.1C5.58333 16.8333 6.1875 17.5583 6.9125 18.175C7.6375 18.7917 8.46667 19.25 9.4 19.55ZM14.6 19.55C15.5333 19.25 16.3625 18.7917 17.0875 18.175C17.8125 17.5583 18.4167 16.8333 18.9 16H15.95C15.8 16.6333 15.6125 17.2458 15.3875 17.8375C15.1625 18.4292 14.9 19 14.6 19.55ZM4.25 14H7.65C7.6 13.6667 7.5625 13.3375 7.5375 13.0125C7.5125 12.6875 7.5 12.35 7.5 12C7.5 11.65 7.5125 11.3125 7.5375 10.9875C7.5625 10.6625 7.6 10.3333 7.65 10H4.25C4.16667 10.3333 4.10417 10.6625 4.0625 10.9875C4.02083 11.3125 4 11.65 4 12C4 12.35 4.02083 12.6875 4.0625 13.0125C4.10417 13.3375 4.16667 13.6667 4.25 14ZM9.65 14H14.35C14.4 13.6667 14.4375 13.3375 14.4625 13.0125C14.4875 12.6875 14.5 12.35 14.5 12C14.5 11.65 14.4875 11.3125 14.4625 10.9875C14.4375 10.6625 14.4 10.3333 14.35 10H9.65C9.6 10.3333 9.5625 10.6625 9.5375 10.9875C9.5125 11.3125 9.5 11.65 9.5 12C9.5 12.35 9.5125 12.6875 9.5375 13.0125C9.5625 13.3375 9.6 13.6667 9.65 14ZM16.35 14H19.75C19.8333 13.6667 19.8958 13.3375 19.9375 13.0125C19.9792 12.6875 20 12.35 20 12C20 11.65 19.9792 11.3125 19.9375 10.9875C19.8958 10.6625 19.8333 10.3333 19.75 10H16.35C16.4 10.3333 16.4375 10.6625 16.4625 10.9875C16.4875 11.3125 16.5 11.65 16.5 12C16.5 12.35 16.4875 12.6875 16.4625 13.0125C16.4375 13.3375 16.4 13.6667 16.35 14ZM15.95 8H18.9C18.4167 7.16667 17.8125 6.44167 17.0875 5.825C16.3625 5.20833 15.5333 4.75 14.6 4.45C14.9 5 15.1625 5.57083 15.3875 6.1625C15.6125 6.75417 15.8 7.36667 15.95 8ZM10.1 8H13.9C13.7 7.26667 13.4417 6.575 13.125 5.925C12.8083 5.275 12.4333 4.65 12 4.05C11.5667 4.65 11.1917 5.275 10.875 5.925C10.5583 6.575 10.3 7.26667 10.1 8ZM5.1 8H8.05C8.2 7.36667 8.3875 6.75417 8.6125 6.1625C8.8375 5.57083 9.1 5 9.4 4.45C8.46667 4.75 7.6375 5.20833 6.9125 5.825C6.1875 6.44167 5.58333 7.16667 5.1 8Z"
                    fill=" #1E1E1E"
                  />
                </svg>
              </div>
            </div>

            <div className=" w-full lg:w-[233px] h-[17px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Wider Market Reach
            </div>

            <div className="w-full lg:w-[310px]  text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Our platform offers high visibility through digital marketing,
              verified buyer networks, and strategic promotions.
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] md:w-[500px] md:mx-auto h-[158px] lg:h-[239px] bg-white hover:bg-[#FBF8F1] active:bg-[#FBF8F1] border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#DBDBDB] hover:bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.55 18.2L15.725 12H11.725L12.45 6.325L7.825 13H11.3L10.55 18.2ZM8 22L9 15H4L13 2H15L14 10H20L10 22H8Z"
                    fill=" #1E1E1E"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Faster Sales & Guaranteed Earnings
            </div>

            <div className="lg:w-[310px] lg:mt-10 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Onboarding partners often face long sales cycles, delaying their
              commission payouts.
            </div>
          </div>
        </div>

        {/* Second Row Cards with */}
        <div className="flex mt-5 flex-col p-2 lg:ml-0 lg:flex-row items-center   sm:w-[500px] p-0 gap-[30px] lg:w-[1134px] ">
          {/* Card 1 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] md:w-[500px] md:mx-auto h-[158px] lg:h-[239px]  bg-white hover:bg-[#FBF8F1] active:bg-[#FBF8F1] bg-white hover:bg-[#FBF8F1] active:bg-[#FBF8F1] border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#DBDBDB] hover:bg-[#F7EFD8]">
                <svg
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  className="ml-[-8px] mt-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 20.5V13.1429C1.36667 12.4762 0.875 11.7143 0.525 10.8571C0.175 10 0 9.0873 0 8.11905C0 5.99206 0.775 4.19048 2.325 2.71429C3.875 1.2381 5.76667 0.5 8 0.5C10.2333 0.5 12.125 1.2381 13.675 2.71429C15.225 4.19048 16 5.99206 16 8.11905C16 9.0873 15.825 10 15.475 10.8571C15.125 11.7143 14.6333 12.4762 14 13.1429V20.5L8 18.5952L2 20.5ZM8 13.8333C9.66667 13.8333 11.0833 13.2778 12.25 12.1667C13.4167 11.0556 14 9.70635 14 8.11905C14 6.53175 13.4167 5.18254 12.25 4.07143C11.0833 2.96032 9.66667 2.40476 8 2.40476C6.33333 2.40476 4.91667 2.96032 3.75 4.07143C2.58333 5.18254 2 6.53175 2 8.11905C2 9.70635 2.58333 11.0556 3.75 12.1667C4.91667 13.2778 6.33333 13.8333 8 13.8333ZM4 17.6667L8 16.6905L12 17.6667V14.7143C11.4167 15.0317 10.7875 15.2817 10.1125 15.4643C9.4375 15.6468 8.73333 15.7381 8 15.7381C7.26667 15.7381 6.5625 15.6468 5.8875 15.4643C5.2125 15.2817 4.58333 15.0317 4 14.7143V17.6667Z"
                    fill=" #1E1E1E"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full lg:w-[243px]  h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Less Competition, More Opportunities
            </div>

            <div className="w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Reparv provides exclusive listing opportunities and supports
              partners in securing high-value properties.
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] md:w-[500px] md:mx-auto h-[158px] lg:h-[239px] bg-white hover:bg-[#FBF8F1] active:bg-[#FBF8F1] border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#DBDBDB] hover:bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 21.5C4.45 21.5 3.97917 21.3042 3.5875 20.9125C3.19583 20.5208 3 20.05 3 19.5V5.5C3 4.95 3.19583 4.47917 3.5875 4.0875C3.97917 3.69583 4.45 3.5 5 3.5H19C19.1333 3.5 19.2583 3.5125 19.375 3.5375C19.4917 3.5625 19.6083 3.6 19.725 3.65L17.875 5.5H5V19.5H19V12.85L21 10.85V19.5C21 20.05 20.8042 20.5208 20.4125 20.9125C20.0208 21.3042 19.55 21.5 19 21.5H5ZM11.525 17.5L5.875 11.85L7.275 10.45L11.525 14.7L20.7 5.525L22.125 6.9L11.525 17.5Z"
                    fill=" #1E1E1E"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full lg:w-[283px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Simplified Verification & Documentation
            </div>

            <div className="w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              We assist in property verification and streamline paperwork to
              ensure hassle-free listings.
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] md:w-[500px] md:mx-auto h-[158px] lg:h-[239px] bg-white hover:bg-[#FBF8F1] active:bg-[#FBF8F1] border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#DBDBDB] hover:bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.725 21.5L7 14.5V12.5H10.5C11.3833 12.5 12.1458 12.2125 12.7875 11.6375C13.4292 11.0625 13.8167 10.35 13.95 9.5H6V7.5H13.65C13.3667 6.91667 12.9458 6.4375 12.3875 6.0625C11.8292 5.6875 11.2 5.5 10.5 5.5H6V3.5H18V5.5H14.75C14.9833 5.78333 15.1917 6.09167 15.375 6.425C15.5583 6.75833 15.7 7.11667 15.8 7.5H18V9.5H15.975C15.8417 10.9167 15.2583 12.1042 14.225 13.0625C13.1917 14.0208 11.95 14.5 10.5 14.5H9.775L16.5 21.5H13.725Z"
                    fill=" #1E1E1E"
                  />
                </svg>
              </div>
            </div>

            <div className="lg:w-[233px] h-[24px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Structured Bonus & Commission Model
            </div>

            <div className="lg:w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              A transparent incentive system ensures onboarding partners earn
              well for every successful sale.
            </div>
          </div>
        </div>

        {/* Third row of Cards */}
        <div className="flex mt-5 mx-auto items-center  justify-center p-2 w-full md:w-[530px] sm:w-[500px]">
          <div className="flex flex-col items-start p-4 gap-4 w-full lg:w-[358px] md:w-[530px] md:ml-2 h-[158px] lg:h-[239px] bg-white hover:bg-[#FBF8F1] active:bg-[#FBF8F1] border border-[#0000001a] shadow-[0px_6px_16px_rgba(0,0,0,0.125)]  rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full bg-[#DBDBDB] hover:bg-[#F7EFD8]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mt-[-12px] ml-[-12px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 18C9.45 18 8.97917 17.8042 8.5875 17.4125C8.19583 17.0208 8 16.55 8 16V14.75C7.05 14.1 6.3125 13.2667 5.7875 12.25C5.2625 11.2333 5 10.15 5 9C5 7.05 5.67917 5.39583 7.0375 4.0375C8.39583 2.67917 10.05 2 12 2C13.95 2 15.6042 2.67917 16.9625 4.0375C18.3208 5.39583 19 7.05 19 9C19 10.15 18.7375 11.2292 18.2125 12.2375C17.6875 13.2458 16.95 14.0833 16 14.75V16C16 16.55 15.8042 17.0208 15.4125 17.4125C15.0208 17.8042 14.55 18 14 18H10ZM10 16H14V13.7L14.85 13.1C15.5333 12.6333 16.0625 12.0375 16.4375 11.3125C16.8125 10.5875 17 9.81667 17 9C17 7.61667 16.5125 6.4375 15.5375 5.4625C14.5625 4.4875 13.3833 4 12 4C10.6167 4 9.4375 4.4875 8.4625 5.4625C7.4875 6.4375 7 7.61667 7 9C7 9.81667 7.1875 10.5875 7.5625 11.3125C7.9375 12.0375 8.46667 12.6333 9.15 13.1L10 13.7V16ZM10 22C9.71667 22 9.47917 21.9042 9.2875 21.7125C9.09583 21.5208 9 21.2833 9 21V20H15V21C15 21.2833 14.9042 21.5208 14.7125 21.7125C14.5208 21.9042 14.2833 22 14 22H10Z"
                    fill=" #1E1E1E"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full lg:w-[233px] h-[17px] lg:h-[36px] text-black text-[16px] lg:text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Training & Support System
            </div>

            <div className="lg:w-[310px] lg:mt-5 text-[#999999] text-[12px] lg:text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Reparv offers expert guidance, tools, and training to help
              onboarding partners optimize listings and close deals effectively.
            </div>
          </div>
        </div>
      </div>

      {/* Who Will Become the An Project Partner section */}

      <div className=" flex flex-col items-start  gap-[32px]  p-5 lg:py-24 lg:p-24 w-full h-[1516px] lg:h-[571px]  bg-[#1E1E1E]">
        <div className="flex flex-col items-start  gap-[16px] w-full md:h-[60px] h-[150px] lg:h-[88px]">
          {/* Heading */}
          <h2 className="w-full h-[100px] md:h-[50px] lg:h-[48px] font-semibold text-4xl leading-[48px] text-center text-white">
            Who Will Become An Project Partner?
          </h2>
          {/* Paragraph */}
          <p className="w-full h-[24px] font-medium text-[16px] leading-[150%] text-center text-[rgba(255,255,255,0.6)]">
            Reparv welcomes partners from diverse backgrounds who share a
            passion for real estate
          </p>
        </div>
        {/* Boxes */}
        <div className="flex flex-col lg:flex-row justify-center items-center p-0 gap-[30px] w-full h-[1200px] lg:h-[323px] ">
          {/* Students Box */}
          <div className="flex flex-col p-5 lg:p-10  items-center lg:p-[36px] gap-[16px] lg:w-[203px] lg:h-[323px] w-full h-[193px]  bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] rounded-[12px]">
            <div className="relative w-[20px] h-[20px] p-5 rounded-full bg-[#DBDBDB] bg-[rgba(255,255,255,0.1)]">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                className="mt-[-11px] ml-[-12px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.4992 20.4L5.89922 17.1V11.1L1.69922 8.99998L12.4992 3.59998L23.2992 8.99998V16.8H21.4992V9.89998L19.0992 11.1V17.1L12.4992 20.4ZM12.4992 12.375L19.2742 8.99998L12.4992 5.62498L5.72422 8.99998L12.4992 12.375ZM12.4992 18.375L17.2992 15.975V12L12.4992 14.4L7.69922 12V15.975L12.4992 18.375Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="lg:w-[88px] h-[14px] lg:h-[24px] font-semibold text-[16px] lg:text-[20px] leading-[24px] text-white">
              Students
            </p>
            <p className="w-full  text-start h-[30px] lg:w-[131px] lg:h-[133px] font-medium text-[12px] text-[15px]  lg:text-[16px] leading-[19px] lg:text-center text-[rgba(255,255,255,0.6)]">
              Perfect for students looking to earn while they learn and build
              valuable real estate connections.
            </p>
          </div>
          {/* Working Professionals Box */}
          <div className="flex flex-col p-5 lg:p-10  items-center lg:p-[36px] gap-[16px] lg:w-[203px] lg:h-[323px] w-full h-[193px]  bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] rounded-[12px]">
            <div className="relative w-[20px] h-[20px] p-5 rounded-full bg-[#DBDBDB] bg-[rgba(255,255,255,0.1)]">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                className="mt-[-12px] ml-[-12px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 21C3.95 21 3.47917 20.8042 3.0875 20.4125C2.69583 20.0208 2.5 19.55 2.5 19V8C2.5 7.45 2.69583 6.97917 3.0875 6.5875C3.47917 6.19583 3.95 6 4.5 6H8.5V4C8.5 3.45 8.69583 2.97917 9.0875 2.5875C9.47917 2.19583 9.95 2 10.5 2H14.5C15.05 2 15.5208 2.19583 15.9125 2.5875C16.3042 2.97917 16.5 3.45 16.5 4V6H20.5C21.05 6 21.5208 6.19583 21.9125 6.5875C22.3042 6.97917 22.5 7.45 22.5 8V19C22.5 19.55 22.3042 20.0208 21.9125 20.4125C21.5208 20.8042 21.05 21 20.5 21H4.5ZM10.5 6H14.5V4H10.5V6ZM6.5 8H4.5V19H6.5V8ZM16.5 19V8H8.5V19H16.5ZM18.5 8V19H20.5V8H18.5Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="lg:w-[131px] h-[48px] font-semibold text-[20px] leading-[24px] text-center text-white">
              Working Professionals
            </p>
            <p className="lg:w-[131px] h-[114px] font-medium text-[16px] leading-[19px] text-center text-[rgba(255,255,255,0.6)]">
              Ideal for those seeking additional income streams alongside their
              regular careers.
            </p>
          </div>
          {/* House Wives Box*/}
          <div className="flex flex-col p-5 lg:p-10  items-center lg:p-[36px] gap-[16px] lg:w-[203px] lg:h-[323px] w-full h-[193px]  bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] rounded-[12px]">
            <div className="relative w-[20px] h-[20px] p-5 rounded-full bg-[#DBDBDB] bg-[rgba(255,255,255,0.1)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="mt-[-12px] ml-[-12px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="lg:w-[112px] h-[24px] font-semibold text-[20px] leading-[24px] text-center text-white">
              House Wife
            </p>
            <p className="lg:w-[132px] h-[114px] font-medium text-[16px] leading-[19px] text-center text-[rgba(255,255,255,0.6)]">
              Flexible opportunity for homemakers to utilize their network and
              earn from home.
            </p>
          </div>
          {/* Property Owners Box */}
          <div className="flex flex-col p-5   items-center lg:p-[36px] gap-[16px] lg:w-[203px] lg:h-[323px] w-full h-[193px]  bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] rounded-[12px]">
            <div className="relative w-[20px] h-[20px] p-5 rounded-full  bg-[rgba(255,255,255,0.1)]">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                className="mt-[-12px] ml-[-12px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 21V7H7.5V3H17.5V11H21.5V21H13.5V17H11.5V21H3.5ZM5.5 19H7.5V17H5.5V19ZM5.5 15H7.5V13H5.5V15ZM5.5 11H7.5V9H5.5V11ZM9.5 15H11.5V13H9.5V15ZM9.5 11H11.5V9H9.5V11ZM9.5 7H11.5V5H9.5V7ZM13.5 15H15.5V13H13.5V15ZM13.5 11H15.5V9H13.5V11ZM13.5 7H15.5V5H13.5V7ZM17.5 19H19.5V17H17.5V19ZM17.5 15H19.5V13H17.5V15Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="lg:w-[85px] h-[48px] font-semibold text-[20px] leading-[24px] text-center text-white">
              Property Owners
            </p>
            <p className="lg:w-[131px] h-[114px] font-medium text-[16px] leading-[19px] text-center text-[rgba(255,255,255,0.6)]">
              For those who already own properties and understand the real
              estate market.
            </p>
          </div>
          {/* Anyone with Interest Box */}
          <div className="flex flex-col p-5 lg:p-10  items-center lg:p-[36px] gap-[16px] lg:w-[203px] lg:h-[323px] w-full h-[193px]  bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_-8px_16px_rgba(255,255,255,0.3),0px_8px_16px_rgba(255,255,255,0.3)] rounded-[12px]">
            <div className="relative w-[20px] h-[20px] p-5 rounded-full bg-[#DBDBDB] bg-[rgba(255,255,255,0.1)]">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                className="mt-[-12px] ml-[-12px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 20V17.2C1.5 16.6333 1.64583 16.1125 1.9375 15.6375C2.22917 15.1625 2.61667 14.8 3.1 14.55C4.13333 14.0333 5.18333 13.6458 6.25 13.3875C7.31667 13.1292 8.4 13 9.5 13C10.6 13 11.6833 13.1292 12.75 13.3875C13.8167 13.6458 14.8667 14.0333 15.9 14.55C16.3833 14.8 16.7708 15.1625 17.0625 15.6375C17.3542 16.1125 17.5 16.6333 17.5 17.2V20H1.5ZM19.5 20V17C19.5 16.2667 19.2958 15.5625 18.8875 14.8875C18.4792 14.2125 17.9 13.6333 17.15 13.15C18 13.25 18.8 13.4208 19.55 13.6625C20.3 13.9042 21 14.2 21.65 14.55C22.25 14.8833 22.7083 15.2542 23.025 15.6625C23.3417 16.0708 23.5 16.5167 23.5 17V20H19.5ZM9.5 12C8.4 12 7.45833 11.6083 6.675 10.825C5.89167 10.0417 5.5 9.1 5.5 8C5.5 6.9 5.89167 5.95833 6.675 5.175C7.45833 4.39167 8.4 4 9.5 4C10.6 4 11.5417 4.39167 12.325 5.175C13.1083 5.95833 13.5 6.9 13.5 8C13.5 9.1 13.1083 10.0417 12.325 10.825C11.5417 11.6083 10.6 12 9.5 12ZM19.5 8C19.5 9.1 19.1083 10.0417 18.325 10.825C17.5417 11.6083 16.6 12 15.5 12C15.3167 12 15.0833 11.9792 14.8 11.9375C14.5167 11.8958 14.2833 11.85 14.1 11.8C14.55 11.2667 14.8958 10.675 15.1375 10.025C15.3792 9.375 15.5 8.7 15.5 8C15.5 7.3 15.3792 6.625 15.1375 5.975C14.8958 5.325 14.55 4.73333 14.1 4.2C14.3333 4.11667 14.5667 4.0625 14.8 4.0375C15.0333 4.0125 15.2667 4 15.5 4C16.6 4 17.5417 4.39167 18.325 5.175C19.1083 5.95833 19.5 6.9 19.5 8ZM3.5 18H15.5V17.2C15.5 17.0167 15.4542 16.85 15.3625 16.7C15.2708 16.55 15.15 16.4333 15 16.35C14.1 15.9 13.1917 15.5625 12.275 15.3375C11.3583 15.1125 10.4333 15 9.5 15C8.56667 15 7.64167 15.1125 6.725 15.3375C5.80833 15.5625 4.9 15.9 4 16.35C3.85 16.4333 3.72917 16.55 3.6375 16.7C3.54583 16.85 3.5 17.0167 3.5 17.2V18ZM9.5 10C10.05 10 10.5208 9.80417 10.9125 9.4125C11.3042 9.02083 11.5 8.55 11.5 8C11.5 7.45 11.3042 6.97917 10.9125 6.5875C10.5208 6.19583 10.05 6 9.5 6C8.95 6 8.47917 6.19583 8.0875 6.5875C7.69583 6.97917 7.5 7.45 7.5 8C7.5 8.55 7.69583 9.02083 8.0875 9.4125C8.47917 9.80417 8.95 10 9.5 10Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="lg:w-[86px] h-[48px] font-semibold text-[20px] leading-[24px] text-center text-white">
              &amp; As per interest
            </p>
            <p className="lg:w-[131px] h-[114px] font-medium text-[16px] leading-[19px] text-center text-[rgba(255,255,255,0.6)]">
              Anyone with interest in real estate and a desire to earn through
              property listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
