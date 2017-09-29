var model = {

	gameTitle: 'Gamen Body Poser',
	gameSavePrefix: 'bodyPoser',

	gameDivContents: function() {
		var svgDiv = document.createElement('div');
		svgDiv.id = 'svgDiv';
		
		model.body = new GamenBody();
		var svg = model.body.draw(500,750);
		svgDiv.appendChild(svg);
		
		var toggleShotBtn = document.createElement('button');
		toggleShotBtn.id = 'toggleShotBtn';
		toggleShotBtn.innerHTML = 'Head Shot';
		toggleShotBtn.setAttribute('onclick','handlers.toggleShot()');
		svgDiv.appendChild(toggleShotBtn);
		
		var ticklist = document.createElement('datalist');
		ticklist.id = 'ticklist';
		for (var i of [-5,0,5]) {
			var option = document.createElement('option');
			option.innerHTML = i;
			ticklist.appendChild(option);
		};
		
		var poseDiv = document.createElement('div');
		poseDiv.className = 'controlsDiv';
		for (var i in model.body.pose) {
			var sliderLabel = document.createElement('p');
			sliderLabel.innerHTML = i;
			poseDiv.appendChild(sliderLabel);
			var slider = document.createElement('input');
			slider.id = i + "Slider";
			slider.setAttribute('list','ticklist');
			slider.setAttribute('type','range');
			slider.setAttribute('min',Math.PI*-1);
			slider.setAttribute('max',Math.PI);
			slider.setAttribute('step',Math.PI/180);
			slider.setAttribute('value',model.body.pose[i]);
			slider.setAttribute('oninput','handlers.updatePose("'+i+'")');
			slider.setAttribute('onchange','handlers.updatePose("'+i+'")');
			sliderLabel.prepend(slider);
		};
		
		var bioDiv = document.createElement('div');
		bioDiv.className = 'controlsDiv';
		for (var i in model.body.biometrics) {
			var sliderLabel = document.createElement('p');
			sliderLabel.innerHTML = i;
			bioDiv.appendChild(sliderLabel);
			var slider = document.createElement('input');
			slider.id = i + "Slider";
			slider.setAttribute('list','ticklist');
			slider.setAttribute('type','range');
			slider.setAttribute('min',-10);
			slider.setAttribute('max',10);
			slider.setAttribute('step',0.01);
			slider.setAttribute('value',model.body.biometrics[i]);
			slider.setAttribute('oninput','handlers.updateBio("'+i+'")');
			slider.setAttribute('onchange','handlers.updateBio("'+i+'")');
			sliderLabel.prepend(slider);
		};
		
		var colorDiv = document.createElement('div');
		colorDiv.className = 'controlsDiv';
		for (var i in model.body.coloring) {
			var sliderLabel = document.createElement('p');
			sliderLabel.innerHTML = i;
			colorDiv.appendChild(sliderLabel);
			var slider = document.createElement('input');
			slider.id = i + "Slider";
			slider.setAttribute('type','range');
			slider.setAttribute('min',0.1);
			slider.setAttribute('max',0.9);
			slider.setAttribute('step',0.01);
			slider.setAttribute('value',model.body.coloring[i]);
			slider.setAttribute('oninput','handlers.updateColor("'+i+'")');
			slider.setAttribute('onchange','handlers.updateColor("'+i+'")');
			sliderLabel.prepend(slider);
		};
				
		return [svgDiv, ticklist, poseDiv, bioDiv, colorDiv];
	},
	
	options: {
		shot: 'fullBody',
	},

};

var handlers = {
	
	newGame: function() {
		model.body = new GamenBody();
		handlers.draw();
		for (i in model.body.pose) {
			document.getElementById(i + "Slider").value = model.body.pose[i];
		};
		for (i in model.body.biometrics) {
			document.getElementById(i + "Slider").value = model.body.biometrics[i];
		};
		for (i in model.body.coloring) {
			document.getElementById(i + "Slider").value = model.body.coloring[i];
		};
	},
	
	draw: function() {
		var svg = model.body.draw(500,750,model.options.shot);
		var toggleShotBtn = document.getElementById('toggleShotBtn');
		document.getElementById('svgDiv').innerHTML = '';
		document.getElementById('svgDiv').appendChild(svg);
		document.getElementById('svgDiv').appendChild(toggleShotBtn);
	},
	
	toggleShot: function() {
		var toggleShotBtn = document.getElementById('toggleShotBtn');
		if (model.options.shot == 'fullBody') {
			model.options.shot = 'head'
			toggleShotBtn.innerHTML = "Money Shot";
		} else if (model.options.shot == 'head') {
			model.options.shot = 'money'
			toggleShotBtn.innerHTML = "Full Body Shot";
		} else {
			model.options.shot = 'fullBody'
			toggleShotBtn.innerHTML = "Head Shot";
		};
		handlers.draw();
	},
	
	updatePose: function(poseKey) {
		model.body.pose[poseKey] = parseFloat(document.getElementById(poseKey + "Slider").value);
		handlers.draw();
	},
	
	updateBio: function(bioKey) {
		model.body.biometrics[bioKey] = parseFloat(document.getElementById(bioKey + "Slider").value);
		handlers.draw();
	},
	
	updateColor: function(bioKey) {
		model.body.coloring[bioKey] = parseFloat(document.getElementById(bioKey + "Slider").value);
		handlers.draw();
	},
	
	jiggle: function() {
		model.body.jiggle();
		for (i in model.body.biometrics) {
			document.getElementById(i + "Slider").value = model.body.biometrics[i];
		}
		for (i in model.body.pose) {
			document.getElementById(i + "Slider").value = model.body.pose[i];
		}
		for (i in model.body.coloring) {
			document.getElementById(i + "Slider").value = model.body.coloring[i];
		}
		handlers.draw();
		var timedEvent = setTimeout(handlers.jiggle,10);
	},

};

