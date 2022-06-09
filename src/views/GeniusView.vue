<template>
  <div class="grid p-10 justify-center">
    <canvas id="game-genius" width="500" height="500" class="bg-white"></canvas>

    <button
      class="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="startGame"
    >
      Start Game
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const size = 220;
const spacing = 20;
let context: CanvasRenderingContext2D | null = null;
let gameIsRunning = false;
let isPlayerTime = false;
let isGameTime = false;
let sequence: Array<number> = [];

interface Coordinate {
  x: number;
  y: number;
}

interface Block extends Coordinate {
  id: number;
  height: number;
  width: number;
  color: string;
}

const blocks: Array<Block> = [
  {
    id: 1,
    x: spacing,
    y: spacing,
    height: size,
    width: size,
    color: "green",
  },
  {
    id: 2,
    x: spacing + size + spacing,
    y: spacing,
    height: size,
    width: size,
    color: "red",
  },
  {
    id: 2,
    x: spacing,
    y: spacing + size + spacing,
    height: size,
    width: size,
    color: "blue",
  },
  {
    id: 3,
    x: spacing + size + spacing,
    y: spacing + size + spacing,
    height: size,
    width: size,
    color: "purple",
  },
];

function drawGame(ctx: CanvasRenderingContext2D, blocks: Array<Block>) {
  blocks.forEach((block) => {
    ctx.beginPath();
    ctx.rect(block.x, block.y, block.height, block.width);
    ctx.fillStyle = block.color;
    ctx.fill();
  });
}

function isPointInRectangle(point: Coordinate, block: Block) {
  return (
    point.x > block.x &&
    point.x < block.x + block.width &&
    point.y > block.y &&
    point.y < block.y + block.height
  );
}

function checkClick(event: MouseEvent) {
  const mousePoint: Coordinate = {
    x: event.offsetX,
    y: event.offsetY,
  };

  blocks.forEach((block) => {
    if (isPointInRectangle(mousePoint, block)) {
      console.log("click on circle: " + block.id);
    }
  });
}

function startGame() {
  gameIsRunning = true;
  sequence = [];
}

onMounted(() => {
  const screen = document.getElementById("game-genius") as HTMLCanvasElement;
  context = screen.getContext("2d");

  if (context) {
    drawGame(context, blocks);
    screen.addEventListener("click", checkClick);
  }
});
</script>
