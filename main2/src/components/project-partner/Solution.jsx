export default function SolutionSection() {
  return (
    //   {/* Solution Reparv Section */}
    <div className="absolute flex flex-col  lg:items-center p-0 gap-8 w-full top-[2850px]  md:top-[2300px] lg:top-[2248px]">
      <div className="flex relative md:mx-auto lg:mx-0  flex-col justify-center items-center p-0 gap-4 lg:w-[747px] h-[152px]">
        <div className="w-full lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold text-[#076300] text-[28px] lg:text-[40px] leading-[48px]">
          Solution in Reparv
        </div>

        <div className=" px-5  mx-auto lg:px-0 sm:w-[450px] lg:w-[534px] h-[48px] text-[#999999] text-[16px] font-medium leading-[24px] text-center">
          Reparv offers comprehensive solutions to overcome the challenges faced
          by real estate professionals.
        </div>

        {/* green line */}
        <div className="w-[100px] mt-4 lg:mt-0 h-0 border-[2px] lg:border-[2px] border-[#0BB501]"></div>
      </div>

      {/* Cards oF Solution section */}
      <div className="p-3 flex lg:p-0 lg:ml-0   mx-auto  flex-col w-full items-center">
        {/* Cards */}
        <div className="flex flex-col lg:flex-row items-center p-0 gap-[30px] lg:w-[1134px] ">
          <div className="block  grid grid-rows-2 gap-5  sm:block sm:grid sm:grid-rows-2 sm:gap-5  md:flex lg:flex lg:gap-8 md:gap-5">
            {/* Card 1 */}
            <div
              className="flex flex-col items-start p-6 gap-4 lg:w-[358px] h-[280px] bg-white
  hover:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] active:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)]   border-t-1 border-l-1 border-t-green-500 border-l-green-500 shadow-[0px_6px_16px_rgba(0,0,0,0.125)] rounded-[0px_12px_12px_12px]"
            >
              <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
                <div className="absolute w-[20px] h-[20px] p-4 rounded-full    bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white bg-white">
                  <svg
                    width="24"
                    height="24"
                    className="mt-[-11px] ml-[-12px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 20V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V20H1ZM19 20V17C19 16.2667 18.7958 15.5625 18.3875 14.8875C17.9792 14.2125 17.4 13.6333 16.65 13.15C17.5 13.25 18.3 13.4208 19.05 13.6625C19.8 13.9042 20.5 14.2 21.15 14.55C21.75 14.8833 22.2083 15.2542 22.525 15.6625C22.8417 16.0708 23 16.5167 23 17V20H19ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM19 8C19 9.1 18.6083 10.0417 17.825 10.825C17.0417 11.6083 16.1 12 15 12C14.8167 12 14.5833 11.9792 14.3 11.9375C14.0167 11.8958 13.7833 11.85 13.6 11.8C14.05 11.2667 14.3958 10.675 14.6375 10.025C14.8792 9.375 15 8.7 15 8C15 7.3 14.8792 6.625 14.6375 5.975C14.3958 5.325 14.05 4.73333 13.6 4.2C13.8333 4.11667 14.0667 4.0625 14.3 4.0375C14.5333 4.0125 14.7667 4 15 4C16.1 4 17.0417 4.39167 17.825 5.175C18.6083 5.95833 19 6.9 19 8ZM3 18H15V17.2C15 17.0167 14.9542 16.85 14.8625 16.7C14.7708 16.55 14.65 16.4333 14.5 16.35C13.6 15.9 12.6917 15.5625 11.775 15.3375C10.8583 15.1125 9.93333 15 9 15C8.06667 15 7.14167 15.1125 6.225 15.3375C5.30833 15.5625 4.4 15.9 3.5 16.35C3.35 16.4333 3.22917 16.55 3.1375 16.7C3.04583 16.85 3 17.0167 3 17.2V18ZM9 10C9.55 10 10.0208 9.80417 10.4125 9.4125C10.8042 9.02083 11 8.55 11 8C11 7.45 10.8042 6.97917 10.4125 6.5875C10.0208 6.19583 9.55 6 9 6C8.45 6 7.97917 6.19583 7.5875 6.5875C7.19583 6.97917 7 7.45 7 8C7 8.55 7.19583 9.02083 7.5875 9.4125C7.97917 9.80417 8.45 10 9 10Z"
                      fill="#0BB501"
                    />
                  </svg>
                </div>
              </div>

              <div className="w-[233px] h-[26px] text-black text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
                Customer Reach
              </div>

              <div className=" w-[310px] h-[144px] text-[#999999] text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
                Customer reach in the real estate business with Reparv's trusted
                approach depends on effective marketing, a strong digital
                presence, and strategic network expansion to connect with
                potential buyers and investors across diverse locations.
              </div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-start p-6 gap-4 lg:w-[358px] h-[280px]  hover:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] active:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white border-t-1 border-l-1 border-t-green-500 border-l-green-500 shadow-[0px_6px_16px_rgba(0,0,0,0.125)] rounded-[0px_12px_12px_12px]">
              <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
                <div className="absolute w-[20px] h-[20px] p-4 rounded-full  bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white bg-white">
                  <svg
                    width="24"
                    height="25"
                    className="mt-[-10px] ml-[-10px]"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.55 12.5L14 8.95L15.425 7.55L17.55 9.675L21.8 5.425L23.2 6.85L17.55 12.5ZM9 12.5C7.9 12.5 6.95833 12.1083 6.175 11.325C5.39167 10.5417 5 9.6 5 8.5C5 7.4 5.39167 6.45833 6.175 5.675C6.95833 4.89167 7.9 4.5 9 4.5C10.1 4.5 11.0417 4.89167 11.825 5.675C12.6083 6.45833 13 7.4 13 8.5C13 9.6 12.6083 10.5417 11.825 11.325C11.0417 12.1083 10.1 12.5 9 12.5ZM1 20.5V17.7C1 17.1333 1.14583 16.6125 1.4375 16.1375C1.72917 15.6625 2.11667 15.3 2.6 15.05C3.63333 14.5333 4.68333 14.1458 5.75 13.8875C6.81667 13.6292 7.9 13.5 9 13.5C10.1 13.5 11.1833 13.6292 12.25 13.8875C13.3167 14.1458 14.3667 14.5333 15.4 15.05C15.8833 15.3 16.2708 15.6625 16.5625 16.1375C16.8542 16.6125 17 17.1333 17 17.7V20.5H1ZM3 18.5H15V17.7C15 17.5167 14.9542 17.35 14.8625 17.2C14.7708 17.05 14.65 16.9333 14.5 16.85C13.6 16.4 12.6917 16.0625 11.775 15.8375C10.8583 15.6125 9.93333 15.5 9 15.5C8.06667 15.5 7.14167 15.6125 6.225 15.8375C5.30833 16.0625 4.4 16.4 3.5 16.85C3.35 16.9333 3.22917 17.05 3.1375 17.2C3.04583 17.35 3 17.5167 3 17.7V18.5ZM9 10.5C9.55 10.5 10.0208 10.3042 10.4125 9.9125C10.8042 9.52083 11 9.05 11 8.5C11 7.95 10.8042 7.47917 10.4125 7.0875C10.0208 6.69583 9.55 6.5 9 6.5C8.45 6.5 7.97917 6.69583 7.5875 7.0875C7.19583 7.47917 7 7.95 7 8.5C7 9.05 7.19583 9.52083 7.5875 9.9125C7.97917 10.3042 8.45 10.5 9 10.5Z"
                      fill="#0BB501"
                    />
                  </svg>
                </div>
              </div>

              <div className="lg:w-[273px] h-[36px] text-black text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
                Skilled Sales Workforce
              </div>

              <div className="w-[310px] h-[144px] text-[#999999] text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
                Skilled Sales Workforce Reparv's skilled sales workforce ensures
                trust, transparency, and expert guidance, delivering seamless
                real estate experiences for buyers and investors.
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-start p-6 gap-4 lg:w-[358px] h-[280px]  hover:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] active:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white border-t-1 border-l-1 border-t-green-500 border-l-green-500 shadow-[0px_6px_16px_rgba(0,0,0,0.125)] rounded-[0px_12px_12px_12px]">
            <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
              <div className="absolute w-[20px] h-[20px] p-4 rounded-full  bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white bg-white">
                <svg
                  width="24"
                  height="24"
                  className="mt-[-10px] ml-[-10px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 13V11H22V13H18ZM19.2 20L16 17.6L17.2 16L20.4 18.4L19.2 20ZM17.2 8L16 6.4L19.2 4L20.4 5.6L17.2 8ZM5 19V15H4C3.45 15 2.97917 14.8042 2.5875 14.4125C2.19583 14.0208 2 13.55 2 13V11C2 10.45 2.19583 9.97917 2.5875 9.5875C2.97917 9.19583 3.45 9 4 9H8L13 6V18L8 15H7V19H5ZM11 14.45V9.55L8.55 11H4V13H8.55L11 14.45ZM14 15.35V8.65C14.45 9.05 14.8125 9.5375 15.0875 10.1125C15.3625 10.6875 15.5 11.3167 15.5 12C15.5 12.6833 15.3625 13.3125 15.0875 13.8875C14.8125 14.4625 14.45 14.95 14 15.35Z"
                    fill="#0BB501"
                  />
                </svg>
              </div>
            </div>

            <div className="lg:w-[283px] h-[36px] text-black text-[24px] font-medium leading-[36px] flex-none order-1 flex-grow-0">
              Marketing Support
            </div>

            <div className="w-[310px] h-[144px] text-[#999999] text-[16px] font-medium leading-[24px] flex-none order-2 self-stretch flex-grow-0">
              Reparv's marketing support empowers partners with strategic
              promotions, digital reach, and trusted branding to maximize real
              estate success.
            </div>
          </div>
        </div>

        {/* Second Row Cards */}
        <div className=" flex flex-col lg:flex-row items-center mt-7 lg:mt-10 gap-[30px] lg:w-[746px] h-[300px]">
          <div className="block  grid grid-rows-2 gap-5  sm:block sm:grid sm:grid-rows-2 sm:gap-5  md:flex lg:flex lg:gap-8 md:gap-5">
            <div className="flex flex-col items-start p-6 gap-[16px] w-[358px] h-[280px]  hover:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] active:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white border-t-1 border-l-1 border-t-green-500 border-l-green-500 shadow-[0px_6px_16px_rgba(0,0,0,0.125)] rounded-[0px_12px_12px_12px]">
              {/* Icon */}
              <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
                <div className="absolute w-[20px] h-[20px] p-4 rounded-full  bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white bg-white">
                  <svg
                    width="24"
                    height="24"
                    className="mt-[-10px] ml-[-10px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.85 12L5.55 10.5C5.35 10.4167 5.1625 10.3292 4.9875 10.2375C4.8125 10.1458 4.63333 10.0333 4.45 9.9L3 10.35L2 8.65L3.15 7.65C3.11667 7.43333 3.1 7.21667 3.1 7C3.1 6.78333 3.11667 6.56667 3.15 6.35L2 5.35L3 3.65L4.45 4.1C4.63333 3.96667 4.8125 3.85417 4.9875 3.7625C5.1625 3.67083 5.35 3.58333 5.55 3.5L5.85 2H7.85L8.15 3.5C8.35 3.58333 8.5375 3.67083 8.7125 3.7625C8.8875 3.85417 9.06667 3.96667 9.25 4.1L10.7 3.65L11.7 5.35L10.55 6.35C10.5833 6.56667 10.6 6.78333 10.6 7C10.6 7.21667 10.5833 7.43333 10.55 7.65L11.7 8.65L10.7 10.35L9.25 9.9C9.06667 10.0333 8.8875 10.1458 8.7125 10.2375C8.5375 10.3292 8.35 10.4167 8.15 10.5L7.85 12H5.85ZM6.85 9C7.4 9 7.87083 8.80417 8.2625 8.4125C8.65417 8.02083 8.85 7.55 8.85 7C8.85 6.45 8.65417 5.97917 8.2625 5.5875C7.87083 5.19583 7.4 5 6.85 5C6.3 5 5.82917 5.19583 5.4375 5.5875C5.04583 5.97917 4.85 6.45 4.85 7C4.85 7.55 5.04583 8.02083 5.4375 8.4125C5.82917 8.80417 6.3 9 6.85 9ZM14.8 23L14.35 20.9C14.0667 20.8 13.8042 20.6792 13.5625 20.5375C13.3208 20.3958 13.0833 20.2333 12.85 20.05L10.85 20.7L9.45 18.3L11.05 16.9C11.0167 16.6 11 16.3 11 16C11 15.7 11.0167 15.4 11.05 15.1L9.45 13.7L10.85 11.3L12.85 11.95C13.0833 11.7667 13.3208 11.6042 13.5625 11.4625C13.8042 11.3208 14.0667 11.2 14.35 11.1L14.8 9H17.6L18.05 11.1C18.3333 11.2 18.5958 11.3208 18.8375 11.4625C19.0792 11.6042 19.3167 11.7667 19.55 11.95L21.55 11.3L22.95 13.7L21.35 15.1C21.3833 15.4 21.4 15.7 21.4 16C21.4 16.3 21.3833 16.6 21.35 16.9L22.95 18.3L21.55 20.7L19.55 20.05C19.3167 20.2333 19.0792 20.3958 18.8375 20.5375C18.5958 20.6792 18.3333 20.8 18.05 20.9L17.6 23H14.8ZM16.2 19C17.0333 19 17.7417 18.7083 18.325 18.125C18.9083 17.5417 19.2 16.8333 19.2 16C19.2 15.1667 18.9083 14.4583 18.325 13.875C17.7417 13.2917 17.0333 13 16.2 13C15.3667 13 14.6583 13.2917 14.075 13.875C13.4917 14.4583 13.2 15.1667 13.2 16C13.2 16.8333 13.4917 17.5417 14.075 18.125C14.6583 18.7083 15.3667 19 16.2 19Z"
                      fill="#0BB501"
                    />
                  </svg>
                </div>
              </div>

              <div className="lg:w-[329px] h-[36px] font-inter font-medium text-[24px] leading-[120%] text-black flex-none order-1 flex-grow-0">
                Business Management Technology Tools Support
              </div>

              <div className="w-[310px] mt-5 h-[120px] font-inter font-medium text-[16px] leading-[150%] text-[rgba(0,0,0,0.4)] flex-none order-2 align-self-stretch flex-grow-0">
                Reparv's business management technology tools provide smart,
                efficient, and data-driven solutions to streamline operations
                and drive real estate success.
              </div>
            </div>

            <div className="flex flex-col items-start p-6 gap-[16px] w-[358px] h-[280px]  hover:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] active:bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white border-t-1 border-l-1 border-t-green-500 border-l-green-500 shadow-[0px_6px_16px_rgba(0,0,0,0.125)] rounded-[0px_12px_12px_12px]">
              {/* Icon 2 */}
              <div className="w-[40px] h-[20px] flex-none order-0 flex-grow-0 relative">
                <div className="absolute w-[20px] h-[20px] p-4 rounded-full  bg-gradient-to-t from-[rgba(11,181,1,0.06)] via-[rgba(11,181,1,0.06)] to-[rgba(11,181,1,0.06)] bg-white bg-white">
                  <svg
                    width="24"
                    height="24"
                    className="mt-[-10px] ml-[-10px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9992 20.4L5.39922 17.1V11.1L1.19922 8.99998L11.9992 3.59998L22.7992 8.99998V16.8H20.9992V9.89998L18.5992 11.1V17.1L11.9992 20.4ZM11.9992 12.375L18.7742 8.99998L11.9992 5.62498L5.22422 8.99998L11.9992 12.375ZM11.9992 18.375L16.7992 15.975V12L11.9992 14.4L7.19922 12V15.975L11.9992 18.375Z"
                      fill="#0BB501"
                    />
                  </svg>
                </div>
              </div>

              <div className="lg:w-[308px] h-[36px] font-inter font-medium text-[24px] leading-[130%] text-black flex-none order-1 flex-grow-0">
                Business Growth Training Support
              </div>

              <div className="w-[310px] mt-5 h-[144px] font-inter font-medium text-[16px] leading-[150%] text-[rgba(0,0,0,0.4)] flex-none order-2 align-self-stretch flex-grow-0">
                Reparv's Business Growth Training Support equips partners with
                expert knowledge, strategic insights, and skill development to
                scale success in the real estate market.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Become Project Partner Section  */}
      <div
        id=""
        className=" projectpartner lg:mt-10 md:mt-20 mt-80 lg:mt-0 w-full   lg:p-10  md:h-[900px] w-full md:w-full h-[900px] lg:h-[370px]  bg-[#076300]   flex flex-col lg:items-start "
      >
        {/* title */}
        <h1 className="w-full lg:w-full  p-5 mx-auto lg:p-0 h-[48px] text-center text-white font-semibold text-[28px] lg:text-[40px] leading-[48px]">
          Who Will Become An Project Partner?
        </h1>

        {/* Project Partner Cards */}
        <div className=" greencard relative flex   mx-auto lg:justify-center mt-20 lg:px-12  lg:mt-5 flex-col md:flex-col md:w-full lg:flex-row items-center  gap-[30px]    h-[268px]">
          {/* card 1 */}
          <div className="flex  flex-col items-start p-[24px] gap-[16px] lg:ml-2 w-[348px] h-[228px] bg-[#FFFFFF1A] rounded-[12px] hover:shadow-[0px_-8px_16px_rgba(255,255,255,0.3)] hover:shadow-[0px_8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_-8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_8px_16px_rgba(255,255,255,0.3)] rounded-[12px]">
            <div className="relative w-[38px] h-[38px]">
              <div className="absolute w-[38px] h-[38px] left-[6px] rounded-full top-[16px] bg-[#FFFFFF33]"></div>
              <div className="absolute w-[12px] h-[36px] left-[19px] top-[17px] text-[24px] font-bold text-white leading-[150%]">
                1
              </div>
            </div>

            <div className="w-full h-[30px] text-[20px] font-semibold text-white leading-[150%]">
              Real Estate Professionals
            </div>

            <div className="w-full h-[72px] text-[16px] font-medium text-[#FFFFFF99] leading-[150%]">
              Experienced agents and brokers looking to expand their reach and
              leverage advanced technology tools.
            </div>
          </div>
          {/* card 2 */}
          <div className="flex flex-col items-start p-[24px] gap-[16px] lg:ml-2 w-[348px] h-[228px] bg-[#FFFFFF1A] rounded-[12px] hover:shadow-[0px_-8px_16px_rgba(255,255,255,0.3)] hover:shadow-[0px_8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_-8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_8px_16px_rgba(255,255,255,0.3)] rounded-[12px]">
            <div className="relative w-[38px] h-[38px]">
              <div className="absolute w-[38px] h-[38px] left-[6px] rounded-full top-[16px] bg-[#FFFFFF33]"></div>
              <div className="absolute w-[12px] h-[36px] left-[19px] top-[17px] text-[24px] font-bold text-white leading-[150%]">
                2
              </div>
            </div>

            <div className="w-full lg:w-[344px] h-[30px] text-[20px] font-semibold text-white leading-[150%]">
              Property Developers
            </div>

            <div className="w-full lg:w-[286px] h-[72px] text-[16px] font-medium text-[#FFFFFF99] leading-[150%]">
              Builders and developers seeking reliable marketing and sales
              support to enhance project visibility.
            </div>
          </div>
          {/* card 3 */}
          <div className="flex flex-col items-start py-6 px-2  md:p-[24px] gap-[16px] lg:ml-2 w-[348px] h-[228px] bg-[#FFFFFF1A] rounded-[12px] hover:shadow-[0px_-8px_16px_rgba(255,255,255,0.3)] hover:shadow-[0px_8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_-8px_16px_rgba(255,255,255,0.3)] active:shadow-[0px_8px_16px_rgba(255,255,255,0.3)] rounded-[12px]">
            <div className="relative  w-[38px] h-[38px]">
              <div className="absolute w-[38px] h-[38px] left-[6px] rounded-full top-[16px] bg-[#FFFFFF33]"></div>
              <div className="absolute w-[12px] h-[36px] left-[19px] top-[17px] text-[24px] font-bold text-white leading-[150%]">
                3
              </div>
            </div>

            <div className="w-full lg:w-[344px] ml-3 lg:ml-0  h-[30px] text-[20px] font-semibold text-white leading-[150%]">
              Investment Consultants
            </div>

            <div className="w-full lg:w-[286px] ml-3 lg:ml-0 h-[72px] text-[16px] font-medium text-[#FFFFFF99] leading-[150%]">
              Financial advisors specializing in real estate who want to offer
              transparent, high-quality investment opportunities.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
