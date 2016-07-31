define(['jquery'], function($) {

	var ball = $("#ball");
	var board = $("#board");
	var leftPlayer = $("#left");
	var rightPlayer = $("#right");
	var playerHeight = parseInt(leftPlayer.css("height"));
	var ballWidth = parseInt(ball.css("width"));
	var boardWidth = parseInt(board.css("width"));
	var maxHeight = (function() {
		var boardHeight = parseInt(board.css("height"));
		var leftHeight = parseInt(leftPlayer.css("height"));
		return boardHeight - leftHeight;
	})();
	var whichPlayer = leftPlayer;

	var setBallInCenter = function() {
		ball.css("left", 150);
		ball.css("top", 150);
	};

	var movePlayer = function(elem, dir) {
		var top = parseInt(elem.css("top"));
		top += 5 * dir;
		if (top > maxHeight) {
			top = maxHeight;
		} else if (top < 0) {
			top = 0;
		}
		elem.css("top", top);
	};

	$(document).keydown(function(evt) {
		if (evt.keyCode == 40) { //down
			movePlayer(whichPlayer, 1);
		} else if (evt.keyCode == 38) {
			movePlayer(whichPlayer, -1);
		}
	});

	var changePlayer = function() {
		whichPlayer = whichPlayer == leftPlayer ? rightPlayer : leftPlayer;
	};

	var score = function() {
		var left = 0;
		var right = 0;

		var isEnd = function() {
			return this.left >= 5 || this.right >= 5;
		};

		var draw = function() {
			$("#score").html(this.left + " : " + this.right);
		};

		return {
			left: left,
			right: right,
			isEnd: isEnd,
			draw: draw
		}
	}();

	return {
		ball: ball,
		board: board,
		leftPlayer: leftPlayer,
		rightPlayer: rightPlayer,
		playerHeight: playerHeight,
		ballWidth: ballWidth,
		boardWidth: boardWidth,
		setBallInCenter: setBallInCenter,
		movePlayer: movePlayer,
		changePlayer: changePlayer,
		score: score
	}

});