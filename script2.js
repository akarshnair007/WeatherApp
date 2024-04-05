gsap.from(".top", {
  y: -100,
  duration: 1.3,
  delay: 0.3,
  opacity: 0,
});

gsap.from(".forcastHeading", {
  duration: 0.7,
  delay: 1.6,
  opacity: 0,
  stagger: 0.2,
  scale: 0.1,
});
gsap.from(".boundary", {
  duration: 0.7,
  delay: 0.2,
  opacity: 0,
  stagger: 0.2,
  scale: 0.1,
});
gsap.from(".left h1,#weatherImg,.cloud,.bottom h3", {
  duration: 0.7,
  delay: 1.6,
  opacity: 0,
  stagger: 0.2,
  scale: 0.1,
});
// gsap.from("card",{
//   duration: 0.7,
//   delay: 0.2,
//   opacity: 0,
//   stagger: 0.2,
//   scale: 0.1,
//   scrollTrigger: {
//     trigger: "part2",
//     scroller: "body",
//     scrub: 2,
//   },
// })
gsap.from(".heading_cities", {
  y: -100,
  duration: 1.3,
  delay: 0.3,
  opacity: 0,
  scrollTrigger: {
    // markers: true,
    start: "top 85%",
    end: "top 70%",
    trigger: ".heading_cities", // Change the trigger to ".card" or the appropriate container element
    scrub: 3, // Adjust the scrub value as needed
    stagger: 0.3,
  },
});
gsap.from(".cities", {
  duration: 1,
  opacity: 0,
  scale: 0.1,
  stagger: 0.5,

  scrollTrigger: {
    start: "top 90%",
    end: "top 100%",
    trigger: ".cities", // Change the trigger to ".card" or the appropriate container element
    scrub: 3, // Adjust the scrub value as needed
  },
});
