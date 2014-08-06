/**
 * @class GaTrackingAtagEvent
 * @description
 *     utility Class of tracking a tag click events by using Google Analyitcs
 *
 * @example
 *
 *    var gaTrackingAtagEvent = new GaTrackingAtagEvent({
 *	      debug: false
 *    });
 *    gaTrackingAtagEvent.subscribe();
 *
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */
(function(exports) {

    'use strict';

    /** option */
    var option = {
        isDebug: false,
        dataAttr: 'ga-label',
        labelPrefix: location.pathname + '__',
        category: 'link',
        action: 'click'
    };

    /**
     * @constructor
     * @param {Object} [args] option of this class.
     * @param {String} args.dataAttr data attribute to find target a tag.
     * @param {String} args.labelPrefix path name which is added to GA label parameter
     * @param {String} args.category parameter of GA category
     * @param {String} args.action parameter of GA action
     */
    var GaTrackingAtagEvent = function(args) {
        this.opt = this._initOpt(args);
    };

    /**
     * prototype
     */
    GaTrackingAtagEvent.prototype = {

        _initOpt: function(args) {
            return $.extend({}, option, args);
        },

        /**
         * subscribe a tag event.
         */
        subscribe: function() {
            var opt = this.opt,
                selector = 'a[data-' + opt.dataAttr + ']';
            $(document.body).on('click', selector, $.proxy(this._onClick, this));
        },

        _onClick: function(event) {
            var $atag = $(event.currentTarget),
                option = this._getParam($atag, this.opt);
            this._tracking(option);
			return false;
        },

        _getParam: function($atag, opt) {
            opt.label = opt.labelPrefix + $atag.data(opt.dataAttr);
            opt.isBlank = $atag.prop('target') === '_blank';
            opt.href = $atag.prop('href');
            return opt;
        },

        _tracking: function(option) {
            ga('send', 'event', {
                'eventCategory': option.category,
                'eventAction': option.action,
                'eventLabel': option.label,
                'hitCallback': $.proxy(this._onCallback, this, option)
            });
        },

        _onCallback: function(option) {
            var href = option.href;
            if (option.isDebug) {
                if (option.isBlank) {
                    console.log('open new window : ' + href);
                } else {
                    console.log('open : ' + href);
                }
            } else {
                if (option.isBlank) {
                    window.open(href);
                } else {
                    location.assign(href);
                }
            }
        }
    };

    /*--------------------------------
     * export
     --------------------------------*/
    exports.GaTrackingAtagEvent = GaTrackingAtagEvent;

}(window));
