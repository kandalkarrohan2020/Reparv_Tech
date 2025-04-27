import SalesHeroSection from "../../components/sales_partner/HeroSection";
import SalesJoinForm from "../../components/sales_partner/JoinForm";
import MarketCardSection from "../../components/sales_partner/MarketCardSection";
import SaleSolutionSection from "../../components/sales_partner/SalesSolutionSection";

export default function SalesPartner() {
  return (
    <div className="w-full m-0 p-0 ">
      <SalesHeroSection />
      <MarketCardSection />
      <SaleSolutionSection />
      <SalesJoinForm />
    </div>
  );
}
