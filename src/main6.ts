import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const sections = document.querySelectorAll("section");
const images = document.querySelectorAll(".bg");
const headings = gsap.utils.toArray(".section-heading") as HTMLElement[];
const outerWrappers = gsap.utils.toArray(".outer") as HTMLElement[];
const innerWrappers = gsap.utils.toArray(".inner") as HTMLElement[];

headings.map((heading) => {
  splitText(heading);
});

let currentIndex = -1;
const wrap = gsap.utils.wrap(0, sections.length);
let animating = false;

function splitText(el: HTMLElement) {
  if (!el.textContent) return;
  const splittedText = el.textContent.split("");
  const newhtml = splittedText.reduce((prev, curr) => {
    return (prev += `<span class="clip-text">${curr}</span>`);
  }, "");
  el.innerHTML = newhtml;
}

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index: number, direction: number) {
  index = wrap(index);
  animating = true;
  const tl = gsap.timeline({
    defaults: {
      duration: 1.25,
      ease: "power1.inOut",
    },
    onComplete: () => {
      animating = false;
    },
  });
  if (currentIndex >= 0) {
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(images[currentIndex], { yPercent: -15 * direction }).set(sections[currentIndex], { autoAlpha: 0 });
  }
  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  tl.fromTo(
    [outerWrappers[index], innerWrappers[index]],
    {
      yPercent: (i) => (i ? -100 * direction : 100 * direction),
    },
    { yPercent: 0 },
    0
  )
    .fromTo(images[index], { yPercent: 15 * direction }, { yPercent: 0 }, 0)
    .fromTo(
      headings[index].querySelectorAll(".clip-text"),
      { autoAlpha: 0, yPercent: 150 * direction },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        stagger: {
          each: 0.02,
          from: "random",
        },
      },
      0.2
    );

  currentIndex = index;
}

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => {
    console.log("down");
    !animating && gotoSection(currentIndex - 1, -1);
  },
  onUp: () => {
    console.log("up");
    !animating && gotoSection(currentIndex + 1, 1);
  },
  tolerance: 10,
  preventDefault: true,
});

gotoSection(0, 1);
