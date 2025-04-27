import { FaStar } from "react-icons/fa";
import aboutImg from "../assets/aboutImg.svg";
import { IoMdStar } from "react-icons/io";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Our Journey Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-4xl font-semibold text-[#076300]">Our Journey</h2>
          <ul className="mt-4 space-y-4 text-[#00000066] ">
            <li>
              <strong className="text-black">2023 -</strong> We will start with
              offline sales and marketing in real estate to provide clear titled
              properties.
            </li>
            <li>
              <strong className="text-black">2024 -</strong> We find a problem
              where the on-time booking update system is missing in the complete
              real estate business process.
            </li>
            <li>
              <strong className="text-black">2025 -</strong> Now we are ready to
              spread this system PAN India to solve buyer and seller problems.
            </li>
            <li>
              <strong className="text-black">2026 -</strong> Reparv is targeting
              expansion to small and big towns with minimal investment.
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-[#0BB501] to-[#076300] order-1 md:order-2 rounded-lg">
          <img
            src={aboutImg}
            alt="Our Journey"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-semibold text-[#076300] ">Our Values</h2>
        <p className="mt-2 text-[#00000066]">
          We are committed to solving every property buyer's and seller's needs,
          from property search to final documentation, through a hassle-free,
          seamless, and transparent process.
        </p>
        <div className="mt-6 grid md:grid-cols-3 gap-5 p-8 md:gap-8 lg-gap-10 bg-[#076300]  rounded-lg">
          <div className="text-white flex flex-col gap-4 border-b border-[#FFFFFF66] pb-4">
            <div className="w-full flex gap-4 items-center">
              <div className="w-15 h-15 flex items-center justify-center rounded-full bg-white ">
                <IoMdStar className="text-3xl text-[#076300]" />
              </div>
              <h3 className="font-bold text-lg">Truth</h3>
            </div>
            <p className="text-xs text-[#FFFFFF99] ">
              Real estate transactions are challenging, but the Reparv platform
              solves them with honesty and efficiency.
            </p>
          </div>
          <div className="text-white flex flex-col gap-4 border-b border-[#FFFFFF66] pb-4">
            <div className="w-full flex gap-4 items-center">
              <div className="w-15 h-15 flex items-center justify-center rounded-full bg-white ">
                <IoMdStar className="text-3xl text-[#076300]" />
              </div>
              <h3 className="font-bold text-lg">Trust</h3>
            </div>
            <p className="text-xs text-[#FFFFFF99] ">
            Trust in real estate transactions is often uncertain, but Reparv has established a seamless process to solve this problem effortlessly.
            </p>
          </div>
          <div className="text-white flex flex-col gap-4 border-b border-[#FFFFFF66] pb-4">
            <div className="w-full flex gap-4 items-center">
              <div className="w-15 h-15 flex items-center justify-center rounded-full bg-white ">
                <IoMdStar className="text-3xl text-[#076300]" />
              </div>
              <h3 className="font-bold text-lg">Transparency</h3>
            </div>
            <p className="text-xs text-[#FFFFFF99] ">
            The lack of a trackable, technology-driven system keeps most real estate processes manual, making understanding is a major challenge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
