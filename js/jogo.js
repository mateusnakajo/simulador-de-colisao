class ElasticBody {

	constructor(div, initialPosition, initialSpeed, width, height, mass) {
		this.div = div;
		this.position = initialPosition
		this.speed = initialSpeed;
		this.width = width;
		this.height = height;
		this.mass = mass;
	}

	move(delta) {
		this.position.x += this.speed.x * delta;
		this.position.y += this.speed.y * delta;
	}

	updateUI () {
		this.div.css({'left':this.position.x});
		this.div.css({'top':this.position.y});
	}

	contact(elasticBody) {
	    return !(
	        ((this.position.y + this.height) < (elasticBody.position.y)) ||
	        (this.position.y > (elasticBody.position.y + elasticBody.height)) ||
	        ((this.position.x + this.width) < elasticBody.position.x) ||
	        (this.position.x > (elasticBody.position.x + elasticBody.width))
	    );
	}

	collide (obstacle) {
		var aux = obstacle.speed.x; 
		obstacle.speed.x = (aux * (obstacle.mass - this.mass) + 2 * this.mass * this.speed.x) / (obstacle.mass + this.mass);
		this.speed.x = (this.speed.x * (this.mass - obstacle.mass) + 2 * obstacle.mass * aux) / (obstacle.mass + this.mass);

		aux =  obstacle.speed.y; 
		obstacle.speed.y = (aux * (obstacle.mass - this.mass) + 2 * this.mass * this.speed.y) / (obstacle.mass + this.mass);
		this.speed.y = (this.speed.y * (this.mass - obstacle.mass) + 2 * obstacle.mass * aux) / (obstacle.mass + this.mass);
	}

	collide_wall(document) {
		var top = this.position.y <= 0;
		var left = this.position.x <= 0;
		var right = this.position.x >= document.width()-this.height/2;
		var bottom = this.position.y >= document.height()-this.width/2;

		if(top || bottom) {
			this.speed.y = (-1) * this.speed.y; 
		}
		if(right || left){ 
			this.speed.x = (-1) * this.speed.x;
		}





	}
}



