// import JoinFormSection from "@/components/project-partner/JoinFormSection";
// import MarketReality from "@/components/project-partner/MarketReality";
// import ProjectPartner from "@/components/project-partner/Partner";
// import Section1 from "@/components/project-partner/Section1";
// import SolutionSection from "@/components/project-partner/Solution";

import JoinFormSection from "../../components/project-partner/JoinFormSection";
import MarketReality from "../../components/project-partner/MarketReality";
import ProjectPartner from "../../components/project-partner/Partner";
import Section1 from "../../components/project-partner/Section1";
import SolutionSection from "../../components/project-partner/Solution";

export default function ProjectPartnerPage() {
  return (
    <div className="w-full m-0 p-0 ">
      <Section1 />
      <ProjectPartner />
      <MarketReality />
      <SolutionSection />
      <JoinFormSection />
    </div>
  );
}
