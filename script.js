(function () {
  var template = document.createElement('template');
  var burgerSVGTemplate = document.createElement('template');

  burgerSVGTemplate.innerHTML = `
    <svg class="desktop-burger" style="vertical-align:middle;" width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.75 53.125V46.875H81.25V53.125H18.75ZM18.75 71.875V65.625H81.25V71.875H18.75ZM18.75 34.375V28.125H81.25V34.375H18.75Z" fill="black"/>
    </svg>
  `;
  template.innerHTML = `
    <style>
      /* Your existing CSS styles */

      /* Include additional or modified styles here if needed */
    </style>

    <slot></slot>
    <div part="burgerToggle" class="burgerToggle">
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.6939 30.1128L30.1133 25.6934L74.3075 69.8875L69.888 74.3069L25.6939 30.1128Z" fill="black"/>
        <path d="M30.1108 74.3071L25.6914 69.8877L69.8856 25.6935L74.305 30.1129L30.1108 74.3071Z" fill="black"/>
      </svg>
    </div>
  `;

  class BetterBurger extends HTMLElement {
    constructor() {
      super();
      let self = this;
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.burger = this.shadowRoot.querySelector('.burgerToggle');
      this.animationCount = 0;
      this.burger.addEventListener('click', function () {
        console.log('the burger has been clicked');
        self.classList.toggle('is-open');
        self.animateLinks();

        if (self.classList.contains('is-open')) {
          self.preventBodyScrollWhenVisible();
        } else {
          self.resetBodyPositionWhenNotVisible();
        }
      });
    }

    getBurgerLinks() {
      var burger = this.shadowRoot.querySelector('a[href="/burger"]');
      var links = burger.nextElementSibling.querySelectorAll('a');
      return links;
    }

    preventBodyScrollWhenVisible() {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    }

    resetBodyPositionWhenNotVisible() {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    animateLinks() {
      var links = this.querySelectorAll('a');
      links.forEach((link, index) => {
        link.style.opacity = '0';
        link.animate(
          {
            opacity: ['0', '1'],
            transform: ['translateY(12px)', 'translateY(0px)'], // Modified to maintain both transform styles
            transform: ['scale(1.2)', 'scale(1)'],
          },
          {
            duration: parseInt(500, 10),
            delay: (index + 1) * 150,
            fill: 'both',
            easing: 'ease-in-out',
          }
        );
      });
    }

    connectedCallback() {
      this.querySelectorAll('a').forEach(link => {
        link.classList.add('header-nav-item');
        link.style.fontSize = '4vmin';
        this.appendChild(link);
      });
    }
  }

  window.customElements.define('better-burger', BetterBurger);
})();
