import gsap from "gsap";
import "./style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { init } from "ityped";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".top_icon", { y: 20, yoyo: true, repeat: -1 });

// ハート
ScrollTrigger.create({
  trigger: ".likeButton",
  start: "top 50%",
  toggleClass: "is-active",
  once: true,
});

const mediaElements = gsap.utils.toArray(".bl_media") as HTMLElement[];
mediaElements.forEach((media) => {
  gsap.from(media, { y: 20, autoAlpha: 0, duration: 1, ease: "expo", scrollTrigger: { trigger: media, start: "top 90%" } });
});

// type
const itypedEl = document.querySelector("#ityped") as HTMLElement;
function initType() {
  init(itypedEl, {
    showCursor: true,
    strings: ["Very nice project!", "Thanks for Watching!"],
    // loop: false,
  });
}

ScrollTrigger.create({
  trigger: ".bl_ityped",
  once: true,
  onEnter: initType,
});

/////////////////////////////

const barTl = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    scrub: true,
    start: "top top",
    end: "bottom bottom",
  },
});

barTl.fromTo(".header-line_inner", { width: 0 }, { width: "100%" });

///////

const topTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scrub-top_image",
    start: "top 20%",
    end: "bottom 50%",
    scrub: 1,
  },
});
topTl.addLabel("topLabel");
const letters = gsap.utils.toArray(".scrub-top_title span") as HTMLElement[];
letters.forEach((letter, i) => {
  topTl.to(
    letter,
    {
      y: -50,
    },
    `topLabel+=${i / letters.length}`
  );
});

topTl.to(".scrub-top_image", { backgroundPositionY: 10 }, "topLabel");

/////

const cards = gsap.utils.toArray(".card") as HTMLElement[];
cards.forEach((card) => {
  const desc = card.querySelector(".card_desc");
  const img = card.querySelector(".card_figure img");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top center",
      end: `+=${window.innerHeight / 2}`,
      scrub: 1,
    },
  });
  tl.from(desc, { y: 20, ease: "none" });
  tl.to(img, { scale: 1.2, ease: "none" }, "<");
});

////
ScrollTrigger.create({
  trigger: ".scrub-footer",
  start: "top 50%",
  toggleClass: "active",
});
const bottomTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scrub-footer",
    start: "top bottom",
    end: "top top",
    scrub: 1,
  },
});
bottomTl
  .fromTo(".scrub-footer_text__left", { xPercent: 100 }, { xPercent: 0 })
  .fromTo(".scrub-footer_text__right", { xPercent: -100 }, { xPercent: 0 }, "<");
