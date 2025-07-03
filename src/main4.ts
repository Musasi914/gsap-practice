import gsap from "gsap";
import "./css/style4.css";
import "remixicon/fonts/remixicon.css";
import MotionPathPlugin from "gsap/MotionPathPlugin";

// MotionPathPlugin
gsap.registerPlugin(MotionPathPlugin);

const string = document.querySelector("#string") as HTMLElement;

string.addEventListener("mousemove", (e) => {
  gsap.to("svg path", {
    attr: { d: `M 10 250 Q ${e.offsetX} ${e.offsetY} 900 250` },
    duration: 1,
    ease: "power3.out",
  });
});

string.addEventListener("mouseleave", () => {
  gsap.to("svg path", {
    attr: { d: "M 10 250 Q 455 250 900 250" },
    duration: 1,
    overwrite: true,
    ease: "elastic.out(1.2,0.1)",
  });
});

// マウスストーカー
gsap.set(".flair", { xPercent: -50, yPercent: -50 });

// let xSetter = gsap.quickSetter(".flair", "x", "px");
// let ySetter = gsap.quickSetter(".flair", "y", "px");

// window.addEventListener("mousemove", (e) => {
//   xSetter(e.x);
//   ySetter(e.y);
// });

let xTo = gsap.quickTo(".flair", "x", { duration: 0.6, ease: "back" });
let yTo = gsap.quickTo(".flair", "y", { duration: 0.6, ease: "back" });

window.addEventListener("mousemove", (e) => {
  xTo(e.x);
  yTo(e.y);
});

const tl = gsap.timeline({ paused: true });
tl.to(".nav", { xPercent: -100, duration: 0.4 });
tl.from(".nav-link", { x: 100, duration: 0.5, opacity: 0, stagger: 0.1 }, "-=0.5");
tl.from(".close-btn", { opacity: 0 }, 0.5);

const menuOpenBtn = document.querySelector(".menu-btn") as HTMLElement;
const menuCloseBtn = document.querySelector(".close-btn") as HTMLElement;

menuOpenBtn.addEventListener("click", () => {
  tl.play().timeScale(1);
});
menuCloseBtn.addEventListener("click", () => {
  tl.timeScale(2);
  tl.reverse();
});

//
const txt = document.querySelector(".txt") as HTMLElement;
const splitedText = txt.textContent?.split("");
let innerEl = "";
splitedText?.forEach((char) => {
  innerEl += `<span>${char}</span>`;
});
txt.innerHTML = innerEl;
gsap.set(".txt span", { color: "random([green,gray,orange,pink])" });
gsap.from(".txt span", {
  y: 50,
  duration: 0.4,
  opacity: 0,
  stagger: { each: 0.05, from: "random" },
});

//
const menu_dur = 3;
const menu_btn_anim = gsap.timeline({ defaults: { duration: menu_dur } });
menu_btn_anim
  .to(
    "#x_left",
    {
      attr: {
        x2: (_, b) => {
          return b.getAttribute("x1");
        },
        y2: (_, b) => {
          return b.getAttribute("y1");
        },
      },
      onComplete: () => {
        console.log("fjewio");
      },
    },
    0
  )
  .fromTo(
    "#top_right,#middle_left,#middle_right,#bottom_left",
    {
      autoAlpha: 1,
      attr: {},
    },
    {
      attr: {
        x2: (_, b) => {
          return b.getAttribute("x1");
        },
        y2: (_, b) => {
          return b.getAttribute("y1");
        },
      },
    },
    0
  );

gsap.to("#rect", {
  motionPath: "#path",
  duration: 20,
  repeat: -1,
  ease: "none",
});
