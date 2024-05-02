// We need variables to hold our images
let img1; // First image
let img2; // Second image

// We will divide the image into segments
let numSegments = 50;

// We will store the segments in an array
let segments = [];

// Let's add a variable to switch between drawing the images
let drawSecondImage = false; // Initially set to false to display the first image

// Let's make an object to hold the draw properties of the images
let imgDrwPrps = { aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0 };

// And a variable for the canvas aspect ratio
let canvasAspectRatio = 0;

// Let's load the images from disk
function preload() {
  img1 = loadImage('/assets/snow fall.png');
  img2 = loadImage('/assets/snow fall+accumulated snow.png');
}

function setup() {
  // We will make the canvas the same size as the image using its properties
  createCanvas(windowWidth, windowHeight);
  // Let's calculate the aspect ratio of the image
  imgDrwPrps.aspect = img1.width / img1.height;
  // And the aspect ratio of the canvas
  canvasAspectRatio = width / height;
  calculateImageDrawProps();
  // We can use the width and height of the image to calculate the size of each segment
  let segmentWidth = img1.width / numSegments;
  let segmentHeight = img1.height / numSegments;
  /*
    Divide the original image into segments, we are going to use nested loops
  */
  for (let segYPos = 0; segYPos < img1.height; segYPos += segmentHeight) {
    // This is looping over the height
    for (let segXPos = 0; segXPos < img1.width; segXPos += segmentWidth) {
      // We will use the x and y position to get the colour of the pixel from the image
      // Let's take it from the centre of the segment
      let segmentColour = img1.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour);
      segments.push(segment);
    }
  }
}

function draw() {
  background(0);
  if (drawSecondImage) {
    // Let's draw the second image to the canvas
    image(img2, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  } else {
    // Let's draw the first image to the canvas
    image(img1, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  }
}

function mouseClicked() {
  // Toggle between drawing the first and second images when mouse is clicked
  drawSecondImage = !drawSecondImage;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageDrawProps();
}

function calculateImageDrawProps() {
  // If the image is wider than the canvas
  if (imgDrwPrps.aspect > canvasAspectRatio) {
    // Then we will draw the image to the width of the canvas
    imgDrwPrps.width = width;
    // And calculate the height based on the aspect ratio
    imgDrwPrps.height = width / imgDrwPrps.aspect;
    imgDrwPrps.yOffset = (height - imgDrwPrps.height) / 2;
    imgDrwPrps.xOffset = 0;
  } else if (imgDrwPrps.aspect < canvasAspectRatio) {
    // Otherwise we will draw the image to the height of the canvas
    imgDrwPrps.height = height;
    // And calculate the width based on the aspect ratio
    imgDrwPrps.width = height * imgDrwPrps.aspect;
    imgDrwPrps.xOffset = (width - imgDrwPrps.width) / 2;
    imgDrwPrps.yOffset = 0;
  }
  else if (imgDrwPrps.aspect == canvasAspectRatio) {
    // If the aspect ratios are the same then we can draw the image to the canvas size
    imgDrwPrps.width = width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}
// Here is our class for the image segments, we start with the class keyword
class ImageSegment {
  constructor(srcImgSegXPosInPrm, srcImgSegYPosInPrm, srcImgSegWidthInPrm, srcImgSegHeightInPrm, srcImgSegColourInPrm) {
    // These parameters are used to set the internal properties of an instance of the segment
    // These parameters are named as imageSource as they are derived from the image we are using
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
  }

  draw() {
    // Let's draw the segment to the canvas, for now we will draw it as an empty rectangle so we can see it
    stroke(0);
    fill(this.srcImgSegColour);
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth, this.srcImgSegHeight);
  }
}
