# GaTrackingAtagEvent

[![Build Status](https://travis-ci.org/kashiro/GaTrackingAtagEvent.png?branch=master)](https://travis-ci.org/kashiro/GaTrackingAtagEvent)

Utility Class of tracking  a tag click events by using Google Analyitcs

## Outline

Utility Class of tracking  a tag click events by using Google Analyitcs


## Install via bower

```bash
  bower install GaTrackingAtagEvent --save
```

## Usage

load this scripts

```html

<!-- load this script -->
<script src="./GaTrackingAtagEvent.min.js"></script>

```

add attribute (data-ga-label) in a tag which you want to tracking click event by google analytics.

```html

<!-- call ga('send', 'event', 'link', 'click', ${location.pathname}__toppage); -->
<a href="/" data-ga-label="toppage">
<!-- call ga('send', 'event', 'link', 'click', ${location.pathname}__itempage); -->
<a href="/item" data-ga-label="itempage">
<!-- do not tracking click event of this a tag -->
<a href="/page3">
```

## Notice

* This script support Universal Analytics (analytics.js)
