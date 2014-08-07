# GaTrackingAtagEvent

[![Build Status](https://travis-ci.org/kashiro/GaTrackingAtagEvent.png?branch=master)](https://travis-ci.org/kashiro/GaTrackingAtagEvent)

Utility Class of tracking  `<a></a>` tag click events by using Google Analyitcs

## Outline

Utility Class of tracking `<a></a>` tag click events by using Google Analyitcs


## Install via bower

```bash
  bower install GaTrackingAtagEvent --save
```

## Usage

load this scripts

```html

<!-- load this script -->
<script src="bower_components/GaTrackingAtagEvent/dist/GaTrackingAtagEvent.min.js"></script>

```

add attribute (data-ga-label) in `<a></a>` tag which you want to tracking click event by google analytics.

```html

<!-- call ga('send', 'event', 'link', 'click', ${location.pathname}__toppage); -->
<a href="/" data-ga-label="toppage">
<!-- call ga('send', 'event', 'link', 'click', ${location.pathname}__itempage); -->
<a href="/item" data-ga-label="itempage">
<!-- do not tracking click event of this a tag -->
<a href="/page3">
```

## Demo

* [normal](http://kashiro.github.io/GaTrackingAtagEvent/sample/index.html)
* [debug](http://kashiro.github.io/GaTrackingAtagEvent/sample/debug.html)

If you want to check the value which you send to google analyitcs you have to install [google analytics debugger in chrome](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

![Google Analytics Screenshot](https://raw.github.com/kashiro/GaTrackingAtagEvent/master/resources/screenshot.png)

## Notice

* This script support Universal Analytics (analytics.js)
