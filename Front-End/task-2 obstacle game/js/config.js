var myCanvas = document.querySelector("#myCanvas")
var config = {
	deep:{
		x:200,
		y:260,
		width:0,
		height:0,
		radius:10,
		speed:0.47,
	},
	gameText:{
		score:{
			x:95,
			y:45
		},
		gameName:{
			x:myCanvas.width / 2,
			y:100
		},
		instruction:{
			x:myCanvas.width / 2,
			y:130
		},
		gameOver:{
			x:myCanvas.width / 2,
			y:150
		}
	},
	walls:{
		leftWall:{
			x:0,
			y:0,
			width:20,
			height:myCanvas.height
		},
		topWall:{
			x:0,
			y:0,
			width:myCanvas.width,
			height:20
		},
		bottomWall:{
			x:0,
			y:myCanvas.height - 20,
			width:myCanvas.width,
			height:20
		}
	},
	obstacle:{
		maxWidth:25,
		minWidth:15,
		speed:0.66,
	},
	frame:{
		maxFrameLimit:90,
		minFrameLimit:70,
	},
	enemy:{
		width:21,
		height:21,
		speed:0.66,
		forEvery:5,
		bulletSpeed:0.75
	},
	bullet:{
		width:20,
		height:7,
		speed:0.35
	},
	closeness:4,

}