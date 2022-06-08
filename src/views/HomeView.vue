<template>
  <div class="p-6">
    <h1 class="my-6 font-bold text-5xl">All Games</h1>
    <GameCard
      name="Snake"
      description="Famoso jogo da cobrinha"
      route="snake"
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
