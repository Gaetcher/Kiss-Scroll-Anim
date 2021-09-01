class KissScrollAnim {
    constructor(options = {}) {
        this.options = Object.assign({}, {
            root : null,
            rootMargin : '0px',
            ratio : .25,
        }, options),
            this.elements = document.querySelectorAll('.ksa-element'),
            this.observer
            this.ratio = this.options.ratio
            this.init();
    }

    init() {
        let observerOptions = this.setObserverOptions();
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), observerOptions);
        this.elements.forEach(element => {
            element.classList.add('ksa-invisible');

            if (element.dataset.ksaDelay) {
                this.getDataOptions(element)
            } else {
                this.observer.observe(element);
            }
        });
    }

    setObserverOptions() {
        return {
            root: this.options.root,
            rootMargin: this.options.rootMargin,
            threshold: this.options.ratio
        }
    }

    getDataOptions(element) {
        let parsedDelay = Number.parseInt(element.dataset.ksaDelay, 10)
        if (Number.isNaN(parsedDelay)) {
            parsedDelay = 0
        }
        if (parsedDelay != 0) {
            element.setAttribute('style', 'animation-delay:' + parsedDelay + 'ms;')
            this.observeElement(element)
        } else {
            this.observeElement(element)
        }
    }

    observeElement(element) {
        this.observer.observe(element);
    }

    handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > this.ratio) {
                entry.target.classList.remove('ksa-invisible');
                entry.target.classList.add('ksa-active');
                observer.unobserve(entry.target)
            }
        });
    }
}