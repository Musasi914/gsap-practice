import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import InertiaPlugin from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip, Draggable, InertiaPlugin);

function splitText(className: string) {
  const targetNodes = document.querySelectorAll(className);
  targetNodes.forEach((targetNode) => {
    const str = targetNode.textContent;
    if (str == null) throw new Error("splittext対象が空");
    const splitedText = [...str].reduce((acc, curr) => {
      acc += `<span class="char">${curr}</span>`;
      return acc;
    }, "");
    targetNode.innerHTML = splitedText;
  });
}

{
  // cursor
  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

  const xSetter = gsap.quickSetter(".cursor", "x", "px");
  const ySetter = gsap.quickSetter(".cursor", "y", "px");

  window.addEventListener("mousemove", (e) => {
    xSetter(e.x);
    ySetter(e.y);
  });
}

{
  // top__title
  // const words = gsap.utils.toArray(".top__word");
  const words = document.querySelectorAll(".top__word");
  words.forEach((word, i) => {
    const rect = word.querySelector(".rect");
    const tl = gsap.timeline({
      ease: "power4.out",
      delay: i * 0.2,
    });
    tl.from(word, { opacity: 0, y: 20, duration: 0.75 }).to(rect, { xPercent: 120, duration: 0.5 }, "-=50%");
  });
  // gsap.
}

{
  // top__scroll
  gsap.to(".top__scroll", {
    backgroundPosition: "calc(50% + 240px) calc(50% + 240px)",
    scrollTrigger: { trigger: ".top__scroll", start: "top top", end: "bottom top", scrub: true },
  });
}

{
  // horizonal
  gsap.to(".horizonal__images", {
    x: `-${window.innerWidth} - 400vw)`,
    ease: "none",
    delay: 1,
    scrollTrigger: {
      trigger: ".horizonal",
      start: "center center",
      end: "+=1000",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
}

{
  // section2
  gsap.set(".section2__word", { opacity: 0, y: 50 });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section2__text",
      start: "top center",
    },
  });
  tl.to(".section2__word", { opacity: 1, y: 0, stagger: 0.2 });
  tl.to(".section2__block", { xPercent: 120, stagger: 0.2 }, "-=0.2");
  tl.set(".section2__block", { autoAlpha: 0 });
}

{
  // about__title
  splitText(".about__title");
  splitText(".about__text");

  const staggerEls = document.querySelectorAll(".about__title, .about__text");
  staggerEls.forEach((el) => {
    gsap.fromTo(
      el.querySelectorAll(".char"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: { each: 0.02, from: "random" }, scrollTrigger: { trigger: ".about__title", start: "top 80%" } }
    );
  });

  gsap.fromTo(
    ".about__imgWrapper",
    { opacity: 0, rotateY: 50 },
    {
      opacity: 1,
      rotateY: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".about__imgWrapper",
        start: "top 90%",
        end: "top 70%",
        scrub: true,
      },
    }
  );

  // 逆方向アニメーション: 30% → top
  gsap.fromTo(
    ".about__imgWrapper",
    { opacity: 1, rotateY: 0 },
    {
      opacity: 0,
      rotateY: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".about__imgWrapper",
        start: "top top", // 要素の上端が画面上30%に来たら逆アニメ開始
        end: "bottom top", // 要素の上端が画面上端に来た時点で逆アニメ完了
        scrub: true,
      },
    }
  );
}

{
  // flip
  const flipBtn = document.querySelector(".flip__button") as HTMLElement;
  const expansionCursor = gsap.to(".cursor", {
    scale: 4,
  });
  const flipPinkBtn = document.querySelector(".flip__box--pink") as HTMLElement;

  expansionCursor.pause();
  flipBtn.addEventListener("mouseenter", () => {
    expansionCursor.play().timeScale(1);
  });
  flipBtn.addEventListener("mouseleave", () => {
    expansionCursor.timeScale(2);
    expansionCursor.reverse();
  });
  flipBtn.addEventListener("click", () => {
    const state = Flip.getState(".flip__box");
    flipPinkBtn.classList.toggle("orderd");
    Flip.from(state, { duration: 2 });
  });
}

