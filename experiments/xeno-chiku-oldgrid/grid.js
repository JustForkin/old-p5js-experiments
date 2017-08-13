/*
    int width
    int height
    int columns
    int rows
    int focal length
    array gridArray
    bln invert the grid
*/
function Grid(w, h, cols, rows, fl, gridArray, invertH, invertV) {
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

    // display grid with cols&rows
    this.create = function() {
        for (var i = 0; i < cols; i++) {
            var scale = fl / (fl + i);
            
            if (i < 3 || i===10 || i===cols-1 ) {
                var size = 10 * scale;
            } else {
                var size = 2 * scale;
            }
            var x = this.stepX * i * scale;
            if (invertH) x *= -1;

            for (var j = 0; j < rows; j++) {
                var y = this.stepY * j * scale;
                if (invertV) y *= -1;
               
                gridArray.push(new Particle(x, y, size));
            }
        }
    }

   
}