function GamenBody() {

	this.parameters = {

		areolaeWidth: {
			root: 1.15,
			curve: 'bell',
		},
	
		armLength: {
			root: 1.04,
			curve: 'bell',
		},
	
		armWidth: {
			root: 1.04,
			curve: 'bell',
		},
	
		belly: {
			root: 1.11,
			curve: 'bell',
		},
	
		biceps: {
			root: 1.05,
			curve: 'bell',
		},
	
		breastSize: {
			root: 1.15,
			curve: 'bell',
		},
	
		breastSag: {
			root: 1.09,
			curve: 'bell',
		},
		
		browSize: {
			root: 1.1,
			curve: 'bell',
		},
	
		templeHeight: {
			root: 1.07,
			curve: 'bell',
		},
	
		templeSize: {
			root: 1.07,
			curve: 'bell',
		},
	
		templeWidth: {
			root: 1.07,
			curve: 'bell',
		},
	
		buttSize: {
			root: 1.08,
			curve: 'bell',
		},
		
		calfWidth: {
			root: 1.07,
			curve: 'bell',
		},
		
		cheekboneHeight: {
			root: 1.07,
			curve: 'bell',
		},
		
		cheekboneSize: {
			root: 1.07,
			curve: 'bell',
		},
		
		cheekboneWidth: {
			root: 1.07,
			curve: 'bell',
		},
		
		eyeDistance: {
			root: 1.02,
			curve: 'bell',
		},
		
		eyeTilt: {
			root: 1.01,
			curve: 'bell',
		},
		
		eyeSize: {
			root: 1.02,
			curve: 'bell',
		},
		
		glansSize: {
			root: 1.02,
			curve: 'camel',
		},
		
		footLength: {
			root: 1.05,
			curve: 'bell',
		},
		
		hairlineHeight: {
			root: 1.08,
			curve: 'bell',
		},
		
		hairlinePeak: {
			root: 1.1,
			curve: 'bell',
		},
	
		headHeight: {
			root: 1.03,
			curve: 'bell',
		},
	
		headWidth: {
			root: 1.02,
			curve: 'bell',
		},
	
		hipsWidth: {
			root: 1.04,
			curve: 'bell',
		},
		
		jawWidth: {
			root: 1.06,
			curve: 'bell',
		},
		
		labioscrotalSize: {
			root: 1.25,
			curve: 'camel',
		},
	
		legHeight: {
			root: 1.05,
			curve: 'bell',
		},
		
		lipSize: {
			root: 1.08,
			curve: 'bell',
		},
	
		neckHeight: {
			root: 1.05,
			curve: 'bell',
		},
	
		neckWidth: {
			root: 1.025,
			curve: 'bell',
		},
		
		nippleLength: {
			root: 1.25,
			curve: 'bell',
		},
		
		nippleWidth: {
			root: 1.08,
			curve: 'bell',
		},
		
		nipplePuff: {
			root: 1.08,
			curve: 'bell',
		},
		
		noseWidth: {
			root: 1.08,
			curve: 'bell',
		},
		
		noseLength: {
			root: 1.08,
			curve: 'bell',
		},
		
		noseHeight: {
			root: 1.02,
			curve: 'bell',
		},
		
		phallusLength: {
			root: 1.8,
			curve: 'camel',
		},
		
		phallusGirth: {
			root: 1.03,
			curve: 'camel',
		},
	
		shouldersWidth: {
			root: 1.04,
			curve: 'bell',
		},
		
		thighWidth: {
			root: 1.07,
			curve: 'bell',
		},
	
		torsoHeight: {
			root: 1.05,
			curve: 'bell',
		},
	
		totalHeight: {
			root: 1.05,
			curve: 'bell',
		},
	};
	
	this.library = {
		boring: {"eyePositionX":-0.471238898038469,"eyePositionY":-0.06458649531074478,"farEyeInnerLid":-1.23918376891597,"farEyeOuterLid":-1.67551608191456,"farEyeLowerLid":-1.51843644923507,"farEyebrowArch":-2.3100829131163207,"farFootPoint":0.1118450477825812,"farForearmLift":-0.11419126845867289,"farKneeBend":0.06594040047696802,"farThighLift":0.15779390417624337,"farUpperArmLift":0.523598775598299,"fingersSplay":-0.04216787355183169,"fingersCurl":0.2752583919263869,"headNod":-0.010291833989164266,"headSlide":-0.24405169224369802,"headTip":0,"hipsCant":0,"mouthOpen":-3.14159265358979,"mouthPurse":-0.575958653158129,"mouthSmile":1.13446401379631,"mouthGrimace":0.006025301391573963,"mouthSmirk":-0.11785831040371379,"nearEyeInnerLid":-1.18682389135614,"nearEyeOuterLid":-1.85004900711399,"nearEyeLowerLid":-1.79768912955416,"nearEyebrowArch":-1.95476876223365,"nearFootPoint":-0.935868670139553,"nearForearmLift":0.471238898038469,"nearKneeBend":-0.0035190247333446775,"nearThighLift":-0.0025310759346229414,"nearUpperArmLift":-0.2745964121486912,"phallusErection":0,"shouldersTip":0,},	
		hello: {"eyePositionX":-0.471238898038469,"eyePositionY":-0.296705972839036,"farEyeInnerLid":-1.23918376891597,"farEyeOuterLid":-1.67551608191456,"farEyeLowerLid":-1.51843644923507,"farEyebrowArch":-2.94960643587042,"farFootPoint":0.1118450477825812,"farForearmLift":-2.84488668075076,"farKneeBend":-0.418879020478639,"farThighLift":0.418879020478639,"farUpperArmLift":2.12930168743308,"fingersSplay":-0.04216787355183169,"fingersCurl":0.2752583919263869,"headNod":-0.010291833989164266,"headSlide":0.802851455917392,"headTip":0.366519142918809,"hipsCant":-0.296705972839036,"mouthOpen":-1.67551608191456,"mouthPurse":0.680678408277789,"mouthSmile":3.12413936106985,"mouthGrimace":0.006025301391573963,"mouthSmirk":-0.11785831040371379,"nearEyeInnerLid":-1.18682389135614,"nearEyeOuterLid":-1.85004900711399,"nearEyeLowerLid":-1.79768912955416,"nearEyebrowArch":-3.14159265358979,"nearFootPoint":-0.935868670139553,"nearForearmLift":1.08210413623648,"nearKneeBend":-0.0035190247333446775,"nearThighLift":-0.0025310759346229414,"nearUpperArmLift":-1.01229096615671,"phallusErection":2.460914245312,"shouldersTip":0.296705972839036},
		run: {"eyePositionX":-0.855211333477221,"eyePositionY":-0.523598775598299,"farEyeInnerLid":-1.23918376891597,"farEyeOuterLid":-1.85004900711399,"farEyeLowerLid":-1.13446401379631,"farEyebrowArch":1.51843644923507,"farFootPoint":0.1118450477825812,"farForearmLift":-1.01229096615671,"farKneeBend":1.01229096615671,"farThighLift":-0.296705972839036,"farUpperArmLift":0.628318530717959,"fingersSplay":-0.04216787355183169,"fingersCurl":0.2752583919263869,"headNod":-0.010291833989164266,"headSlide":-0.24405169224369802,"headTip":-0.296705972839036,"hipsCant":0,"mouthOpen":-3.14159265358979,"mouthPurse":-2.77507351067098,"mouthSmile":1.13446401379631,"mouthGrimace":0.006025301391573963,"mouthSmirk":-0.11785831040371379,"nearEyeInnerLid":-1.18682389135614,"nearEyeOuterLid":-1.85004900711399,"nearEyeLowerLid":-1.79768912955416,"nearEyebrowArch":2.18166156499291,"nearFootPoint":-0.935868670139553,"nearForearmLift":-2.77507351067098,"nearKneeBend":0.628318530717959,"nearThighLift":-0.366519142918809,"nearUpperArmLift":-0.855211333477221,"phallusErection":0,"shouldersTip":0},
	};


	this.biometrics = {};
	for (var i in this.parameters) {
		if (this.parameters[i].curve == 'camel') {
			this.biometrics[i] = 5 * (Math.random() + Math.random() + Math.random())/3;
			if (Math.random() > 0.5) {this.biometrics[i] *= -1;};
		} else {
			this.biometrics[i] = 5 * Math.random();
			if (Math.random() > 0.5) {this.biometrics[i] *= -1;};
		};
	};
	
	this.coloring = {};
	for (i of ['skinBlack','skinBrown','skinPink','areolaePink','areolaeDark','lipPink','lipDark','eyeGreen','eyeBlue']) {
		this.coloring[i] = Math.random();
	};
// 	Debugging Purposes - remove for use
	this.coloring.skinBlack = Math.min(this.coloring.skinBlack,0.7);
	var red = Math.random() * 255 << 0;
	var green = Math.random() * 255  << 0;
	var blue = Math.random() * 255 << 0;
	this.coloring.hairColor = "#" + ("0" + red.toString(16)).substr(-2) + ("0" + green.toString(16)).substr(-2) + ("0" + blue.toString(16)).substr(-2);

	
	this.pose = {};
	for (i of [ "eyePositionX", "eyePositionY", "farEyeInnerLid", "farEyeOuterLid", "farEyeLowerLid", "farEyebrowArch", "farFootPoint", "farForearmLift", "farKneeBend", "farThighLift", "farUpperArmLift", "fingersSplay", "fingersCurl", "headNod", "headSlide", "headTip", "hipsCant", "mouthOpen", "mouthPurse", "mouthSmile", "mouthGrimace", "mouthSmirk", "nearEyeInnerLid", "nearEyeOuterLid", "nearEyeLowerLid", "nearEyebrowArch", "nearFootPoint", "nearForearmLift", "nearKneeBend", "nearThighLift", "nearUpperArmLift", "phallusErection", "shouldersTip"]) {
		this.pose[i] = Math.random() * Math.random() * Math.random() * Math.PI;
		if (Math.random() > 0.5) {this.pose[i] *= -1;};
		if (i == 'shouldersTip' || i == 'hipsCant' || i == 'headTip') {this.pose[i] /= 4;};
		if (i == 'nearEyeInnerLid' || i == 'nearEyeOuterLid' || i == 'nearEyeLowerLid' || i == 'farEyeInnerLid' || i == 'farEyeOuterLid' || i == 'farEyeLowerLid' ) {this.pose[i] = Math.max(Math.min(this.pose[i]*4,Math.PI),Math.PI*-1);};
	};
	this.pose.nearEyeInnerLid = Math.max(this.pose.nearEyeInnerLid,this.pose.nearEyeOuterLid,this.pose.nearEyeLowerLid);
	this.pose.farEyeInnerLid = Math.max(this.pose.farEyeInnerLid,this.pose.farEyeOuterLid,this.pose.farEyeLowerLid);
	this.pose.nearEyeLowerLid = Math.min(this.pose.farEyeInnerLid,this.pose.farEyeOuterLid,this.pose.farEyeLowerLid);
	this.pose.farEyeLowerLid = Math.min(this.pose.farEyeInnerLid,this.pose.farEyeOuterLid,this.pose.farEyeLowerLid);
	this.pose.nearEyeInnerLid = this.pose.farEyeInnerLid;
	this.pose.nearEyeOuterLid = this.pose.farEyeOuterLid;
	this.pose.nearEyeLowerLid = this.pose.farEyeLowerLid;
	this.pose.mouthOpen = Math.random() * Math.PI*2 - Math.PI;
	this.pose.nearEyebrowArch = Math.random() * Math.PI*2 - Math.PI;
	this.pose.farEyebrowArch = Math.random() * Math.PI*2 - Math.PI;
	
	for (var i in this.library.boring) {
		this.pose[i] = this.library.boring[i];
	};
	
	this.bio = function(key) {
		var result = this.biometrics[key];
		if (result == undefined) {
			result = 1;
		} else {
			result = Math.pow(this.parameters[key].root,result);
		};
		return result;
	};
		
	this.morphase = 1;
	this.morphExtreme = false;
	this.turnCount = 101;
	
	this.jiggle = function() {
		if (Math.random() > 0.95) {
			this.morphase *= -1;
		};
		if (Math.random() > 0.95) {
			this.morphExtreme = !this.morphExtreme;
		};
		for (i in this.biometrics) {
			this.biometrics[i] += (Math.random()*0.3 - 0.1) * this.morphase;
			if (this.morphExtreme) {
				this.biometrics[i] = Math.min(5,this.biometrics[i]);
				this.biometrics[i] = Math.max(-5,this.biometrics[i]);
			};
		};
		this.turnCount += 1;
		if (this.turnCount > 100) {
			this.turnCount = 0;
			var poses = Object.keys(this.library);
			this.targetPose = this.library[poses[Math.random() * poses.length << 0]];
		};
		for (i in this.pose) {
			var poseShift = (Math.random() * 5)/100;
			if (this.targetPose[i] > this.pose[i] + poseShift*2) {
				this.pose[i] += poseShift;
			} else if (this.targetPose[i] < this.pose[i] - poseShift*2) {
				this.pose[i] -= poseShift
			};
		};
		for (i in this.coloring) {
			this.coloring[i] += (Math.random() - 0.5)/100;
			this.coloring[i] = Math.min(1,this.coloring[i]);
			this.coloring[i] = Math.max(0,this.coloring[i]);
		};
		this.coloring.hairColor = "#" + ("0" + red.toString(16)).substr(-2) + ("0" + green.toString(16)).substr(-2) + ("0" + blue.toString(16)).substr(-2);
	};
	
	
	this.draw = function(width,height,shot) {
		if (height == undefined) {height = 100;};
		if (width == undefined) {width = 100;};
		if (shot == undefined) {shot = 'fullBody';};
		
		var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		
		var svgNodes = this.svg(height);
		svg.appendChild(svgNodes);
		
		// default viewport
		var minX = width/-2;
		var minY = height * -0.8
		var viewBoxString = minX + ' ' + minY + ' ' + width + ' ' + height;
		svg.setAttribute('viewBox',viewBoxString);
		
		if (shot == 'head') {
			headShot = svg.getElementById('headShot');
			viewBoxString = headShot.getAttribute('x') + ' ' + headShot.getAttribute('y') + ' ' + headShot.getAttribute('width') + ' ' + headShot.getAttribute('height');
			svg.setAttribute('viewBox',viewBoxString);
		} else if (shot == 'money') {
			moneyShot = svg.getElementById('moneyShot');
			viewBoxString = moneyShot.getAttribute('x') + ' ' + moneyShot.getAttribute('y') + ' ' + moneyShot.getAttribute('width') + ' ' + moneyShot.getAttribute('height');
			svg.setAttribute('viewBox',viewBoxString);
		};
		
		return svg;
		
	};
	
	this.svg = function (height) {
	
		pose = this.pose;
		
		// Coloring
		
		if (this.coloring.custom == undefined) {
		
			var skinRed = 255, skinGreen = 237, skinBlue = 220;
			
			var pigmentBlack = Math.max(1 - this.coloring.skinBlack,0.2);
			var pigmentBrown = Math.min(pigmentBlack * (0.5 + (1-this.coloring.skinBrown)*2),0.9);
			var pigmentPink = Math.min(pigmentBlack * (0.5 + (1-this.coloring.skinPink)*2),0.9);
		
			skinRed *= pigmentBlack;
			skinGreen *= pigmentBlack * pigmentPink;
			skinBlue *= pigmentBlack * pigmentBrown * pigmentPink;
			var skinTone = "#" + ("0" + Math.round(skinRed).toString(16)).substr(-2) + ("0" + Math.round(skinGreen).toString(16)).substr(-2) + ("0" + Math.round(skinBlue).toString(16)).substr(-2);	
			
			var areolaePink = (1-this.coloring.areolaePink*0.75);
			var areolaeDark = (1-this.coloring.areolaeDark);
			var areolaeRed = skinRed * areolaeDark;
			var areolaeGreen = skinGreen * areolaePink * areolaeDark;
			var areolaeBlue = skinBlue * areolaePink * areolaeDark;
			var areolaeTone = "#" + ("0" + Math.round(areolaeRed).toString(16)).substr(-2) + ("0" + Math.round(areolaeGreen).toString(16)).substr(-2) + ("0" + Math.round(areolaeBlue).toString(16)).substr(-2);
			
			var lipPink = (1-this.coloring.lipPink);
			var lipDark = (1-this.coloring.lipDark*0.5);
			var lipRed = skinRed * lipDark;
			var lipGreen = skinGreen * lipPink * lipDark;
			var lipBlue = skinBlue * lipPink * lipDark;
			var lipColor = "#" + ("0" + Math.round(lipRed).toString(16)).substr(-2) + ("0" + Math.round(lipGreen).toString(16)).substr(-2) + ("0" + Math.round(lipBlue).toString(16)).substr(-2);

			var mouthRed = skinRed/3;
			var mouthBlue = skinBlue/3;
			var mouthGreen = skinGreen/3;
			var mouthColor = "#" + ("0" + Math.round(mouthRed).toString(16)).substr(-2) + ("0" + Math.round(mouthGreen).toString(16)).substr(-2) + ("0" + Math.round(mouthBlue).toString(16)).substr(-2);	

			var eyeRed = 255, eyeGreen = 255, eyeBlue = 255;
			var eyePigmentGreen = 1-this.coloring.eyeGreen;
			var eyePigmentBlue = 1-this.coloring.eyeBlue;
			eyeRed *= eyePigmentGreen * eyePigmentBlue;
			eyeBlue *= eyePigmentGreen;
			eyeGreen *= eyePigmentBlue;
			var eyeColor = "#" + ("0" + Math.round(eyeRed).toString(16)).substr(-2) + ("0" + Math.round(eyeGreen).toString(16)).substr(-2) + ("0" + Math.round(eyeBlue).toString(16)).substr(-2);

			var hairColor = this.coloring.hairColor;

		} else {
			var skinTone = this.coloring.custom.skinTone;
			var areolaeTone = this.coloring.custom.areolaeTone;
			var lipColor = this.coloring.custom.lipTone;
			var mouthColor = this.coloring.custom.mouthColor;
			var eyeColor = this.coloring.custom.eyeColor;
			var hairColor = this.coloring.custom.hairColor;
		};
		
	
		var svg = document.createElementNS('http://www.w3.org/2000/svg','g');
		
		var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
		svg.appendChild(defs);
		
		var shadow = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		svg.appendChild(shadow);
		shadow.setAttribute('x',0);
		shadow.setAttribute('y',0);
		shadow.setAttribute('rx',100);
		shadow.setAttribute('ry',20);
		shadow.setAttribute('fill','lightgrey');
		
		// Height Proportions
		var headHeightProportion = this.bio('headHeight')*0.2;
		var neckHeightProportion = this.bio('neckHeight')*0.03;
		var torsoHeightProportion = this.bio('torsoHeight')*0.3;
		var legHeightProportion = this.bio('legHeight')*0.57;
		var heightTotal = headHeightProportion + torsoHeightProportion + legHeightProportion;
		headHeightProportion = headHeightProportion/heightTotal;
		torsoHeightProportion = torsoHeightProportion/heightTotal;
		legHeightProportion = legHeightProportion/heightTotal;

		// Measures
		var totalHeight = height * 0.6;
		var headHeight = totalHeight * headHeightProportion;
		var neckHeight = totalHeight * neckHeightProportion;
		var torsoHeight = totalHeight * torsoHeightProportion;
		var legHeight = totalHeight * legHeightProportion;
		var headWidth = 0.7 * headHeight * this.bio('headWidth');
		var shouldersWidth = 0.22 * totalHeight * this.bio('shouldersWidth');
		var hipsWidth = 0.15 * totalHeight * this.bio('hipsWidth');
		var armLength = 0.4 * totalHeight * this.bio('armLength');
		var upperArmLength = 0.5 * armLength;
		var forearmLength = 0.5 * armLength;
		var thighLength = 0.5 * legHeight;
		var calfLength = 0.5 * legHeight;
		var footLength = 0.12 * totalHeight * this.bio('footLength');
		var nearLegHeight = Math.sin(pose.hipsCant) * hipsWidth/2 + Math.max(0,Math.cos(pose.nearThighLift) * thighLength) + Math.max(0,Math.cos(pose.nearKneeBend) * calfLength);
		var farLegHeight = Math.sin(pose.hipsCant) * hipsWidth/-2 + Math.max(0,Math.cos(pose.farThighLift) * thighLength) + Math.max(0,Math.cos(pose.farKneeBend) * calfLength);
		var pelvisHeight = Math.max(nearLegHeight,farLegHeight) * -1;
		var shouldersHeight = pelvisHeight - torsoHeight;
		var headCenter = {x:0,y:shouldersHeight - neckHeight - headHeight/2};
		var calfWidth = this.bio('calfWidth') * 40;
		var thighWidth = this.bio('thighWidth') * 50;
		var buttSize = this.bio('buttSize')*20;
		var breastSize = this.bio('breastSize') * 20;
		var haunchWidth = this.bio('hipsWidth') * 30;
		var lipSize = this.bio('lipSize') * 3;
		var browSize = this.bio('browSize')*3
		var phallusLength = this.bio('phallusLength') * 5;
		var phallusGirth = this.bio('phallusGirth') * phallusLength * 0.15;
		var glansSize = this.bio('glansSize') * phallusGirth;
		var labioscrotalSize = this.bio('labioscrotalSize') * hipsWidth/4;
				
		// Orientation
		var upperBodyAngle ;
		if (pose.farUpperArmLift >= 0 && pose.nearUpperArmLift >= 0) {
			upperBodyAngle = true;
		} else if (pose.farUpperArmLift <= 0 && pose.nearUpperArmLift <= 0) {
			upperBodyAngle = false;
		} else if (pose.farUpperArmLift >= 0 && pose.nearUpperArmLift <= 0 && Math.abs(pose.farUpperArmLift) > Math.abs(pose.nearUpperArmLift) ) {
			upperBodyAngle = true;
		} else {
			upperBodyAngle = false;
		};
		var torsoFacing;
		if (upperBodyAngle) {
			torsoFacing = 1;
		} else {
			torsoFacing = -1;
		};
		var lowerBodyAngle ;
		if (pose.farThighLift > 0 && pose.nearThighLift > 0) {
			lowerBodyAngle = true;
		} else if (pose.farThighLift < 0 && pose.nearThighLift < 0) {
			lowerBodyAngle = false;
		} else if (pose.farThighLift > 0 && pose.nearThighLift < 0 && Math.abs(pose.farThighLift) > Math.abs(pose.nearThighLift) ) {
			lowerBodyAngle = true;
		} else {
			lowerBodyAngle = false;
		};

		// Joints and Points
		var neckBase = {
			x:0,
			y:pelvisHeight - torsoHeight
		};
		var spineBase = {
			x:0,
			y:pelvisHeight
		};
		var neckBase = {
			x:0,
			y:pelvisHeight - torsoHeight
		};
		var nearHip = {
			x:Math.cos(pose.hipsCant)*hipsWidth/-2,
			y:pelvisHeight + Math.sin(pose.hipsCant)*hipsWidth/2,
		};
		var nearKnee = {
			x: nearHip.x + Math.sin(pose.nearThighLift)*thighLength,
			y: nearHip.y + Math.cos(pose.nearThighLift)*thighLength,
		};
		var nearAnkle = {
			x: nearKnee.x + Math.sin(pose.nearKneeBend)*calfLength,
			y: nearKnee.y + Math.cos(pose.nearKneeBend)*calfLength,
		};
		var farHip = {
			x:Math.cos(pose.hipsCant)*hipsWidth/2,
			y:pelvisHeight - Math.sin(pose.hipsCant)*hipsWidth/2,
		};
		var farKnee = {
			x: farHip.x + Math.sin(pose.farThighLift)*thighLength,
			y: farHip.y + Math.cos(pose.farThighLift)*thighLength,
		};
		var farAnkle = {
			x: farKnee.x + Math.sin(pose.farKneeBend)*calfLength,
			y: farKnee.y + Math.cos(pose.farKneeBend)*calfLength,
		};
		var farHaunch = {
			x: (3*farHip.x+spineBase.x)/4,
			y: (3*farHip.y+spineBase.y)/4,
		};
		var nearHaunch = {
			x: (3*nearHip.x+spineBase.x)/4,
			y: (3*nearHip.y+spineBase.y)/4,
		};
		var nearFootAngle = Math.PI/3;
		var farFootAngle = Math.PI/3;
		if (!lowerBodyAngle) {
			nearFootAngle *= -1;
			farFootAngle *= -1;
		};
		var nearToes = {
			x: nearAnkle.x + Math.sin(nearFootAngle)*footLength,
			y: nearAnkle.y + Math.cos(nearFootAngle)*footLength,
		};
		var farToes = {
			x: farAnkle.x + Math.sin(farFootAngle)*footLength,
			y: farAnkle.y + Math.cos(farFootAngle)*footLength,
		};
		
		var nearShoulder = {
			x:Math.cos(pose.shouldersTip)*shouldersWidth/-2,
			y:shouldersHeight + Math.sin(pose.shouldersTip)*shouldersWidth/2,
		};
		var nearElbow = {
			x: nearShoulder.x + Math.sin(pose.nearUpperArmLift)*upperArmLength,
			y: nearShoulder.y + Math.cos(pose.nearUpperArmLift)*upperArmLength,
		};
		var nearWrist = {
			x: nearElbow.x + Math.sin(pose.nearForearmLift)*forearmLength,
			y: nearElbow.y + Math.cos(pose.nearForearmLift)*forearmLength,
		};
		var farShoulder = {
			x:Math.cos(pose.shouldersTip)*shouldersWidth/2,
			y:shouldersHeight - Math.sin(pose.shouldersTip)*shouldersWidth/2,
		};
		var farElbow = {
			x: farShoulder.x + Math.sin(pose.farUpperArmLift)*upperArmLength,
			y: farShoulder.y + Math.cos(pose.farUpperArmLift)*upperArmLength,
		};
		var farWrist = {
			x: farElbow.x + Math.sin(pose.farForearmLift)*forearmLength,
			y: farElbow.y + Math.cos(pose.farForearmLift)*forearmLength,
		};
		var farBreastAnchor = {
			x:farShoulder.x/2,
			y:(neckBase.y+farShoulder.y)/2,
		};
		var farBreastCenter = {
			x:farShoulder.x/2,
			y:farBreastAnchor.y + Math.max(breastSize,torsoHeight/3 * this.bio('breastSag')),
		};
		var nearBreastAnchor = {
			x:nearShoulder.x/2,
			y:(neckBase.y+nearShoulder.y)/2,
		};
		var nearBreastCenter = {
			x:nearShoulder.x/2,
			y:nearBreastAnchor.y + Math.max(breastSize,torsoHeight/3 * this.bio('breastSag')),
		};
		var bellyCollision = pelvisHeight - this.bio('belly')*60;
		if (farBreastCenter.y + breastSize > bellyCollision) {
			farBreastCenter.x -= (bellyCollision - (farBreastCenter.y + breastSize))/4 ;
		};
		if (nearBreastCenter.y + breastSize > bellyCollision) {
			nearBreastCenter.x += (bellyCollision - (nearBreastCenter.y + breastSize))/4 ;
		};
		if (upperBodyAngle) {
			farBreastCenter.x += breastSize * 0.7;
			nearBreastCenter.x += breastSize * 0.5;
		} else {
			farBreastCenter.x -= breastSize * 0.5;
			nearBreastCenter.x -= breastSize * 0.7;
		};
		if (upperBodyAngle) {
			areolaeOffset = breastSize * 0.5;
		} else {
			areolaeOffset = breastSize * -0.5;
		};
		var farAreolae = {
			x: farBreastCenter.x + areolaeOffset,
			y: Math.min(farBreastCenter.y - breastSize/2 + this.bio('breastSag')/2.4 * breastSize * 1.5,farBreastCenter.y + breastSize),
		};
		var nearAreolae = {
			x: nearBreastCenter.x + areolaeOffset,
			y: Math.min(nearBreastCenter.y - breastSize/2 + this.bio('breastSag')/2.4 * breastSize * 1.5,nearBreastCenter.y + breastSize),
		};
		var nippleWidth = this.bio('nippleWidth') * 10;
		var nippleLength = this.bio('nippleLength') * 6;
		if (!upperBodyAngle) {
			nippleLength *= -1;
		};
		var farNippleTop = {
			x: farAreolae.x,
			y: farAreolae.y - nippleWidth/2,
		};
		var nearNippleTop = {
			x: nearAreolae.x,
			y: nearAreolae.y - nippleWidth/2,
		};


		var facing;
		if (upperBodyAngle) {
			facing = 12;
		} else {
			facing = -12;
		};
		var headTilt = pose.headTip * 180/Math.PI;
		var headSlide = pose.headSlide * 20/Math.PI;
// 		var nodOffset = 10*pose.headNod/Math.PI
		var nodOffset = 0;
		var eyeSize = this.bio('eyeSize') * 8;
		var eyeDistance = this.bio('eyeDistance') * headWidth/5;
		var nearEyeCenter = {
			x: headCenter.x+facing-eyeDistance,
			y: headCenter.y+nodOffset,
		};
		var farEyeCenter = {
			x: headCenter.x+facing+eyeDistance,
			y: headCenter.y+nodOffset,
		};
		var noseFacing = 1;
		if (facing < 0) {
			noseFacing = -1;
		};
		var noseWidth = this.bio('noseWidth')*4;
		var noseLength = this.bio('noseLength')*facing*0.2;
		var noseHeight = this.bio('noseHeight')*headHeight/4;
		var noseCenter = {
			x: headCenter.x+facing*headWidth/50+noseLength,
			y: headCenter.y-noseWidth+nodOffset+noseHeight,
		};
		var noseBaseCenter = {
			x:headCenter.x+facing,
			y:headCenter.y+headHeight/4-noseWidth+nodOffset,
		};
		var noseBridge = {
			x: headCenter.x+facing,
			y: headCenter.y+nodOffset,
		};
		var cheekboneSize = this.bio('cheekboneSize')*3;
		var nearCheekbone = {
			x: nearEyeCenter.x-eyeSize - this.bio('cheekboneWidth')*3,
			y: nearEyeCenter.y + headHeight/12 + this.bio('cheekboneHeight')*5,
		};
		var farCheekbone = {
			x: farEyeCenter.x+eyeSize + this.bio('cheekboneWidth')*3,
			y: farEyeCenter.y + headHeight/12 + this.bio('cheekboneHeight')*5,
		};
		var mouthHeight = 5*(pose.mouthOpen + Math.PI)/Math.PI;
		var topOfMouth = {
			x: headCenter.x + facing*1.2,
			y: headCenter.y + headHeight/3+nodOffset,
		};
		var chin = {
			x: topOfMouth.x,
			y: topOfMouth.y + mouthHeight + headHeight/8,
		};
		var nearEarCenter = {
			x: headCenter.x-headWidth*0.4,
			y: headCenter.y,
		};
		var farEarCenter = {
			x: headCenter.x+headWidth*0.4,
			y: headCenter.y,
		};
		var nearJawbone = {
			x: headCenter.x-headWidth*0.3,
			y: headCenter.y+headHeight*0.2,
		};
		var farJawbone = {
			x: headCenter.x+headWidth*0.3,
			y: headCenter.y+headHeight*0.2,
		};
		var templeSize = this.bio('templeSize')*5;
		var nearTemple = {
			x: nearEyeCenter.x-eyeSize - this.bio('templeWidth')*2,
			y: nearEyeCenter.y - this.bio('templeHeight')*5,
		};
		var farTemple = {
			x: farEyeCenter.x + eyeSize + this.bio('templeWidth')*2,
			y: farEyeCenter.y - this.bio('templeHeight')*5,
		};
		var mouthPurse = headWidth*0.04 + headWidth*0.04*(pose.mouthPurse + Math.PI)/Math.PI;
		var mouthSmile = (1+pose.mouthSmile/Math.PI)/4;
		var mouthGrimace = (pose.mouthGrimace/Math.PI)*mouthHeight/2;
		
		var genitalsFacing = -1;
		if (lowerBodyAngle) {
			genitalsFacing = 1;
		};
		var genitalsTop = {
			x: 0 + genitalsFacing*10,
			y: pelvisHeight,
		};
		var genitalsBottom = {
			x: 0,
			y: pelvisHeight + hipsWidth*0.4,
		};
		var erectionAngle = Math.min(Math.max(pose.phallusErection,Math.PI * 0.2),Math.PI*0.8);
		var phallusTip = {
			x: genitalsTop.x + genitalsFacing * Math.sin(erectionAngle) * phallusLength,
			y: genitalsTop.y + Math.cos(erectionAngle) * phallusLength,
		};
		
//		Wireframe (Old)
// 		var wireframe = document.createElementNS('http://www.w3.org/2000/svg','g');
// 		svg.appendChild(wireframe);
// 		var legs = document.createElementNS('http://www.w3.org/2000/svg','polyline');
// 		wireframe.appendChild(legs);
// 		var pointsArray = [
// 			nearToes,
// 			nearAnkle,
// 			nearKnee,
// 			nearHip,
// 			farHip,
// 			farKnee,
// 			farAnkle,
// 			farToes,
// 		];
// 		var pointsString = '';
// 		for (var p of pointsArray) {
// 			pointsString += p.x + "," + p.y + " ";
// 		};
// 		legs.setAttribute('points',pointsString);
// 		legs.setAttribute('stroke','black');
// 		legs.setAttribute('fill','none');
// 		
// 		var spine = document.createElementNS('http://www.w3.org/2000/svg','line');
// 		wireframe.appendChild(spine);
// 		spine.setAttribute('x1',neckBase.x);
// 		spine.setAttribute('y1',neckBase.y);
// 		spine.setAttribute('x2',spineBase.x);
// 		spine.setAttribute('y2',spineBase.y);
// 		spine.setAttribute('points',pointsString);
// 		spine.setAttribute('stroke','black');
// 		spine.setAttribute('fill','none');
// 
// 		var arms = document.createElementNS('http://www.w3.org/2000/svg','polyline');
// 		wireframe.appendChild(arms);
// 		var pointsArray = [
// 			nearWrist,
// 			nearElbow,
// 			nearShoulder,
// 			neckBase,
// 			farShoulder,
// 			farElbow,
// 			farWrist,
// 		];
// 		var pointsString = '';
// 		for (var p of pointsArray) {
// 			pointsString += p.x + "," + p.y + " ";
// 		};
// 		arms.setAttribute('points',pointsString);
// 		arms.setAttribute('stroke','black');
// 		arms.setAttribute('fill','none');
// 		
// 		var head = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
// 		wireframe.appendChild(head);
// 		head.setAttribute('cx',0);
// 		head.setAttribute('cy',shouldersHeight - neckHeight - headHeight/2);
// 		head.setAttribute('rx',headWidth/2);
// 		head.setAttribute('ry',headHeight/2);
// 		head.setAttribute('fill','none');
// 		head.setAttribute('stroke','black');
		
		// Shapes
		
		var hairBack = document.createElementNS('http://www.w3.org/2000/svg','g');
		hairBack.id = 'hairBack';
		hairBack.setAttribute('fill',hairColor);
		hairBack.setAttribute('transform','translate('+headSlide+',0) rotate('+headTilt+','+headCenter.x+','+headCenter.y+')');
		
		var farCalf = document.createElementNS('http://www.w3.org/2000/svg','g');
		farCalf.id = 'farCalf';
		farCalf.setAttribute('fill',skinTone);
		farCalf.setAttribute('stroke','inherit');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farCalf.appendChild(rect);
		rect.setAttribute('x',(farKnee.x+farKnee.x+farAnkle.x)/3-calfWidth * 0.5);
		rect.setAttribute('y',(farKnee.y+farKnee.y+farAnkle.y)/3-calfLength/3);
		rect.setAttribute('height',0.66 * calfLength);
		rect.setAttribute('width',calfWidth);
		rect.setAttribute('rx',calfWidth*0.5);
		rect.setAttribute('ry',calfLength/2);
		tilt = this.pose.farKneeBend * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farKnee.x+farKnee.x+farAnkle.x)/3+' '+(farKnee.y+farKnee.y+farAnkle.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farCalf.appendChild(rect);
		rect.setAttribute('x',(farKnee.x+farAnkle.x)/2-calfWidth * 0.25);
		rect.setAttribute('y',(farKnee.y+farAnkle.y)/2-calfLength/2);
		rect.setAttribute('height',calfLength);
		rect.setAttribute('width',calfWidth * 0.5);
		rect.setAttribute('rx',calfWidth * 5);
		rect.setAttribute('ry',calfLength);
		tilt = this.pose.farKneeBend * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farKnee.x+farAnkle.x)/2+' '+(farKnee.y+farAnkle.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farCalf.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farAnkle.x);
		circle.setAttribute('cy',farAnkle.y);
		circle.setAttribute('r',10);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farCalf.appendChild(circle);
		circle.setAttribute('cx',farKnee.x);
		circle.setAttribute('cy',farKnee.y);
		circle.setAttribute('r',thighWidth * 0.3);
		
		var nearCalf = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearCalf.id = 'nearCalf';
		nearCalf.setAttribute('fill',skinTone);
		nearCalf.setAttribute('stroke','inherit');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearCalf.appendChild(rect);
		rect.setAttribute('x',(nearKnee.x+nearKnee.x+nearAnkle.x)/3-calfWidth*0.5);
		rect.setAttribute('y',(nearKnee.y+nearKnee.y+nearAnkle.y)/3-calfLength/3);
		rect.setAttribute('height',0.66 * calfLength);
		rect.setAttribute('width',calfWidth);
		rect.setAttribute('rx',calfWidth * 0.5);
		rect.setAttribute('ry',calfLength/2);
		tilt = this.pose.nearKneeBend * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearKnee.x+nearKnee.x+nearAnkle.x)/3+' '+(nearKnee.y+nearKnee.y+nearAnkle.y)/3+')');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearCalf.appendChild(rect);
		rect.setAttribute('x',(nearKnee.x+nearAnkle.x)/2-calfWidth * 0.25);
		rect.setAttribute('y',(nearKnee.y+nearAnkle.y)/2-calfLength/2);
		rect.setAttribute('height',calfLength);
		rect.setAttribute('width',calfWidth * 0.5);
		rect.setAttribute('rx',calfWidth * 5);
		rect.setAttribute('ry',calfLength);
		tilt = this.pose.nearKneeBend * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearKnee.x+nearAnkle.x)/2+' '+(nearKnee.y+nearAnkle.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearCalf.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearAnkle.x);
		circle.setAttribute('cy',nearAnkle.y);
		circle.setAttribute('r',10);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearCalf.appendChild(circle);
		circle.setAttribute('cx',nearKnee.x);
		circle.setAttribute('cy',nearKnee.y);
		circle.setAttribute('r',thighWidth * 0.3);
		
		var farThigh = document.createElementNS('http://www.w3.org/2000/svg','g');
		farThigh.id = 'farThigh';
		farThigh.setAttribute('fill',skinTone);
		farThigh.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farHaunch.x);
		circle.setAttribute('cy',farHaunch.y);
		circle.setAttribute('r',haunchWidth);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farThigh.appendChild(rect);
		rect.setAttribute('x',(farHip.x+farKnee.x)/2-thighWidth * 0.5);
		rect.setAttribute('y',(farHip.y+farKnee.y)/2-thighLength/2);
		rect.setAttribute('height',thighLength);
		rect.setAttribute('width',thighWidth);
		rect.setAttribute('rx',thighWidth * 0.25);
		rect.setAttribute('ry',thighLength/2);
		tilt = this.pose.farThighLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farHip.x+farKnee.x)/2+' '+(farHip.y+farKnee.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farKnee.x);
		circle.setAttribute('cy',farKnee.y);
		circle.setAttribute('r',thighWidth * 0.3);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		farThigh.appendChild(path);
		var leftX = ((3*farHip.x+spineBase.x)/4) - this.bio('hipsWidth')*30;
		var rightX = ((3*farHip.x+spineBase.x)/4) + this.bio('hipsWidth')*30;
		d = 'M '+leftX+','+((3*farHip.y+spineBase.y)/4);
		d += ' A '+(this.bio('hipsWidth')*30)+','+(this.bio('hipsWidth')*30)+' 1 1 0 '+rightX+','+((3*farHip.y+spineBase.y)/4);
		path.setAttribute('d',d);
		
		var nearThigh = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearThigh.id = 'nearThigh';
		nearThigh.setAttribute('fill',skinTone);
		nearThigh.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearHaunch.x);
		circle.setAttribute('cy',nearHaunch.y);
		circle.setAttribute('r',thighWidth*0.25);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearThigh.appendChild(rect);
		rect.setAttribute('x',(nearHip.x+nearKnee.x)/2-thighWidth * 0.5);
		rect.setAttribute('y',(nearHip.y+nearKnee.y)/2-thighLength/2);
		rect.setAttribute('height',thighLength);
		rect.setAttribute('width',thighWidth);
		rect.setAttribute('rx',thighWidth * 0.25);
		rect.setAttribute('ry',thighLength/2);
		tilt = this.pose.nearThighLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearHip.x+nearKnee.x)/2+' '+(nearHip.y+nearKnee.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearThigh.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearKnee.x);
		circle.setAttribute('cy',nearKnee.y);
		circle.setAttribute('r',thighWidth * 0.3);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearThigh.appendChild(path);
		var leftX = ((3*nearHip.x+spineBase.x)/4) - this.bio('hipsWidth')*30;
		var rightX = ((3*nearHip.x+spineBase.x)/4) + this.bio('hipsWidth')*30;
		d = 'M '+leftX+','+((3*nearHip.y+spineBase.y)/4);
		d += ' A '+(this.bio('hipsWidth')*30)+','+(this.bio('hipsWidth')*30)+' 1 1 0 '+rightX+','+((3*nearHip.y+spineBase.y)/4);
		path.setAttribute('d',d);
		
		var butt = document.createElementNS('http://www.w3.org/2000/svg','g');
		butt.id = 'butt';
		butt.setAttribute('fill',skinTone);
		butt.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var buttLift = buttSize - this.bio('hipsWidth')*30;
		if (lowerBodyAngle) {
			var buttSway = buttSize*-0.5;
		} else {
			var buttSway = buttSize*0.5;
		};
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*nearHip.x+spineBase.x)/4 + buttSway);
		circle.setAttribute('cy',(3*nearHip.y+spineBase.y)/4 - buttLift);
		circle.setAttribute('r',buttSize);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*farHip.x+spineBase.x)/4 + buttSway);
		circle.setAttribute('cy',(3*farHip.y+spineBase.y)/4 - buttLift);
		circle.setAttribute('r',buttSize);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*nearHip.x+spineBase.x)/4);
		circle.setAttribute('cy',(3*nearHip.y+spineBase.y)/4);
		circle.setAttribute('r',this.bio('hipsWidth')*30);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		butt.appendChild(circle);
		circle.setAttribute('cx',(3*farHip.x+spineBase.x)/4);
		circle.setAttribute('cy',(3*farHip.y+spineBase.y)/4);
		circle.setAttribute('r',this.bio('hipsWidth')*30);
		
		var armWidth = this.bio('armWidth') * 15;	
		var tricepWidth = this.bio('bicep') * 10 ;
		var bicepWidth = this.bio('bicep') * 10 ;
		var farBicepFlex = 2 - Math.pow(Math.pow(farWrist.x - farShoulder.x,2)+Math.pow(farWrist.y - farShoulder.y,2),.5) / (upperArmLength + forearmLength);
		var farTricepFlex = (1 + Math.abs(this.pose.farUpperArmLift)) / 2;
		var farBicepPosition = (this.pose.farForearmLift - this.pose.farUpperArmLift)/Math.PI;
		if (farBicepPosition > 1) {farBicepPosition = 1 - farBicepPosition;};
		if (farBicepPosition < -1) {farBicepPosition = 2 + farBicepPosition;};
		var nearBicepFlex = 2 - Math.pow(Math.pow(nearWrist.x - nearShoulder.x,2)+Math.pow(nearWrist.y - nearShoulder.y,2),.5) / (upperArmLength + forearmLength);
		var nearTricepFlex = (1 + Math.abs(this.pose.nearUpperArmLift)) / 2;
		var nearBicepPosition = (this.pose.nearForearmLift - this.pose.nearUpperArmLift)/Math.PI;
		if (nearBicepPosition > 1) {nearBicepPosition = 1 - nearBicepPosition;};
		if (nearBicepPosition < -1) {nearBicepPosition = 2 + nearBicepPosition;};
		var shoulderWidth = armWidth*0.75;
		
		var farUpperArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		farUpperArm.id = 'farUpperArm';
		farUpperArm.setAttribute('fill',skinTone);
		farUpperArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farUpperArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farShoulder.x);
		circle.setAttribute('cy',farShoulder.y);
		circle.setAttribute('r',shoulderWidth);
		var arm = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(arm);
		arm.setAttribute('x',(farShoulder.x+farElbow.x)/2-armWidth);
		arm.setAttribute('y',(farShoulder.y+farElbow.y)/2-upperArmLength/2);
		arm.setAttribute('height',upperArmLength * 1.05);
		arm.setAttribute('width',armWidth*2);
		arm.setAttribute('rx',armWidth);
		arm.setAttribute('ry',upperArmLength);
		tilt = this.pose.farUpperArmLift * -180/Math.PI;
		arm.setAttribute('transform','rotate('+tilt+' '+(farShoulder.x+farElbow.x)/2+' '+(farShoulder.y+farElbow.y)/2+')');
		var tricep = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(tricep);
		tricep.setAttribute('x',farShoulder.x + 0.25*armWidth/farTricepFlex);
		tricep.setAttribute('y',farShoulder.y - armWidth*0.5);
		tricep.setAttribute('height',0.5 * upperArmLength / farTricepFlex);
		tricep.setAttribute('width',tricepWidth * farTricepFlex);
		tricep.setAttribute('rx',tricepWidth*1.33);
		tricep.setAttribute('ry',0.3 * upperArmLength);
		tilt = this.pose.farUpperArmLift * -180/Math.PI;
		tricep.setAttribute('transform','rotate('+tilt+' '+farShoulder.x+' '+farShoulder.y+')');
		var bicep = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farUpperArm.appendChild(bicep);
		bicep.setAttribute('x',farShoulder.x - (0.5*bicepWidth * farBicepFlex) + farBicepPosition*armWidth*0.5);
		bicep.setAttribute('y',farShoulder.y + upperArmLength*0.5);
		bicep.setAttribute('height',0.5 * upperArmLength );
		bicep.setAttribute('width',bicepWidth * farBicepFlex);
		bicep.setAttribute('rx',bicepWidth*1.33);
		bicep.setAttribute('ry',upperArmLength);
		tilt = this.pose.farUpperArmLift * -180/Math.PI;
		bicep.setAttribute('transform','rotate('+tilt+' '+farShoulder.x+' '+farShoulder.y+')');

		var nearUpperArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearUpperArm.id = 'nearUpperArm';
		nearUpperArm.setAttribute('fill',skinTone);
		nearUpperArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearUpperArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearShoulder.x);
		circle.setAttribute('cy',nearShoulder.y);
		circle.setAttribute('r',shoulderWidth);
		var arm = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(arm);
		arm.setAttribute('x',(nearShoulder.x+nearElbow.x)/2-armWidth);
		arm.setAttribute('y',(nearShoulder.y+nearElbow.y)/2-upperArmLength/2);
		arm.setAttribute('height',upperArmLength * 1.05);
		arm.setAttribute('width',armWidth*2);
		arm.setAttribute('rx',armWidth);
		arm.setAttribute('ry',upperArmLength);
		tilt = this.pose.nearUpperArmLift * -180/Math.PI;
		arm.setAttribute('transform','rotate('+tilt+' '+(nearShoulder.x+nearElbow.x)/2+' '+(nearShoulder.y+nearElbow.y)/2+')');
		var tricep = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(tricep);
		tricep.setAttribute('x',nearShoulder.x - 0.25*armWidth/nearTricepFlex - tricepWidth*nearTricepFlex);
		tricep.setAttribute('y',nearShoulder.y - armWidth*0.5);
		tricep.setAttribute('height',0.5 * upperArmLength / nearTricepFlex);
		tricep.setAttribute('width',tricepWidth * nearTricepFlex);
		tricep.setAttribute('rx',tricepWidth*1.33);
		tricep.setAttribute('ry',0.3 * upperArmLength);
		tilt = this.pose.nearUpperArmLift * -180/Math.PI;
		tricep.setAttribute('transform','rotate('+tilt+' '+nearShoulder.x+' '+nearShoulder.y+')');
		var bicep = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearUpperArm.appendChild(bicep);
		bicep.setAttribute('x',nearShoulder.x - (0.5*bicepWidth * nearBicepFlex) + nearBicepPosition*armWidth*0.5);
		bicep.setAttribute('y',nearShoulder.y + upperArmLength*0.5);
		bicep.setAttribute('height',0.5 * upperArmLength );
		bicep.setAttribute('width',bicepWidth * nearBicepFlex);
		bicep.setAttribute('rx',bicepWidth*1.33);
		bicep.setAttribute('ry',upperArmLength);
		tilt = this.pose.nearUpperArmLift * -180/Math.PI;
		bicep.setAttribute('transform','rotate('+tilt+' '+nearShoulder.x+' '+nearShoulder.y+')');		

		var farLowerArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		farLowerArm.id = 'farLowerArm';
		farLowerArm.setAttribute('fill',skinTone);
		farLowerArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farLowerArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farElbow.x);
		circle.setAttribute('cy',farElbow.y);
		circle.setAttribute('r',7 * this.bio('armWidth'));
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farLowerArm.appendChild(rect);
		rect.setAttribute('x',(farElbow.x+farWrist.x)/2-this.bio('armWidth') * 10);
		rect.setAttribute('y',(farElbow.y+farWrist.y)/2-forearmLength/1.8);
		rect.setAttribute('height',forearmLength * 1);
		rect.setAttribute('width',this.bio('armWidth') * 20);
		rect.setAttribute('rx',this.bio('armWidth') * 20);
		rect.setAttribute('ry',forearmLength);
		tilt = this.pose.farForearmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(farElbow.x+farWrist.x)/2+' '+(farElbow.y+farWrist.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farLowerArm.appendChild(circle);
// 		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',farWrist.x);
		circle.setAttribute('cy',farWrist.y);
		circle.setAttribute('r',10);

		var nearLowerArm = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearLowerArm.id = 'nearLowerArm';
		nearLowerArm.setAttribute('fill',skinTone);
		nearLowerArm.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearLowerArm.appendChild(circle);
		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearElbow.x);
		circle.setAttribute('cy',nearElbow.y);
		circle.setAttribute('r',7 * this.bio('armWidth'));
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearLowerArm.appendChild(rect);
		rect.setAttribute('x',(nearElbow.x+nearWrist.x)/2-this.bio('armWidth') * 10);
		rect.setAttribute('y',(nearElbow.y+nearWrist.y)/2-forearmLength/1.8);
		rect.setAttribute('height',forearmLength * 1);
		rect.setAttribute('width',this.bio('armWidth') * 20);
		rect.setAttribute('rx',this.bio('armWidth') * 20);
		rect.setAttribute('ry',forearmLength);
		tilt = this.pose.nearForearmLift * -180/Math.PI;
		rect.setAttribute('transform','rotate('+tilt+' '+(nearElbow.x+nearWrist.x)/2+' '+(nearElbow.y+nearWrist.y)/2+')');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearLowerArm.appendChild(circle);
