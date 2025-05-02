import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".header-line_inner", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    scrub: true,
    start: "top top",
    end: "bottom bottom",
  },
});

const topTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".top",
    scrub: 1,
    start: "top top",
    end: "bottom top",
  },
});
topTl.to(".top__title span", {
  y: -150,
  stagger: 0.02,
  ease: "power4.out",
});
topTl.to(
  ".top__imgWrapper img",
  {
    y: "-100px",
    ease: "none",
  },
  0
);

const media = gsap.utils.toArray(".media") as HTMLElement[];
media.forEach((media) => {
  const text = media.querySelector(".media__info");
  const img = media.querySelector(".media__imgWrapper img");
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: media,
      start: "top 80%",
      end: "top 25%",
      scrub: 1,
    },
  });
  tl.from(text, {
    y: 50,
  });
  tl.to(img, { scale: 1.2 }, 0);
});

ScrollTrigger.create({
  trigger: ".bottom",
  start: "top 50%",
  toggleClass: "viewin",
});

const bottomTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".bottom",
    scrub: 1,
    start: "top bottom",
    end: "top top",
  },
});
bottomTl.fromTo(
  ".bottom__text--fromright",
  {
    xPercent: -100,
  },
  { xPercent: 0 },
  0
);
bottomTl.fromTo(
  ".bottom__text--fromleft",
  {
    xPercent: 100,
  },
  { xPercent: 0 },
  0
);
