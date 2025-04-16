import gsap from "gsap";
import { Observer } from "gsap/Observer";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(Observer, TextPlugin);

const $sections = gsap.utils.toArray(".slide") as HTMLElement[];
const $slideImages = gsap.utils.toArray(".slide__img") as HTMLElement[];
const $outerWrappers = gsap.utils.toArray(".slide__outer") as HTMLElement[];
const $innerWrappers = gsap.utils.toArray(".slide__inner") as HTMLElement[];
const $count = document.querySelector(".count") as HTMLElement;
const $images = gsap.utils.toArray(".image").reverse() as HTMLElement[];

const wrap = gsap.utils.wrap(0, $sections.length);
let animating = false;
let currentIndex = 0;

gsap.set($outerWrappers, { xPercent: 100 });
gsap.set($innerWrappers, { xPercent: -100 });
gsap.set(".slide:nth-of-type(1) .slide__outer", {
  xPercent: 0,
});
gsap.set(".slide:nth-of-type(1) .slide__inner", {
  xPercent: 0,
});

function gotoSection(index: number, direction: number) {
  animating = true;
  index = wrap(index);

  let tl = gsap.timeline({
    defaults: { duration: 1, ease: "expo.inOut" },
    onComplete: () => {
      animating = false;
    },
  });

  let currentSection = $sections[currentIndex];
  let heading = currentSection.querySelector(".slide__heading");
  let nextSection = $sections[index];
  let nextHeading = nextSection.querySelector(".slide__heading");

  gsap.set([$sections, $images], { zIndex: 0, autoAlpha: 0 });
  gsap.set([$sections[currentIndex], $images[index]], { zIndex: 1, autoAlpha: 1 });
  gsap.set([$sections[index], $images[currentIndex]], { zIndex: 2, autoAlpha: 1 });
  // gsap.set($innerWrappers[index], { xPercent: 0 });

  tl.set($count, { text: (index + 1).toString() }, 0.32)
    .fromTo($outerWrappers[index], { xPercent: 100 * direction }, { xPercent: 0 }, 0)
    .fromTo($innerWrappers[index], { xPercent: -100 * direction }, { xPercent: 0 }, 0)
    .to(heading, { "--width": 800, xPercent: 30 * direction }, 0)
    .fromTo(nextHeading, { "--width": 800, xPercent: -30 * direction }, { "--width": 200, xPercent: 0 }, 0)
    .fromTo($images[index], { xPercent: 125 * direction, scaleX: 1.5, scaleY: 1.3 }, { xPercent: 0, scaleX: 1, scaleY: 1 }, 0)
    .fromTo(
      $images[currentIndex],
      { xPercent: 0, scaleX: 1, scaleY: 1 },
      {
        xPercent: -125 * direction,
        scaleX: 1.5,
        scaleY: 1.3,
      },
      0
    )
    .fromTo($slideImages[index], { scale: 2 }, { scale: 1 }, 0);
  currentIndex = index;
}

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onUp: () => {
    console.log("up");
    if (animating) return;
    gotoSection(currentIndex + 1, +1);
  },
  onDown: () => {
    console.log("down");
    if (animating) return;
    gotoSection(currentIndex - 1, -1);
  },
  preventDefault: true,
});
