"use strict";
var Graph2D = /** @class */ (function () {
    function Graph2D(config) {
        var basicConfig = config.basicConfig, colorConfig = config.colorConfig, strokeWeightConfig = config.strokeWeightConfig;
        var x = basicConfig.x, y = basicConfig.y, w = basicConfig.w, h = basicConfig.h, originX = basicConfig.originX, originY = basicConfig.originY, unitX = basicConfig.unitX, unitY = basicConfig.unitY;
        var axisColor = colorConfig.axis, backgroundColor = colorConfig.background, boundaryColor = colorConfig.boundary, mainGridColor = colorConfig.mainGrid;
        var axisStrokeWeight = strokeWeightConfig.axis, boundaryStrokeWeight = strokeWeightConfig.boundary, mainGridStrokeWeight = strokeWeightConfig.mainGrid;
        this.origin = createVector();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.unitX = unitX;
        this.unitY = unitY;
        this.origin.set(originX, originY);
        this.axisColor = axisColor;
        this.backgroundColor = backgroundColor;
        this.boundaryColor = boundaryColor;
        this.mainGridColor = mainGridColor;
        this.axisStrokeWeight = axisStrokeWeight;
        this.boundaryStrokeWeight = boundaryStrokeWeight;
        this.mainGridStrokeWight = mainGridStrokeWeight;
    }
    Graph2D.prototype.display = function () {
        push();
        translate(this.x, this.y);
        this.drawBoundingRect();
        this.drawAxes();
        pop();
    };
    Graph2D.prototype.drawMainGrid = function () {
        push();
        stroke(this.mainGridColor);
        strokeWeight(this.mainGridStrokeWight);
        translate(this.x, this.y);
        this.drawMainVerticalGridLines();
        this.drawMainHorizontalGridLines();
        pop();
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