// 		circle.setAttribute('stroke','none');
		circle.setAttribute('cx',nearWrist.x);
		circle.setAttribute('cy',nearWrist.y);
		circle.setAttribute('r',10);

		var farElbowJoint = document.createElementNS('http://www.w3.org/2000/svg','use');
		farElbowJoint.id = 'farElbowJoint';
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farElbowJoint.appendChild(circle);
		circle.setAttribute('cx',farElbow.x);
		circle.setAttribute('cy',farElbow.y);
		circle.setAttribute('r',7 * this.bio('armWidth'));
				
		var nearElbowJoint = document.createElementNS('http://www.w3.org/2000/svg','use');
		nearElbowJoint.id = 'nearElbowJoint';
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearElbowJoint.appendChild(circle);
		circle.setAttribute('cx',nearElbow.x);
		circle.setAttribute('cy',nearElbow.y);
		circle.setAttribute('r',7 * this.bio('armWidth'));
		
		var torso = document.createElementNS('http://www.w3.org/2000/svg','g');
		torso.id = 'torso';
		torso.setAttribute('fill',skinTone);
		torso.setAttribute('stroke','inherit');
		var backBelly = document.createElementNS('http://www.w3.org/2000/svg','path');
		torso.appendChild(backBelly);
		var control = this.bio('belly') * 30;
		var d = 'M ' + (nearHaunch.x - haunchWidth*0.7) + ',' + (nearHaunch.y-haunchWidth*0.7) + ' ';
		d += 'C ' + (nearHaunch.x - haunchWidth*0.7) + ',' + (nearHaunch.y - haunchWidth*0.7 - control) + ' ' + (neckBase.x-control) + ',' + (neckBase.y+pelvisHeight)/2 + ' ' + neckBase.x + ',' + (neckBase.y+pelvisHeight)/2;
		d += 'C ' + (neckBase.x+control) + ',' + (neckBase.y+pelvisHeight)/2 + ' ' + (farHaunch.x + haunchWidth*0.7) + ',' + (farHaunch.y-haunchWidth*0.7-control) + ' ' + (farHaunch.x + haunchWidth*0.7) + ',' + (farHaunch.y-haunchWidth*0.7);
		backBelly.setAttribute('d',d);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		path.setAttribute('stroke','none');
		var farSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		farSide.setAttribute('fill','none');
		torso.appendChild(farSide);
		var nearSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearSide.setAttribute('fill','none');
		torso.appendChild(nearSide);
		torso.appendChild(path);
		var d = 'M '+nearHip.x+','+(nearHip.y - this.bio('hipsWidth') * 30)+' ';
		var nearD = 'M '+nearHip.x+','+(nearHip.y - this.bio('hipsWidth') * 30)+' ';
		var farD = 'M '+farShoulder.x+','+farShoulder.y+' ';
		var nearC = (nearShoulder.y - nearHip.y)/2;
		var farC = (farShoulder.y - farHip.y)/2;
		// Up Near Side
		c1x = nearHip.x;
		c1y = nearHip.y - this.bio('hipsWidth') * 30 + nearC;
		x = nearShoulder.x;
		y = nearShoulder.y;
		c2x = x;
		c2y = y - nearC;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		nearD += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// Up to Neck
		c1x = x+10;
		c1y = y+0;
		x = (neckBase.x + headCenter.x)/2;
		y = (neckBase.y + headCenter.y)/2;
		c2x = x;
		c2y = y+10;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// Down to Far Shoulder
		c1x = x+0;
		c1y = y+10;
		x = farShoulder.x;
		y = farShoulder.y;
		c2x = x-10;
		c2y = y;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// Down Far Side
		c1x = x+0;
		c1y = y - farC;
		x = farHip.x;
		y = farHip.y - this.bio('hipsWidth') * 30;
		c2x = x;
		c2y = y + farC;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		farD += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		// To Pelvis
		c1x = x;
		c1y = y;
		x = 0;
		y = pelvisHeight;
		c2x = x;
		c2y = y;
		d += 'C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + x + ',' + y + ' ';
		d += ' z';
		path.setAttribute('d',d);
		nearSide.setAttribute('d',nearD);
		farSide.setAttribute('d',farD);
		var pelvis = document.createElementNS('http://www.w3.org/2000/svg','path');
		torso.appendChild(pelvis);
		var startX = hipsWidth * 0.4;
		var startY = pelvisHeight;
		var d = 'M'+startX+','+startY;
		var dc1x = -0.1 * hipsWidth;
		var dc1y = 0.2 * hipsWidth;
		var dc2x = -0.2 * hipsWidth;
		var dc2y = 0.4 * hipsWidth;
		var dx = -0.4 * hipsWidth;
		var dy = 0.4 * hipsWidth;
		d += 'c' + dc1x + ',' + dc1y + ' ' + dc2x + ',' + dc2y + ' ' + dx + ',' + dy;
		dc1x = -0.25 * hipsWidth;
		dc1y = 0;
		dc2x = -0.3 * hipsWidth;
		dc2y = -0.2 * hipsWidth;
		dx = -0.4 * hipsWidth;
		dy = -0.4 * hipsWidth;
		d += 'c' + dc1x + ',' + dc1y + ' ' + dc2x + ',' + dc2y + ' ' + dx + ',' + dy;
		pelvis.setAttribute('d',d);
		tilt = this.pose.hipsCant * -180/Math.PI;
		pelvis.setAttribute('transform','rotate('+tilt+' 0 '+pelvisHeight+')');
		
		var shoulders = document.createElementNS('http://www.w3.org/2000/svg','g');
		shoulders.id = 'shoulders';
		shoulders.setAttribute('fill',skinTone);
		shoulders.setAttribute('stroke','inherit');
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		shoulders.appendChild(circle);
		circle.setAttribute('cx',farShoulder.x);
		circle.setAttribute('cy',farShoulder.y);
		circle.setAttribute('r',shoulderWidth);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		shoulders.appendChild(circle);
		circle.setAttribute('cx',nearShoulder.x);
		circle.setAttribute('cy',nearShoulder.y);
		circle.setAttribute('r',shoulderWidth);
		var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		shoulders.appendChild(polyline);
		var pointsArray = [
			{x:nearShoulder.x,y:nearShoulder.y+this.bio('bicep') * 10},
			{x:nearShoulder.x,y:nearShoulder.y-this.bio('bicep') * 10},
			{x:(2*neckBase.x + headCenter.x)/3,y:(2*neckBase.y + headCenter.y)/3},
			{x:farShoulder.x,y:farShoulder.y-this.bio('bicep') * 10},
			{x:farShoulder.x,y:farShoulder.y+this.bio('bicep') * 10},
		];
		var pointsString = '';
		for (var i of pointsArray) {
			pointsString += i.x + ',' + i.y + ' ';
		};
		polyline.setAttribute('points',pointsString);

		var farBreast = document.createElementNS('http://www.w3.org/2000/svg','g');
		farBreast.id = 'farBreast';
		farBreast.setAttribute('fill',skinTone);
		farBreast.setAttribute('stroke','inherit');
		var shoulderTipDegrees = pose.shouldersTip * -180/Math.PI;
		var nippleBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(nippleBack);
		nippleBack.setAttribute('fill',areolaeTone);
		nippleBack.setAttribute('cx',farAreolae.x);
		nippleBack.setAttribute('cy',farAreolae.y);
		nippleBack.setAttribute('r',nippleWidth/2);
