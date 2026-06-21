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
      rounded-2xl
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-1
      transition
      duration-300
      overflow-hidden
    "
  >
    <img
      :src="
        product.image ||
        '/images/no-image.jpg'
      "
      :alt="product.name"
      class="w-full h-60 object-cover"
      @error="
        $event.target.src =
          '/images/no-image.jpg'
      "
    />

    <div class="p-5">
      <span
        class="
          inline-block
          bg-slate-100
          text-slate-600
          text-xs
          px-3
          py-1
          rounded-full
        "
      >
        {{ product.category }}
      </span>

      <h3
        class="
          font-bold
          text-lg
          mt-4
          line-clamp-2
        "
      >
        {{ product.name }}
      </h3>

      <p
        class="
          text-red-600
          text-2xl
          font-bold
          mt-4
        "
      >
        Rs. {{ product.price }}
      </p>

      <p
        class="
          text-sm
          text-gray-500
          mt-3
        "
      >
        {{ product.availabilityStatus }}
      </p>

      <router-link
        :to="`/products/${product.id}`"
        class="
          block
          w-full
          mt-5
          bg-slate-900
          hover:bg-red-600
          text-white
          py-3
          rounded-xl
          text-center
          transition
        "
      >
        View Product
      </router-link>
    </div>
  </div>
</template>