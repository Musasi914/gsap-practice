import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, Flip);

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
    tl.from(word, { opacity: 0, y: 20, duration: 0.75 }).to(rect, { xPercent: 100, duration: 0.5 }, "-=50%");
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
      end: "+=1300",
      scrub: 1,
      pin: true,
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
