import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  const text = document.querySelector(".sec1__headline");

  let mySplitText = SplitText.create(text, {
    type: "chars, words",
    charsClass: "char",
  });
  let chars = mySplitText.chars;

  document.querySelector(".sec1__button")?.addEventListener("click", () => {
    if (!mySplitText.isSplit) {
      mySplitText.split({ type: "chars, words", charsClass: "char" });
    }

    gsap.from(chars, {
      duration: 3,
      opacity: 0,
      scale: 0,
      y: 80,
      rotationX: 180,
      transformOrigin: "0% 50% -50",
      stagger: 0.05,
      ease: "back",
      onComplete: () => {
        mySplitText.revert();
      },
    });
  });
});