// 		var block = document.createElementNS('http://www.w3.org/2000/svg','rect');
//		farBreast.appendChild(block);
// 		block.setAttribute('stroke','none');
// 		block.setAttribute('x',farBreastAnchor.x-9);
// 		block.setAttribute('y',farBreastAnchor.y-5);
// 		block.setAttribute('width',10);
// 		block.setAttribute('height',this.bio('breastSag')*30);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		farBreast.appendChild(path);
		var c1x, c1y, x, y, c2x, c2y;
		var d = 'M' + farBreastAnchor.x + " " + farBreastAnchor.y;
		var cathetus, control;
		if (this.bio('breastSize') >= 1) {
			cathetus = this.bio('breastSize') * 10 * Math.pow(2,0.5);
			control = 0.5522847 * cathetus;
			breastWidth = 1;
		} else {
			cathetus = 10 * Math.pow(2,0.5);
			control = 0.5522847 * this.bio('breastSize') * cathetus;
			breastWidth = Math.min(2,1/this.bio('breastSize'));
		};
		c1x = farBreastAnchor.x;
		c1y = farBreastAnchor.y;
		x = farBreastCenter.x + cathetus;
		y = farBreastCenter.y - cathetus;
		c2x = x - control;
		c2y = y - control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = farBreastCenter.x + cathetus + control;
		c1y = farBreastCenter.y - cathetus + control;
		x = farBreastCenter.x + cathetus;
		y = farBreastCenter.y + cathetus;
		c2x = x + control;
		c2y = y - control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = farBreastCenter.x + cathetus - control;
		c1y = farBreastCenter.y + cathetus + control;
		x = farBreastCenter.x - cathetus * breastWidth;
		y = farBreastCenter.y + cathetus;
		c2x = x + control;
		c2y = y + control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		if (!upperBodyAngle) {
			c1x = farBreastCenter.x - cathetus * breastWidth - control;
			c1y = farBreastCenter.y + cathetus - control;
			x = farBreastCenter.x - cathetus * breastWidth;
			y = farBreastCenter.y - cathetus;
			c2x = x - control;
			c2y = y + control;
			d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		};
		path.setAttribute('d',d);
		var farBreastClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		farBreastClipPath.id = 'farBreastClipPath';
		defs.appendChild(farBreastClipPath);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		path.setAttribute('d',d);
		farBreastClipPath.appendChild(path);
		var nipplePuff = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(nipplePuff);
		nipplePuff.setAttribute('cx',farAreolae.x);
		nipplePuff.setAttribute('cy',farAreolae.y);
		nipplePuff.setAttribute('r',this.bio('nipplePuff') * breastSize/3);
		var nipplePuffClip = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreastClipPath.prepend(nipplePuffClip);
		nipplePuffClip.setAttribute('cx',farAreolae.x);
		nipplePuffClip.setAttribute('cy',farAreolae.y);
		nipplePuffClip.setAttribute('r',this.bio('nipplePuff') * breastSize/3);
		var areolae = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farBreast.appendChild(areolae);
		areolae.setAttribute('fill',areolaeTone);
		areolae.setAttribute('stroke','none');
		areolae.setAttribute('cx',farAreolae.x);
		areolae.setAttribute('cy',farAreolae.y);
		areolae.setAttribute('r',Math.max(nippleWidth/2,this.bio('areolaeWidth') * breastSize/3));
		areolae.setAttribute('clip-path','url(#farBreastClipPath)');
		var nipple = document.createElementNS('http://www.w3.org/2000/svg','path');
		farBreast.appendChild(nipple);
		nipple.setAttribute('fill',areolaeTone);
		if (this.bio('nippleLength') >= 1) {
			nipple.setAttribute('stroke','black');
			nipple.setAttribute('stroke-width',1);
			nipple.setAttribute('stroke-linecap','round');
		};
		var d = 'M ' + farNippleTop.x + ',' + farNippleTop.y + ' ';
		d += 'c ' + (nippleLength*0.5) + ',' + (nippleWidth*-0.1) + ' ' + (nippleLength*0.75) + ',' + (nippleWidth*-0.2) + ' ' + nippleLength + ',0 ';
		d += 'c ' + (0.55*nippleWidth*torsoFacing) + ',' + 0 + ' ' + (0.55*nippleWidth*torsoFacing) + ',' + nippleWidth + ' ' + 0 + ',' + nippleWidth ;
		d += 'c ' + (nippleLength*-0.25) + ',' + (nippleWidth*0.2) + ' ' + (nippleLength*-0.5) + ',' + (nippleWidth*0.1) + ' ' + (nippleLength*-1) + ',0 ';
		nipple.setAttribute('d',d);
		if (upperBodyAngle) {
			tilt = Math.atan2(farAreolae.y - farBreastCenter.y,farAreolae.x - farBreastCenter.x) * 180 / Math.PI;
		} else {
			tilt = Math.atan2(farBreastCenter.y - farAreolae.y,farBreastCenter.x - farAreolae.x) * 180 / Math.PI;
		};
		nipple.setAttribute('transform','rotate('+tilt+' '+farAreolae.x+' '+farAreolae.y+')');
		
		var nearBreast = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearBreast.id = 'nearBreast';
		nearBreast.setAttribute('fill',skinTone);
		nearBreast.setAttribute('stroke','inherit');
		var nippleBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(nippleBack);
		nippleBack.setAttribute('fill',areolaeTone);
		nippleBack.setAttribute('cx',nearAreolae.x);
		nippleBack.setAttribute('cy',nearAreolae.y);
		nippleBack.setAttribute('r',nippleWidth/2);
