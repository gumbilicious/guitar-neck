var can2 = function(cb){
	cb.setup = function(){
		cb.createCanvas(200,200);
		cb.background(200);
	}
	
	cb.draw = function(){
		cb.background(200);
		cb.ellipse(cb.mouseX,cb.mouseY,10,10);
	}
}