'use strict';

class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let delta = 150 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.typewriter');
    elements.forEach((element) => {
        const toRotate = element.getAttribute('data-type');
        const period = element.getAttribute('data-period');
        if (toRotate) {
            new TxtType(element, JSON.parse(toRotate), period);
        }
    });

    // INJECT CSS
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.typewriter > .wrap { border-right: 0.1em solid #1688f0}';
    document.body.appendChild(css);
});

(function ($) {
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').on('click', function (e) {
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        const heading = $(this).attr('href');
        const scrollDistance = $(heading).offset().top;

        $('html, body').animate(
            {
                scrollTop: `${scrollDistance}px`
            },
            Math.abs(window.pageYOffset - $(heading).offset().top) / 1
        );

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').on('click', () => {
        $('html, body').animate({scrollTop: 0}, 500);
    });

    // Scroll to first element
    $('#lead-down span').on('click', () => {
        const scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({scrollTop: `${scrollDistance}px`}, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function () {
        const $this = $(this);
        const $userContent = $this.children('div');

        // Create each timeline block
        $userContent.each(function () {
            $(this)
                .addClass('vtimeline-content')
                .wrap(
                    '<div class="vtimeline-point"><div class="vtimeline-block"></div></div>'
                );
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function () {
            $(this).prepend(
                '<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>'
            );
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function () {
            const date = $(this).data('date');
            if (date) {
                $(this)
                    .parent()
                    .prepend(`<span class="vtimeline-date">${date}</span>`);
            }
        });
    });

    $('#mobile-menu-open').on('click', () => {
        $('header, body').addClass('active');
    });

    $('#mobile-menu-close').on('click', () => {
        $('header, body').removeClass('active');
    });
})(jQuery);
