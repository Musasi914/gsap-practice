import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const SEPARATE_NUM = 8;

const jumbCon = document.querySelector(".jumbotron__container") as HTMLElement;

const imgSrc1 = "view1.jpg";
const imgSrc2 = "view2.jpg";
let currentImage = imgSrc1;
let tiles: HTMLDivElement[] = [];

function initJumbotron() {
  const WIDTH = jumbCon.getBoundingClientRect().width;
  const HEIGHT = jumbCon.getBoundingClientRect().height;

  for (let row = 0; row < SEPARATE_NUM; row++) {
    for (let col = 0; col < SEPARATE_NUM; col++) {
      const tile = document.createElement("div");
      tile.classList.add("jumbotron__tile");

      tile.style.backgroundSize = `${WIDTH}px ${(WIDTH * 1280) / 1920}px`;
      tile.style.backgroundImage = `url(${currentImage})`;
      tile.style.backgroundPosition = `${-col * 37.5}px ${-row * 37.5}px`;
      tile.style.backgroundPosition = `${(-col * WIDTH) / SEPARATE_NUM}px ${(-row * HEIGHT) / SEPARATE_NUM}px`;

      tile.style.left = `${col * 12.5}%`;
      tile.style.top = `${row * 12.5}%`;

      jumbCon.appendChild(tile);

      tiles.push(tile);
    }
  }
}
initJumbotron();

function switchImage() {
  currentImage = currentImage === imgSrc1 ? imgSrc2 : imgSrc1;

  gsap.to(tiles, {
    rotateY: 90,
    opacity: 0,
    stagger: {
      each: 0.1,
      grid: [8, 8],
    },
    onComplete: () => {
      tiles.forEach((tile) => (tile.style.backgroundImage = `url(${currentImage})`));
      gsap.to(tiles, {
        rotateY: 0,
        opacity: 1,
        stagger: {
          each: 0.1,
          grid: [8, 8],
        },
      });
    },
  });
}

setInterval(switchImage, 3000);

const counter = document.querySelector(".jumbotron__perspectiveCounter") as HTMLElement;
const bar = document.querySelector(".jumbotron__bar") as HTMLElement;

bar.addEventListener("change", handleBar);

function handleBar(e: Event) {
  const target = e.target as HTMLInputElement;
  counter.textContent = target.value;
  jumbCon.style.perspective = `${target.value}px`;
}
