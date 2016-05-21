'use strict';

const COUNT = 50000;

const LAT_CENTER = -34.6;
const LAT_SPREAD = 10;
const LON_CENTER = -58.4;
const LON_SPREAD = 10;

function generateCoord() {
  return {
    lat: Math.random() * LAT_SPREAD + LAT_CENTER - 90,
    lon: Math.random() * LON_SPREAD + LON_CENTER - 180
  };
}

function generateCoordPairs(count) {
  return new Array(count).fill(null).map(() => ({
    from: generateCoord(),
    to: generateCoord()
  }))
}

const testData = generateCoordPairs(COUNT);

const results = [];

function bench(libName, fn, factor) {
  const lib = require(libName);

  const start = Date.now();
  const distances = testData.map(item => fn(lib, item.from, item.to));
  const time = Date.now() - start;

  return {
    libName,
    time,
    dist: Math.floor(distances.reduce((p, c) => +p + +c) * factor)
  };
}

results.push(bench('haversine', function (lib, from, to) {
  return lib({
    latitude: from.lat,
    longitude: from.lon
  }, {
    latitude: to.lat,
    longitude: to.lon
  });
}, 1));

results.push(bench('haversine-distance', function (lib, from, to) {
  return lib({
    lat: from.lat,
    lng: from.lon
  }, {
    lat: to.lat,
    lng: to.lon
  });
}, 0.001));

results.push(bench('s-haversine', function (lib, from, to) {
  return lib.distance([from.lat, from.lon], [to.lat, to.lon]);
}, 0.001));

results.push(bench('node-geo-distance', function (lib, from, to) {
  return lib.haversineSync({
    latitude: from.lat,
    longitude: from.lon
  }, {
    latitude: to.lat,
    longitude: to.lon
  });
}, 0.001));

results.push(bench('gps-distance', function (lib, from, to) {
  return lib(from.lat, from.lon, to.lat, to.lon);
}, 1));

results.push(bench('geodist', function (lib, from, to) {
  return lib({
    lat: from.lat,
    lng: from.lon
  }, {
    lat: to.lat,
    lng: to.lon
  }, {
    unit: 'km'
  });
}, 1));

results.push(bench('geodesy', function (lib, from, to) {
  const LatLon = lib.LatLonSpherical;
  const p1 = new LatLon(from.lat, from.lon);
  const p2 = new LatLon(to.lat, to.lon);
  return p1.distanceTo(p2);
}, 0.001));

results.push(bench('jeyo-distans', function (lib, from, to) {
  return lib([from.lat, from.lon], [to.lat, to.lon]);
}, 1));

results.push(bench('coordist', function (lib, from, to) {
  return lib.distance({
    lat: from.lat,
    lng: from.lon
  }, {
    lat: to.lat,
    lng: to.lon
  });
}, 0.001));

results.push(bench('../lib', function (lib, from, to) {
  return lib(from, to);
}, 0.001));

console.log(results.sort((a, b) => a.time - b.time).map((item, ix, array) => ({
  name: item.libName,
  time: Math.floor(item.time / array[0].time * 100) + '%',
  dist: Math.floor(item.dist / array[0].dist * 100) + '%'
})));
