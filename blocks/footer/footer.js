import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import "@rhds/elements/rh-footer/rh-footer.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const template = `
    <a slot="logo" href="https://redhat.com/en" data-analytics-category="Footer" data-analytics-text="Logo">
      <img alt="Red Hat logo" src="https://static.redhat.com/libs/redhat/brand-assets/2/corp/logo--on-dark.svg" loading="lazy" />
    </a>
    <rh-footer-social-link slot="social-links" icon="linkedin"><a href="https://www.linkedin.com/company/red-hat" data-analytics-region="social-links-exit" data-analytics-category="Footer|social-links" data-analytics-text="LinkedIn">LinkedIn</a></rh-footer-social-link>
    <rh-footer-social-link slot="social-links" icon="youtube"><a href="https://www.youtube.com/user/RedHatVideos" data-analytics-region="social-links-exit" data-analytics-category="Footer|social-links" data-analytics-text="YouTube">YouTube</a></rh-footer-social-link>
    <rh-footer-social-link slot="social-links" icon="facebook"><a href="https://www.facebook.com/redhatinc" data-analytics-region="social-links-exit" data-analytics-category="Footer|social-links" data-analytics-text="Facebook">Facebook</a></rh-footer-social-link>
    <rh-footer-social-link slot="social-links" icon="twitter"><a href="https://twitter.com/RedHat" data-analytics-region="social-links-exit" data-analytics-category="Footer|social-links" data-analytics-text="Twitter">X/Twitter</a></rh-footer-social-link>
    <rh-footer-block slot="main-secondary">
      <h3 slot="header" data-analytics-text="About Red Hat">About Red Hat</h3>
      <p> We're the world's leading provider of enterprise open source solutions—including Linux, cloud, container, and Kubernetes. We deliver hardened solutions that make it easier for enterprises to work across platforms and environments, from the core datacenter to the network edge.</p>
    </rh-footer-block>
    <rh-footer-block slot="main-secondary">
      <h3 slot="header" data-analytics-text="Subscribe to our newsletter Red Hat Shares">Subscribe to our newsletter, Red Hat Shares</h3>
      <rh-cta><a href="https://www.redhat.com/en/email-preferences?newsletter=RH-Shares&intcmp=7016000000154xCAAQ" data-analytics-category="Footer|About Red Hat" data-analytics-text="Sign up now">Sign up now</a></rh-cta>
    </rh-footer-block>

    <!-- Universal Footer -->
    <rh-footer-universal slot="universal">
      <h3 slot="links-primary" data-analytics-text="Red Hat legal and privacy links" hidden>Red Hat legal and privacy links</h3>
      <ul slot="links-primary" data-analytics-region="page-footer-bottom-primary">
        <li><a href="https://redhat.com/en/about/company" data-analytics-category="Footer|Corporate" data-analytics-text="About Red Hat">About Red Hat</a></li>
        <li><a href="https://redhat.com/en/jobs" data-analytics-category="Footer|Corporate" data-analytics-text="Jobs">Jobs</a></li>
        <li><a href="https://redhat.com/en/events" data-analytics-category="Footer|Corporate" data-analytics-text="Events">Events</a></li>
        <li><a href="https://redhat.com/en/about/office-locations" data-analytics-category="Footer|Corporate" data-analytics-text="Locations">Locations</a></li>
        <li><a href="https://redhat.com/en/contact" data-analytics-category="Footer|Corporate" data-analytics-text="Contact Red Hat">Contact Red Hat</a></li>
        <li><a href="https://redhat.com/en/blog" data-analytics-category="Footer|Corporate" data-analytics-text="Red Hat Blog">Red Hat Blog</a></li>
        <li><a href="https://redhat.com/en/about/our-culture/diversity-equity-inclusion" data-analytics-category="Footer|Corporate" data-analytics-text="Diversity equity and inclusion">Diversity, equity, and inclusion</a></li>
        <li><a href="https://coolstuff.redhat.com/" data-analytics-category="Footer|Corporate" data-analytics-text="Cool Stuff Store">Cool Stuff Store</a></li>
        <li><a href="https://www.redhat.com/en/summit" data-analytics-category="Footer|Corporate" data-analytics-text="Red Hat Summit">Red Hat Summit</a></li>
      </ul>
      <rh-footer-copyright slot="links-secondary">© 2024 Red Hat, Inc.</rh-footer-copyright>
      <h3 slot="links-secondary" data-analytics-text="Red Hat legal and privacy links" hidden>Red Hat legal and privacy links</h3>
      <ul slot="links-secondary" data-analytics-region="page-footer-bottom-secondary">
        <li><a href="https://redhat.com/en/about/privacy-policy" data-analytics-category="Footer|Red Hat legal and privacy links" data-analytics-text="Privacy statement">Privacy statement</a></li>
        <li><a href="https://redhat.com/en/about/terms-use" data-analytics-category="Footer|Red Hat legal and privacy links" data-analytics-text="Terms of use">Terms of use</a></li>
        <li><a href="https://redhat.com/en/about/all-policies-guidelines" data-analytics-category="Footer|Red Hat legal and privacy links" data-analytics-text="All policies and guidelines">All policies and guidelines</a></li>
        <li><a href="https://redhat.com/en/about/digital-accessibility" data-analytics-category="Footer|Red Hat legal and privacy links" data-analytics-text="Digital accessibility" class="active">Digital accessibility</a></li>
        <!-- If your website supports trustarc include this item to add Cookie Preferences to your site. -->
        <!-- <li><span id="teconsent"> </span></li> -->
      </ul>
    </rh-footer-universal>
  `;
  const footer = document.createElement('rh-footer');
  const linkContainer = fragment.querySelector('ul');
  const documentFragment = document.createDocumentFragment();
  
  footer.setAttribute('data-analytics-region', 'page-footer');
  footer.innerHTML = template;

  for (const link of linkContainer.querySelectorAll(':scope > li')) {
    const heading = document.createElement('h3');
    const headingText = link.firstChild.textContent;
    heading.setAttribute('slot', 'links');
    heading.setAttribute('data-analytics-text', headingText);
    heading.textContent = headingText;

    const links = link.querySelector('ul');
    links.setAttribute('slot', 'links');
    
    documentFragment.appendChild(heading);
    documentFragment.appendChild(links);
  }

  footer.appendChild(documentFragment);

  block.append(footer);
}
