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

Like benchmarks? Then run `npm run benchmark`.
