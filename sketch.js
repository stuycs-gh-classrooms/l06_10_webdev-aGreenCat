var pic;
var filter;

var THRESHHOLD = 55;
var IMG = "lantern.jpg";

/* 
KEYS:
  R - reset the current image.
  P - Switch images.
  
  Z - windmill
  X - cyberpunk
  C - edge detection
  V - waves
  B - fisheye tunnel

*/

function setup() {
  createCanvas(1200, 800);

  pic = loadImage(IMG);
  pic.loadPixels();
}

function draw() {
  background(200);
  image(pic, (width-pic.width)/2, (height-pic.height)/2);
}

function keyPressed() {
  if (key == 'r') {
    pic = loadImage(IMG);
    pic.loadPixels();
  } 
  if (key == 'p') {
    if (IMG == "lantern.jpg")
      IMG = "nyc.jpeg";
    else if (IMG == "nyc.jpeg")
      IMG = "birb.jpg";
    else
      IMG = "lantern.jpg";

    pic = loadImage(IMG);
    pic.loadPixels();
  }
  if (key == 'z') {
    windmill();
    pic.updatePixels();
  }
  if (key == 'x') {
    cyberpunk();
    pic.updatePixels();
  }
  if (key == 'c') {
    edgey();
    pic.updatePixels();
  }
  if (key == 'v') {
    wavy();
    pic.updatePixels();
  }
  if (key == 'b') {
    fishTunnel();
    pic.updatePixels();
  }
}

function windmill() {
  var tmp = createImage(pic.width, pic.height);
  tmp.loadPixels();

  for (var row = 0; row < tmp.height; row++) {
    for (var col = 0; col < tmp.width; col++) {
      var p = row * tmp.width + col;

      var refRow = row;
      var refCol = col;

      if (row <= Math.floor(pic.height/2) && col <= Math.floor(pic.width/2))
        refCol = col + Math.floor(pic.width/2);
      if (row <= Math.floor(pic.height/2) && col > Math.floor(pic.width/2))
        refRow = row + Math.floor(pic.height/2);
      if (row > Math.floor(pic.height/2) && col <= Math.floor(pic.width/2))
        refRow = row - Math.floor(pic.height/2);
      if (row > Math.floor(pic.height/2) && col > Math.floor(pic.width/2))
        refCol = col - Math.floor(pic.width/2);


      var q = refRow * pic.width + refCol;

      tmp.pixels[p*4] = pic.pixels[q*4];
      tmp.pixels[p*4+1] = pic.pixels[q*4+1];
      tmp.pixels[p*4+2] = pic.pixels[q*4+2];
      tmp.pixels[p*4+3] = pic.pixels[q*4+3];
    }
  }

  pic = tmp;
}

function cyberpunk() {
  for (var row = 0; row < pic.height; row++) {
    for (var col = 0; col < pic.width; col++) {
      var p = row * pic.width + col;

      var r = pic.pixels[p*4];
      var g = pic.pixels[p*4+1];
      var b = pic.pixels[p*4+2];

      var av = (r + g + b) / 3;
      if ((r+g+b)/3 > 90) {
        r = av;
        b = av;

        g = av * 0.4;
      } else {
        b = av + (255 - av)/6;
        r = av * 0.2;
        g = av * 0.4;
      }
      pic.pixels[p*4] = r;
      pic.pixels[p*4+1] = g;
      pic.pixels[p*4+2] = b;
      pic.pixels[p*4+3] = 255;
    }
  }
}

function edgey() {
  var tmp = createImage(pic.width, pic.height);
  tmp.loadPixels();

  for (var row = 0; row < pic.height; row++) {
    for (var col = 0; col < pic.width; col++) {
      var p = row * pic.width + col;
      var r = pic.pixels[p*4];
      var g = pic.pixels[p*4+1];
      var b = pic.pixels[p*4+2];

      var nx = max(0, col-2);
      var ny = max(0, row-2);
      var nx2 = min(pic.width-1, col+2);
      var ny2 = min(pic.height-1, row+2);
      //define upper left and lower right corners of neighborhood.

      var sum = 0;
      var i = 0;
      for (var ro = ny; ro <= ny2; ro++) {
        for (var co = nx; co <= nx2; co++) {
          var pix = ro * pic.width + co;
          if (pix == p) continue;
          //skipping itself;

          sum += diff(color(r, g, b), color(pic.pixels[pix*4], pic.pixels[pix*4+1], pic.pixels[pix*4+2]));
          i++;
        }
      }
      var contrast = sum/i; //average

      if (contrast > THRESHHOLD) {
        tmp.pixels[p*4] = 255;
        tmp.pixels[p*4+1] = 255;
        tmp.pixels[p*4+2] = 255;
        tmp.pixels[p*4+3] = 255;
      } else {
        tmp.pixels[p*4] = 0;
        tmp.pixels[p*4+1] = 0;
        tmp.pixels[p*4+2] = 0;
        tmp.pixels[p*4+3] = 255;
      }
    }
  }

  pic = tmp;
}

function diff(c, d) {
  //Find red, green and blue differences, and average them.
  return abs(red(c)-red(d)) + abs(green(c)-green(d)) + abs(blue(c)-blue(d));
}

function wavy() {
  var tmp = createImage(pic.width-20, pic.height);
  tmp.loadPixels();

  for (var row = 0; row < tmp.height; row++) {
    for (var col = 0; col < tmp.width; col++) {
      var p = row * tmp.width + col;
      var q = row * pic.width + int(col + 10 + 10*sin(row*PI/10));

      tmp.pixels[p*4] = pic.pixels[q*4];
      tmp.pixels[p*4+1] = pic.pixels[q*4+1];
      tmp.pixels[p*4+2] = pic.pixels[q*4+2];
      tmp.pixels[p*4+3] = pic.pixels[q*4+3];
    }
  }

  pic = tmp;
}

function fishTunnel() {
  var tmp = createImage(pic.width, pic.height);
  tmp.loadPixels();

  for (var y = 0; y < pic.height; y++) {
    for (var x = 0; x < pic.width; x++) {
      var p = y * pic.width + x;
      var r = sqrt(sq(x-Math.floor(pic.width/2))+sq(y-Math.floor(pic.height/2)));
      var theta = atan2(y-Math.floor(pic.height/2), x-Math.floor(pic.width/2));
      
      r = map(r, 0, 150, 0, 1);
      r = max(0, r);
      r = min(1, r);
      
      r += (1 - sqrt(1 - r*r)) / 2;
      r = map(r, 0, 1, 0, 150);
      
      var x2 = int(r * cos(theta)) + Math.floor(pic.width/2);
      var y2 = int(r * sin(theta)) + Math.floor(pic.height/2);
      var q = y2 * pic.width + x2;
      if (q >= 0) {
        tmp.pixels[p*4] = pic.pixels[q*4];
        tmp.pixels[p*4+1] = pic.pixels[q*4+1];
        tmp.pixels[p*4+2] = pic.pixels[q*4+2];
        tmp.pixels[p*4+3] = pic.pixels[q*4+3];
      }
     
    }
  }

  pic = tmp;
}
