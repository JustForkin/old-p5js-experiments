/*
    int width
    int height
    int columns
    int rows
    int focal length
    array gridArray
    bln invert the grid
*/
function Grid(w, h, cols, rows, fl, gridArray, invertH) {
    this.stepX = w / cols;
    this.stepY = h / rows;
    // vanishing point works...
    this.vpX = w * 0.9;
    this.vpY = h * 0.85;
    // but you have to offset your starting position:
    this.offsetX = -this.vpX + this.stepX/2;
    this.offsetY = -this.vpY + this.stepY/2;
    //note: stepX/Y/2 are just arbitrary offsets from the edge
    // convert values of beats
    this.audioReaction = function(beatLvl) {

    }

    // update the Y values with trigonometry
    this.update = function() {

    }

    this.create = function() {
        for (var i = 0; i < cols; i++) {
            // the magic formula - check the book for an explanation
            var scale = fl/(fl+i);
            
            if (i < 3 || i===10 || i===cols-1 ) {
                var size = 10 * scale;
            } else {
                var size = 2 * scale;
            }

            // x position in '3d space'
            var x = this.offsetX + this.stepX * i;

            // apply the formula to get the 2d position            
            var x2D = this.vpX + x * scale;

            if (invertH) x2D *= -1;

            for (var j = 0; j < rows; j++) {
                // y position in '3d space'  
                var y = this.offsetY + this.stepY * (j*2);
                // apply the formula to get the 2d position
                var y2D = this.vpY + y * scale;
               
                gridArray.push(new Particle(x2D, y2D, size));
            }
        }
    }
    
}