function drawEyeArcs(x, y, size, segments, margin) {
    // TODO: define a margin between the arcs
    
    // we draw double the segments, because we want to skip each odd one
    segments *= 2;
    margin = margin || 0;

    for (var i = 0; i < segments; i++) {
        if (i % 2 === 1) {
            var start = TWO_PI / segments * i;
            var end = TWO_PI / segments * (i + 1);
            arc(0, 0, size, size, start, end);
        }
    }
}