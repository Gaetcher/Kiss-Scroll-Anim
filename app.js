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
            this.observer.observe(element);
        });
    }

    setObserverOptions() {
        return {
            root: this.options.root,
            rootMargin: this.options.rootMargin,
            threshold: this.options.ratio
        }
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