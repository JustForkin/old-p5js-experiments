// TODO: move eye arcs
function Eye() {

    // let's draw the arcs of the eye from the inside out
    strokeWeight(4);
    stroke(255);
    drawEyeArcs(0, 0, 75, 6);

    // outer ones
    strokeWeight(1);
    drawEyeArcs(0, 0, 215, 28);
    strokeWeight(3);
    drawEyeArcs(0, 0, 240, 26);
    strokeWeight(1);
    drawEyeArcs(0, 0, 260, 24);


    // draw all the Shapes using the custom drawEyeVertices() method
    strokeWeight(1);
    stroke(255);
    // the inner ones
    drawEyeVertices(0, 0, 15, 25, 12);

    push();
    rotate(20);
    drawEyeVertices(0, 0, 25, 35, 12);
    pop();
    push();
    rotate(20);
    drawEyeVertices(0, 0, 35, 45, 12);
    pop();

    drawEyeVertices(0, 0, 95, 105, 30);
    // the outer ones
    push();
    rotate(20);
    drawEyeVertices(0, 0, 100, 115, 30);
    pop();

    push();
    rotate(20);
    drawEyeVertices(0, 0, 115, 125, 30);
    pop();
}
