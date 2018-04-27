/**
 *
 * I found the concept of Instructional Art, i.e. creating art using a set of instructions, quite fascinating.
 * While looking for design inspirations for the project, I came across a video on YouTube which talked about
 * Vintage Computer Art using Processing ("Recreating Vintage Computer Art with Processing", 2015).
 * On reading further, I found the original documentary (Whitney, 1968) and I picked up that concept to create the Blitz Machine.
 *
 * Blitz machine deals with parameterized coordinates on the Cartesian Plane. It draws triangles, rectangles or ellipses
 * on the plane, the coordinates of which are computed using sine and cosine functions and factors such as
 * frequency, amplitude, and phase. The canvas itself is rotated to make the figure seem more random.
 *
 * Randomness seems chaotic. But if seen with the right eye, there's beauty in chaos. Finding order in chaos is an Art.
 * Generative Deisgn is pretty good in that.
 *
 * References:
 * Recreating Vintage Computer Art with Processing. (2015). YouTube. Retrieved 30 March 2018, from https://www.youtube.com/watch?v=LaarVR1AOvs
 * Whitney, J. (1968). https://archive.org/details/experimentsinmotiongraphics. Video.
 */

var param_one, param_two, color, amplitude = 200, frequency = 10, number_of_lines = 20, figure_code = 0, phase = 20;

function setup() {
    //Setup Canvas
    createCanvas(900, 900);
    background(20);

    // Get random parameters
    param_one = random(-width - 50, width - 50);
    param_two = random(-height - 50, height - 50);

    // Get random hues
    color = random(100, 360);

    textSize(12);
    colorMode(HSL);
}

function draw() {

    background(20);

    // Translate matrix to center of canvas
    translate(width / 2, height / 2);

    noStroke();
    fill(255);

    // Draw instructions
    text('W/S : Change number of objects', -420, -430);
    text('A/D : Change phase between figures', -220, -430);
    text('Up/Down : Change amplitude', 40, -430);
    text('Left/Right : Change frequency', 260, -430);
    text('Spacebar : Toggle figures', -140, -410);
    text('R : Reset', 40, -410);

    text('Phase: ' + phase, -420, 430);
    text('Number of objects: ' + number_of_lines, -250, 430);
    text('Frequency: ' + frequency, 150, 430);
    text('Amplitude: ' + amplitude, 320, 430);
    text('Figure: ' + (figure_code === 0 ? 'Triangle' : figure_code === 1 ? 'Rectangle' : 'Ellipse'), -30, 430);

    strokeWeight(2);

    // Adjust min values
    if (number_of_lines < 1) {
        number_of_lines = 1;
    }
    if (phase < 10) {
        phase = 10;
    }
    // Draw
    push();
    for (var i = 0; i < number_of_lines; i++) {
        rotate(PI / i);
        stroke(color, 50, 30 + i * 2);
        noFill();
        if (figure_code === 0) {
            triangle(x1(param_one + i - phase), y1(param_one + i - phase), x2(param_one + i - phase), y2(param_one + i - phase), x2(param_two - i + phase), x1(param_two - i - phase));
        }
        else if (figure_code === 1) {
            rect(x1(param_one + i + phase), y1(param_one + i + phase), x2(param_one + i - phase), y2(param_one + i - phase));
        }
        else if (figure_code === 2) {
            ellipse(x1(param_one + i - phase), y1(param_one + i - phase), x2(param_two + i - phase), y2(param_two + i - phase));
        }
    }
    pop();

    // Increment parameter
    param_one += 0.25;
    param_two += 0.25;

}


// Perform key press actions
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        frequency--;
    } else if (keyCode === RIGHT_ARROW) {
        frequency++;
    }
    if (keyCode === UP_ARROW) {
        amplitude += 10;
    } else if (keyCode === DOWN_ARROW) {
        amplitude -= 10;
    }
    if (keyCode === 87) {
        number_of_lines++;
    } else if (keyCode === 83) {
        number_of_lines--;
    }
    if (keyCode === 65) {
        phase -= 10;
    } else if (keyCode === 68) {
        phase += 10;
    }
    if (keyCode === 32) {
        color = random(100, 360);
        figure_code = ++figure_code % 3;
    }
    if (keyCode === 82) {
        amplitude = 200, frequency = 10, number_of_lines = 20, figure_code = 0, phase = 20;
        setup();
    }
}

// Functions which take parameter and return polar coordinates thanks to sine and cosine functions
function x1(t) {
    return sin(t / frequency) * amplitude + sin(t / frequency) * amplitude;
}

function y1(t) {
    return sin(t / frequency) * amplitude * 2 - sin(t / frequency) * amplitude;
}

function x2(t) {
    return sin(t / frequency) * amplitude + cos(t / frequency) * amplitude;
}

function y2(t) {
    return cos(t / frequency) * amplitude - sin(t / frequency) * amplitude * 2;
}