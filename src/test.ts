import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 1,
});

const dialog = document.querySelector("#dialog") as HTMLDialogElement;
const openButton = document.querySelector("#open") as HTMLButtonElement;
const closeButton = document.querySelector("#close") as HTMLButtonElement;
openButton.addEventListener("click", () => {
  dialog.showModal();
});
closeButton.addEventListener("click", () => {
  dialog.close("closed");
});
dialog.addEventListener("close", () => {
  console.log(dialog.returnValue);
});

gsap.set(".poke__information", { yPercent: 100 });

(gsap.utils.toArray(".poke__container") as HTMLElement[]).forEach((container) => {
  const info = container.querySelector(".poke__information");
  const silhouette = container.querySelector(".poke__cover");

  const tl = gsap.timeline({ paused: true });
  tl.to(info, { yPercent: 0 }).to(silhouette, { opacity: 0 }, 0);

  container.addEventListener("mouseenter", () => tl.timeScale(1).play());
  container.addEventListener("mouseleave", () => tl.timeScale(3).reverse());
});

const boxes = gsap.utils.toArray(".boxes .first .box") as HTMLElement[];
boxes.forEach((box) => {
  gsap.to(box, {
    x: 200,
    scrollTrigger: {
      trigger: box,
      start: "top center",
      toggleActions: "play none none reverse",
    },
  });
});

let boxTl = gsap.timeline();
ScrollTrigger.create({
  trigger: ".advanced .box",
  pin: true,
  start: "top center",
  end: "+=500",
  scrub: 1,
  snap: {
    snapTo: "labels",
    duration: { min: 0.2, max: 3 },
    delay: 0.2,
    ease: "power1.inOut",
  },
  animation: boxTl,
});
boxTl
  .addLabel("start")
  .from(".boxes .box p", { scale: 0.3, rotation: 45, autoAlpha: 0 })
  .addLabel("color")
  .from(".boxes .box", { backgroundColor: "#28a92b" })
  .addLabel("spin")
  .to(".boxes .box", { rotation: 360 })
  .addLabel("end");

//0-タッチなし（ポインタ/マウスのみ）
//1-タッチ専用デバイス（携帯電話など）
//2- デバイスはタッチ入力とマウス/ポインターを受け入れることができます（Windows タブレットなど）
console.log(ScrollTrigger.isTouch);

console.log(boxTl.vars);

gsap.set(".batch .basic .box", { opacity: 0, y: 100 });
ScrollTrigger.batch(".batch .basic .box", {
  // interval: 1,
  // batchMax: 2,
  onEnter: (batch) => {
    gsap.to(batch, { opacity: 1, y: 0, stagger: { each: 0.05 }, overwrite: true });
  },
  onLeave: (batch) => {
    gsap.to(batch, { opacity: 0, y: -100, stagger: { each: 0.05 }, overwrite: true });
  },
  onEnterBack: (batch) => {
    gsap.to(batch, { opacity: 1, y: 0, stagger: { each: 0.05 }, overwrite: true });
  },
  onLeaveBack: (batch) => {
    gsap.to(batch, { opacity: 0, y: 100, stagger: { each: 0.05 }, overwrite: true });
  },
});

const colorSlideTl = gsap.timeline();
colorSlideTl
  .from(".color-slide .purple", { xPercent: -100 })
  .from(".color-slide .orange", { xPercent: 100 })
  .from(".color-slide .green", { yPercent: -100 });
ScrollTrigger.create({
  trigger: ".color-slide",
  animation: colorSlideTl,
  pin: true,
  scrub: true,
  end: "+=4000",
});

const numSlide = gsap.utils.toArray(".number-slide .panel") as HTMLElement[];
numSlide.forEach((panel) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    pin: true,
    pinSpacing: false,
  });
});

const horizonalContainer = document.querySelector(".horizonal__container") as HTMLElement;
const horizonalPanel = document.querySelectorAll(".horizonal__container .panel");
const panelNum = horizonalPanel.length;
gsap.set(horizonalContainer, {
  width: `${horizonalPanel.length * 100}%`,
});
gsap.set(horizonalPanel, {
  width: `${100 / horizonalPanel.length}%`,
});
gsap.to(horizonalPanel, {
  xPercent: -100 * (panelNum - 1),
  ease: "none",
  scrollTrigger: {
    trigger: horizonalContainer,
    start: "top top",
    pin: true,
    scrub: true,
    end: () => `+=${horizonalContainer.offsetWidth}`,
    anticipatePin: 1,
    snap: 1 / (panelNum - 1),
  },
});
