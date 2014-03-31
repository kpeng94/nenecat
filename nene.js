var jiggle = 0;
var jiggleUp = true;
var destination;
// Loop nyancat code
var interval;
var nyan = new Audio('http://web.mit.edu/kpeng94/www/nene/nyancat.mp3');
nyan.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);
nyan.play();

var neneCanvas = document.createElement('canvas');
var nene = document.createElement('div');
nene.style.width = '80px';
nene.style.height = '50px';
nene.style.backgroundImage = 'url(http://web.mit.edu/kpeng94/www/nene/nene.png)';
nene.style.backgroundPosition = 'right center';
nene.style.backgroundRepeat = 'no-repeat';
nene.style.backgroundSize = '110px 70px';
nene.style.position = 'absolute';
var neneRainbow = document.createElement('div');
neneRainbow.style.position = 'absolute';
neneRainbow.style.left = '-90px';
neneRainbow.style.top = '0px';
neneRainbow.style.width = '90px';
neneRainbow.style.height = '45px';
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isChrome = !!window.chrome && !isOpera;
var prefix = '';
if (isFirefox) {
	prefix = '-moz-';
} else if (isChrome) {
	prefix = '-webkit-';
};
neneRainbow.style.background = prefix + 'linear-gradient(top, #d91a12 15%, #e13300 15%, #ff7f14 16%, #f2ab03 32%, #ebc000 32%, #fade00 33%, #efff03 48%, #56fc02 49%, #52ff01 66%, #4ade7e 67%, #3baaf2 67%, #3baaf2 84%, #7337f7 84%, #6b40f2 100%)';
nene.appendChild(neneRainbow);

/**
 * Expected to be called after the body loads
 *
 * @param div Div to animate
 */
var randomMovement = function(div) {
	var b = document.getElementsByTagName('body')[0];
	var w = document.innerWidth || document.clientWidth || b.clientWidth;
	var h = document.innerHeight || document.clientHeight || b.clientHeight;
	var ox = div.offsetLeft - destination[0];
	var oy = div.offsetTop - destination[1];
	moveToTarget(div, [div.offsetLeft, div.offsetTop], destination);
	if (ox * ox + oy * oy < 5000) {
		destination = [Math.random() * w, Math.random() * h];
		clearInterval(interval);
		interval = setInterval(function() {randomMovement(div)}, 10);
	}
}

var moveToTarget = function(div, start, end) {
	var speed = setSpeed(start, end);
	var dx = end[0] - div.offsetLeft;
	var dy = end[1] - div.offsetTop;
	move(div, speed, dx, dy);
}

function move(div, speed, dx, dy) {
	if (jiggle >= -4 && jiggle <= 4) {
		if (jiggleUp) {
			jiggle-= 0.75;
		}
		else {
			jiggle+= 0.75;
		}
	} else {
		if (jiggleUp) {
			jiggle = -4;
		}
		else {
			jiggle = 4;
		}
		jiggleUp = !jiggleUp;
	}
	var c = dx / Math.sqrt(dx * dx + dy * dy);
	var s = dy / Math.sqrt(dx * dx + dy * dy);
	div.style.left = (div.offsetLeft + speed * c) + 'px';
	div.style.top = (div.offsetTop + speed * s) + jiggle + 'px';
};

/**
 * @param start Start coordinate
 * @param end End coordinate
 * @return Arbitrary speed based on arbitrary formula
 */
var setSpeed = function(start, end) {
	var dx = end[0] - start[0];
	var dy = end[1] - start[1];
	return Math.max(3, Math.abs(dx + dy) / Math.sqrt(dx * dx + dy * dy) * 2);
};

// Remove this for bookmarklet
window.addEventListener('load', function() {
	document.body.appendChild(nene);
	var b = document.getElementsByTagName('body')[0];
	var w = document.innerWidth || document.clientWidth || b.clientWidth;
	var h = document.innerHeight || document.clientHeight || b.clientHeight;
	destination = [w / 2, h / 2];
	moveToTarget(nene, [nene.offsetLeft, nene.offsetTop], destination);
	interval = setInterval(function() {randomMovement(nene)}, 10);
}, false);
