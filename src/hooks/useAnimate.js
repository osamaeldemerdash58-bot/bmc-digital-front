import { useEffect } from 'react';

/**
 * useAnimate
 * Observes animated elements and adds `.anim-visible` when in viewport,
 * REMOVES it when they leave — so animation replays on every scroll.
 */
export function useAnimate(threshold = 0.12) {
  useEffect(() => {
    const selectors = [
      '[data-anim]',
      '.card-grid-item',
      '.process-left',
      '.process-right',
      '.testimonial-card',
      '.faq-item',
      '.contact-info',
      '.contact-form',
      '.about-text',
      '.about-stats',
      '.section-header-anim',
      '.works-card',
      '.tech-card',
      '.gold-line-animate',
    ].join(', ');

    const elements = document.querySelectorAll(selectors);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
          } else {
            // Remove class so animation replays next time element enters viewport
            entry.target.classList.remove('anim-visible');
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}

/**
 * useAnimateSection — observe elements within a specific container ref
 */
export function useAnimateSection(ref, threshold = 0.12) {
  useEffect(() => {
    if (!ref?.current) return;

    const selectors = [
      '[data-anim]',
      '.card-grid-item',
      '.process-left',
      '.process-right',
      '.testimonial-card',
      '.faq-item',
      '.contact-info',
      '.contact-form',
      '.about-text',
      '.about-stats',
      '.section-header-anim',
      '.works-card',
      '.tech-card',
      '.gold-line-animate',
    ].join(', ');

    const elements = ref.current.querySelectorAll(selectors);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
          } else {
            entry.target.classList.remove('anim-visible');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref, threshold]);
}