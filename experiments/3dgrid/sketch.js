"use strict";
 
 
// - - - SKETCH
// This stores a global reference to the p5 object
// whilst keeping global scope clean of p5js pollution
window['$p5'] = new p5(function (p) {
 
    var cols = 10;
    var rows = 6;
    // focal length as per the book's explanation
    // and yes seems fairly arbitrary
    var fl = 250;
 
    var stepX, stepY;
    // foo is actually a multiplier being applied to the z depth
    var zMultiplier = 1;
    var vpX, vpY;
    var offsetX, offsetY;
 
    p.setup = function () {
        p.createCanvas(600, 400);
 
        stepX = p.width/cols;
        stepY = p.height/rows;
 
        // vanishing point works...
        vpX = p.width * 0.9;
        vpY = p.height * 0.85;
        // but you have to offset your starting position:
        offsetX = -vpX + stepX/2;
        offsetY = -vpY + stepY/2;
        //note: stepX/Y/2 are just arbitrary offsets from the edge    
    };
 
    p.draw = function() {
 
        p.background(0);
        p.noStroke();
        p.fill(255);
 
        for(var i = 0; i < cols; i++){
          // z position in '3d space'
          // z goes further away in each column
          var z = i * zMultiplier;
          // the magic formula - check the book for an explanation
          var scale = fl/(fl+z);
 
          // x position in '3d space'
          var x = offsetX + stepX * i;
 
          // apply the formula to get the 2d position            
          var x2D = vpX + x * scale;
          // scale to give sense of depth
          var size = 40 * scale;
 
          for (var j = 0; j < rows; j++) {
            // y position in '3d space'  
            var y = offsetY + stepY * j;
            // apply the formula to get the 2d position
            var y2D = vpY + y * scale;
            p.ellipse(x2D, y2D, size, size);
          }
        }        
 
    };
 
    p.mouseMoved = function() {
      // fairly arbitrary values that generated nice results
      zMultiplier = p.mouseX/p.width * 25;
    };
 
}, "sketch01");