<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import TrustStrip from '../components/home/TrustStrip.vue'
import FeaturedCollections from '../components/home/FeaturedCollections.vue'
import BrandStrip from '../components/home/BrandStrip.vue'
import FeaturedProducts from '../components/home/FeaturedProducts.vue'
import VehicleFinder from '../components/home/VehicleFinder.vue'
import HaxonStandard from '../components/home/HaxonStandard.vue'

// Future
// import EditorialSection from '../components/home/EditorialSection.vue'
// import Newsletter from '../components/home/Newsletter.vue'
</script>

<template>
  <div class="overflow-hidden bg-[#F6F6F4] text-[#121212]">
    <HeroSection />
    <TrustStrip />

    <FeaturedCollections />
    <BrandStrip />

    <FeaturedProducts />
    <VehicleFinder />

    <HaxonStandard />

    <!-- Future Expansion -->
    <!-- <EditorialSection /> -->
    <!-- <Newsletter /> -->
  </div>
</template>