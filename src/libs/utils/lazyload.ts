export const lazyLoad = (node: any, src: any) => {
    if (IntersectionObserver) {

        const onIntersect = (entries: any[]) => {
            entries.forEach((entry: { isIntersecting: any; }) => {
                if (entry.isIntersecting) {
                    node.setAttribute('src', src);
                }
            });
        }

        const observer = new IntersectionObserver(onIntersect, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        observer.observe(node);
        return {
            destroy() {
                observer && observer.unobserve(node);
            }
        };
    } else {
        // fallback
        let lazyLoadThrottleTimeout = undefined;

        const polyfillLazyLoad = () => {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }

            lazyLoadThrottleTimeout = setTimeout(function () {
                const scrollTop = window.pageYOffset;
                if (node.offsetTop < window.innerHeight + scrollTop) {
                    node.setAttribute('src', src);
                }
            }, 20);
        }
        document.addEventListener('scroll', polyfillLazyLoad);
        window.addEventListener('resize', polyfillLazyLoad);
        window.addEventListener('orientationChange', polyfillLazyLoad);
        return {
            destroy() {
                document.removeEventListener('scroll', polyfillLazyLoad);
                window.removeEventListener('resize', polyfillLazyLoad);
                window.removeEventListener('orientationChange', polyfillLazyLoad);
            }
        };
    }
}