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
let currentClickPlayer = 0;

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
    id: 3,
    x: spacing,
    y: spacing + size + spacing,
    height: size,
    width: size,
    color: "blue",
  },
  {
    id: 4,
    x: spacing + size + spacing,
    y: spacing + size + spacing,
    height: size,
    width: size,
    color: "purple",
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function drawGame(ctx: CanvasRenderingContext2D | null, blocks: Array<Block>) {
  blocks.forEach((block) => {
    drawBlock(ctx, block);
  });
}

function drawBlock(
  ctx: CanvasRenderingContext2D | null,
  block: Block,
  overwriteColor: string | null = null
) {
  if (ctx) {
    ctx.beginPath();
    ctx.rect(block.x, block.y, block.height, block.width);
    ctx.fillStyle = overwriteColor ? overwriteColor : block.color;
    ctx.fill();
  }
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

  if (!isPlayerTime && !gameIsRunning) return;

  blocks.forEach((block) => {
    if (isPointInRectangle(mousePoint, block)) {
      if (block.id === sequence[currentClickPlayer]) {
        console.log("Parabéns acertou");
        currentClickPlayer++;

        if (currentClickPlayer == sequence.length) {
          newRound();
        }
      } else {
        console.log("Você errou o jogo acabou");
        endGame();
      }
    }
  });
}

function endGame() {
  gameIsRunning = false;
  isPlayerTime = false;
  isGameTime = false;
}

function startGame() {
  gameIsRunning = true;
  sequence = [1, 2];
  newRound();
}

function newRound() {
  isGameTime = true;
  isPlayerTime = false;
  currentClickPlayer = 0;

  sequence.push(getRandomInt(1, 5));

  sleep(1000).then(() => {
    playSequence().then(() => {
      isPlayerTime = true;
      isGameTime = false;
      console.log("Eh a vez do Jogador");
    });
  });
}

async function playSequence() {
  for (let currentBlock = 0; currentBlock < sequence.length; currentBlock++) {
    const element = sequence[currentBlock];
    blipBlock(blocks[element - 1]);
    await sleep(1500);
  }
}

function blipBlock(block: Block) {
  drawBlock(context, block, "white");
  setTimeout(() => drawBlock(context, block), 1000);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

onMounted(() => {
  const screen = document.getElementById("game-genius") as HTMLCanvasElement;
  context = screen.getContext("2d");

  drawGame(context, blocks);
  screen.addEventListener("click", checkClick);
});
</script>
