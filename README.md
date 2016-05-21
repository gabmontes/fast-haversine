# Fast haversine

The fastest implementation of the haversine algorithm to calculate distances between to coordinates.

## Install

```bash
npm install fast-haversine
```

## Basic usage

Given two coordinates, i.e. departure and arrival of a infamous helicopter trip, calculate the distance in meters:

```js
const distance = require('fast-haversine');

const from = { lat: -34.607814, lon: -58.370301 };
const to = { lat: -34.5161001, lon: -58.4847728 };

distance(from, to); // quickly returns 14640 m
```

## API

### `distance(from, to)`

Calculates the distance between the to given coordinates.

The coordinates are objects containing `lat` and `lon` properties.

Returns a number representing the distance in meters.

# Benchmarks

Like benchmarks? Then run `npm run benchmark`. Current results are:

```
$ npm run benchmark

[ { name: '../lib', time: '100%', dist: '100%' },
  { name: 'haversine-distance', time: '139%', dist: '99%' },
  { name: 's-haversine', time: '151%', dist: '99%' },
  { name: 'gps-distance', time: '163%', dist: '99%' },
  { name: 'haversine', time: '190%', dist: '99%' },
  { name: 'geodesy', time: '221%', dist: '99%' },
  { name: 'coordist', time: '302%', dist: '100%' },
  { name: 'geodist', time: '307%', dist: '99%' },
  { name: 'node-geo-distance', time: '535%', dist: '99%' },
  { name: 'jeyo-distans', time: '828%', dist: '99%' } ]
```