{
  // flip2
  const fullSize = document.querySelector(".flip2__full-size") as HTMLElement;
  const thumbnail = document.querySelector(".flip2__thumbnail") as HTMLElement;
  const flip2 = document.querySelector(".flip2") as HTMLElement;

  Draggable.create(".flip2__initial", {
    bounds: ".flip2",
  });

  flip2.addEventListener("click", () => {
    const state = Flip.getState(".flip2__full-size, .flip2__thumbnail");

    fullSize.classList.toggle("active");
    thumbnail.classList.toggle("active");

    Flip.from(state, {
      duration: 0.6,
      fade: true,
      absolute: true,
      toggleClass: "flipping",
    });
  });
}

{
  // flip3
  const container = document.querySelector(".flip3__container") as HTMLElement;
  const imgSrc1 = "https://picsum.photos/300/300?random=1";
  const imgSrc2 = "https://picsum.photos/300/300?random=2";
  let tiles: HTMLDivElement[] = [];
  let currentImage = imgSrc1;

  // タイルを作成
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");
      tile.style.left = `${col * 12.5}%`;
      tile.style.top = `${row * 12.5}%`;
      tile.style.backgroundImage = `url(${currentImage})`;
      tile.style.backgroundPosition = `${-col * 37.5}px ${-row * 37.5}px`;
      container.appendChild(tile);
      tiles.push(tile);
    }
  }

  function switchImage() {
    let newImage = currentImage === imgSrc1 ? imgSrc2 : imgSrc1;
    gsap.to(tiles, {
      duration: 0.6,
      rotateY: 90,
      opacity: 0,
      stagger: {
        amount: 1.5,
        grid: [8, 8],
        from: "start",
      },
      onComplete: () => {
        tiles.forEach((tile) => {
          tile.style.backgroundImage = `url(${newImage})`;
        });
        gsap.to(tiles, { opacity: 1, rotateY: 0, duration: 0.6, stagger: { amount: 1.5, grid: [8, 8], from: "start" } });
      },
    });
    currentImage = newImage;
  }

  setInterval(switchImage, 6000);
}

{
  // neumorphic
  document.querySelectorAll(".neumorphic__card").forEach((card) => {
    (card as HTMLElement).addEventListener("mousemove", (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -30;
      const rotateY = (x / rect.width) * 30;

      const target = e.target as HTMLElement;
      (target.parentNode as HTMLElement).style.zIndex = "1";

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: 1.2,
        duration: 0.25,
        boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.5)",
        ease: "power2.out",
      });
    });

    (card as HTMLElement).addEventListener("mouseleave", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      (target.parentNode as HTMLElement).style.zIndex = "0";
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        boxShadow: "inset 5px 5px 15px rgba(255, 255, 255, 0.1), inset -5px -5px 15px rgba(0, 0, 0, 0.3), 5px 5px 15px rgba(0, 0, 0, 0.4)",
        duration: 0.6,
        ease: "power2.out",
      });
    });
  });
}

{
  // drag
  // const items = gsap.utils.toArray(".drag__item") as HTMLElement[];
  // const panel = document.querySelector(".drag__body") as HTMLElement;
  const cards = document.querySelector(".drag__list") as HTMLElement;
  const item = document.querySelector(".drag__item") as HTMLElement;
  // const spacer = document.createElement("div");

  Draggable.create(cards, {
    type: "x",
    edgeResistance: 0.5,
    inertia: true,
    bounds: {
      minX: -cards.offsetWidth + window.innerWidth - 40,
      maxX: 0,
    },
    snap: function (endValue) {
      return Math.round(endValue / item.offsetWidth) * item.offsetWidth; // Example: snapping to the nearest integer
    },
  });
}