// 		var block = document.createElementNS('http://www.w3.org/2000/svg','rect');
// 		nearBreast.appendChild(block);
// 		block.setAttribute('stroke','none');
// 		block.setAttribute('x',nearBreastAnchor.x-1);
// 		block.setAttribute('y',nearBreastAnchor.y-5);
// 		block.setAttribute('width',10);
// 		block.setAttribute('height',this.bio('breastSag')*30);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearBreast.appendChild(path);
		var c1x, c1y, x, y, c2x, c2y;
		var d = 'M' + nearBreastAnchor.x + " " + nearBreastAnchor.y;
		c1x = nearBreastAnchor.x;
		c1y = nearBreastAnchor.y;
		x = nearBreastCenter.x - cathetus;
		y = nearBreastCenter.y - cathetus;
		c2x = x + control;
		c2y = y - control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = nearBreastCenter.x - cathetus - control;
		c1y = nearBreastCenter.y - cathetus + control;
		x = nearBreastCenter.x - cathetus;
		y = nearBreastCenter.y + cathetus;
		c2x = x - control;
		c2y = y - control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = nearBreastCenter.x - cathetus + control;
		c1y = nearBreastCenter.y + cathetus + control;
		x = nearBreastCenter.x + cathetus * breastWidth;
		y = nearBreastCenter.y + cathetus;
		c2x = x - control;
		c2y = y + control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		if (upperBodyAngle) {
			c1x = nearBreastCenter.x + cathetus * breastWidth + control;
			c1y = nearBreastCenter.y + cathetus - control;
			x = nearBreastCenter.x + cathetus * breastWidth;
			y = nearBreastCenter.y - cathetus;
			c2x = x + control;
			c2y = y + control;
			d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		};
		path.setAttribute('d',d);
		var nearBreastClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		nearBreastClipPath.id = 'nearBreastClipPath';
		defs.appendChild(nearBreastClipPath);
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		path.setAttribute('d',d);
		nearBreastClipPath.appendChild(path);
		var nipplePuff = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(nipplePuff);
		nipplePuff.setAttribute('cx',nearAreolae.x);
		nipplePuff.setAttribute('cy',nearAreolae.y);
		nipplePuff.setAttribute('r',this.bio('nipplePuff') * breastSize/3);
		var nipplePuffClip = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreastClipPath.prepend(nipplePuffClip);
		nipplePuffClip.setAttribute('cx',nearAreolae.x);
		nipplePuffClip.setAttribute('cy',nearAreolae.y);
		nipplePuffClip.setAttribute('r',this.bio('nipplePuff') * breastSize/3);
		var areolae = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearBreast.appendChild(areolae);
		areolae.setAttribute('fill',areolaeTone);
		areolae.setAttribute('stroke','none');
		areolae.setAttribute('cx',nearAreolae.x);
		areolae.setAttribute('cy',nearAreolae.y);
		areolae.setAttribute('r',Math.max(nippleWidth/2,this.bio('areolaeWidth') * breastSize/3));
		areolae.setAttribute('clip-path','url(#nearBreastClipPath)');
		var nipple = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearBreast.appendChild(nipple);
		nipple.setAttribute('fill',areolaeTone);
		if (this.bio('nippleLength') >= 1) {
			nipple.setAttribute('stroke','black');
			nipple.setAttribute('stroke-width',1);
			nipple.setAttribute('stroke-linecap','round');
		};
		var d = 'M ' + nearNippleTop.x + ',' + nearNippleTop.y + ' ';
		d += 'c ' + (nippleLength*0.5) + ',' + (nippleWidth*-0.1) + ' ' + (nippleLength*0.75) + ',' + (nippleWidth*-0.2) + ' ' + nippleLength + ',0 ';
		d += 'c ' + (0.55*nippleWidth*torsoFacing) + ',' + 0 + ' ' + (0.55*nippleWidth*torsoFacing) + ',' + nippleWidth + ' ' + 0 + ',' + nippleWidth ;
		d += 'c ' + (nippleLength*-0.25) + ',' + (nippleWidth*0.2) + ' ' + (nippleLength*-0.5) + ',' + (nippleWidth*0.1) + ' ' + (nippleLength*-1) + ',0 ';
		nipple.setAttribute('d',d);
		nipple.setAttribute('transform','rotate('+tilt+' '+nearAreolae.x+' '+nearAreolae.y+')');
		
		var belly = document.createElementNS('http://www.w3.org/2000/svg','g');
		belly.id = 'belly';
		belly.setAttribute('fill',skinTone);
		belly.setAttribute('stroke','inherit');
		var bellySize = this.bio('belly') * 40;
		var bellyOffset = (bellySize/3);
		if (!upperBodyAngle) {
			bellyOffset *= -1;
		};
		var farBellyTop = {
			x:(farBreastAnchor.x+farBreastCenter.x)/2,
			y:(farBreastAnchor.y+farBreastCenter.y)/2,
		};
		var nearBellyTop = {
			x: (nearBreastAnchor.x+nearBreastCenter.x)/2,
			y: (nearBreastAnchor.y+nearBreastCenter.y)/2,
		};
		var bellyBottom = {
			x: bellyOffset,
			y:shouldersHeight+torsoHeight + Math.max(bellySize-40,0),
		};
		var farBellyBottom = {
			x:bellyBottom.x + Math.max(bellySize-40,0),
			y:bellyBottom.y + Math.max(bellySize-40,0)/3,
		};
		var nearBellyBottom = {
			x: bellyBottom.x - Math.max(bellySize-40,0),
			y: bellyBottom.y + Math.max(bellySize-40,0)/3,
		};
		var farBellySide = {
			x: (farBellyBottom.x + farBellyTop.x)/2 + bellyOffset + this.bio('belly')*15-15,
			y: (bellyBottom.y + farBellyTop.y)/2 - this.bio('belly')*20+20,
		};
		var nearBellySide = {
			x: (nearBellyBottom.x + nearBellyTop.x)/2 + bellyOffset - this.bio('belly')*15+15,
			y: (bellyBottom.y + nearBellyTop.y)/2 - this.bio('belly')*20+20,
		};
		if (!upperBodyAngle) {
			farBellySide.x += bellySize * 2/3;
		} else {
			nearBellySide.x -= bellySize * 2/3;
		};
		var bellyTriangle = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		belly.appendChild(bellyTriangle);
		bellyTriangle.setAttribute('stroke',skinTone);
		var points = [nearBellyTop,bellyBottom,farBellyTop];
		var pointsString = '';
		for (var p in points) {
			pointsString += points[p].x + ',' + points[p].y + ' ';
		};
		bellyTriangle.setAttribute('points',pointsString);
		var farPath = document.createElementNS('http://www.w3.org/2000/svg','path');
		belly.appendChild(farPath);
		farPath.id = 'farPath';
		var nearPath = document.createElementNS('http://www.w3.org/2000/svg','path');
		belly.appendChild(nearPath);
		var farD = 'M ' + farBellyTop.x + ',' + farBellyTop.y + ' ' ;
		var nearD = 'M ' + nearBellyTop.x + ',' + nearBellyTop.y + ' ';
		farD += 'C '+farBellyTop.x+' '+farBellyTop.y+' ' + (farBellySide.x - bellySize/4) + ' '+(farBellySide.y-bellySize/2)+' '+farBellySide.x + ' ' + farBellySide.y;
		nearD += 'C '+nearBellyTop.x+' '+nearBellyTop.y+' '+(nearBellySide.x + bellySize/4)+' '+(nearBellySide.y-bellySize/2)+' '+nearBellySide.x + ' ' + nearBellySide.y;
		farD += 'C '+farBellySide.x+' '+farBellySide.y+' ' + (farBellyBottom.x+bellySize) + ' '+farBellyBottom.y+' '+farBellyBottom.x + ' ' + farBellyBottom.y;
		nearD += 'C '+nearBellySide.x+' '+nearBellySide.y+' '+(nearBellyBottom.x-bellySize)+' '+nearBellyBottom.y+' '+nearBellyBottom.x + ' ' + nearBellyBottom.y;
		farD += 'C '+farBellyBottom.x+' '+farBellyBottom.y+' ' + bellyBottom.x + ' '+bellyBottom.y+' '+bellyBottom.x + ' ' + bellyBottom.y;
		nearD += 'C '+nearBellyBottom.x+' '+nearBellyBottom.y+' '+bellyBottom.x+' '+bellyBottom.y+' '+bellyBottom.x + ' ' + bellyBottom.y;
		farPath.setAttribute('d',farD);
		nearPath.setAttribute('d',nearD);
		var abs = document.createElementNS('http://www.w3.org/2000/svg','g');
		belly.appendChild(abs);
		if (this.bio('belly') < 1) {
			var nearTopAb = {
				x: nearBreastAnchor.x + bellyOffset,
				y: Math.min(nearBreastCenter.y + breastSize,nearBreastAnchor.y + torsoHeight*0.4),
			};
			var farTopAb = {
				x: farBreastAnchor.x + bellyOffset,
				y: Math.min(farBreastCenter.y + breastSize,farBreastAnchor.y + torsoHeight*0.4),
			};
			var centerX = (farTopAb.x + nearTopAb.x)/2;
			console.log(bellySize);
			var abBulge = bellySize/7;
			var centerBulge = abBulge * -1;
			if (upperBodyAngle) {
				centerBulge *= -1;
			};
			var stepX = 3;
			var stepY = (Math.max(farTopAb.y,nearTopAb.y) - Math.min(farHip.y,nearHip.y)) / -4 ;
			for (var i=3;i>=0;i--) {
				var opacity = (1-this.bio('belly'))/(1+i);
				var abStroke = document.createElementNS('http://www.w3.org/2000/svg','path');
				abStroke.id = 'abs_'+i;
				abStroke.setAttribute('stroke','black');
				abStroke.setAttribute('stroke-width',1);
				abStroke.setAttribute('stroke-opacity',opacity);
				abStroke.setAttribute('fill','none');
				var thisAbY = nearTopAb.y + stepY * i;
				var diffX = stepX * i;
				d = 'M '+(nearTopAb.x+diffX)+','+thisAbY+' ';
				d += 'C '+(nearTopAb.x-abBulge+diffX)+','+thisAbY+' '+(nearTopAb.x-abBulge+diffX)+','+(thisAbY+stepY)+' '+(nearTopAb.x+diffX)+','+(thisAbY+stepY)+' ';
				d += 'C '+(nearTopAb.x-diffX)+','+(thisAbY+stepY+abBulge)+' '+centerX+','+(thisAbY+stepY+abBulge)+' '+centerX+','+(thisAbY+stepY)+' ';
				d += 'C '+(centerX+centerBulge)+','+(thisAbY+stepY)+' '+(centerX+centerBulge)+','+thisAbY+' '+centerX+','+thisAbY+' ';
				d += 'C '+(centerX+centerBulge)+','+thisAbY+' '+(centerX+centerBulge)+','+(thisAbY+stepY)+' '+centerX+','+(thisAbY+stepY)+' ';
				d += 'C '+centerX+','+(thisAbY+stepY+abBulge)+' '+farTopAb.x+','+(thisAbY+stepY+abBulge)+' '+(farTopAb.x-diffX)+','+(thisAbY+stepY)+' ';
				d += 'C '+(farTopAb.x+abBulge-diffX)+','+(thisAbY+stepY)+' '+(farTopAb.x+abBulge-diffX)+','+thisAbY+' '+(farTopAb.x-diffX)+','+thisAbY+' ';
				abStroke.setAttribute('d',d);
				var abBack = document.createElementNS('http://www.w3.org/2000/svg','path');
				abBack.setAttribute('d',d);
				abs.appendChild(abBack);
				abs.appendChild(abStroke);
			};
		};
		var navel = document.createElementNS('http://www.w3.org/2000/svg','g');
		belly.appendChild(navel);
		navel.setAttribute('stroke','black');
		navel.setAttribute('stroke-width',1);
		navel.setAttribute('stroke-linecap','round');
		navel.setAttribute('fill-opacity',0.2);
		navel.setAttribute('fill','black');
		var topNavel = document.createElementNS('http://www.w3.org/2000/svg','path');
		navel.appendChild(topNavel);
		x = bellyOffset;
		y = (2*farBellyTop.y + 2*nearBellyTop.y + 4*farBellyBottom.y + 4*nearBellyBottom.y) / 12;
		d = 'M '+x+','+y+' ';
		dc1x = bellySize*0.125;
		dc1y = 0;
		dx = 0;
		dy = bellySize*0.25;
		dc2x = bellySize*0.125;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		topNavel.setAttribute('d',d);
		var bottomNavel = document.createElementNS('http://www.w3.org/2000/svg','path');
		navel.appendChild(bottomNavel);
		d = 'M '+(x+bellySize/14)+','+(y+bellySize*0.09)+' ';
		dc1x = bellySize*-0.125;
		dc1y = 0;
		dx = 0;
		dy = bellySize*0.25;
		dc2x = bellySize*-0.125;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		bottomNavel.setAttribute('d',d);
		
		var genitals = document.createElementNS('http://www.w3.org/2000/svg','g');
		genitals.id = 'genitals';
		genitals.setAttribute('fill',skinTone);
		genitals.setAttribute('stroke','inherit');
		var genitalsBacking = document.createElementNS('http://www.w3.org/2000/svg','circle');
		genitals.appendChild(genitalsBacking);
		genitalsBacking.setAttribute('stroke','none');
		genitalsBacking.setAttribute('cx',genitalsTop.x);
		genitalsBacking.setAttribute('cy',genitalsTop.y);
		genitalsBacking.setAttribute('r',hipsWidth*0.08);
		var genitalsHeight = genitalsBottom.y - genitalsTop.y;
		var labioscrotalDrop;
		if (genitalsHeight > labioscrotalSize * 1.2) {
			labioscrotalDrop = genitalsHeight * 0.5;
		} else {
			labioscrotalDrop = labioscrotalSize * 0.5;
		};
		var farScrotum = document.createElementNS('http://www.w3.org/2000/svg','path');
		genitals.appendChild(farScrotum);
		x = genitalsTop.x+genitalsFacing*labioscrotalSize/8;
		y = genitalsTop.y;
		d = 'M '+x+','+y+' ';
		c1x = x + genitalsFacing*labioscrotalSize/16;
		c1y = y + labioscrotalSize/4;
		x = x + labioscrotalSize/4 * genitalsFacing;
		y = y + labioscrotalDrop;
		c2x = x;
		c2y = y - labioscrotalSize/4;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y + labioscrotalSize/4;
		x = (x + labioscrotalSize * genitalsFacing * -0.25 + genitalsBottom.x)/2;
		y = y + labioscrotalDrop;
		c2x = x - genitalsFacing * labioscrotalSize * -0.25;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + genitalsFacing *labioscrotalSize * -0.25;
		c1y = y;
		x = genitalsBottom.x - labioscrotalSize*0.25*genitalsFacing;
		y = genitalsBottom.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		farScrotum.setAttribute('d',d);
		var nearScrotum = document.createElementNS('http://www.w3.org/2000/svg','path');
		genitals.appendChild(nearScrotum);
		nearScrotum.setAttribute('stroke','black');
		x = genitalsTop.x-genitalsFacing*labioscrotalSize/8;
		y = genitalsTop.y;
		d = 'M '+x+','+y+' ';
		c1x = x + genitalsFacing*labioscrotalSize/16;
		c1y = y + labioscrotalSize/4;
		x = x + labioscrotalSize/4 * genitalsFacing;
		y = y + labioscrotalDrop;
		c2x = x;
		c2y = y - labioscrotalSize/4;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y + labioscrotalSize/4;
		x = (x + labioscrotalSize * genitalsFacing * -0.25 + genitalsBottom.x)/2;
		y = y + labioscrotalDrop;
		c2x = x - genitalsFacing * labioscrotalSize * -0.25;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + genitalsFacing *labioscrotalSize * -0.25;
		c1y = y;
		x = genitalsBottom.x - labioscrotalSize*0.25*genitalsFacing;
		y = genitalsBottom.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		nearScrotum.setAttribute('d',d);
