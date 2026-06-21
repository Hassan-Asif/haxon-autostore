import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => state.items.length,

    totalPrice: (state) =>
      state.items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      ),
  },

  actions: {
    addToCart(product) {
      const existing = this.items.find(
        item => item.id === product.id
      )

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1,
        })
      }
    },

    removeFromCart(id) {
      this.items = this.items.filter(
        item => item.id !== id
      )
    },

    increaseQuantity(id) {
      const item = this.items.find(
        item => item.id === id
      )

      if (item) {
        item.quantity++
      }
    },

    decreaseQuantity(id) {
      const item = this.items.find(
        item => item.id === id
      )

      if (item && item.quantity > 1) {
        item.quantity--
      }
    },

    clearCart() {
      this.items = []
    },
  },
})