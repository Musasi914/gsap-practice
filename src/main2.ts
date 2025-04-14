import gsap from "gsap";
import "./style2.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".top",
    start: "top top",
    end: "+=900",
    scrub: true,
    pin: true,
    markers: true,
  },
});

topTl.fromTo(
  ".top_title",
  {
    opacity: 0,
    scale: 0.2,
  },
  { opacity: 1, scale: 1, ease: "power4.out" }
);
topTl.to(".top_title_innerLeft", { x: -innerWidth / 2 });
topTl.to(".top_title_innerRight", { x: innerWidth / 2 }, "<");

ScrollTrigger.create({
  trigger: ".article_img",
  start: "top 80",
  endTrigger: ".article_text",
  end: "top 100",
  pin: true,
  pinSpacing: false,
});

//

const cardTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".cardSection",
    start: "top top",
    pin: true,
    end: `+=${innerHeight}`,
    scrub: 0.5,
    snap: 1 / 6,
  },
});

const target = document.querySelector(".cards") as HTMLElement;
cardTl.to(target, {
  delay: 0.1,
  x: -target.clientWidth + innerWidth - 120,
  ease: "none",
});
