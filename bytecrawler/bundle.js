/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//main.js
	//
	//Copyright Lucas Manning
	//

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mazeJs = __webpack_require__(1);

	var _mazeJs2 = _interopRequireDefault(_mazeJs);

	var _displayJs = __webpack_require__(3);

	var _displayJs2 = _interopRequireDefault(_displayJs);

	var canvas = document.getElementById('main');
	var solve_button = document.getElementById('solve');
	var gen_button = document.getElementById('generate');
	var tile_size = 10;
	var delay = 20;

	var myDisplay = new _displayJs2['default'](tile_size, canvas);

	var myMaze = new _mazeJs2['default'](tile_size, canvas.width, canvas.height, myDisplay);

	myMaze.gen_random();
	myDisplay.render(myMaze);

	solve_button.addEventListener('click', function () {
	    console.log('solving...');
	    myMaze.a_star_search(delay);
	});

	gen_button.addEventListener('click', function () {
	    console.log('generating...');
	    myMaze.gen_random();
	    myDisplay.render(myMaze);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//maze.js
	//
	//Copyright Lucas Manning
	//
	//

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _queueJs = __webpack_require__(2);

	var _queueJs2 = _interopRequireDefault(_queueJs);

	var Maze = (function () {
	    function Maze(tile_size, width, height, display) {
	        _classCallCheck(this, Maze);

	        this.tile_size = tile_size;
	        this.height = height;
	        this.width = width;
	        this.tiles = [];
	        this.start_tile = null;
	        this.end_tile = null;
	        this.searched = [];
	        this.display = display;
	    }

	    _createClass(Maze, [{
	        key: "reset",
	        value: function reset() {
	            this.tiles = [];
	            this.end_tile = null;
	            this.start_tile = null;
	            this.searched = [];
	        }
	    }, {
	        key: "gen_random",

	        // generate random maze
	        value: function gen_random() {
	            this.reset();
	            for (var y = 0; y < this.height / this.tile_size; y++) {
	                for (var x = 0; x < this.width / this.tile_size; x++) {
	                    var wall = Math.random() <= 0.25;
	                    var new_tile = {
	                        x: x,
	                        y: y,
	                        type: 0,
	                        parent: null,
	                        dist_cost: null
	                    };

	                    if (wall) {
	                        new_tile.type = 1;
	                    }
	                    this.tiles.push(new_tile);
	                }
	            }

	            this.start_tile = this.random_tile();
	            this.end_tile = this.random_tile();
	            while (this.manhattan_distance(this.start_tile) === 0) {
	                this.end_tile = this.random_tile();
	            }
	            this.start_tile.type = 2;
	            this.start_tile.dist_cost = 0;
	            this.end_tile.type = 3;
	        }
	    }, {
	        key: "random_tile",
	        value: function random_tile() {
	            return this.tiles[Math.floor(Math.random() * this.width * this.height / Math.pow(this.tile_size, 2))];
	        }
	    }, {
	        key: "generateRecursiveBacktrack",

	        //generate recursive backtrack maze
	        value: function generateRecursiveBacktrack() {}
	    }, {
	        key: "tile_in_bounds",

	        //this is a formal apology for the following method. I'm sorry.
	        value: function tile_in_bounds(og_tile, tile) {
	            return tile != undefined && (Math.abs(og_tile.x - tile.x) == 1 && Math.abs(og_tile.y - tile.y) == 0 || Math.abs(og_tile.x - tile.x) == 0 && Math.abs(og_tile.y - tile.y) == 1);
	        }
	    }, {
	        key: "tile_is_empty",
	        value: function tile_is_empty(tile) {
	            return tile.type !== 1;
	        }
	    }, {
	        key: "neighbors",
	        value: function neighbors(tile) {
	            var index = this.tile_index(tile);
	            var og_tile = this.tiles[index];
	            var indicies = [index + 1, index - 1, index + 50, index - 50];
	            var tile_neighbors = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = indicies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _index = _step.value;

	                    var _tile = this.tiles[_index];
	                    if (this.tile_in_bounds(og_tile, _tile) && this.tile_is_empty(_tile)) {
	                        tile_neighbors.push(_tile);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator["return"]) {
	                        _iterator["return"]();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return tile_neighbors;
	        }
	    }, {
	        key: "manhattan_distance",
	        value: function manhattan_distance(tile) {
	            var dx = Math.abs(tile.x - this.end_tile.x);
	            var dy = Math.abs(tile.y - this.end_tile.y);

	            return 1 * (dx + dy);
	        }
	    }, {
	        key: "tile_index",
	        value: function tile_index(tile) {
	            return tile.x + tile.y * 50;
	        }
	    }, {
	        key: "a_star_search",
	        value: function a_star_search() {
	            var _this = this;

	            var delay = arguments[0] === undefined ? 20 : arguments[0];

	            var frontier = new _queueJs2["default"]();
	            frontier.add(0, this.start_tile);
	            this.searched.push(this.start_tile);

	            var search_loop = setInterval(function () {

	                if (frontier.empty()) {
	                    clearInterval(search_loop);
	                }

	                var current = frontier.get();

	                //manahttan dist of zero means the current tile is the end_tile
	                if (_this.manhattan_distance(current) === 0) {
	                    console.log("goal reached");
	                    _this.trace_path();
	                    //break
	                    clearInterval(search_loop);
	                }

	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = _this.neighbors(current)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var tile = _step2.value;

	                        var cost = current.dist_cost + 1;
	                        var searched_index = _this.searched.indexOf(tile);
	                        if (searched_index === -1 || cost < _this.searched[searched_index].dist_cost) {
	                            tile.dist_cost = cost;
	                            var priority = cost + _this.manhattan_distance(tile);
	                            tile.parent = _this.tile_index(current);
	                            if (tile !== _this.end_tile) {
	                                tile.type = 4;
	                            }
	                            _this.searched.push(tile);
	                            frontier.add(priority, tile);
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
	                            _iterator2["return"]();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }

	                _this.display.render(_this);
	            }, delay);
	        }
	    }, {
	        key: "trace_path",
	        value: function trace_path() {
	            var tile = this.tiles[this.end_tile.parent];
	            while (tile.parent != null) {
	                if (tile !== this.start_tile) {
	                    tile.type = 5;
	                }
	                tile = this.tiles[tile.parent];
	            }
	        }
	    }]);

	    return Maze;
	})();

	exports["default"] = Maze;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	//queue.js
	//
	//Copyright Lucas Manning
	//

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Queue = (function () {
	    function Queue() {
	        _classCallCheck(this, Queue);

	        this.items = [];
	    }

	    _createClass(Queue, [{
	        key: "add",
	        value: function add(priority, element) {
	            if (!this.empty()) {
	                var index = 0;
	                while (index < this.items.length && priority > this.items[index][0]) {
	                    index++;
	                }
	                var item = [priority, element];

	                this.items.splice(index, 0, item);
	            } else {
	                this.items.push([priority, element]);
	            }
	        }
	    }, {
	        key: "empty",
	        value: function empty() {
	            return this.items.length === 0;
	        }
	    }, {
	        key: "get",
	        value: function get() {
	            return this.items.shift()[1];
	        }
	    }]);

	    return Queue;
	})();

	exports["default"] = Queue;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	//display.js
	//
	//Copyright Lucas Manning
	//

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Display = (function () {
	    function Display(tile_size, canvas) {
	        _classCallCheck(this, Display);

	        this.tile_size = tile_size;
	        this.canvas = canvas;
	        this.ctx = this.canvas.getContext('2d');
	        this.ctx.fillStyle = '#000000';
	    }

	    _createClass(Display, [{
	        key: 'render',
	        value: function render(maze) {
	            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = maze.tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var tile = _step.value;

	                    switch (tile.type) {
	                        case 0:
	                            this.ctx.fillStyle = '#d3d3d3';
	                            this.draw_tile(tile);
	                            break;
	                        case 1:
	                            this.ctx.fillStyle = '#000000';
	                            this.draw_tile(tile);
	                            break;
	                        case 2:
	                            this.ctx.fillStyle = '#00FF00';
	                            this.draw_tile(tile);
	                            break;
	                        case 3:
	                            this.ctx.fillStyle = '#FF0000';
	                            this.draw_tile(tile);
	                            break;
	                        case 4:
	                            this.ctx.fillStyle = '#0000FF';
	                            this.draw_tile(tile);
	                            break;
	                        case 5:
	                            this.ctx.fillStyle = '#FFA500';
	                            this.draw_tile(tile);
	                            break;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'draw_tile',
	        value: function draw_tile(tile) {
	            this.ctx.fillRect(tile.x * 10, tile.y * 10, 10, 10);
	        }
	    }]);

	    return Display;
	})();

	exports['default'] = Display;
	module.exports = exports['default'];

/***/ }
/******/ ]);