const main = document.querySelector("main");

gsap.set("main", { perspective: 650 });

const outerRX = gsap.quickTo(".logo-outer", "rotationX", { ease: "power3" });
const outerRY = gsap.quickTo(".logo-outer", "rotationY", { ease: "power3" });
const innerX = gsap.quickTo(".logo", "x", { ease: "power3" });
const innerY = gsap.quickTo(".logo", "y", { ease: "power3" });

main.addEventListener("pointermove", (e) => {
  outerRX(gsap.utils.interpolate(15, -15, e.y / window.innerHeight));
  outerRY(gsap.utils.interpolate(-15, 15, e.x / window.innerWidth));
  innerX(gsap.utils.interpolate(-30, 30, e.x / window.innerWidth));
  innerY(gsap.utils.interpolate(-30, 30, e.y / window.innerHeight));
});

main.addEventListener("pointerleave", (e) => {
  outerRX(0);
  outerRY(0);
  innerX(0);
  innerY(0);
});
