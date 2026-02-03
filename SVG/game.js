const game = document.getElementById("game");
const bucket = document.getElementById("bucket");
const candy = document.getElementById("candy");

let candySpeed = 4;

let bucketX = 150;
let targetBucketX = 150;
const bucketSpeed = 0.15;

function resetCandy() {
  candy.style.top = "-60px";
  candy.style.left = Math.random() * 500 + "px";
}

function gameLoop() {
  const candyTop = parseInt(candy.style.top);
  candy.style.top = candyTop + candySpeed + "px";

  const candyRect = candy.getBoundingClientRect();
  const bucketRect = bucket.getBoundingClientRect();

  if (
    candyRect.bottom >= bucketRect.top &&
    candyRect.left < bucketRect.right &&
    candyRect.right > bucketRect.left
  ) {
    resetCandy();
  }

  if (candyTop > 800) {
    resetCandy();
  }

  bucketX += (targetBucketX - bucketX) * bucketSpeed;
  bucket.style.left = bucketX + "px";

  requestAnimationFrame(gameLoop);
}

resetCandy();
gameLoop();

game.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();
  const x = e.clientX - rect.left - bucket.offsetWidth / 2;
  targetBucketX = Math.max(0, Math.min(500, x));
});