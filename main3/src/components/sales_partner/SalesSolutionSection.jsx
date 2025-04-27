import studentBg from "../../assets/studentbg.png";
import professionalBg from "../../assets/professional.png";
import homeBg from "../../assets/homeBg.png";
import doctorBg from "../../assets/doctorBg.png";

export default function SaleSolutionSection() {
  return (
    <div className="absolute  w-full mx-auto justify-center top-[2904px] lg:top-[2004px] flex flex-col items-center gap-[32px] p-0">
      {/* Text Container */}
      <div className="flex mx-auto justify-center flex-col mx-auto lg:items-center justify-center gap-[16px] lg:w-[1134px] h-[104px]">
        {/*Title */}
        <h1 className="mx-auto w-full lg:w-[1134px] h-[48px] font-inter font-semibold text-[28px] lg:text-[40px] leading-[48px] text-center text-[#076300]">
          Solution in Reparv
        </h1>
        {/* Paragraph */}
        <p className="lg:w-[500px] sm:p-4 md:w-[600px] p-1 lg:mx-auto md:h-[24px] h-[124px] font-inter font-medium text-[12px] md:text-[15px] lg:text-[16px] leading-[150%] text-center text-[rgba(0,0,0,0.4)]">
          We provide comprehensive solutions to address the challenges in the
          real estate sales market, empowering our partners to achieve
          sustainable growth and success.
        </p>
        {/* green line */}
        <div className="mx-auto md:mt-10 lg:mt-10 justify-center w-[100px] h-[0px] border-[2px] border-[#0BB501]"></div>
      </div>

      {/* Cards For Solution */}
      <div className="flex p-1 flex-col mx-auto  justify-center  items-center  lg:gap-[30px]  relative ">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row  items-center w-full gap-[10px] lg:gap-[30px] lg:w-full">
          {/* Flex for mobile */}
          <div className="flex gap-2 lg:gap-[30px] w-full   h-[289px]">
            {/* Card 1 */}
            <div className="flex flex-col items-start p-6 gap-4 w-[171px] lg:w-[250px] sm:w-[300px] md:w-[300px] h-[289px] bg-white shadow-md rounded-[12px]">
              <div className="w-[40px] h-[40px] relative">
                <div className="absolute w-[40px] h-[40px] lg:left-[10px] lg:top-[10px] rounded-full bg-[#E7F8E6]"></div>
                <p className="absolute w-[11px] h-[24px] left-[10px] lg:left-[18px] text-[16px] top-[10px] lg:top-[18px] font-inter font-bold text-[16px] leading-[150%] text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.85 16.825L12 14.925L15.15 16.85L14.325 13.25L17.1 10.85L13.45 10.525L12 7.125L10.55 10.5L6.9 10.825L9.675 13.25L8.85 16.825ZM5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z"
                      fill="#0BB501"
                    />
                  </svg>
                </p>
              </div>
              <h3 className="w-full lg:w-[179px] h-[50px]  font-medium text-[16px] lg:text-[20px] leading-[18px] lg:leading-[24px]  text-[#000000]">
                Strong Brand & Market Positioning
              </h3>
              <p className="w-full lg:mt-1  lg:w-[202px] h-[95px] font-medium text-[12px] lg:text-[16px] leading-[19px] text-[#00000066]">
                Leverage Reparv's established reputation and market presence to
                instantly boost credibility and attract more clients.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-start p-6 gap-4 w-[171px] lg:w-[263px] sm:w-[300px]  md:w-[300px] h-[289px] bg-white shadow-md rounded-[12px]">
              <div className="w-[40px] h-[40px] relative">
                <div className="absolute w-[40px] h-[40px] lg:left-[10px] lg:top-[10px] rounded-full bg-[#E7F8E6]"></div>
                <p className="absolute w-[11px] h-[24px] left-[10px] lg:left-[18px] text-[16px] top-[10px] lg:top-[18px] font-inter font-bold text-[16px] leading-[150%] text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.95 15.55L16.6 9.9L15.175 8.475L10.95 12.7L8.85 10.6L7.425 12.025L10.95 15.55ZM12 22C9.68333 21.4167 7.77083 20.0875 6.2625 18.0125C4.75417 15.9375 4 13.6333 4 11.1V5L12 2L20 5V11.1C20 13.6333 19.2458 15.9375 17.7375 18.0125C16.2292 20.0875 14.3167 21.4167 12 22ZM12 19.9C13.7333 19.35 15.1667 18.25 16.3 16.6C17.4333 14.95 18 13.1167 18 11.1V6.375L12 4.125L6 6.375V11.1C6 13.1167 6.56667 14.95 7.7 16.6C8.83333 18.25 10.2667 19.35 12 19.9Z"
                      fill="#0BB501"
                    />
                  </svg>
                </p>
              </div>
              <h3 className="w-full lg:w-[164px] h-[48px] font-medium text-[16px] lg:text-[20px] leading-[18px] lg:leading-[24px] text-[#000000]">
                Transparent & Verified Listings
              </h3>
              <p className="w-full lg:mt-3 lg:w-[215px] h-[95px] font-medium text-[12px] lg:text-[16px] leading-[19px] text-[#00000066]">
                Access to a curated database of legally verified properties with
                transparent pricing and complete documentation.
              </p>
            </div>
          </div>
          {/* Flex for mobile */}
          <div className="flex w-full gap-2 lg:gap-[30px]   h-[289px]">
            {/* Card 3 */}
            <div className="flex flex-col items-start p-6 gap-4 w-[171px] lg:w-[250px] sm:w-[300px] md:w-[300px]  bg-white shadow-md rounded-[12px]">
              <div className="w-[40px] h-[40px] relative">
                <div className="absolute w-[40px] h-[40px] lg:left-[10px] lg:top-[10px] rounded-full bg-[#E7F8E6]"></div>
                <p className="absolute w-[11px] h-[24px] left-[10px] lg:left-[18px] text-[16px] top-[10px] lg:top-[18px] font-inter font-bold text-[16px] leading-[150%] text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V11H22V13H18ZM19.2 20L16 17.6L17.2 16L20.4 18.4L19.2 20ZM17.2 8L16 6.4L19.2 4L20.4 5.6L17.2 8ZM5 19V15H4C3.45 15 2.97917 14.8042 2.5875 14.4125C2.19583 14.0208 2 13.55 2 13V11C2 10.45 2.19583 9.97917 2.5875 9.5875C2.97917 9.19583 3.45 9 4 9H8L13 6V18L8 15H7V19H5ZM11 14.45V9.55L8.55 11H4V13H8.55L11 14.45ZM14 15.35V8.65C14.45 9.05 14.8125 9.5375 15.0875 10.1125C15.3625 10.6875 15.5 11.3167 15.5 12C15.5 12.6833 15.3625 13.3125 15.0875 13.8875C14.8125 14.4625 14.45 14.95 14 15.35Z"
                      fill="#0BB501"
                    />
                  </svg>
                </p>
              </div>
              <h3 className="w-[130px] lg:w-[194px] mt-[-8px] lg:mt-0 md:mt-0 h-[50px] lg:h-[48px] font-medium text-[16px] lg:text-[20px] leading-[18px] lg:leading-[24px]  text-[#000000]">
                Advanced Marketing & Lead Generation
              </h3>
              <p className="w-full  lg:mt-2 lg:w-[215px] h-[95px] font-medium text-[12px] lg:text-[16px] leading-[19px] text-[#00000066]">
                Benefit from Reparv's professional marketing campaigns and lead
                generation systems to ensure a consistent flow of qualified
                prospects.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-start p-6 gap-4 w-[171px] lg:w-[263px] sm:w-[300px] md:w-[300px]  lg:h-[289px] bg-white shadow-md rounded-[12px]">
              <div className="w-[40px] h-[40px] relative">
                <div className="absolute w-[40px] h-[40px] lg:left-[10px] lg:top-[10px] rounded-full bg-[#E7F8E6]"></div>
                <p className="absolute w-[11px] h-[24px] left-[10px] lg:left-[18px] text-[16px] top-[10px] lg:top-[18px] font-inter font-bold text-[16px] leading-[150%] text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 18H16V16H8V18ZM8 14H16V12H8V14ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                      fill="#0BB501"
                    />
                  </svg>
                </p>
              </div>
              <h3 className="w-[140px] lg:w-[194px] h-[50px] lg:h-[48px] font-medium text-[16px] lg:text-[20px] leading-[18px] lg:leading-[24px]  text-[#000000]">
                Verified Properties & Transparent Deals
              </h3>
              <p className="w-full lg:mt-1 lg:w-[215px] h-[95px] font-medium text-[12px] lg:text-[16px] leading-[19px] text-[#00000066]">
                Offer clients the confidence of legally verified properties with
                clear documentation and transparent transaction processes.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2*/}
        <div className="flex flex-col lg:flex-row mt-10 lg:mt-0    items-center gap-[16px] lg:gap-[30px] w-full gap-[16px] ">
          {/* Flex for mobile */}
          <div className="flex gap-2 lg:gap-[30px] w-full h-[289px]">
            {/* Card 1 */}
            <div className="flex flex-col items-start p-6 gap-4 w-[171px] lg:w-[246px] sm:w-[300px] md:w-[300px] h-[312px] lg:h-[289px] bg-white shadow-md rounded-[12px]">
              <div className="w-[40px] h-[40px] relative">
                <div className="absolute w-[40px] h-[40px] lg:left-[10px] lg:top-[10px] rounded-full bg-[#E7F8E6]"></div>
                <p className="absolute w-[11px] h-[24px] left-[10px] lg:left-[18px] text-[16px] top-[10px] lg:top-[18px] font-inter font-bold text-[16px] leading-[150%] text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.4 18L2 16.6L7.3 11.3C7.88333 10.7167 8.59167 10.425 9.425 10.425C10.2583 10.425 10.9667 10.7167 11.55 11.3L12.7 12.45C12.9 12.65 13.1375 12.75 13.4125 12.75C13.6875 12.75 13.925 12.65 14.125 12.45L18.575 8H16V6H22V12H20V9.425L15.525 13.875C14.9417 14.4583 14.2333 14.75 13.4 14.75C12.5667 14.75 11.8583 14.4583 11.275 13.875L10.1 12.7C9.91667 12.5167 9.68333 12.425 9.4 12.425C9.11667 12.425 8.88333 12.5167 8.7 12.7L3.4 18Z"
                      fill="#0BB501"
                    />
                  </svg>
                </p>
              </div>
              <h3 className="w-[140px] lg:w-[194px] h-[60px] lg:h-[58px] font-medium text-[16px] lg:text-[20px] leading-[18px] lg:leading-[24px]  text-[#000000]">
                Business Growth Strategies & Expansion Support
              </h3>
              <p className="w-full lg:w-[215px] h-[95px] font-medium text-[12px] lg:text-[16px] leading-[19px] text-[#00000066]">
                Get guidance and resources to scale your sales practice from
                individual clients to larger networks and investor groups.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-start p-6 gap-4 w-[171px] lg:w-[263px] sm:w-[300px] md:w-[300px] h-[312px] lg:h-[289px] bg-white shadow-md rounded-[12px]">
              <div className="w-[40px] h-[40px] relative">
                <div className="absolute w-[40px] h-[40px] lg:left-[10px] lg:top-[10px] rounded-full bg-[#E7F8E6]"></div>
                <p className="absolute w-[11px] h-[24px] left-[10px] lg:left-[18px] text-[16px] top-[10px] lg:top-[18px] font-inter font-bold text-[16px] leading-[150%] text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.24922 22L8.84922 18.8C8.63255 18.7167 8.42839 18.6167 8.23672 18.5C8.04505 18.3833 7.85755 18.2583 7.67422 18.125L4.69922 19.375L1.94922 14.625L4.52422 12.675C4.50755 12.5583 4.49922 12.4458 4.49922 12.3375V11.6625C4.49922 11.5542 4.50755 11.4417 4.52422 11.325L1.94922 9.375L4.69922 4.625L7.67422 5.875C7.85755 5.74167 8.04922 5.61667 8.24922 5.5C8.44922 5.38333 8.64922 5.28333 8.84922 5.2L9.24922 2H14.7492L15.1492 5.2C15.3659 5.28333 15.5701 5.38333 15.7617 5.5C15.9534 5.61667 16.1409 5.74167 16.3242 5.875L19.2992 4.625L22.0492 9.375L19.4742 11.325C19.4909 11.4417 19.4992 11.5542 19.4992 11.6625V12.3375C19.4992 12.4458 19.4826 12.5583 19.4492 12.675L22.0242 14.625L19.2742 19.375L16.3242 18.125C16.1409 18.2583 15.9492 18.3833 15.7492 18.5C15.5492 18.6167 15.3492 18.7167 15.1492 18.8L14.7492 22H9.24922ZM10.9992 20H12.9742L13.3242 17.35C13.8409 17.2167 14.3201 17.0208 14.7617 16.7625C15.2034 16.5042 15.6076 16.1917 15.9742 15.825L18.4492 16.85L19.4242 15.15L17.2742 13.525C17.3576 13.2917 17.4159 13.0458 17.4492 12.7875C17.4826 12.5292 17.4992 12.2667 17.4992 12C17.4992 11.7333 17.4826 11.4708 17.4492 11.2125C17.4159 10.9542 17.3576 10.7083 17.2742 10.475L19.4242 8.85L18.4492 7.15L15.9742 8.2C15.6076 7.81667 15.2034 7.49583 14.7617 7.2375C14.3201 6.97917 13.8409 6.78333 13.3242 6.65L12.9992 4H11.0242L10.6742 6.65C10.1576 6.78333 9.67839 6.97917 9.23672 7.2375C8.79505 7.49583 8.39089 7.80833 8.02422 8.175L5.54922 7.15L4.57422 8.85L6.72422 10.45C6.64089 10.7 6.58255 10.95 6.54922 11.2C6.51589 11.45 6.49922 11.7167 6.49922 12C6.49922 12.2667 6.51589 12.525 6.54922 12.775C6.58255 13.025 6.64089 13.275 6.72422 13.525L4.57422 15.15L5.54922 16.85L8.02422 15.8C8.39089 16.1833 8.79505 16.5042 9.23672 16.7625C9.67839 17.0208 10.1576 17.2167 10.6742 17.35L10.9992 20ZM12.0492 15.5C13.0159 15.5 13.8409 15.1583 14.5242 14.475C15.2076 13.7917 15.5492 12.9667 15.5492 12C15.5492 11.0333 15.2076 10.2083 14.5242 9.525C13.8409 8.84167 13.0159 8.5 12.0492 8.5C11.0659 8.5 10.2367 8.84167 9.56172 9.525C8.88672 10.2083 8.54922 11.0333 8.54922 12C8.54922 12.9667 8.88672 13.7917 9.56172 14.475C10.2367 15.1583 11.0659 15.5 12.0492 15.5Z"
                      fill="#0BB501"
                    />
                  </svg>
                </p>
              </div>
              <h3 className="w-[140px] lg:w-[194px] h-[60px] lg:h-[48px] font-medium text-[16px] lg:text-[20px] leading-[18px] lg:leading-[24px]  text-[#000000]">
                Sales Automation & CRM Tools
              </h3>
              <p className="w-full lg:w-[215px] h-[95px] font-medium text-[12px] lg:text-[16px] leading-[19px] text-[#00000066]">
                Access professional client relationship management systems and
                sales automation tools to increase efficiency and follow-up
                effectiveness.
              </p>
            </div>
          </div>
          {/* Flex for mobile */}
          <div className="flex gap-2 mt-5 lg:mt-0  lg:gap-[30px] h-[289px]">
            {/* Card 3 */}
            <div className="flex  flex-col items-start p-6 gap-4 w-[171px] lg:w-[263px] sm:w-[300px] md:w-[300px] h-[312px] lg:h-[289px] bg-white shadow-md rounded-[12px]">
              <div className="w-[40px] h-[40px] relative">
                <div className="absolute w-[40px] h-[40px] lg:left-[10px] lg:top-[10px] rounded-full bg-[#E7F8E6]"></div>
                <p className="absolute w-[11px] h-[24px] left-[10px] lg:left-[18px] text-[16px] top-[10px] lg:top-[18px] font-inter font-bold text-[16px] leading-[150%] text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 21V19H10V17H4C3.45 17 2.97917 16.8042 2.5875 16.4125C2.19583 16.0208 2 15.55 2 15V5C2 4.45 2.19583 3.97917 2.5875 3.5875C2.97917 3.19583 3.45 3 4 3H20C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V15C22 15.55 21.8042 16.0208 21.4125 16.4125C21.0208 16.8042 20.55 17 20 17H14V19H16V21H8ZM4 15H20V5H4V15Z"
                      fill="#0BB501"
                    />
                  </svg>
                </p>
              </div>
              <h3 className="w-[140px] lg:w-[194px] h-[60px] lg:h-[48px] font-medium text-[16px] lg:text-[20px] leading-[18px] lg:leading-[24px]  text-[#000000]">
                Digital Business Management Tools
              </h3>
              <p className="w-full lg:w-[215px] h-[95px] font-medium text-[12px] lg:text-[16px] leading-[19px] text-[#00000066]">
                Utilize Reparv's suite of digital tools for project tracking,
                client management, and financial reporting to run your business
                efficiently.
              </p>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col  items-start p-6 gap-4 w-[171px] lg:w-[263px] sm:w-[300px] md:w-[300px] h-[312px] lg:h-[289px] bg-white shadow-md rounded-[12px]">
              <div className="w-[40px] h-[40px] relative">
                <div className="absolute w-[40px] h-[40px] lg:left-[10px] lg:top-[10px] rounded-full bg-[#E7F8E6]"></div>
                <p className="absolute w-[11px] h-[24px] left-[10px] lg:left-[18px] text-[16px] top-[10px] lg:top-[18px] font-inter font-bold text-[16px] leading-[150%] text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 20V14H8V20H5ZM11 20V9H14V20H11ZM17 20V4H20V20H17Z"
                      fill="#0BB501"
                    />
                  </svg>
                </p>
              </div>
              <h3 className="w-full lg:ml-0 md:w-[160px] lg:w-[214px] h-[60px] lg:h-[58px] font-medium text-[16px] lg:text-[20px] leading-[18px] lg:leading-[24px]  text-[#000000]">
                Data-Driven Insights & Investment Guidance
              </h3>
              <p className="w-full lg:mt-2 lg:w-[215px] h-[95px] font-medium text-[12px] lg:text-[16px] leading-[19px] text-[#00000066]">
                Provide clients with powerful market data and investment
                analysis to support informed decision-making and build your
                credibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Partner Section */}

      <div className="flex  mx-auto justify-center flex-col lg:items-start  items-center gap-8 p-0 relative w-full mt-20">
        {/* Text Container */}
        <div className="flex flex-col justify-center items-center gap-4 w-full h-[128px]">
          {/* Title of section */}
          <h1 className="w-full h-[88px] lg:h-[48px] text-[28px] lg:text-[40px] font-semibold text-center text-[#076300]">
            Who Will Become A Sales Partner
          </h1>
          {/* Paragraph */}
          <p className="lg:w-[500px] md:w-[600px] lg:mx-auto w-full mx-auto h-[48px] text-[12px] md:text-[15px] lg:text-[16px] font-medium text-center text-[#00000066]">
            Our sales partnership program is designed for diverse individuals
            looking to build a successful career in real estate sales with
            proper support and tools.
          </p>
          {/* green line */}
          <div className="w-[100px] mt-5 h-0 border-2 border-[#0BB501]" />
        </div>

        <div className="flex flex-col mx-auto p-2   gap-[16px] lg:gap-[30px]  relative ">
          {/* Cards row 1 */}
          <div className="flex flex-col mx-auto justify-center md:w-full  items-center gap-[10px] lg:gap-0  lg:flex-row relative flex-col   ">
            {/*   Flex for mobile */}
            <div className="flex lg:p-0 p-1  items-center w-full md:w-[500px] sm:w-[458px] gap-[16px] lg:w-full">
              {/*Student card */}

              <div
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${studentBg})`,
                }}
                // className="flex flex-col justify-center lg:justify-end items-start p-6 gap-3 w-full lg:w-[290px]   h-[265px]  lg:h-[306px] bg-cover  border border-black/10 shadow-md rounded-xl box-border bg-black/50 bg-blend-overlay"
                className="group flex flex-col justify-center lg:justify-end items-start p-6 gap-3 w-full lg:w-[250px] md:w-[500px] sm:w-[500px] h-[265px] lg:h-[306px] bg-cover border border-black/10 shadow-md rounded-xl box-border bg-black/50 bg-blend-overlay  "
              >
                <h2 className="text-white text-[16px] lg:text-xl">Students</h2>
                <p className="flex lg:hidden opacity-80 text-white text-[12px] lg:text-sm  group-hover:block">
                  Perfect for students looking to start their career in real
                  estate while still completing their education, offering
                  flexible working hours and valuable industry experience.
                </p>
              </div>

              {/* Professional Frame */}

              <div
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${professionalBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="group flex flex-col justify-center lg:justify-end items-start p-6 gap-3 w-full lg:w-[250px] md:w-[500px] sm:w-[500px] h-[265px] lg:h-[306px] bg-cover border border-black/10 shadow-md rounded-xl box-border bg-black/50 bg-blend-overlay  "
              >
                <h2 className="text-white text-[16px] lg:text-xl mt-auto">
                  Working Professionals
                </h2>
                <p className="flex lg:hidden  opacity-80  text-white text-[12px] lg:text-sm  group-hover:block">
                  Ideal for professionals seeking additional income streams or a
                  transition into the lucrative real estate industry with
                  part-time or full-time commitment options.
                </p>
              </div>
            </div>
            {/* Flex for mobile */}
            <div className="flex p-1 lg:p-0 lg:ml-[20px] items-center w-full md:w-[500px] sm:w-[500px] gap-[16px] lg:w-full">
              {/* House wife card*/}
              <div
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${homeBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="group flex flex-col justify-center lg:justify-end items-start p-6 gap-3 w-full lg:w-[250px] md:w-[500px] sm:w-[500px] h-[265px] lg:h-[306px] bg-cover border border-black/10 shadow-md rounded-xl box-border bg-black/50 bg-blend-overlay  "
              >
                <h2 className="text-white text-[16px] lg:text-xl mt-auto">
                  House Wife
                </h2>
                <p className="flex lg:hidden  opacity-80  text-white text-[12px] lg:text-sm  group-hover:block">
                  Empowering homemakers to utilize their community connections
                  and people skills to build a rewarding career with flexible
                  hours that accommodate family responsibilities.
                </p>
              </div>

              {/* Real Estate Agent Card */}
              <div
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${doctorBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="group flex flex-col justify-center lg:justify-end items-start p-6 gap-3 w-full lg:w-[250px] md:w-[500px] sm:w-[500px] h-[265px] lg:h-[306px] bg-cover border border-black/10 shadow-md rounded-xl box-border bg-black/50 bg-blend-overlay  "
              >
                <h2 className="text-white text-[16px] lg:text-xl mt-auto">
                  Existing Real Estate Agents
                </h2>
                <p className="flex lg:hidden  opacity-80  text-white text-[12px] lg:text-sm  group-hover:block">
                  For current agents seeking better support systems, verified
                  properties, and higher commission structures to enhance their
                  existing real estate practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
