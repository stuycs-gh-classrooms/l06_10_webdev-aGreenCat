pic;
filter;

THRESHHOLD = 55;
IMG = "lantern.jpg";

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
  println(pic.width, pic.height);
  tmp = new Array(pic.width, pic.height);
  tmp.loadPixels();

  for (row = 0; row < tmp.height; row++) {
    for (col = 0; col < tmp.width; col++) {
      p = row * tmp.width + col;

      refRow = row;
      refCol = col;

      if (row <= pic.height/2 && col <= pic.width/2)
        refCol = col + pic.width/2;
      if (row <= pic.height/2 && col > pic.width/2)
        refRow = row + pic.height/2;
      if (row > pic.height/2 && col <= pic.width/2)
        refRow = row - pic.height/2;
      if (row > pic.height/2 && col > pic.width/2)
        refCol = col - pic.width/2;


      q = refRow * pic.width + refCol;

      tmp.pixels[p] = pic.pixels[q];
    }
  }

  pic = tmp;
}

function cyberpunk() {
  for (row = 0; row < pic.height; row++) {
    for (col = 0; col < pic.width; col++) {
      p = row * pic.width + col;

      c = pic.pixels[p];

      r = red(c);
      g = green(c);
      b = blue(c);

      av = (r + g + b) / 3;
      if ((r+g+b)/3 > 90) {
        r = av;
        b = av;

        g = av * 0.4;
      } else {
        b = av + (255 - av)/6;
        r = av * 0.2;
        g = av * 0.4;
      }

      pic.pixels[p] = color(r, g, b);
    }
  }
}

function edgey() {
  tmp = new Array(pic.width, pic.height);
  tmp.loadPixels();

  for (row = 0; row < pic.height; row++) {
    for (col = 0; col < pic.width; col++) {
      p = row * pic.width + col;
      c = pic.pixels[p];

      nx = max(0, col-2);
      ny = max(0, row-2);
      nx2 = min(pic.width-1, col+2);
      ny2 = min(pic.height-1, row+2);
      //define upper left and lower right corners of neighborhood.

      sum = 0;
      i = 0;
      for (ro = ny; ro <= ny2; ro++) {
        for (co = nx; co <= nx2; co++) {
          pix = ro * pic.width + co;
          if (pix == p) continue;
          //skipping itself;

          sum += diff(c, pic.pixels[pix]);
          i++;
        }
      }
      contrast = sum/i; //average

      if (contrast > THRESHHOLD) {
        tmp.pixels[p] = color(255);
      } else {
        tmp.pixels[p] = color(0);
      }
    }
  }

  pic = tmp;
}

diff(c, d) {
  //Find red, green and blue differences, and average them.
  return abs(red(c)-red(d)) + abs(green(c)-green(d)) + abs(blue(c)-blue(d));
}

function wavy() {
  tmp = new Array(pic.width-20, pic.height);
  tmp.loadPixels();

  for (row = 0; row < tmp.height; row++) {
    for (col = 0; col < tmp.width; col++) {
      p = row * tmp.width + col;
      q = row * pic.width + int(col + 10 + 10*sin(row*PI/10));

      tmp.pixels[p] = pic.pixels[q];
    }
  }

  pic = tmp;
}

function fishTunnel() {
  tmp = new Array(pic.width, pic.height);
  tmp.loadPixels();

  for (y = 0; y < pic.height; y++) {
    for (x = 0; x < pic.width; x++) {
      p = y * pic.width + x;
      r = sqrt(sq(x-pic.width/2)+sq(y-pic.height/2));
      theta = atan2(y-pic.height/2, x-pic.width/2);
      
      r = map(r, 0, 150, 0, 1);
      r = max(0, r);
      r = min(1, r);
      
      r += (1 - sqrt(1 - r*r)) / 2;
      r = map(r, 0, 1, 0, 150);
      
      x2 = int(r * cos(theta)) + pic.width/2;
      y2 = int(r * sin(theta)) + pic.height/2;
      q = y2 * pic.width + x2;
      if (q >= 0)
        tmp.pixels[p] = pic.pixels[q];
     
    }
  }

  pic = tmp;
}