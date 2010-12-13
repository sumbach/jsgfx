topp = 100;
left = 150;
fullLength = 300;

halfLength = fullLength / 2;
centerX = left + halfLength;
centerY = topp + halfLength;

function main() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  rotate();
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function currentHalfLength(theta) {
  return Math.cos(theta) * halfLength;
}

function drawSquare(theta) {
  var halfWidth = currentHalfLength(theta);
  var deltaX = halfLength - halfWidth;

  var deltaY;
  if (Math.sin(theta) == 0) {
    deltaY = 0;
  } else {
    var hyp = deltaX / Math.sin(theta);
    // console.log(hyp);
    deltaY = hyp * Math.cos(theta);
  }

  context.beginPath();
  context.moveTo(centerX - halfWidth, centerY - halfLength - deltaY);
  context.lineTo(centerX + halfWidth, centerY - halfLength + deltaY);
  context.lineTo(centerX + halfWidth, centerY + halfLength - deltaY);
  context.lineTo(centerX - halfWidth, centerY + halfLength + deltaY);
  context.lineTo(centerX - halfWidth, centerY - halfLength - deltaY);
  context.stroke();
}

function drawCross(theta) {
  var halfWidth = currentHalfLength(theta);

  context.beginPath();
  context.moveTo(centerX - halfWidth, centerY);
  context.lineTo(centerX + halfWidth, centerY);
  context.moveTo(centerX, centerY - halfLength);
  context.lineTo(centerX, centerY + halfLength);
  context.stroke();
}

function rotate() {
  var theta = 0;
  var rate = Math.PI / 256;
  setInterval(function() {
    clear();
    drawCross(theta);
    drawSquare(theta);
    theta += rate;
  }, 10);
}
