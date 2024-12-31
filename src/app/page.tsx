
import HeroSection from "./components/Hero";
import PricingSection from "./components/PricingSection";
import { TestimonialSection } from "./components/Testamonials";
import { BlogSection } from "./components/BlogSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PricingSection />
      <TestimonialSection/>
      <BlogSection />
    </div>
  );
}
