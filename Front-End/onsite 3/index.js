let myCanvas = document.querySelector("#myCanvas");
let cx = myCanvas.getContext('2d')
let randomPoints = []
let colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

var config = {
	canvas:{
		width:myCanvas.width,
		height:myCanvas.height,
		topL:{
			x:myCanvas.offsetLeft,
			y:myCanvas.offsetTop
		},
		topR:{
			x:myCanvas.offsetLeft + myCanvas.width ,
			y:myCanvas.offsetTop
		},
				bottomL:{
			x:myCanvas.offsetLeft,
			y:myCanvas.offsetTop + myCanvas.height,
		},
				bottomR:{
			x:myCanvas.offsetLeft + myCanvas.width,
			y:myCanvas.offsetTop + myCanvas.height
		}
	},
	point:{
		max:127,
		min:20,
		height:1,
		width:1,
	}
};

(function populateRandomPoints(){
	let randVal = Math.floor(Math.random()*config.point.max + config.point.min)
	for(let i = 0; i<randVal; ++i){
		let pointX = Math.floor(Math.random()*(config.canvas.width))
		let pointY = Math.floor(Math.random()*(config.canvas.height))
		let index = Math.floor(Math.random()*(colors.length))
		let color = colors[index]
		randomPoints.push({
		x:pointX,
		y:pointY,
		color:color,
	})
	}
})();

(function plotRandomPoints(){
	randomPoints.forEach( point => {
		cx.beginPath()
		cx.save()
		cx.fillStyle = point.color
		cx.fillRect(point.x,point.y,config.point.height,config.point.width)
		cx.restore()
		cx.closePath()
	})
})();

function fillAPixel(x,y,color){
	cx.beginPath()
	cx.save()
	cx.fillStyle = color
	cx.fillRect(x,y,1,1)
	cx.restore()
	cx.closePath()
};

function loop(){
	for(var i = 0;i<config.canvas.width;++i){
		for(var j = 0;j<config.canvas.height;++j){
			let leastDistantPoint,index;
			let distArr = []
			randomPoints.forEach((point,index,arr) => {
				let diffX = point.x - i;
				let diffY = point.y - j ;
				let calcDistance = Math.sqrt(diffX*diffX + diffY*diffY)
				distArr.push(calcDistance)
			})
			index = distArr.indexOf(Math.min(...distArr))
			leastDistantPoint = randomPoints[index]
			fillAPixel(i,j,leastDistantPoint.color)
		}
	}
}
loop()
