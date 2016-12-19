import UtilInViewport from "../utils/util.inViewport.js";
import UtilRegisterScroll from "../utils/util.registerScroll.js";

export default class Triangles {
    constructor(el) {
        this.options = {
            canvas: document.querySelector(el),
            color: {
                base: [31, 36, 39],
                factor: function() {
                    return Math.floor((Math.random()*20)-20);
                }
            },
            polygon: {
                nodes: [],
                width: 30,
                height: 30,
                colorCycle: 4000,
                drawFactor: 0.5, // likeliness of color transition being drawn
                transitionCycle: 100 // should never be higher than colorcycle. Maybe use requestAnimationFrame instead (although we might want a 'choppier' effect)? 
            }
         };

        this.init();
        this.addListeners();
    }

    init() {
        this.generate();
        this.cycleColors();
        this.isInView();
    }

    // Set events, listeners
    addListeners() {
        let debounce;
        window.addEventListener("resize", () => {
            clearTimeout(debounce); //Poor man's debounce
            debounce = setTimeout(this.init.bind(this), 100);
        });

        new UtilRegisterScroll(this.isInView.bind(this), 'requestAnimationFrame');
    }

    // Determine if the canvas is in view
    isInView() {
        let state = UtilInViewport(this.options.canvas);
        this.toggleAnimate(state.inView);
    }

    // Toggle animate (set intervals or clear them)
    toggleAnimate(doAnimate) {
        if (doAnimate) {
            // Regenerate colors every color cycle
            if (!this.options.colorCycle) {
                this.options.colorCycle = setInterval(() => {
                    this.cycleColors();
                }, this.options.polygon.colorCycle);
            }

            // Transition to endColor during the color cycle
            if (!this.options.transitionCycle) {
                this.options.transitionCycle = setInterval(() => {
                    this.transitionColors();
                }, this.options.polygon.transitionCycle);
            }
        } else {
            clearInterval(this.options.colorCycle);
            this.options.colorCycle = undefined;
            clearInterval(this.options.transitionCycle);
            this.options.transitionCycle = undefined;
        }
    }

    // Generate new colors for all nodes
    cycleColors() {
        let polygons = this.options.polygon.nodes;
        this.options.polygon.intervalCycle = 0;

        for (p=0; p < polygons.length; p++) {
            if (polygons[p].endColor) {
                polygons[p].startColor = polygons[p].endColor;
            }
            polygons[p].endColor = this.generateColor();
        }
        this.options.polygon.nodes = polygons;
    }

    // Transition colors from start to end color
    transitionColors() {
        let polygons = this.options.polygon.nodes,
            cycle = ((100 / (this.options.polygon.colorCycle / this.options.polygon.transitionCycle)) / 100) * ++this.options.polygon.intervalCycle; //100% / (cycle time) = 2.5% => 2.5/100 = 0.025

        for (p=0; p < polygons.length; p++) {
            if (Math.random() > this.options.polygon.drawFactor) { // This will give more randomness to the transitioning colors
                polygons[p].color = this.diffColorAtPercentage(polygons[p].startColor, polygons[p].endColor, cycle);
            }
        }
        this.drawPolygons(polygons);
    }

    // Generates the nodes (polygons) based on context size
    generate() {
        const c = this.options.canvas,
            parent = c.parentElement,
            width = this.options.polygon.width,
            height = this.options.polygon.height,
            nodes = this.options.polygon.nodes;
        
        c.width = parent.offsetWidth;
        c.height = parent.offsetHeight;
      

        for (h=0; h < Math.ceil(c.width/width)+1; h++) { // Horizontal rows
            let v = 0;
            for (v=0; v < Math.ceil(c.height/(height/2))+1; v++) { // Vertical rows
                
                let color = this.generateColor();
                
                //Every 'odd' row needs to offset 1/2 a triangle to match them up
                let offset = (h%2) ? width : 0;
                if (v%2) {
                  offset = (h%2) ? 0 : width;
                }

                nodes.push({
                    id: `polygon-${h}-${v}`,
                    width: width,
                    height: height,
                    h: h,
                    v: v,
                    offset: offset,
                    color: color,
                    startColor: color
                });
            }
        }

        this.drawPolygons(nodes);
    }

    // Draw polygon on the canvas
    drawPolygons(nodes) {
        const c = this.options.canvas,
            parent = c.parentElement,
            width = this.options.polygon.width,
            height = this.options.polygon.height;
        
        c.width = parent.offsetWidth;
        c.height = parent.offsetHeight;

        let ctx = c.getContext("2d");

        ctx.clearRect(0, 0, parent.offsetWidth, parent.offsetHeight);
        ctx.save();

        for(var i = 0; i < nodes.length; i++){
            var n=nodes[i];
            ctx.strokeStyle = `rgb(${n.color[0]},${n.color[1]},${n.color[2]})`;
            ctx.fillStyle = `rgb(${n.color[0]},${n.color[1]},${n.color[2]})`;

            ctx.lineWidth = 0;

            // Will generate a triangle taking into account the general location (v, h) and odd / even row (offset)
            ctx.beginPath();
            ctx.moveTo((n.width*n.h)+n.offset, n.height/2*n.v);
            ctx.lineTo(((n.width)*(n.h+1)-n.offset), (((n.height/2)*n.v)+n.height/2));
            ctx.lineTo(((n.width)*(n.h+1)-n.offset), (((n.height/2)*n.v)-n.height/2));
            ctx.lineTo((n.width*n.h)+n.offset, n.height/2*n.v);
            ctx.closePath();
            
            ctx.stroke();
            ctx.fill();
        }
        ctx.restore();
    }

    // Will generate a random color based on the base color and offset percentage
    generateColor() {
        let rgb = this.options.color.base.slice(0),
            percent = this.options.color.factor();

        rgb[0] = Math.floor(rgb[0] + (256 - rgb[0]) * percent / 100);
        rgb[1] = Math.floor(rgb[1] + (256 - rgb[1]) * percent / 100);
        rgb[2] = Math.floor(rgb[2] + (256 - rgb[2]) * percent / 100);

        return rgb;
    }

    // Will return the color at a certain percentage between start and end color
    diffColorAtPercentage(startColor, endColor, percent) {
        return [
            Math.floor(startColor[0] - (startColor[0] - endColor[0]) * percent),
            Math.floor(startColor[1] - (startColor[1] - endColor[1]) * percent),
            Math.floor(startColor[2] - (startColor[2] - endColor[2]) * percent)
        ];
    }
}
