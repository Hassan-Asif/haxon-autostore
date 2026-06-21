import { defineStore } from 'pinia'
import { auth } from '../firebase/config'
import { login, logout } from '../services/authService'

export const useAuthStore = defineStore(
  'auth',
  {
    state: () => ({
      user: null,
    }),

    actions: {
      async login(email, password) {
        const result =
          await login(email, password)

        this.user = result.user
      },

      async logout() {
        await logout()
        this.user = null
      },

      init() {
        this.user = auth.currentUser
      },
    },
  }
)