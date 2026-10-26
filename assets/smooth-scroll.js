gsap.registerPlugin(ScrollTrigger);

// LENIS
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  anchors: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// GALERÍA HORIZONTAL
const mm = gsap.matchMedia();

mm.add("(min-width: 751px)", () => {
  const section = document.querySelector("#experiencias");
  const viewport = section.querySelector(".cards-viewport");
  const track = section.querySelector(".cards");
  const cards = gsap.utils.toArray(".card", track);

  // Centrar primera y última tarjeta
  const getSidePadding = () => {
    return Math.max(0, (viewport.clientWidth - cards[0].offsetWidth) / 2);
  };

  const updatePadding = () => {
    const padding = getSidePadding();

    track.style.paddingLeft = `${padding}px`;
    track.style.paddingRight = `${padding}px`;
  };

  updatePadding();

  const getDistance = () => {
    return Math.max(0, track.scrollWidth - viewport.clientWidth);
  };

  gsap.to(track, {
    x: () => -getDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => "+=" + getDistance(),
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefreshInit: updatePadding,
    },
  });

  // Limpiar estilos al pasar a móvil
  return () => {
    track.style.paddingLeft = "";
    track.style.paddingRight = "";
  };
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
