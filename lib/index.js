'use strict';

// (mean) radius of Earth (meters)
const R = 6378137;
const PI_360 = Math.PI / 360;

function distance(a, b) {

  const cLat = Math.cos((a.lat + b.lat) * PI_360);
  const dLat = (b.lat - a.lat) * PI_360;
  const dLon = (b.lon - a.lon) * PI_360;

  const f = dLat * dLat + cLat * cLat * dLon * dLon;
  const c = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));

  return R * c;
}

module.exports = distance;
