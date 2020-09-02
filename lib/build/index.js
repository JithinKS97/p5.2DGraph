"use strict";
var Graph2D = /** @class */ (function () {
    function Graph2D(config) {
        var _this = this;
        this.handlemouseWheel = function (e) {
            _this.zoom(e.offsetX, e.offsetY);
        };
        this.isPtWithinGraph = function (x, y) {
            return _this.isXWithinGraph(x - _this.pos.x) && _this.isYWithinGraph(y - _this.pos.y);
        };
        var basicConfig = config.basicConfig, colorConfig = config.colorConfig, strokeWeightConfig = config.strokeWeightConfig;
        var x = basicConfig.x, y = basicConfig.y, w = basicConfig.w, h = basicConfig.h, originX = basicConfig.originX, originY = basicConfig.originY, unitX = basicConfig.unitX, unitY = basicConfig.unitY;
        var axisColor = colorConfig.axis, backgroundColor = colorConfig.background, boundaryColor = colorConfig.boundary, mainGridColor = colorConfig.mainGrid;
        var axisStrokeWeight = strokeWeightConfig.axis, boundaryStrokeWeight = strokeWeightConfig.boundary, mainGridStrokeWeight = strokeWeightConfig.mainGrid;
        this.origin = createVector();
        this.pos = createVector();
        this.w = w;
        this.h = h;
        this.unitX = unitX;
        this.unitY = unitY;
        this.origin.set(originX, originY);
        this.pos.set(x, y);
        this.axisColor = axisColor;
        this.backgroundColor = backgroundColor;
        this.boundaryColor = boundaryColor;
        this.mainGridColor = mainGridColor;
        this.axisStrokeWeight = axisStrokeWeight;
        this.boundaryStrokeWeight = boundaryStrokeWeight;
        this.mainGridStrokeWight = mainGridStrokeWeight;
        //@ts-ignore
        _curElement.mouseWheel(this.handlemouseWheel);
    }
    Graph2D.prototype.zoom = function (x, y) {
        if (this.isXWithinGraph(x) && this.isYWithinGraph(y)) {
            // Think of the mathematics required for zoom???
        }
    };
    Graph2D.prototype.display = function () {
        push();
        translate(this.pos.x, this.pos.y);
        this.drawBoundingRect();
        this.drawAxes();
        pop();
    };
    Graph2D.prototype.drawMainGrid = function () {
        push();
        stroke(this.mainGridColor);
        strokeWeight(this.mainGridStrokeWight);
        translate(this.pos.x, this.pos.y);
        this.drawMainVerticalGridLines();
        this.drawMainHorizontalGridLines();
        pop();
    };
    Graph2D.prototype.pan = function () {
        if (mouseIsPressed && this.isPtWithinGraph(mouseX, mouseY)) {
            this.origin.x += mouseX - pmouseX;
            this.origin.y += mouseY - pmouseY;
        }
    };
    Graph2D.prototype.drawAxes = function () {
        stroke(this.axisColor);
        strokeWeight(this.axisStrokeWeight);
        this.drawVerticalGridLine(this.origin.x);
        this.drawHorizontalGridLine(this.origin.y);
    };
    Graph2D.prototype.drawBoundingRect = function () {
        fill(this.backgroundColor);
        strokeWeight(this.boundaryStrokeWeight);
        stroke(this.boundaryColor);
        rect(0, 0, this.w, this.h);
    };
    Graph2D.prototype.drawMainVerticalGridLines = function () {
        var xStart = this.origin.x + this.unitX;
        var xEnd = this.w;
        for (var x = xStart; x < xEnd; x += this.unitX) {
            this.drawVerticalGridLine(x);
        }
        xStart = this.origin.x;
        xEnd = 0;
        for (var x = xStart; x > xEnd; x -= this.unitX) {
            this.drawVerticalGridLine(x);
        }
    };
    Graph2D.prototype.drawMainHorizontalGridLines = function () {
        var yStart = this.origin.y + this.unitY;
        var yEnd = this.h;
        for (var y = yStart; y < yEnd; y += this.unitY) {
            this.drawHorizontalGridLine(y);
        }
        yStart = this.origin.y - this.unitY;
        yEnd = 0;
        for (var y = yStart; y > yEnd; y -= this.unitY) {
            this.drawHorizontalGridLine(y);
        }
    };
    Graph2D.prototype.drawVerticalGridLine = function (x) {
        if (this.isXWithinGraph(x)) {
            line(x, 0, x, this.h);
        }
    };
    Graph2D.prototype.drawHorizontalGridLine = function (y) {
        if (this.isYWithinGraph(y)) {
            line(0, y, this.w, y);
        }
    };
    Graph2D.prototype.isXWithinGraph = function (x) {
        return x < this.w && x > 0;
    };
    Graph2D.prototype.isYWithinGraph = function (y) {
        return y < this.h && y > 0;
    };
    return Graph2D;
}());
