<template>
  <div class="p-6">
    <h1 class="my-6 font-bold text-5xl">All Games</h1>
    <GameCard
      name="Genius"
      description="Tente a sua maior sequência"
      route="genius"
    ></GameCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameCard from "@/components/GameCard.vue";

export default defineComponent({
  name: "HomeView",
  components: { GameCard },
});
</script>
