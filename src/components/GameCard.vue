<template>
  <router-link
    :to="route"
    class="p-6 max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-lg flex items-center space-x-4"
  >
    <div class="shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    </div>
    <div>
      <div class="text-xl font-medium">{{ name }}</div>
      <p class="text-slate-500 dark:text-slate-400">{{ description }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameCard",
  props: {
    route: String,
    name: String,
    description: String,
  },
});
</script>
