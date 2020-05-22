const inversify = require("inversify");
require("reflect-metadata");
const Square = require("./square");
const Circle = require("./circle");
const TYPES = require("./types");

class ShapeFactory {
    constructor(square, circle) {
        this._square = square;
        this._circle = circle;
    }
    makeSquare() { return this._square.createSquare(); };
    makeCircle() { return this._circle.createCircle(); };
}

// Declare as injectable and its dependencies
inversify.decorate(inversify.injectable(), Square);
inversify.decorate(inversify.injectable(), Circle);
inversify.decorate(inversify.injectable(), ShapeFactory);
inversify.decorate(inversify.inject(TYPES.Square), ShapeFactory, 0);
inversify.decorate(inversify.inject(TYPES.Circle), ShapeFactory, 1);

// Declare bindings
const container = new inversify.Container();
container.bind(TYPES.ShapeFactory).to(ShapeFactory);
container.bind(TYPES.Square).to(Square);
container.bind(TYPES.Circle).to(Circle);

// Resolve dependencies
const shapeFactory = container.get(TYPES.ShapeFactory);
console.log(shapeFactory.makeCircle());
console.log(shapeFactory.makeSquare());