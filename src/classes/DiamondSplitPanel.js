import {findCzElements} from '../utils/findCzElement';
import {getElementDimensions} from '../utils/elementDimensions';
import {onPrefixedEvent, offPrefixedEvent} from '../utils/prefixedEvent';

const panelAnimateClass = 'cz-split-panels__panel-bg--animate',
    panelPreAnimateClass = 'cz-split-panels__panel-bg--pre-animate',
    panelsAnimateClass = 'cz-split-panels--active';

const $diamonds = findCzElements('diamond');
const $splitPanels = findCzElements('diamond-split-panel')[0];
const $panelFromDiamond = findCzElements('panel-from-diamond')[0];

const panelDisplayStyle = {
    hide : 'none',
    show: 'block'
};

function DiamondSplitPanel(bodyLocker) {
    
    initialize();
    
    function initialize() {
        $diamonds.forEach($diamond =>
          $diamond.onclick = showPanel.bind(null, $diamond)
        );
    }
    
    function showPanel($diamond){
        bodyLocker.lockMobile();
        $splitPanels.style.display = panelDisplayStyle.show;
        $splitPanels.scrollTop = 0;
        
        openPanelBgFromDiamond($panelFromDiamond, $diamond);
        
        $splitPanels.onclick = closePanelToDiamond;
    }
    
    function openPanelBgFromDiamond($panel, $diamond){
        const diamondDims = getElementDimensions($diamond),
            panelDims = getElementDimensions($panel);
        
        const transformations = calculatePanelTransformations(
          diamondDims,
          panelDims
        );
        
        Object.assign($panel.style, transformations);
        
        requestAnimationFrame(()=>{
            $splitPanels.classList.add(panelsAnimateClass);
            $panel.classList.add(panelAnimateClass);
            $panel.style.transform = null;
            $panel.classList.remove(panelPreAnimateClass);
            onPrefixedEvent($panel, 'transitionend', removeAnimateClass);
        });
        
        function removeAnimateClass(){
            $panel.classList.remove(panelAnimateClass);
            offPrefixedEvent($panel, 'transitionend', removeAnimateClass);
        }
    }
    
    function closePanelToDiamond(){
        requestAnimationFrame(()=>{
            $splitPanels.classList.remove(panelsAnimateClass);
            onPrefixedEvent($splitPanels, 'transitionend', hideSplitPanels);
        });
    
        function hideSplitPanels(){
            $splitPanels.style.display = panelDisplayStyle.hide;
            offPrefixedEvent($splitPanels, 'transitionend', hideSplitPanels);
            bodyLocker.unlockMobile();
        }
    }
    
    function calculatePanelTransformations(diamondDimensions, panelDimensions){
        const translateX = diamondDimensions.left - panelDimensions.left;
        const translateY = diamondDimensions.top - panelDimensions.top;
        const scaleX = diamondDimensions.width / panelDimensions.width;
        const scaleY = diamondDimensions.height / panelDimensions.height;
        
        return {
            transform:`translate3d(${translateX}px, ${translateY}px, 0) rotate(-45deg) scale(${scaleX}, ${scaleY})`
        }
    }
    
}

export default DiamondSplitPanel;
