import TerritoryHeroSection from "../../components/territory_partner/HeroSection";
import TerritoryPartnerSection from "../../components/territory_partner/TerritorypartnerSection";
import TerritoryJoinFormSection from "../../components/territory_partner/TJoinSection";
import TerritoryPartnerMarketSection from "../../components/territory_partner/TMarketReality";
import TerritorySolutionSection from "../../components/territory_partner/TSolutionSection";

export default function TerritoryPartner() {
  return (
    <div className="w-full m-0 p-0">
      <TerritoryHeroSection />
      <TerritoryPartnerSection />
      <TerritoryPartnerMarketSection />
      <TerritorySolutionSection />
      <TerritoryJoinFormSection />
    </div>
  );
}
