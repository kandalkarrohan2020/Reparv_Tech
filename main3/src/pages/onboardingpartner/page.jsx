import JoinFormSection from "@/components/onboarding_partner/OnboardingJoinForm";
import OnboardingHeroSection from "../../components/onboarding_partner/HeroSection";
import OnboardingMarketReality from "../../components/onboarding_partner/OnboardingMarket";
import OnboardingSolutionSection from "../../components/onboarding_partner/OnboardingSolution";

export default function OnboardingPage() {
  return (
    <div className="w-full m-0 p-0 ">
      <OnboardingHeroSection />
      <OnboardingMarketReality />
      <OnboardingSolutionSection />
      <JoinFormSection />
    </div>
  );
}
