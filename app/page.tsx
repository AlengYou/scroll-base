import Hero from "@/components/hero"
import ProductFeatures from "@/components/product-features"
import ParallaxSection from "@/components/parallax-section"
import ScrollingImage from "@/components/scrolling-image"
import ProductSpecs from "@/components/product-specs"
import Footer from "@/components/footer"
import RightSideImage from "@/components/right-side-image"

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <RightSideImage />
      <ProductFeatures />
      <ParallaxSection />
      <ScrollingImage />
      <ProductSpecs />
      <Footer />
    </main>
  )
}

