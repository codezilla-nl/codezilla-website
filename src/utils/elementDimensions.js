export function getOffsetFromElement(el) {
    var x = 0;
    var y = 0;
    
    while (el) {
        if (el.tagName === 'BODY') {
            x += el.offsetLeft + el.clientLeft;
            y += el.offsetTop + el.clientTop;
        } else {
            x += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            y += (el.offsetTop - el.scrollTop + el.clientTop);
        }
        
        el = el.offsetParent;
    }
    
    return {y, x};
}

export function getElementDimensions(element){
    let offset = getOffsetFromElement(element);
    
    return {
        height : element.offsetHeight,
        width : element.offsetWidth,
        top : offset.y,
        left : offset.x
    }
}
