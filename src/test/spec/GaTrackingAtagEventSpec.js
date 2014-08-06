describe('Spec of GaTrackingAtagEvent', function () {

	'use strict';

	it('This class has following public method', function () {
		expect(GaTrackingAtagEvent.prototype.subscribe).to.be.a('function');
	});

	describe('#_initOpt', function() {
		it('return default value if you do not pass any option', function() {
			expect(GaTrackingAtagEvent.prototype._initOpt()).to.eql({
				isDebug: false,
				dataAttr: 'ga-label',
				labelPrefix: location.pathname + '__',
				category: 'link',
				action: 'click'
			});
		});
		it('return overridden value if you pass some options', function() {
			expect(GaTrackingAtagEvent.prototype._initOpt({
				isDebug: true,
				dataAttr: 'ga-label-test',
				labelPrefix: location.pathname + '__test',
				category: 'link-test',
				action: 'click-test'
			})).to.eql({
				isDebug: true,
				dataAttr: 'ga-label-test',
				labelPrefix: location.pathname + '__test',
				category: 'link-test',
				action: 'click-test'
			});
		});
	});

	describe('#subscribe', function() {
		it('subscribe click event with data attribute option', function() {
			var inst = new GaTrackingAtagEvent(),
				spy = sinon.spy($.fn, 'on');
			
			inst.subscribe();
			expect(spy.args[0][0]).to.eql('click');
			expect(spy.args[0][1]).to.eql('a[data-ga-label]');

			spy.restore();
		});
	});

	describe('#_onClick', function() {});

	describe('#_getParam', function() {
		it('add label, isBlank, href parameters to option', function() {
			var inst = new GaTrackingAtagEvent(),
				option = {
					isDebug: false,
					dataAttr: 'ga-label',
					labelPrefix: location.pathname + '__',
					category: 'link',
					action: 'click'
				},
				$atag = $('<a data-ga-label="test" href="http://google.com/" target="_blank"></a>'),
				ep = {
					isDebug: false,
					dataAttr: 'ga-label',
					labelPrefix: location.pathname + '__',
					category: 'link',
					action: 'click',
					label: location.pathname + '__test',
					href: 'http://google.com/',
					isBlank: true	
				},
				res = inst._getParam($atag, option);
			
			expect(res).to.eql(ep);
		});
	});

	describe('#_onCallback', function() {
		var inst = new GaTrackingAtagEvent(),
			spyLog,
			spyOpen,
			spyAssign,
			option = {
				isDebug: true,
				href   : 'http://google.com',
				isBlank: true
			};
			beforeEach(function() {
				spyLog = sinon.stub(console, 'log');	
				spyOpen = sinon.stub(window, 'open');	
				spyAssign = sinon.stub(location, 'assign');
			});
			afterEach(function() {
				spyLog.restore();
				spyOpen.restore();
				spyAssign.restore();
			});
		it('call console.log if you set debug option', function() {
			inst._onCallback(option);
			expect(spyLog.args[0][0]).to.eql('open new window : ' + option.href);

			option.isBlank = false;
			inst._onCallback(option);
			expect(spyLog.args[1][0]).to.eql('open : ' + option.href);
		});
		it('call ga method if you do not set debug option', function() {
			option.isDebug = false;
			option.isBlank = true;
			inst._onCallback(option);
			expect(spyOpen.args[0][0]).to.eql(option.href);

			option.isBlank = false;
			inst._onCallback(option);
			expect(spyAssign.args[0][0]).to.eql(option.href);
		});
	});
});