// 		farScrotum.setAttribute('fill','blue');
// 		nearScrotum.setAttribute('fill','red');
				
		var phallus = document.createElementNS('http://www.w3.org/2000/svg','g');
		phallus.id = 'phallus';
		phallus.setAttribute('fill',skinTone);
		phallus.setAttribute('stroke','inherit');
		var phallusBase = document.createElementNS('http://www.w3.org/2000/svg','circle');
		phallus.appendChild(phallusBase);
		phallusBase.setAttribute('cx',genitalsTop.x);
		phallusBase.setAttribute('cy',Math.min((genitalsBottom.y + genitalsTop.y)/2,genitalsTop.y+phallusGirth/2));
		phallusBase.setAttribute('r',Math.min((genitalsBottom.y - genitalsTop.y)/2,phallusGirth*0.6));
		phallusBase.setAttribute('stroke','none');
		var shaft = document.createElementNS('http://www.w3.org/2000/svg','path');
		phallus.appendChild(shaft);
		var phallusHeadTop = {
			x:phallusTip.x,
			y:phallusTip.y,
		};
		var phallusHeadBottom = {
			x:phallusTip.x,
			y:phallusTip.y,
		};
		if (genitalsFacing > 0 && erectionAngle < Math.PI/2) {
			phallusHeadTop.x += 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadTop.y -= 0.8 * glansSize * Math.sin(erectionAngle);
			phallusHeadBottom.x -= 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadBottom.y += 0.8 * glansSize * Math.sin(erectionAngle);
		} else if (genitalsFacing > 0 && erectionAngle > Math.PI/2) {
			phallusHeadTop.x += 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadTop.y -= 0.8 * glansSize * Math.sin(erectionAngle);
			phallusHeadBottom.x -= 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadBottom.y += 0.8 * glansSize * Math.sin(erectionAngle);
		} else if (genitalsFacing < 0 && erectionAngle < Math.PI/2) {
			phallusHeadTop.x -= 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadTop.y -= 0.8 * glansSize * Math.sin(erectionAngle);
			phallusHeadBottom.x += 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadBottom.y += 0.8 * glansSize * Math.sin(erectionAngle);
		} else {
			phallusHeadTop.x -= 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadTop.y -= 0.8 * glansSize * Math.sin(erectionAngle);
			phallusHeadBottom.x += 0.8 * glansSize * Math.cos(erectionAngle);
			phallusHeadBottom.y += 0.8 * glansSize * Math.sin(erectionAngle);
		}
		var erectionControl = (erectionAngle - Math.PI/2)*genitalsFacing*phallusGirth*0.5;
		erectionControl = Math.min(hipsWidth/6,erectionControl);
		erectionControl = Math.max(hipsWidth/-6,erectionControl);
		x = genitalsTop.x - erectionControl;
		y = genitalsTop.y;
		d = 'M '+x+','+y+' ';
		c1x = x + 0.3*phallusLength*genitalsFacing;
		c1y = y;
		x = phallusHeadTop.x;
		y = phallusHeadTop.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = phallusHeadBottom.x;
		y = phallusHeadBottom.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = genitalsTop.x + erectionControl;
		y = Math.min(genitalsTop.y + phallusGirth,genitalsBottom.y);
		c2x = x + 0.3*phallusLength*genitalsFacing;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		shaft.setAttribute('d',d);
