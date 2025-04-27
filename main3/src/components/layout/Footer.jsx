import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "/src/assets/footerlogo.png";

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={`flex flex-col items-start p-6  lg:p-24 gap-[40px] absolute w-full lg:w-full h-[420px] lg:h-[506px]  bg-black left-0 ${
        currentPath == "/territorypartner"
          ? "lg:top-[4500px] top-[6000px] md:top-[7200px]"
          : `${
              currentPath == "/projectpartner"
                ? "lg:top-[4600px] md:top-[6100px] top-[7230px]"
                : `${
                    currentPath == "/salespartner"
                      ? "lg:top-[4450px] md:top-[6900px] top-[6800px] "
                      : `${
                          currentPath == "/onboardingpartner"
                            ? "lg:top-[4781px] top-[7150px] md:top-[7150px] "
                            : "lg:top-[4381px] top-[6260px] md:top-[6400px]"
                        }`
                  }`
            }
                    `
      } `}
    >
      {/* logo */}
      <div className="flex flex-row items-start p-5 md:w-[180px] h-[90px] lg:p-0 lg:w-[137.58px] lg:h-[58px] flex-none order-0 flex-grow-0">
        <img src={logo} alt="logo" className="w-full h-full" />
      </div>
      {/* footer menu */}
      <div className="flex flex-col lg:flex-row justify-between   items-start p-0 gap-[8px] w-full h-[180px] lg:h-[166px] flex-none order-1 align-self-stretch flex-grow-0">
        {/* menu 1 */}
        <div className="flex lg:w-[150px] flex-col gap-5 mt-10 lg:mt-0">
          <div className="absolute md:top-[20px] md:mx-auto top-[50px]  justify-between left-[230px] lg:static flex flex-col  p-0 gap-[30px] mx-auto w-[96px] h-[166px] ">
            <div className="hidden lg:flex w-[93px] h-[24px] text-white font-inter font-bold text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-0 flex-grow-0">
              Company
            </div>

            <div className="flex flex-col items-start p-0 gap-[20px] w-[96px] h-[112px] ">
              <NavLink
                href="/"
                className="w-[89px] h-[24px] text-white font-inter font-medium text-[12px] lg:text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-0 flex-grow-0"
              >
                Properties
              </NavLink>
              <NavLink
                to="/join-our-team"
                className="lg:hidden w-[114px] h-[24px] text-white font-inter font-medium text-[12px] lg:text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-1 flex-grow-0"
              >
                Join Our team
              </NavLink>

              <NavLink
                to="/about-us"
                className="w-[80px] h-[24px] text-white font-inter font-medium text-[12px] lg:text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-1 flex-grow-0"
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact-us"
                className="5 h-[24px] text-white font-inter font-medium text-[12px] lg:text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-2 flex-grow-0"
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>

        {/* menu 2 */}
        <div className="hidden lg:w-[530px] lg:flex flex-col gap-5">
          <div className="absolute md:top-[20px] md:mx-auto top-[50px]  justify-between left-[230px] lg:static flex flex-col  p-0 gap-[10px] mx-auto w-[96px] h-[166px] ">
            <div className="hidden lg:flex w-[283px] h-[14px] text-white font-inter font-bold text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-0 flex-grow-0">
              Become a Professional!
            </div>

            <div className="flex flex-col items-start p-0 gap-[20px] w-[96px] h-[112px] ">
              <NavLink
                to="/salespartner"
                className="w-[150px] h-[14px] text-white font-inter font-medium text-[12px] lg:text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-0 flex-grow-0"
              >
                Sales Partner
              </NavLink>
              <NavLink
                to="/territorypartner"
                className="w-[154px] h-[14px] text-white font-inter font-medium text-[12px] lg:text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-1 flex-grow-0"
              >
                Territory Partner
              </NavLink>

              <NavLink
                to="/onboardingpartner"
                className="w-[190px] h-[14px] text-white font-inter font-medium text-[12px] lg:text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-1 flex-grow-0"
              >
                Onboarding Partner
              </NavLink>

              <NavLink
                to="/projectpartner"
                className="w-[153px] h-[14px] text-white font-inter font-medium text-[12px] lg:text-[18px] leading-[24px] tracking-[-0.006em] flex-none order-2 flex-grow-0"
              >
                Project Partner
              </NavLink>
            </div>
          </div>
        </div>

        {/* menu 3 */}
        <div className=" flex flex-col lg:justify-center items-start p-0 gap-[30px] mx-auto lg:w-[238px] h-[106px] flex-none order-2 flex-grow-0">
          {/* Social Link */}
          <div className="mx-auto lg:w-[104px] h-[24px] text-white font-inter font-bold text-[20px] leading-[24px] tracking-[-0.006em] flex-none order-0 flex-grow-0">
            Social Link
          </div>

          <div className="flex flex-row items-center p-0 gap-[10px] lg:w-[238px] h-[52px] flex-none order-1 flex-grow-0">
            {/* Button 1 */}
            <NavLink
              to="https://www.facebook.com/reparv"
              className="flex flex-row items-start p-[14px] gap-[10px] w-[52px] h-[52px] bg-[#141414] rounded-[58px] flex-none order-0 flex-grow-0"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7432 3.98403H17.9992V0.168036C16.9069 0.0544523 15.8094 -0.00162514 14.7112 3.58369e-05C11.4472 3.58369e-05 9.21524 1.99203 9.21524 5.64003V8.78402H5.53125V13.056H9.21524V24H13.6312V13.056H17.3032L17.8552 8.78402H13.6312V6.06003C13.6312 4.80003 13.9672 3.98403 15.7432 3.98403Z"
                  fill="white"
                />
              </svg>
            </NavLink>
            {/* Button 2 */}
            <NavLink
              to="https://www.linkedin.com/company/reparv/"
              className="flex flex-row items-start p-[14px] gap-[10px] w-[52px] h-[52px] bg-[#141414] rounded-[58px] flex-none order-1 flex-grow-0"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.4686 2.00014H3.52859C3.33817 1.9975 3.14909 2.03239 2.97216 2.10282C2.79522 2.17326 2.6339 2.27786 2.49739 2.41065C2.36089 2.54344 2.25188 2.70182 2.17659 2.87675C2.1013 3.05167 2.0612 3.23972 2.05859 3.43014V20.5701C2.0612 20.7606 2.1013 20.9486 2.17659 21.1235C2.25188 21.2985 2.36089 21.4568 2.49739 21.5896C2.6339 21.7224 2.79522 21.827 2.97216 21.8975C3.14909 21.9679 3.33817 22.0028 3.52859 22.0001H20.4686C20.659 22.0028 20.8481 21.9679 21.025 21.8975C21.202 21.827 21.3633 21.7224 21.4998 21.5896C21.6363 21.4568 21.7453 21.2985 21.8206 21.1235C21.8959 20.9486 21.936 20.7606 21.9386 20.5701V3.43014C21.936 3.23972 21.8959 3.05167 21.8206 2.87675C21.7453 2.70182 21.6363 2.54344 21.4998 2.41065C21.3633 2.27786 21.202 2.17326 21.025 2.10282C20.8481 2.03239 20.659 1.9975 20.4686 2.00014ZM8.08859 18.7401H5.08859V9.74014H8.08859V18.7401ZM6.58859 8.48014C6.17486 8.48014 5.77806 8.31578 5.48551 8.02323C5.19295 7.73067 5.02859 7.33388 5.02859 6.92014C5.02859 6.5064 5.19295 6.10961 5.48551 5.81705C5.77806 5.5245 6.17486 5.36014 6.58859 5.36014C6.80829 5.33522 7.03077 5.35699 7.24147 5.42402C7.45217 5.49105 7.64633 5.60183 7.81125 5.7491C7.97617 5.89637 8.10812 6.07682 8.19846 6.27862C8.28881 6.48043 8.33551 6.69904 8.33551 6.92014C8.33551 7.14124 8.28881 7.35985 8.19846 7.56166C8.10812 7.76346 7.97617 7.94391 7.81125 8.09118C7.64633 8.23845 7.45217 8.34923 7.24147 8.41626C7.03077 8.48329 6.80829 8.50505 6.58859 8.48014ZM18.9086 18.7401H15.9086V13.9101C15.9086 12.7001 15.4786 11.9101 14.3886 11.9101C14.0513 11.9126 13.7228 12.0184 13.4474 12.2133C13.1721 12.4082 12.9631 12.6828 12.8486 13.0001C12.7703 13.2352 12.7364 13.4827 12.7486 13.7301V18.7301H9.74859C9.74859 18.7301 9.74859 10.5501 9.74859 9.73014H12.7486V11.0001C13.0211 10.5272 13.4175 10.1377 13.895 9.87334C14.3726 9.60902 14.9132 9.47999 15.4586 9.50014C17.4586 9.50014 18.9086 10.7901 18.9086 13.5601V18.7401Z"
                  fill="white"
                />
              </svg>
            </NavLink>
            {/* Button 3 */}
            <NavLink
              to="https://www.instagram.com/reparv.official/"
              className="flex flex-row items-start p-[14px] gap-[10px] w-[52px] h-[52px] bg-[#141414] rounded-[58px] flex-none order-2 flex-grow-0"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 11C3 7.229 3 5.343 4.172 4.172C5.344 3.001 7.229 3 11 3H13C16.771 3 18.657 3 19.828 4.172C20.999 5.344 21 7.229 21 11V13C21 16.771 21 18.657 19.828 19.828C18.656 20.999 16.771 21 13 21H11C7.229 21 5.343 21 4.172 19.828C3.001 18.656 3 16.771 3 13V11ZM18 7.5C18 7.89782 17.842 8.27936 17.5607 8.56066C17.2794 8.84196 16.8978 9 16.5 9C16.1022 9 15.7206 8.84196 15.4393 8.56066C15.158 8.27936 15 7.89782 15 7.5C15 7.10218 15.158 6.72064 15.4393 6.43934C15.7206 6.15804 16.1022 6 16.5 6C16.8978 6 17.2794 6.15804 17.5607 6.43934C17.842 6.72064 18 7.10218 18 7.5ZM14 13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15C11.4696 15 10.9609 14.7893 10.5858 14.4142C10.2107 14.0391 10 13.5304 10 13C10 12.4696 10.2107 11.9609 10.5858 11.5858C10.9609 11.2107 11.4696 11 12 11C12.5304 11 13.0391 11.2107 13.4142 11.5858C13.7893 11.9609 14 12.4696 14 13ZM16 13C16 14.0609 15.5786 15.0783 14.8284 15.8284C14.0783 16.5786 13.0609 17 12 17C10.9391 17 9.92172 16.5786 9.17157 15.8284C8.42143 15.0783 8 14.0609 8 13C8 11.9391 8.42143 10.9217 9.17157 10.1716C9.92172 9.42143 10.9391 9 12 9C13.0609 9 14.0783 9.42143 14.8284 10.1716C15.5786 10.9217 16 11.9391 16 13Z"
                  fill="white"
                />
              </svg>
            </NavLink>
            {/* Button 4 */}
            <NavLink
              to="https://www.youtube.com/@reparv"
              className="flex flex-row items-start p-[14px] gap-[10px] w-[52px] h-[52px] bg-[#141414] rounded-[58px] flex-none order-3 flex-grow-0"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.001 9.70998C23.0505 8.27864 22.7374 6.858 22.091 5.57998C21.6524 5.05558 21.0437 4.70169 20.371 4.57998C17.5885 4.32751 14.7945 4.22403 12.001 4.26998C9.21765 4.22194 6.43371 4.32208 3.661 4.56998C3.11282 4.6697 2.60552 4.92683 2.201 5.30998C1.301 6.13998 1.201 7.55998 1.101 8.75998C0.955916 10.9175 0.955916 13.0824 1.101 15.24C1.12993 15.9154 1.2305 16.5858 1.401 17.24C1.52158 17.745 1.76553 18.2123 2.111 18.6C2.51827 19.0034 3.03739 19.2752 3.601 19.38C5.75692 19.6461 7.92922 19.7564 10.101 19.71C13.601 19.76 16.671 19.71 20.301 19.43C20.8785 19.3316 21.4122 19.0595 21.831 18.65C22.111 18.3699 22.3201 18.0271 22.441 17.65C22.7986 16.5526 22.9743 15.4041 22.961 14.25C23.001 13.69 23.001 10.31 23.001 9.70998ZM9.741 14.85V8.65998L15.661 11.77C14.001 12.69 11.811 13.73 9.741 14.85Z"
                  fill="white"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center item-center mx-auto lg:mt-5 p-4 lg:gap-[38px]   lg:w-7xl h-[44px] flex-none order-2 align-self-stretch flex-grow-0">
        <p className="w-full font-inter font-medium text-[12px] lg:text-[18px] lg:leading-[24px] tracking-[-0.006em] text-white/60">
          @2024 reparv.com All Right Reserved
        </p>
        <Link to="/terms-and-conditions" className=" cursor-pointer hidden lg:flex w-full lg:w-[323px] h-[24px] font-inter font-medium text-[12px] lg:text-[18px] lg:leading-[24px] tracking-[-0.006em] text-white/60 flex-none order-0 flex-grow-0">
          Terms & Conditions
        </Link>
        <Link to="/privacy-policy" className="hidden cursor-pointer lg:flex w-full lg:w-[323px] h-[24px] font-inter font-medium text-[12px] lg:text-[18px] lg:leading-[24px] tracking-[-0.006em] text-white/60 flex-none order-0 flex-grow-0">
          Privacy Policy
        </Link>
        <Link to="/refund-policy" className="hidden cursor-pointer lg:flex w-full lg:w-[323px] h-[24px] font-inter font-medium text-[12px] lg:text-[18px] lg:leading-[24px] tracking-[-0.006em] text-white/60 flex-none order-0 flex-grow-0">
          Refund Policy
        </Link>
      </div>
    </div>
  );
}
