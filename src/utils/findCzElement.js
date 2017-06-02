export function findCzElements(dataAttr) {
    return findByAttr(dataAttr);
}

export function findByAttr(dataAttr, dataAttrVal, scope = document) {
    let queryAddition = '';
    
    if (dataAttrVal) {
        queryAddition = '~="' + dataAttrVal + '"';
    }
    
    const query = `[cz-${dataAttr}${queryAddition}]`;
    
    return [].slice.call(scope.querySelectorAll(query));
}
