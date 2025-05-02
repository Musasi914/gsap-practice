import gsap from "gsap";
import "./style2-2.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".top",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=900",
  },
});
topTl.set(".top__title", { scale: 0, opacity: 0 });
topTl.from(".top__title", { scale: 0, opacity: 0 });
topTl.to(".top__word--left", { x: "-54vw" }, "+=0.4");
topTl.to(".top__word--right", { x: "54vw" }, "<");

ScrollTrigger.create({
  trigger: ".media__imgWrapper",
  start: "top 80",
  endTrigger: ".media__textWrapper",
  end: "top 130",
  scrub: true,
  pin: true,
  pinSpacing: false,
});

const target = document.querySelector(".cards__inner") as HTMLElement;
console.log(target.clientWidth);
gsap.to(target, {
  x: -target.clientWidth + window.innerWidth * 0.9,
  ease: "none",
  delay: 1,
  scrollTrigger: {
    trigger: target,
    start: "top top",
    scrub: 1,
    pin: true,
  },
});