// 		var phallusHead = document.createElementNS('http://www.w3.org/2000/svg','circle');
// 		phallus.appendChild(phallusHead);
// 		phallusHead.setAttribute('cx',phallusTip.x);
// 		phallusHead.setAttribute('cy',phallusTip.y);
// 		phallusHead.setAttribute('r',phallusGirth);
// 		phallusHead.setAttribute('fill','none');
// 		phallusHead.setAttribute('stroke','red');
// 		phallusHead.setAttribute('stroke-width',3);
		var glans = document.createElementNS('http://www.w3.org/2000/svg','path');
		phallus.appendChild(glans);
		x = phallusTip.x + glansSize;
		y = phallusTip.y - glansSize/3;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + glansSize/3;
		x = phallusTip.x;
		y = phallusTip.y + glansSize;
		c2x = x + glansSize/4;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - glansSize/4;
		c1y = y;
		x = phallusTip.x - glansSize;
		y = phallusTip.y - glansSize/3;
		c2x = x;
		c2y = y + glansSize/3;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y - phallusGirth/2;
		x = phallusTip.x + glansSize;
		y = phallusTip.y - glansSize/3;
		c2x = x;
		c2y = y - glansSize/2;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		glans.setAttribute('d',d);
		var erectionDegrees = erectionAngle * 180 / Math.PI;
		if (genitalsFacing == 1) {
			erectionDegrees = 360 - erectionDegrees;
		};
		glans.setAttribute('transform','rotate('+erectionDegrees+' '+phallusTip.x+' '+phallusTip.y+')');
				
		var farFoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		farFoot.id = 'farFoot';
		farFoot.setAttribute('fill',skinTone);
		farFoot.setAttribute('stroke','inherit');
		var heel = document.createElementNS('http://www.w3.org/2000/svg','rect');
		farFoot.appendChild(heel);
		heel.setAttribute('x',farAnkle.x-10);
		heel.setAttribute('y',farAnkle.y-10);
		heel.setAttribute('width',20);
		heel.setAttribute('height',20);
		heel.setAttribute('rx',8);
		heel.setAttribute('ry',8);
		var footFront = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		farFoot.appendChild(footFront);
		var footPoints = [
			{x:farAnkle.x,y:farAnkle.y-10},
			{x:farToes.x,y:(farAnkle.y + 2*farToes.y)/3},
			farToes,
			{x:(farAnkle.x + 2*farToes.x)/3,y:farToes.y},
			{x:farAnkle.x,y:farAnkle.y+10},
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		footFront.setAttribute('points',footPointsString);
		var bigToe = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farFoot.appendChild(bigToe);
		bigToe.setAttribute('cx',farToes.x);
		bigToe.setAttribute('cy',(farAnkle.y + 5*farToes.y)/6);
		bigToe.setAttribute('r',5);
		var tendon = document.createElementNS('http://www.w3.org/2000/svg','polyline')
		farFoot.appendChild(tendon);
		var footPoints = [
			{x:(4*farAnkle.x+farKnee.x)/5,y:(4*farAnkle.y+farKnee.y)/5},
			farToes,
			farAnkle,
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		tendon.setAttribute('points',footPointsString);
		var tilt = pose.farFootPoint * -180/Math.PI / 6;
		farFoot.setAttribute('transform','rotate('+tilt+' '+farAnkle.x+' '+farAnkle.y+')');
				
		var nearFoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearFoot.id = 'nearFoot';
		nearFoot.setAttribute('fill',skinTone);
		nearFoot.setAttribute('stroke','inherit');
		var heel = document.createElementNS('http://www.w3.org/2000/svg','rect');
		nearFoot.appendChild(heel);
		heel.setAttribute('x',nearAnkle.x-10);
		heel.setAttribute('y',nearAnkle.y-10);
		heel.setAttribute('width',20);
		heel.setAttribute('height',20);
		heel.setAttribute('rx',8);
		heel.setAttribute('ry',8);
		var footFront = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		nearFoot.appendChild(footFront);
		var footPoints = [
			{x:nearAnkle.x,y:nearAnkle.y-10},
			{x:nearToes.x,y:(nearAnkle.y + 2*nearToes.y)/3},
			nearToes,
			{x:(nearAnkle.x + 2*nearToes.x)/3,y:nearToes.y},
			{x:nearAnkle.x,y:nearAnkle.y+10},
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		footFront.setAttribute('points',footPointsString);
		var bigToe = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearFoot.appendChild(bigToe);
		bigToe.setAttribute('cx',nearToes.x);
		bigToe.setAttribute('cy',(nearAnkle.y + 5*nearToes.y)/6);
		bigToe.setAttribute('r',5);
		var tendon = document.createElementNS('http://www.w3.org/2000/svg','polyline')
		nearFoot.appendChild(tendon);
		var footPoints = [
			{x:(4*nearAnkle.x+nearKnee.x)/5,y:(4*nearAnkle.y+nearKnee.y)/5},
			nearToes,
			nearAnkle,
		];
		var footPointsString = '';
		for (var i in footPoints) {
			footPointsString += footPoints[i].x + ',' + footPoints[i].y + ' ';
		};
		tendon.setAttribute('points',footPointsString);	
		var tilt = pose.nearFootPoint * -180/Math.PI / 6;
		nearFoot.setAttribute('transform','rotate('+tilt+' '+nearAnkle.x+' '+nearAnkle.y+')');
					
		var headGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.id = 'headGroup';
		headGroup.setAttribute('transform','translate('+headSlide+',0) rotate('+headTilt+','+headCenter.x+','+headCenter.y+')');
		headGroup.setAttribute('fill',skinTone);
		headGroup.setAttribute('stroke','inherit');
		var skull = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		headGroup.appendChild(skull);
		skull.setAttribute('cx',headCenter.x);
		skull.setAttribute('cy',headCenter.y-headHeight/2+headWidth/2);
		skull.setAttribute('rx',headWidth/2);
		skull.setAttribute('ry',headWidth/2);
		var skullPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		skullPath.id = 'skullPath';
		defs.appendChild(skullPath);
		var skull = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		skullPath.appendChild(skull);
		skull.setAttribute('cx',headCenter.x);
		skull.setAttribute('cy',headCenter.y-headHeight/2+headWidth/2);
		skull.setAttribute('rx',headWidth/2);
		skull.setAttribute('ry',headWidth/2);
		var face = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(face);
		var facePath = document.createElementNS('http://www.w3.org/2000/svg','path');
		skullPath.appendChild(facePath);
		if (facing > 0) {
			startX = farEyeCenter.x + eyeSize;
			startY = farEyeCenter.y
			cheekboneX = farCheekbone.x;
			cheekboneY = farCheekbone.y;
			jawX = nearJawbone.x;
			jawY = nearJawbone.y;
			earX = nearEarCenter.x;
			earY = nearEarCenter.y;
			templeX = farTemple.x;
			templeY = farTemple.y;
		} else {
			startX = nearEyeCenter.x - eyeSize;
			startY = nearEyeCenter.y
			cheekboneX = nearCheekbone.x;
			cheekboneY = nearCheekbone.y;
			jawX = farJawbone.x;
			jawY = farJawbone.y;
			earX = farEarCenter.x;
			earY = farEarCenter.y;
			templeX = nearTemple.x;
			templeY = nearTemple.y;
		};
		x = startX;
		y = startY;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = cheekboneX;
		y = cheekboneY;
		c2x = x;
		c2y = y-cheekboneSize;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y+cheekboneSize;
		x = chin.x;
		y = chin.y;
		c2x = x+this.bio('jawWidth')*facing;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x+this.bio('jawWidth')*facing*-2;
		c1y = y;
		x = jawX;
		y = jawY;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = earX;
		y = earY;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		d += 'L '+headCenter.x+','+(headCenter.y-headHeight*0.48)+' ';
		c1x = headCenter.x + headWidth*facing*0.05;
		c1y = headCenter.y - headHeight*0.48;
		x = templeX;
		y = templeY;
		c2x = x;
		c2y = y-templeSize;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y+templeSize;
		x = startX;
		y = startY;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		face.setAttribute('d',d);
		facePath.setAttribute('d',d);
		
		var nearEyeGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(nearEyeGroup);
		var nearEyeBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearEyeGroup.appendChild(nearEyeBack);
		nearEyeBack.setAttribute('cx',nearEyeCenter.x);
		nearEyeBack.setAttribute('cy',nearEyeCenter.y);
		nearEyeBack.setAttribute('r',eyeSize);
		var nearEyeBall = document.createElementNS('http://www.w3.org/2000/svg','g');
		nearEyeGroup.appendChild(nearEyeBall);
		var nearEye = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearEyeBall.appendChild(nearEye);
		nearEye.setAttribute('stroke','firebrick');
		nearEye.setAttribute('stroke-width',2);
		nearEye.setAttribute('fill','ghostwhite');
		nearEye.setAttribute('cx',nearEyeCenter.x);
		nearEye.setAttribute('cy',nearEyeCenter.y);
		nearEye.setAttribute('r',eyeSize);
		var nearEyePupil = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var nearEyeIris = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var nearEyeHighlight = document.createElementNS('http://www.w3.org/2000/svg','circle');
		nearEyeBall.appendChild(nearEyeIris);
		nearEyeBall.appendChild(nearEyePupil);
		nearEyeBall.appendChild(nearEyeHighlight);
		nearEyePupil.setAttribute('cx',nearEyeCenter.x+pose.eyePositionX/Math.PI*eyeSize);
		nearEyeIris.setAttribute('cx',nearEyeCenter.x+pose.eyePositionX/Math.PI*eyeSize);
		nearEyeHighlight.setAttribute('cx',nearEyeCenter.x+eyeSize/4+pose.eyePositionX/Math.PI*eyeSize);
		nearEyePupil.setAttribute('cy',nearEyeCenter.y+pose.eyePositionY/Math.PI*eyeSize);
		nearEyeIris.setAttribute('cy',nearEyeCenter.y+pose.eyePositionY/Math.PI*eyeSize);
		nearEyeHighlight.setAttribute('cy',nearEyeCenter.y-eyeSize/4+pose.eyePositionY/Math.PI*eyeSize);
		nearEyePupil.setAttribute('r',eyeSize/4);
		nearEyeIris.setAttribute('r',eyeSize/2);
		nearEyeHighlight.setAttribute('r',eyeSize/4);
		nearEyePupil.setAttribute('fill','black');
		nearEyeIris.setAttribute('fill',eyeColor);
		nearEyeHighlight.setAttribute('fill','white');
		var nearEyeLidsClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		nearEyeLidsClipPath.id = 'nearEyeLidsClipPath';
		defs.appendChild(nearEyeLidsClipPath);
		var nearEyeLids = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearEyeLidsClipPath.appendChild(nearEyeLids);
		var nearEyeLidsStroke = document.createElementNS('http://www.w3.org/2000/svg','path');
		nearEyeGroup.appendChild(nearEyeLidsStroke);
		nearEyeLidsStroke.setAttribute('stroke','black');
		nearEyeLidsStroke.setAttribute('stroke-width',1);
		nearEyeLidsStroke.setAttribute('fill','none');
		d = 'M '+(nearEyeCenter.x+eyeSize)+','+nearEyeCenter.y+' ';
		d += 'C '+(nearEyeCenter.x+eyeSize)+','+ (nearEyeCenter.y+pose.nearEyeInnerLid*10/Math.PI) +' '+(nearEyeCenter.x-eyeSize)+','+ (nearEyeCenter.y+pose.nearEyeOuterLid*10/Math.PI) +' '+(nearEyeCenter.x-eyeSize)+','+nearEyeCenter.y+' ';
		d += 'C '+(nearEyeCenter.x-eyeSize)+','+ (nearEyeCenter.y+pose.nearEyeLowerLid*-10/Math.PI) +' '+(nearEyeCenter.x+eyeSize)+','+ (nearEyeCenter.y+pose.nearEyeLowerLid*-10/Math.PI) +' '+(nearEyeCenter.x+eyeSize)+','+nearEyeCenter.y+' ';
		nearEyeLids.setAttribute('d',d);
		nearEyeLidsStroke.setAttribute('d',d);
		nearEyeLids.setAttribute('transform','rotate('+(150*(this.bio('eyeTilt')-1))+' '+nearEyeCenter.x+' '+nearEyeCenter.y+')');
		nearEyeLidsStroke.setAttribute('transform','rotate('+(150*(this.bio('eyeTilt')-1))+' '+nearEyeCenter.x+' '+nearEyeCenter.y+')');
		nearEyeBall.setAttribute('clip-path','url(#nearEyeLidsClipPath)');
		
		var farEyeGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(farEyeGroup);
		var farEyeBack = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farEyeGroup.appendChild(farEyeBack);
		farEyeBack.setAttribute('cx',farEyeCenter.x);
		farEyeBack.setAttribute('cy',farEyeCenter.y);
		farEyeBack.setAttribute('r',eyeSize);
		var farEyeBall = document.createElementNS('http://www.w3.org/2000/svg','g');
		farEyeGroup.appendChild(farEyeBall);
		var farEye = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farEyeBall.appendChild(farEye);
		farEye.setAttribute('stroke','firebrick');
		farEye.setAttribute('stroke-width',2);
		farEye.setAttribute('fill','white');
		farEye.setAttribute('cx',headCenter.x+facing+eyeDistance);
		farEye.setAttribute('cy',headCenter.y+nodOffset);
		farEye.setAttribute('r',eyeSize);
		var farEyePupil = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var farEyeIris = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var farEyeHighlight = document.createElementNS('http://www.w3.org/2000/svg','circle');
		farEyeBall.appendChild(farEyeIris);
		farEyeBall.appendChild(farEyePupil);
		farEyeBall.appendChild(farEyeHighlight);
		farEyePupil.setAttribute('cx',farEyeCenter.x+pose.eyePositionX/Math.PI*eyeSize);
		farEyeIris.setAttribute('cx',farEyeCenter.x+pose.eyePositionX/Math.PI*eyeSize);
		farEyeHighlight.setAttribute('cx',farEyeCenter.x+eyeSize/4+pose.eyePositionX/Math.PI*eyeSize);
		farEyePupil.setAttribute('cy',farEyeCenter.y+pose.eyePositionY/Math.PI*eyeSize);
		farEyeIris.setAttribute('cy',farEyeCenter.y+pose.eyePositionY/Math.PI*eyeSize);
		farEyeHighlight.setAttribute('cy',farEyeCenter.y-eyeSize/4+pose.eyePositionY/Math.PI*eyeSize);
		farEyePupil.setAttribute('r',eyeSize/4);
		farEyeIris.setAttribute('r',eyeSize/2);
		farEyeHighlight.setAttribute('r',eyeSize/4);
		farEyePupil.setAttribute('fill','black');
		farEyeIris.setAttribute('fill',eyeColor);
		farEyeHighlight.setAttribute('fill','white');
		var farEyeLidsClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
		farEyeLidsClipPath.id = 'farEyeLidsClipPath';
		defs.appendChild(farEyeLidsClipPath);
		var farEyeLids = document.createElementNS('http://www.w3.org/2000/svg','path');
		farEyeLidsClipPath.appendChild(farEyeLids);
		var farEyeLidsStroke = document.createElementNS('http://www.w3.org/2000/svg','path');
		farEyeGroup.appendChild(farEyeLidsStroke);
		farEyeLidsStroke.setAttribute('stroke','black');
		farEyeLidsStroke.setAttribute('stroke-width',1);
		farEyeLidsStroke.setAttribute('fill','none');
		d = 'M '+(farEyeCenter.x-eyeSize)+','+farEyeCenter.y+' ';
		d += 'C '+(farEyeCenter.x-eyeSize)+','+ (farEyeCenter.y+pose.farEyeInnerLid*10/Math.PI) +' '+(farEyeCenter.x+eyeSize)+','+ (farEyeCenter.y+pose.farEyeOuterLid*10/Math.PI) +' '+(farEyeCenter.x+eyeSize)+','+farEyeCenter.y+' ';
		d += 'C '+(farEyeCenter.x+eyeSize)+','+ (farEyeCenter.y+pose.farEyeLowerLid*-10/Math.PI) +' '+(farEyeCenter.x-eyeSize)+','+ (farEyeCenter.y+pose.farEyeLowerLid*-10/Math.PI) +' '+(farEyeCenter.x-eyeSize)+','+farEyeCenter.y+' ';
		farEyeLids.setAttribute('d',d);
		farEyeLidsStroke.setAttribute('d',d);
		farEyeLids.setAttribute('transform','rotate('+(-150*(this.bio('eyeTilt')-1))+' '+farEyeCenter.x+' '+farEyeCenter.y+')');
		farEyeLidsStroke.setAttribute('transform','rotate('+(-150*(this.bio('eyeTilt')-1))+' '+farEyeCenter.x+' '+farEyeCenter.y+')');
		farEyeBall.setAttribute('clip-path','url(#farEyeLidsClipPath)');
		
		var lips = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(lips);
		lips.setAttribute('fill',lipColor);
		if (this.bio('lipSize') > 1) {
			lips.setAttribute('stroke','black');
			lips.setAttribute('stroke-width',1);
			lips.setAttribute('stroke-linecap','round');
		};
		x = topOfMouth.x;
		y = topOfMouth.y-lipSize*0.5;
		d = 'M '+x+','+y+' ';
		dc1x = mouthPurse/2;
		dc1y = -1 * lipSize;
		dx = mouthPurse*(1+mouthSmile) + lipSize*0.25;
		dy = mouthSmile*mouthHeight*-0.5;
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse * mouthSmile * -1;
		dy = mouthHeight*(1+mouthSmile) + lipSize;
		dc2x = dx + Math.abs(mouthGrimace);
		dc2y = dy - mouthGrimace;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = -1 * Math.abs(mouthGrimace);
		dc1y = mouthGrimace + lipSize;
		dx = mouthPurse * -2 - lipSize*0.5;
		dy = 0;
		dc2x = dx + Math.abs(mouthGrimace);
		dc2y = dy + mouthGrimace + lipSize;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = -1 * Math.abs(mouthGrimace);
		dc1y = mouthGrimace * -1;
		dx = mouthPurse * mouthSmile * -1;
		dy = mouthHeight * -1 * (1+mouthSmile) - lipSize;
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse*(1+mouthSmile) + lipSize*0.25;
		dy = mouthSmile*mouthHeight*0.5;
		dc2x = dx - mouthPurse/2;
		dc2y = dy - lipSize;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		lips.setAttribute('d',d);

		var mouth = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(mouth);
		mouth.setAttribute('stroke','black');
		mouth.setAttribute('stroke-width',1);
		mouth.setAttribute('stroke-linecap','round');
		mouth.setAttribute('fill',mouthColor);
		x = topOfMouth.x;
		y = topOfMouth.y;
		d = 'M '+x+','+y+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse*(1+mouthSmile);
		dy = mouthSmile*mouthHeight*-0.5;
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse * mouthSmile * -1;
		dy = mouthHeight*(1+mouthSmile);
		dc2x = dx + Math.abs(mouthGrimace);
		dc2y = dy - mouthGrimace;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = -1 * Math.abs(mouthGrimace);
		dc1y = mouthGrimace;
		dx = mouthPurse * -2;
		dy = 0;
		dc2x = dx + Math.abs(mouthGrimace);
		dc2y = dy + mouthGrimace;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = -1 * Math.abs(mouthGrimace);
		dc1y = mouthGrimace * -1;
		dx = mouthPurse * mouthSmile * -1;
		dy = mouthHeight * -1 * (1+mouthSmile);
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		dc1x = mouthPurse/2;
		dc1y = 0;
		dx = mouthPurse*(1+mouthSmile);
		dy = mouthSmile*mouthHeight*0.5;
		dc2x = dx - mouthPurse/2;
		dc2y = dy;
		d += 'c '+dc1x+','+dc1y+' '+dc2x+','+dc2y+' '+dx+','+dy+' ';
		mouth.setAttribute('d',d);
		
		// Lip Highlights (needs complementary shadow)
// 		if (this.bio('lipSize') > 1) {
// 			var nearLipHighlight = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
// 			headGroup.appendChild(nearLipHighlight);
// 			nearLipHighlight.setAttribute('cx',topOfMouth.x+mouthPurse*0.5+facing/10);
// 			nearLipHighlight.setAttribute('cy',topOfMouth.y+mouthHeight+lipSize*0.5+mouthGrimace*0.5+mouthSmile);
// 			nearLipHighlight.setAttribute('rx',mouthPurse*0.2);
// 			nearLipHighlight.setAttribute('ry',lipSize*0.2);
// 			nearLipHighlight.setAttribute('fill','white');
// 			nearLipHighlight.setAttribute('stroke','none');
// 			nearLipHighlight.setAttribute('opacity','0.3');
// 		
// 			var farLipHighlight = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
// 			headGroup.appendChild(farLipHighlight);
// 			farLipHighlight.setAttribute('cx',topOfMouth.x-mouthPurse*0.5+facing/10);
// 			farLipHighlight.setAttribute('cy',topOfMouth.y+mouthHeight+lipSize*0.5+mouthGrimace*0.5+mouthSmile);
// 			farLipHighlight.setAttribute('rx',mouthPurse*0.2);
// 			farLipHighlight.setAttribute('ry',lipSize*0.2);
// 			farLipHighlight.setAttribute('fill','white');
// 			farLipHighlight.setAttribute('stroke','none');
// 			farLipHighlight.setAttribute('opacity','0.3');
// 		};
				
		var noseGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		headGroup.appendChild(noseGroup);
		var nosePoint = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseGroup.appendChild(nosePoint);
		nosePoint.setAttribute('stroke','black');
		nosePoint.setAttribute('stroke-width',2);
		nosePoint.setAttribute('stroke-linecap','round');
		nosePoint.setAttribute('fill','none');
		var noseFront = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseGroup.appendChild(noseFront);
// 		noseFront.setAttribute('fill','green');
		x = noseCenter.x;
		y = noseCenter.y+noseWidth;
		d = 'M '+x+','+y+' ';
		pointD = 'M '+x+','+y+' ';
		c1x = x + 0.75*noseWidth*noseFacing;
		c1y = y;
		x = noseCenter.x + noseWidth*noseFacing;
		y = noseCenter.y;
		c2x = x;
		c2y = y+0.75*noseWidth;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		pointD += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		var tipX = x;
		var tipY = y;
		c1x = x;
		c1y = y-0.5522847*noseWidth;
		x = noseBridge.x+noseWidth*noseFacing;
		y = noseBridge.y;
		c2x = x;
		c2y = y+headHeight/12;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		pc1x = x;
		pc1y = y;
		var weight = Math.min(Math.max(this.biometrics.noseLength+5,0),11);
		px = (x*weight+tipX*(11-weight))/11;
		py = (y*weight+tipY*(11-weight))/11;
		pc2x = px;
		pc2y = py;
		pointD += 'C' + pc1x + "," + pc1y + " " + pc2x + "," + pc2y + " " + px + "," + py + " ";
		c1x = x+noseWidth*noseFacing;
		c1y = y-noseWidth*3;
		x = noseBridge.x-noseWidth*noseFacing;
		y = noseBridge.y;
		c2x = x-noseWidth*noseFacing;
		c2y = y-noseWidth*3;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = x;
		c1y = y;
		x = noseCenter.x-noseWidth*noseFacing;
		y = noseCenter.y;
		c2x = x;
		c2y = y;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = x;
		c1y = y+0.5522847*noseWidth;
		x = noseCenter.x;
		y = noseCenter.y+noseWidth;
		c2x = x-0.5522847*noseWidth*noseFacing;
		c2y = y;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		noseFront.setAttribute('d',d);
		nosePoint.setAttribute('d',pointD);
		
		var noseAla = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseGroup.appendChild(noseAla);
		noseAla.setAttribute('stroke','black');
		noseAla.setAttribute('stroke-width',1);
		noseAla.setAttribute('stroke-linecap','round');
		noseAla.setAttribute('fill','none');
		x = headCenter.x+facing*0.9;
		y = noseCenter.y;
		d = 'M '+x+','+y+' C '+(x-noseFacing*noseWidth*0.3)+','+y+' '+(x-noseFacing*noseWidth*0.6)+','+(y+noseWidth)+' '+(x)+','+(y+noseWidth);
		noseAla.setAttribute('d',d);
		
		var nostril = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseGroup.appendChild(nostril);
		nostril.setAttribute('stroke','black');
		nostril.setAttribute('stroke-width',1);
		nostril.setAttribute('stroke-linecap','round');
		nostril.setAttribute('fill','none');
		var nostrilLift = Math.min(2,-1 * pose.headNod + Math.PI/6);
		x = headCenter.x+facing;
		y = noseCenter.y+noseWidth*0.6;
		d = 'M '+x+','+y+' ';
		d += 'C '+x+','+(y-nostrilLift*3)+' '+(noseCenter.x-noseFacing)+','+(y-nostrilLift)+' '+(noseCenter.x-noseFacing)+','+y+' ';
		nostril.setAttribute('d',d);
				
		var noseShadow = document.createElementNS('http://www.w3.org/2000/svg','path');
		noseShadow.setAttribute('fill','black');
		noseShadow.setAttribute('opacity',0.2);
		noseShadow.setAttribute('stroke','none');
		noseGroup.appendChild(noseShadow);
		x = noseCenter.x + noseWidth*noseFacing;
		y = noseCenter.y;
		var control = 0.03 * headHeight * this.bio('noseWidth');
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y+control;
		x = headCenter.x+facing*0.8;
		y = y;
		c2x = x;
		c2y = y+control;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		c1x = x;
		c1y = y+control*5;
		x = noseCenter.x + noseWidth*noseFacing;
		y = y;
		c2x = x;
		c2y = y+control*5;
		d += 'C' + c1x + "," + c1y + " " + c2x + "," + c2y + " " + x + "," + y + " ";
		noseShadow.setAttribute('d',d);
		noseShadow.setAttribute('transform','rotate('+(-1*headTilt)+' '+(x+headCenter.x+facing)/2+' '+noseCenter.y+')');
		
		var nearEyebrowArch = 3 * pose.nearEyebrowArch / Math.PI;
		var farEyebrowArch = 3 * pose.farEyebrowArch / Math.PI;

		var nearEyebrowBack = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(nearEyebrowBack);
		x = nearEyeCenter.x-eyeSize*1.2;
		y = nearTemple.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + nearEyebrowArch;
		x = nearEyeCenter.x+eyeSize*0.8;
		y = nearTemple.y;
		c2x = x - browSize;
		c2y = y + nearEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - browSize;
		c1y = y - headHeight/8;
		x = nearEyeCenter.x-eyeSize*1.2;
		y = nearTemple.y;
		c2x = x;
		c2y = y - headHeight/8;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		nearEyebrowBack.setAttribute('d',d);
		
		var nearEyebrow = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(nearEyebrow);
		nearEyebrow.setAttribute('fill',hairColor);
		nearEyebrow.setAttribute('stroke','black');
		nearEyebrow.setAttribute('stroke-width',1);
		x = nearEyeCenter.x-eyeSize*1.2;
		y = nearTemple.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + nearEyebrowArch;
		x = nearEyeCenter.x+eyeSize*0.8;
		y = nearTemple.y;
		c2x = x - browSize;
		c2y = y + nearEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + browSize;
		c1y = y - nearEyebrowArch;
		x = nearEyeCenter.x+eyeSize*0.8;
		y = nearTemple.y - browSize;
		c2x = x + browSize;
		c2y = y - nearEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - browSize;
		c1y = y + nearEyebrowArch;
		x = nearEyeCenter.x-eyeSize*1.2;
		y = nearTemple.y;
		c2x = x;
		c2y = y + nearEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		nearEyebrow.setAttribute('d',d);
				
		var farEyebrowBack = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(farEyebrowBack);
		x = farEyeCenter.x+eyeSize*1.2;
		y = farTemple.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + farEyebrowArch;
		x = farEyeCenter.x-eyeSize*0.8;
		y = farTemple.y;
		c2x = x + browSize;
		c2y = y + farEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + browSize;
		c1y = y - headHeight/8;
		x = farEyeCenter.x+eyeSize*1.2;
		y = farTemple.y;
		c2x = x;
		c2y = y - headHeight/8;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		farEyebrowBack.setAttribute('d',d);
		
		var farEyebrow = document.createElementNS('http://www.w3.org/2000/svg','path');
		headGroup.appendChild(farEyebrow);
		farEyebrow.setAttribute('fill',hairColor);
		farEyebrow.setAttribute('stroke','black');
		farEyebrow.setAttribute('stroke-width',1);
		x = farEyeCenter.x+eyeSize*1.2;
		y = farTemple.y;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y + farEyebrowArch;
		x = farEyeCenter.x-eyeSize*0.8;
		y = farTemple.y;
		c2x = x + browSize;
		c2y = y + farEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - browSize;
		c1y = y - farEyebrowArch;
		x = farEyeCenter.x-eyeSize*0.8;
		y = farTemple.y - browSize;
		c2x = x - browSize;
		c2y = y - farEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + browSize;
		c1y = y + farEyebrowArch;
		x = farEyeCenter.x+eyeSize*1.2;
		y = farTemple.y;
		c2x = x;
		c2y = y + farEyebrowArch;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		farEyebrow.setAttribute('d',d);
		
				
		// Face Guides
// 		var faceGuides = document.createElementNS('http://www.w3.org/2000/svg','g');
// 		headGroup.appendChild(faceGuides);
// 		faceGuides.setAttribute('stroke','black');
// 		faceGuides.setAttribute('stroke-width',0.05);
// 		faceGuides.setAttribute('fill','none');
// 		var verticalGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		faceGuides.appendChild(verticalGuide);
// 		facing = headWidth/3;
// 		if (!upperBodyAngle) {
// 			facing *= -1;
// 		};
// 		d = 'M '+headCenter.x+','+(headCenter.y-headHeight/2)+' ';
// 		d += 'C '+(headCenter.x+facing)+','+(headCenter.y-headHeight/2)+' '+(headCenter.x+facing)+','+(headCenter.y+headHeight/2)+' '+' '+(headCenter.x)+','+(headCenter.y+headHeight/2);
// 		verticalGuide.setAttribute('d',d);
// 		var middleGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		faceGuides.appendChild(middleGuide);
// 		var nearFacing, farFacing;
// 		var facing = 10*pose.headNod/Math.PI;
// 		if (upperBodyAngle) {
// 			nearFacing = facing;
// 			farFacing  = 2*facing;
// 		} else {
// 			nearFacing = 2*facing;
// 			farFacing  = facing;
// 		};
// 		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y)+' ';
// 		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y);
// 		middleGuide.setAttribute('d',d);
// 		var noseGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		faceGuides.appendChild(noseGuide);
// 		var facing = 10*pose.headNod/Math.PI;
// 		if (!upperBodyAngle) {
// 			facing *= -1;
// 		};
// 		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/4)+' ';
// 		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/4+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/4+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/4);
// 		noseGuide.setAttribute('d',d);
// 		var mouthGuide = document.createElementNS('http://www.w3.org/2000/svg','path');
// 		faceGuides.appendChild(mouthGuide);
// 		var facing = 10*pose.headNod/Math.PI;
// 		if (!upperBodyAngle) {
// 			facing *= -1;
// 		};
// 		d = 'M '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/3)+' ';
// 		d += 'C '+(headCenter.x+headWidth/2)+','+(headCenter.y + headHeight/3+farFacing)+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/3+nearFacing)+' '+' '+(headCenter.x-headWidth/2)+','+(headCenter.y + headHeight/3);
// 		mouthGuide.setAttribute('d',d);

		var hairlineHeight = (this.biometrics.hairlineHeight+10)/20 * (headCenter.y - headHeight/2 - (farTemple.y + nearTemple.y)/2);
		var hairlinePeak = this.bio('hairlinePeak')*5;
		var nearScalpTemple = {
			x: nearTemple.x,
			y: headCenter.y-headHeight/2-hairlineHeight,
		};
		var farScalpTemple = {
			x: farTemple.x,
			y: headCenter.y-headHeight/2-hairlineHeight,
		};
		var scalpTop = {
			x: headCenter.x-headWidth*0.1,
			y: headCenter.y-headHeight*0.8,
		};
				
		var hair = document.createElementNS('http://www.w3.org/2000/svg','g');
		hair.id = 'hair';
		hair.setAttribute('fill',hairColor);
		hair.setAttribute('transform','translate('+headSlide+',0) rotate('+headTilt+','+headCenter.x+','+headCenter.y+')');
		var scalpHairline = document.createElementNS('http://www.w3.org/2000/svg','path');
		hair.appendChild(scalpHairline);
		x = scalpTop.x;
		y = scalpTop.y;
		d = 'M '+x+','+y+' ';
		c1x = x - headWidth*0.5*0.55;
		c1y = y;
		x = nearScalpTemple.x;
		y = nearScalpTemple.y;
		c2x = x;
		c2y = y+hairlineHeight/2;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = (nearTemple.x+farTemple.x)/2;
		y = headCenter.y-headHeight/2-hairlineHeight-headHeight*0.05;
		c2x = x - headWidth/10;
		c2y = y-hairlinePeak;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x + headWidth/10;
		c1y = y-hairlinePeak;
		x = farScalpTemple.x;
		y = farScalpTemple.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y+hairlineHeight/2;
		x = scalpTop.x;
		y = scalpTop.y;
		c2x = x + headWidth*0.5*0.55;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		d += 'z';
		scalpHairline.setAttribute('d',d);
		scalpHairline.setAttribute('clip-path','url(#skullPath)');
		var scalpSide = document.createElementNS('http://www.w3.org/2000/svg','path');
		hair.appendChild(scalpSide);
		var sideEar, sideTemple;
		if (facing > 0) {
			sideEar = nearEarCenter;
			sideTemple = nearScalpTemple;
		} else {
			sideEar = farEarCenter;
			sideTemple = farScalpTemple;
		};
		x = sideEar.x;
		y = sideEar.y+headHeight/8;
		d = 'M '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = sideTemple.x;
		y = sideTemple.y;
		c2x = x - facing*0.8;
		c2y = y + headHeight*0.1;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x;
		c1y = y;
		x = scalpTop.x;
		y = scalpTop.y;
		c2x = x;
		c2y = y;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		c1x = x - facing*2;
		c1y = y;
		x = sideEar.x;
		y = sideEar.y+headHeight/8;
		c2x = x-facing*3;
		c2y = y-headHeight/2;
		d += 'C '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y+' ';
		scalpSide.setAttribute('d',d);
		scalpSide.setAttribute('clip-path','url(#skullPath)');

		
		var neck = document.createElementNS('http://www.w3.org/2000/svg','g');
		neck.id = 'neck';
		neck.setAttribute('fill',skinTone);
		neck.setAttribute('stroke','inherit');
		var neckPath = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		neck.appendChild(neckPath);
		var neckWidth = this.bio('neckWidth')*1.4;
		var neckPoints = [
			{x:neckWidth*neckBase.x + nearShoulder.x*(1-neckWidth),y:neckWidth*neckBase.y + nearShoulder.y*(1-neckWidth) - neckHeight/2},
			{x:headCenter.x+headSlide,y:headCenter.y},
			{x:neckWidth*neckBase.x + farShoulder.x*(1-neckWidth),y:neckWidth*neckBase.y + farShoulder.y*(1-neckWidth) - neckHeight/2},
		];
		var neckPointsString = '';
		for (var i in neckPoints) {
			neckPointsString += neckPoints[i].x + ',' + neckPoints[i].y + ' ';
		};
		neckPath.setAttribute('points',neckPointsString);

		// Order the Stack
		
		var lapSizedBreasts = Math.max(nearBreastCenter.y + breastSize,farBreastCenter.y + breastSize) > Math.min(nearHip.y - this.bio('hipsWidth') * 30,farHip.y - this.bio('hipsWidth') * 30);
		var bigBelly = farBellyBottom.y > farHaunch.y + haunchWidth || nearBellyBottom.y > nearHaunch.y + haunchWidth;
		
		var bodyParts = [hairBack,shoulders];
		
		if (lowerBodyAngle) {
			bodyParts = bodyParts.concat([butt,farFoot,farCalf,farThigh]);
		} else {
			bodyParts = bodyParts.concat([butt,nearFoot,nearCalf,nearThigh]);
		};
		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([farElbowJoint,farUpperArm,farLowerArm]);
		} else {
			bodyParts = bodyParts.concat([nearElbowJoint,nearUpperArm,nearLowerArm]);
		};
		
		torso.appendChild(belly);
		bodyParts = bodyParts.concat([torso,genitals,phallus]);
		
		bodyParts = bodyParts.concat([neck,headGroup,hair]);

		if (!lapSizedBreasts && upperBodyAngle) {
			bodyParts = bodyParts.concat([farBreast,nearBreast]);
		} else if (!lapSizedBreasts) {
			bodyParts = bodyParts.concat([nearBreast,farBreast]);
		};
		
		if (lowerBodyAngle) {
			bodyParts = bodyParts.concat([nearFoot,nearCalf,nearThigh]);
		} else {
			bodyParts = bodyParts.concat([farFoot,farCalf,farThigh]);
		};
		
		if (lapSizedBreasts  && upperBodyAngle) {
			bodyParts = bodyParts.concat([farBreast,nearBreast]);
		} else if (lapSizedBreasts) {
			bodyParts = bodyParts.concat([nearBreast,farBreast]);
		};
		
		if (upperBodyAngle) {
			bodyParts = bodyParts.concat([nearElbowJoint,nearUpperArm,nearLowerArm]);
		} else {
			bodyParts = bodyParts.concat([farElbowJoint,farUpperArm,farLowerArm]);
		};
		
		if (bigBelly  && upperBodyAngle) {
			bodyParts = bodyParts.concat([belly,farBreast,nearBreast]);
		} else if (bigBelly) {
			bodyParts = bodyParts.concat([belly,nearBreast,farBreast]);
		};

		// Special Render Order Goes Here (for hands behind back or similar exceptions)

		for (var i of bodyParts) {
			if (i.id !== '') {
				var stroke = document.createElementNS('http://www.w3.org/2000/svg','use');
				var hrefString = '#'+i.id;
				stroke.setAttribute('href',hrefString);
				stroke.setAttribute('stroke','black');
				stroke.setAttribute('stroke-width',3);
				svg.appendChild(stroke);
			};
			svg.appendChild(i);
		};
		
		var shots = document.createElementNS('http://www.w3.org/2000/svg','g');
		svg.appendChild(shots);
		var headShot = document.createElementNS('http://www.w3.org/2000/svg','rect');
		headShot.id = 'headShot';
		var headShotSize = totalHeight * 0.3;
		headShot.setAttribute('x',headCenter.x - headShotSize/2);
		headShot.setAttribute('y',headCenter.y - headShotSize/2);
		headShot.setAttribute('width',headShotSize);
		headShot.setAttribute('height',headShotSize);
		headShot.setAttribute('fill','none');
		headShot.setAttribute('stroke','none');
		shots.appendChild(headShot);
		var moneyShot = document.createElementNS('http://www.w3.org/2000/svg','rect');
		moneyShot.id = 'moneyShot';
		var headShotSize = totalHeight * 0.3;
		moneyShot.setAttribute('x',genitalsBottom.x - 100);
		moneyShot.setAttribute('y',genitalsBottom.y - 100);
		moneyShot.setAttribute('width',200);
		moneyShot.setAttribute('height',200);
		moneyShot.setAttribute('fill','none');
		shots.appendChild(moneyShot);
										
		return svg;
	};
};