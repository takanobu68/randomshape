const shapeArry = [];

function setup() {
	createCanvas(1000, 850);
	colorMode(HSB)

	for (let i = 0; i < 100; i++) {
		const arry = [
			new Ball(width, height),
			new Square(width, height),
			new CornerSquare(width, height)
		]
		shapeArry[i] = arry;
	}
}

function draw() {
	background('#fff')

	shapeArry.forEach(inArry => {
		inArry.forEach(shape => {
			shape.update();
			shape.render();
		})
	})
}

class Move {
	constructor(w, h) {
		this.vecLocation = createVector(random(0, w), random(0, h))
		this.vecVelocity = createVector(random(1, 5), random(2, 8));
		this.vecAccel = createVector(0, 0.5);
	}

	update() {
		this.vecVelocity.add(this.vecAccel);
		this.vecLocation.add(this.vecVelocity);

		if (this.vecLocation.x > width || this.vecLocation.x < 0) {
			this.vecVelocity.x *= -1;
		}

		if (this.vecLocation.y > height || this.vecLocation.y < 0) {
			this.vecVelocity.y *= -1;
		}
	}
}

class Ball extends Move {
	constructor() {
		super();
		this.size = random(10, 150);
		this.color = random(0, 360);
	}

	render() {
		noStroke();
		fill(this.color, 100, 100, 1);
		ellipse(this.vecLocation.x, this.vecLocation.y, this.size);
	}
}

class Square extends Move {
	constructor() {
		super();
		this.size = random(10, 60);
		this.color = random(0, 360);
		this.strokeColor = random(0, 360)
	}

	render() {
		stroke(this.strokeColor, 100, 100, 1)
		fill(this.color, 100, 100, 1);
		rect(this.vecLocation.x, this.vecLocation.y, this.size, this.size);
	}
}

class CornerSquare extends Move {
	constructor() {
		super();
		this.size = random(20, 100);
		this.corner = random(5, 20)
		this.color = random(0, 360);
		this.strokeColor = random(0, 360)
	}

	render() {
		stroke(this.strokeColor, 100, 100, 1)
		fill(this.color, 100, 100, 1);
		square(this.vecLocation.x, this.vecLocation.y, this.size, this.corner);
	}
}
