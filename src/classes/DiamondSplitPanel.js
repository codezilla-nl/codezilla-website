import {findCzElements, findByAttr} from '../utils/findCzElement';
import {getElementDimensions} from '../utils/elementDimensions';
import {onPrefixedEvent, offPrefixedEvent} from '../utils/prefixedEvent';

const panelAnimateClass = 'cz-split-panels__panel-bg--animate',
    panelPreAnimateClass = 'cz-split-panels__panel-bg--pre-animate',
    panelsAnimateClass = 'cz-split-panels--active',
    diamondSpacerClass = 'cz-diamond--spacer';

const $diamonds = findCzElements('diamond').filter(($diamond) => !$diamond.classList.contains(diamondSpacerClass));
const $splitPanels = findCzElements('diamond-split-panel');

const panelDisplayStyle = {
    hide : 'none',
    show: 'block'
};

const KEYCODES = {
    ESCAPE: 27
};

function DiamondSplitPanel(bodyLocker, nav) {

    let keyDownFunction;

    initialize();

    function initialize() {
        $splitPanels.forEach(($panel) => {
            document.body.appendChild($panel);
        });
        $diamonds.forEach($diamond =>
          $diamond.onclick = showPanel.bind(null, $diamond)
        );
    }

    function showPanel($diamond){
        //500ms is the time for the navigation animation to close
        const navigationCloseTimer = nav.open === false ? 0 : 500;
        //Always close the navigation when a diamond has been clicked
        nav.open = false;

        setTimeout(function() {
            //Get the actual diamond shape
            const $diamondShape = findByAttr('diamond-shape', '', $diamond)[0];
            //Get the member name from a diamond
            const memberName = $diamond.getAttribute('cz-team-member');
            //Get the panels by memberName
            const $splitPanelsFiltered = $splitPanels.filter((panel) => panel.getAttribute('cz-team-member') === memberName);
            if($splitPanelsFiltered && $splitPanelsFiltered.length) {
                //Get the first panel (there should always be one)
                const $splitPanelOverlay = $splitPanelsFiltered[0];
                //Get the panel shape from the current
                const $panelShape = findByAttr('panel-from-diamond', '', $splitPanelOverlay)[0];
                //Lock the body for the overlay
                bodyLocker.lockMobile();
                //Show the panel overlay
                $splitPanelOverlay.style.display = panelDisplayStyle.show;
                //Set scrolling to top
                $splitPanelOverlay.scrollTop = 0;
                //Animate panel shape from diamond shape
                openPanelBgFromDiamond($panelShape, $splitPanelOverlay, $diamondShape);
                //Init click handler for closing the overlay
                $splitPanelOverlay.onclick = closePanelToDiamond.bind(null, $splitPanelOverlay);
            }
        }, navigationCloseTimer);
    }

    function openPanelBgFromDiamond($panel, $splitPanel, $diamond){
        const diamondDims = getElementDimensions($diamond),
            panelDims = getElementDimensions($panel);

        const transformations = calculatePanelTransformations(
          diamondDims,
          panelDims
        );

        Object.assign($panel.style, transformations);

        //Set up key down function and attach eventlistener
        keyDownFunction = (e) => handleKeydown(e, $splitPanel);
        document.addEventListener('keydown', keyDownFunction);

        requestAnimationFrame(()=>{
            $splitPanel.classList.add(panelsAnimateClass);
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

    function handleKeydown(e, $splitPanel) {
        if (e.keyCode === KEYCODES.ESCAPE) {
            closePanelToDiamond($splitPanel);
        }
    }

    function closePanelToDiamond($splitPanel){
        requestAnimationFrame(()=>{
            $splitPanel.classList.remove(panelsAnimateClass);
            onPrefixedEvent($splitPanel, 'transitionend', hideSplitPanels);
        });

        document.removeEventListener('keydown', keyDownFunction);

        function hideSplitPanels(){
            $splitPanel.style.display = panelDisplayStyle.hide;
            offPrefixedEvent($splitPanel, 'transitionend', hideSplitPanels);
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
