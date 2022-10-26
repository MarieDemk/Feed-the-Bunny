class Ground {
    constructor (x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x,y,w,h, {isStatic: true})
        World.add(world, this.body)
    }
    display() {
        push();
        rectMode(CENTER);
        fill("green");
        rect(this.body.position.x,this.body.position.y,this.w,this.h);
        pop();
    }

}