import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const sections = gsap.utils.toArray(".slide") as HTMLElement[];
const outerArray = gsap.utils.toArray(".slide__outer") as HTMLElement[];
const innerArray = gsap.utils.toArray(".slide__inner") as HTMLElement[];
const wrap = gsap.utils.wrap(0, sections.length);
const countArray = gsap.utils.toArray(".counter__num") as HTMLElement[];
const headingArray = gsap.utils.toArray(".slide__heading") as HTMLElement[];
const imageArray = gsap.utils.toArray(".slide__img") as HTMLElement[];

let currentIndex = 0;
let animating = false;
gsap.set(sections, { autoAlpha: 0 });
gsap.set(outerArray, { xPercent: 100 });
gsap.set(innerArray, { xPercent: -100 });
gsap.set(sections[currentIndex], { autoAlpha: 1 });
gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });
gsap.set(countArray, { yPercent: 100, autoAlpha: 0 });
gsap.set(countArray[currentIndex], { yPercent: 0, autoAlpha: 1 });

function changeSlide(index: number, direction: number) {
  index = wrap(index);
  animating = true;
  gsap.set(sections, { zIndex: 0, autoAlpha: 0 });
  gsap.set(sections[currentIndex], { zIndex: 1, autoAlpha: 1 });
  gsap.set(sections[index], { zIndex: 2, autoAlpha: 1 });
  gsap.set(countArray[index], { autoAlpha: 1 });

  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "expo.inOut" },
    onComplete: () => {
      animating = false;
    },
  });
  tl.fromTo(outerArray[index], { xPercent: 100 * direction }, { xPercent: 0 }, 0)
    .fromTo(innerArray[index], { xPercent: 100 * -direction }, { xPercent: 0 }, 0)
    .to(headingArray[currentIndex], { "--width": 400, xPercent: 30 * direction }, 0)
    .fromTo(headingArray[index], { "--width": 400, xPercent: -30 * direction }, { "--width": 200, xPercent: 0 }, 0)
    .to(imageArray[currentIndex], { scale: 1.4 }, 0)
    .fromTo(imageArray[index], { scale: 1.4 }, { scale: 1 }, 0);

  // count
  tl.fromTo(countArray[index], { yPercent: 100 * direction }, { yPercent: 0 }, 0).to(
    countArray[currentIndex],
    {
      yPercent: 100 * -direction,
    },
    0
  );

  currentIndex = index;
}

Observer.create({
  onUp: () => {
    console.log("up");
    if (animating) return;
    changeSlide(currentIndex + 1, 1);
  },
  onDown: () => {
    console.log("down");
    if (animating) return;
    changeSlide(currentIndex - 1, -1);
  },
  wheelSpeed: -1,
  tolerance: 10,
  preventDefault: true,
});

// gotoSlide(0, -1)
