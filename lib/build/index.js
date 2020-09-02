"use strict";
var Graph2D = /** @class */ (function () {
    function Graph2D(config) {
        var basicConfig = config.basicConfig, colorConfig = config.colorConfig, strokeWeightConfig = config.strokeWeightConfig;
        var x = basicConfig.x, y = basicConfig.y, w = basicConfig.w, h = basicConfig.h, originX = basicConfig.originX, originY = basicConfig.originY;
        var axisColor = colorConfig.axis, backgroundColor = colorConfig.background;
        var axisStrokeWeight = strokeWeightConfig.axis;
        this.origin = createVector();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.origin.set(originX, originY);
        this.axisColor = axisColor;
        this.backgroundColor = backgroundColor;
        this.axisStrokeWeight = axisStrokeWeight;
    }
    Graph2D.prototype.draw = function () {
        push();
        translate(this.x, this.y);
        this.drawRect();
        this.drawAxes();
        pop();
    };
    Graph2D.prototype.drawAxes = function () {
        stroke(this.axisColor);
        strokeWeight(this.axisStrokeWeight);
        line(0, this.origin.y, this.w, this.origin.y);
        line(this.origin.x, 0, this.origin.x, this.h);
    };
    Graph2D.prototype.drawRect = function () {
        fill(this.backgroundColor);
        rect(0, 0, this.w, this.h);
    };
    return Graph2D;
}());
