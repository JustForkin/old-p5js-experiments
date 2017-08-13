// custom drawEyeVertices() method with input parameters for:
// the location, shapeMode, diameters and number of segments
function drawEyeVertices(x, y, diam_inner, diam_outer, numSegments) {
    push();
        translate(x, y);
        beginShape(LINES);
            // generate the step size based on the number of segments
            var step = TWO_PI / numSegments;

            for (var i = 0; i < numSegments; i++) {
                var theta = step * i; // angle for this segment (both vertices)

                // calculate x and y based on angle
                var tx = sin(theta);
                var ty = cos(theta);

                // draw the inner and outer vertices based on the angle, radius
                vertex(tx * diam_inner, ty * diam_inner);
                vertex(tx * diam_outer, ty * diam_outer);
            }
        endShape();
    pop();
}