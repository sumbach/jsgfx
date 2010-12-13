topp = 100;
left = 150;
fullLength = 300;

halfLength = fullLength / 2;
centerX = left + halfLength;
centerY = topp + halfLength;
centerZ = fullLength * 2;

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

function projectedLength(length, deltaZ) {
  return length * (centerZ / (centerZ + deltaZ));
}

function drawSquare(theta) {
  var deltaZ = halfLength * Math.sin(theta);

  var halfWidth = currentHalfLength(theta);
  var halfWidthLeft  = projectedLength(halfWidth, -deltaZ);
  var halfWidthRight = projectedLength(halfWidth, +deltaZ);

  var halfHeightLeft  = projectedLength(halfLength, -deltaZ);
  var halfHeightRight = projectedLength(halfLength, +deltaZ);

  context.beginPath();
  context.moveTo(centerX - halfWidthLeft,  centerY - halfHeightLeft);
  context.lineTo(centerX + halfWidthRight, centerY - halfHeightRight);
  context.lineTo(centerX + halfWidthRight, centerY + halfHeightRight);
  context.lineTo(centerX - halfWidthLeft,  centerY + halfHeightLeft);
  context.lineTo(centerX - halfWidthLeft,  centerY - halfHeightLeft);
  context.stroke();
}

function drawCross(theta) {
  var deltaZ = halfLength * Math.sin(theta);

  var halfWidth = currentHalfLength(theta);
  var halfWidthLeft  = projectedLength(halfWidth, -deltaZ);
  var halfWidthRight = projectedLength(halfWidth, +deltaZ);

  context.beginPath();
  context.moveTo(centerX - halfWidthLeft,  centerY);
  context.lineTo(centerX + halfWidthRight, centerY);
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
