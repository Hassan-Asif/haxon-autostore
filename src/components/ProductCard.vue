<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="
      bg-white
      rounded-xl
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition
      duration-300
      overflow-hidden
      border
      border-slate-100
    "
  >
    <img
      :src="
        product.image ||
        '/images/no-image.jpg'
      "
      :alt="product.name"
      class="w-full h-32 md:h-56 object-cover"
      @error="
        $event.target.src =
          '/images/no-image.jpg'
      "
    />

    <div class="p-3 md:p-5">
      <span
        class="
          inline-block
          bg-slate-100
          text-slate-600
          text-[10px]
          md:text-xs
          px-2
          py-1
          rounded-full
        "
      >
        {{ product.category }}
      </span>

      <h3
        class="
          font-semibold
          text-sm
          md:text-lg
          mt-2
          line-clamp-2
          min-h-[40px]
        "
      >
        {{ product.name }}
      </h3>

      <p
        class="
          text-red-600
          text-base
          md:text-2xl
          font-bold
          mt-2
        "
      >
        Rs. {{ product.price }}
      </p>

      <p
        class="
          text-[11px]
          md:text-sm
          text-gray-500
          mt-1
          line-clamp-2
        "
      >
        {{ product.availabilityStatus }}
      </p>

      <router-link
        :to="`/products/${product.id}`"
        class="
          block
          w-full
          mt-3
          bg-slate-900
          hover:bg-red-600
          text-white
          py-2
          md:py-3
          text-xs
          md:text-base
          rounded-lg
          text-center
          transition
          font-medium
        "
      >
        View Product
      </router-link>
    </div>
  </div>
</template>