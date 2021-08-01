class KissScroll {
    constructor(options = {}) {
        this.options = Object.assign({}, {
            root : null,
            rootMargin : '0px',
            ratio : .25,
        }, options),
            this.elements = document.querySelectorAll('.kiss-element'),
            this.observer
            this.ratio = this.options.ratio
            this.init();


    }

    init() {
        let observerOptions = this.setObserverOptions();
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), observerOptions);
        this.elements.forEach(element => {
            element.classList.add('kiss-invisible');
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
            console.log(entry.target, entry.intersectionRatio);
            if (entry.intersectionRatio > this.ratio) {
                entry.target.classList.remove('kiss-invisible');
                observer.unobserve(entry.target)
            }
        });
    }
}