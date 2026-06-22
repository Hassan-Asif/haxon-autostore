<script setup>
import HeroSlider from '../components/home/HeroSlider.vue'
import BrandStrip from '../components/home/BrandStrip.vue'
import TrustStrip from '../components/home/TrustStrip.vue';
import CategoryGrid from '../components/home/CategoryGrid.vue'
import FeaturedProducts from '../components/home/FeaturedProducts.vue'
import WhyChooseUs from '../components/home/WhyChooseUs.vue'
import CTASection from '../components/home/CTASection.vue'
</script>

<template>
  <div class="bg-[#121212] text-white overflow-hidden">
    <HeroSlider />
    <BrandStrip />
    <TrustStrip />
    <CategoryGrid />
    <FeaturedProducts />
    <WhyChooseUs />
    <CTASection />
  </div>
</template>