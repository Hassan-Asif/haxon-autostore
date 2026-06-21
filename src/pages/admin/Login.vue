<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true

    await authStore.login(
      email.value,
      password.value
    )

    router.push('/admin')
  } catch (err) {
    alert('Invalid credentials')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center"
  >
    <div
      class="bg-white shadow rounded-2xl p-8 w-full max-w-md"
    >
      <h1
        class="text-3xl font-bold mb-6 text-center"
      >
        Admin Login
      </h1>

      <div class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full border p-3 rounded-lg"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border p-3 rounded-lg"
        />

        <button
          @click="handleLogin"
          class="w-full bg-red-600 text-white py-3 rounded-lg"
        >
          {{
            loading
              ? 'Signing In...'
              : 'Login'
          }}
        </button>
      </div>
    </div>
  </div>
</template>