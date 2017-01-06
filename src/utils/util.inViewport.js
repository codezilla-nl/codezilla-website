export default function UtilInViewport(element) {
    let rect = element.getBoundingClientRect(),
        html = document.documentElement,
        result = {
            inView: false,
            inViewPart: false
        };

    result.inView =
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight);

    if (rect.top <= 0 &&
        rect.bottom >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight)) {
        result.inView = true;
        result.inViewPart = 'top';
    }
    else if (rect.top >= 0 &&
        rect.top <= (window.innerHeight || html.clientHeight) &&
        rect.bottom >= (window.innerHeight || html.clientHeight)) {
        result.inView = true;
        result.inViewPart = 'bottom';
    }
  return result;
}
