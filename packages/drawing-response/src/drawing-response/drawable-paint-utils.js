export const relativePos = (event, element) => {
  const rect = element.getBoundingClientRect();
  return {x: Math.floor(event.clientX - rect.left),
    y: Math.floor(event.clientY - rect.top)};
};

export const forEachNeighbor = (point, fn) => {
  fn({x: point.x - 1, y: point.y});
  fn({x: point.x + 1, y: point.y});
  fn({x: point.x, y: point.y - 1});
  fn({x: point.x, y: point.y + 1});
};

export const isSameColor = (data, point1, point2) => {
  const offset1 = (point1.x + point1.y * data.width) * 4;
  const offset2 = (point2.x + point2.y * data.width) * 4;

  for (let i = 0; i < 4; i++) {
    if (data.data[offset1 + i] !== data.data[offset2 + i]) {
      return false;
    }
  }
  return true;
};
