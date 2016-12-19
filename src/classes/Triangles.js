export default class Triangles {
    constructor() {
        this.options = {
            canvas: document.getElementById('triangles'),
            polygon: {
                nodes: [],
                width: 30,
                height: 30,
                colorCycle: 4000,
                transitionCycle: 100 //should never be higher than colorcycle
            }
         };

        this.init();
        this.addListeners();


        var that = this;
        
        // Regenerate colors every color cycle
        this.options.colorCycle = setInterval(() => {
            that.cycleColors();
        }, this.options.polygon.colorCycle);
        
        // Transition to endColor during the color cycle
        this.options.transitionCycle = setInterval(() => {
            that.transitionColors();
        }, this.options.polygon.transitionCycle);
    }

    init() {
        this.generate();
        this.cycleColors();
    }
    addListeners() {
        let debounce;
        window.addEventListener("resize", () => {
            clearTimeout(debounce); //Poor man's debounce
            debounce = setTimeout(this.init.bind(this), 100);
        });
    }

    cycleColors() {
        this.options.polygon.intervalCycle = 0;
        let polygons = this.options.polygon.nodes;

        for (p=0; p < polygons.length; p++) {
            if (polygons[p].endColor) {
                polygons[p].startColor = polygons[p].endColor;
            }
            polygons[p].endColor = this.generateColor();
        }
        this.options.polygon.nodes = polygons;
        this.drawPolygons(polygons);
    }

    transitionColors() {
        let polygons = this.options.polygon.nodes,
            cycle = ((100 / (this.options.polygon.colorCycle / this.options.polygon.transitionCycle)) / 100) * ++this.options.polygon.intervalCycle; //100% / (cycle time) = 2.5% => 2.5/100 = 0.025

        for (p=0; p < polygons.length; p++) {
            if (Math.random() > 0.5) { // Put some randomness in the calc
                polygons[p].color = this.diffColorAtPercentage(polygons[p].startColor, polygons[p].endColor, cycle);
            }
        }
        this.drawPolygons(polygons);
    }

    generate() {
        const c = this.options.canvas,
            parent = c.parentElement,
            width = this.options.polygon.width,
            height = this.options.polygon.height;
        
        c.width = parent.offsetWidth;
        c.height = parent.offsetHeight;
      
        let nodes = this.options.polygon.nodes;

        for (h=0; h < Math.ceil(c.width/width)+1; h++) {
            let v = 0;
            for (v=0; v < Math.ceil(c.height/(height/2))+1; v++) {
                
                let color = this.generateColor(),
                    offset = (h%2) ? width : 0;

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

    drawPolygons(nodes){
        const c = this.options.canvas,
            parent = c.parentElement,
            width = this.options.polygon.width,
            height = this.options.polygon.height;
        
        c.width = parent.offsetWidth;
        c.height = parent.offsetHeight;

        let ctx = c.getContext("2d");

        ctx.clearRect(0, 0, c.width, c.height);
        ctx.save();
        // ctx.scale(scaleFactor,scaleFactor);
        for(var i = 0; i < nodes.length; i++){
            var n=nodes[i];
            ctx.strokeStyle = `rgb(${n.color[0]},${n.color[1]},${n.color[2]})`;
            ctx.fillStyle = `rgb(${n.color[0]},${n.color[1]},${n.color[2]})`;

            ctx.lineWidth = 0;

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

    generateColor() {
        return this.brighten([31, 36, 39], Math.floor((Math.random()*20)-20));
    }

    brighten(rgb, percent) {
        // rgb = this.hexToRgb(hex);

        rgb[0] = Math.floor(rgb[0] + (256 - rgb[0]) * percent / 100);
        rgb[1] = Math.floor(rgb[1] + (256 - rgb[1]) * percent / 100);
        rgb[2] = Math.floor(rgb[2] + (256 - rgb[2]) * percent / 100);

        return rgb;
        // return '#' +
        //     ((0|(1<<8) + rgb[0] + (256 - rgb[0]) * percent / 100).toString(16)).substr(1) +
        //     ((0|(1<<8) + rgb[1] + (256 - rgb[1]) * percent / 100).toString(16)).substr(1) +
        //     ((0|(1<<8) + rgb[2] + (256 - rgb[2]) * percent / 100).toString(16)).substr(1); 
    }

    diffColorAtPercentage(startColor, endColor, perc) {
        return [
            Math.floor(startColor[0] - (startColor[0] - endColor[0]) * perc),
            Math.floor(startColor[1] - (startColor[1] - endColor[1]) * perc),
            Math.floor(startColor[2] - (startColor[2] - endColor[2]) * perc)
        ];


    }

    // componentToHex(c) {
    //     var hex = c.toString(16);
    //     return hex.length == 1 ? "0" + hex : hex;
    // }

    // rgbToHex(r, g, b) {
    //     return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    // }

    // hexToRgb(hex) {
    //     var rgb = [];
    //     // strip the leading # if it's there
    //     hex = hex.replace(/^\s*#|\s*$/g, '');
        
    //     // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    //     if(hex.length == 3){
    //         hex = hex.replace(/(.)/g, '$1$1');
    //     }
        
    //     //convert to rgb
    //     rgb.push(parseInt(hex.substr(0, 2), 16));
    //     rgb.push(parseInt(hex.substr(2, 2), 16));
    //     rgb.push(parseInt(hex.substr(4, 2), 16));

    //     return rgb;
    // }

}
