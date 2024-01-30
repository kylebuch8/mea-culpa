import "@rhds/elements/rh-cta/rh-cta.js";

export default function decorate(block) {
  const a = block.querySelector('a');

  const template = `
    <rh-cta>${a.outerHTML}</rh-cta>
  `;

  block.innerHTML = template;
}