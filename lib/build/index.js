"use strict";
var isScrolling;
var Graph2D = /** @class */ (function () {
    function Graph2D(config) {
        var _this = this;
        this.handleScroll = function (e) {
            if (!_this.isZooming) {
                _this.isZooming = true;
                _this.setZoomStartOrigin();
            }
            _this.resetZoomParamsWhenScrollFinished();
            var xp = e.offsetX - _this.pos.x;
            var yp = e.offsetY - _this.pos.y;
            if (!_this.isPtWithinGraph(xp, yp)) {
                return;
            }
            if (e.deltaY >= 0) {
                _this.zoomOnScroll("in", xp, yp);
            }
            else {
                _this.zoomOnScroll("out", xp, yp);
            }
        };
        this.setZoomStartOrigin = function () {
            _this.zoomStartOriginX = _this.origin.x;
            _this.zoomStartOriginY = _this.origin.y;
        };
        this.resetZoomParamsWhenScrollFinished = function () {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(function () {
                _this.isZooming = false;
                _this.unitX0 = _this.unitX;
                _this.unitY0 = _this.unitY;
            }, 100);
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
        // Additional properties that are not accepted from user
        this.isZooming = false;
        this.zoomStartOriginX = originX;
        this.zoomStartOriginY = originY;
        this.unitX0 = unitX;
        this.unitY0 = unitY;
        this.isZoomEnabled = false;
        //@ts-ignore
        _curElement.mouseWheel(this.handleScroll);
    }
    /**
     * Draws the graph bounding box with axes
     */
    Graph2D.prototype.display = function () {
        push();
        translate(this.pos.x, this.pos.y);
        this.drawBoundingRect();
        this.drawAxes();
        pop();
    };
    /**
     * Draws the main grid in the graph
     */
    Graph2D.prototype.drawMainGrid = function () {
        push();
        stroke(this.mainGridColor);
        strokeWeight(this.mainGridStrokeWight);
        translate(this.pos.x, this.pos.y);
        this.drawMainVerticalGridLines();
        this.drawMainHorizontalGridLines();
        pop();
    };
    /**
     * To activate the pan feature in the graph
     * Call inside draw loop
     */
    Graph2D.prototype.pan = function () {
        if (mouseIsPressed && this.isPtWithinGraph(mouseX, mouseY)) {
            this.origin.x += mouseX - pmouseX;
            this.origin.y += mouseY - pmouseY;
        }
    };
    Graph2D.prototype.zoom = function () {
        this.isZoomEnabled = true;
    };
    /**
     *
     * @param mode Zoom in or out
     * @param xp x coordinate of pivot point
     * @param yp y coordinate of pivot point
     */
    Graph2D.prototype.zoomOnScroll = function (mode, xp, yp) {
        if (!this.isZoomEnabled) {
            return;
        }
        var scaleRate = 1;
        if (mode === "in") {
            scaleRate = 1.05;
        }
        else if (mode === "out") {
            scaleRate = 0.95;
        }
        this.unitX *= scaleRate;
        this.unitY *= scaleRate;
        var scaleX = this.unitX / this.unitX0;
        var scaleY = this.unitY / this.unitY0;
        /**
         * Logic for scaling
         *
         * The coordinates of origin is changed wrt zooming
         * New origin coordinate = Pivot coordinate + Initial origin coordinate * scaleFactor
         */
        this.origin.x = xp - (xp - this.zoomStartOriginX) * scaleX;
        this.origin.y = yp - (yp - this.zoomStartOriginY) * scaleY;
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
