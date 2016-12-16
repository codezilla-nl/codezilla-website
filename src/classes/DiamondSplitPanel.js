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

function DiamondSplitPanel() {
    
    initialize();
    
    function initialize() {
        $diamonds.forEach($diamond =>
          $diamond.onclick = showPanel.bind(null, $diamond)
        );
    }
    
    function showPanel($diamond){
        $splitPanels.style.display = panelDisplayStyle.show;
        
        openPanelBgFromDiamond($panelFromDiamond, $diamond);
        
        $splitPanels.onclick = closePanelToDiamond;
    }
    
    function openPanelBgFromDiamond($panel, $diamond){
        $panel.style.transform = calculatePanelTransformations(
          getElementDimensions($diamond),
          getElementDimensions($panel)
        );
        
        $panel.classList.add(panelPreAnimateClass);
        
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
        }
    }
    
    function calculatePanelTransformations(diamondDimensions, panelDimensions){
        var translateX = diamondDimensions.left - panelDimensions.left;
        var scaleX = diamondDimensions.width / panelDimensions.width;
        var scaleY = diamondDimensions.height / panelDimensions.height;
        return `translateX(${translateX}px) scaleX(${scaleX}) scaleY(${scaleY}) rotate(-45deg)`;
    }
    
}

export default DiamondSplitPanel;
