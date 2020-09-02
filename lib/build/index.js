"use strict";
var Graph2D = /** @class */ (function () {
    function Graph2D(_a) {
        var colorConfig = _a.colorConfig;
        this.colorConfig = colorConfig;
    }
    Graph2D.prototype.drawAxes = function () {
        stroke(this.colorConfig.axes);
        line(0, height / 2, width, height / 2);
        line(width / 2, 0, width / 2, height);
    };
    Graph2D.prototype.draw = function () {
        this.drawAxes();
    };
    return Graph2D;
}());
