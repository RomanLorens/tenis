define(['jquery'], function($) {

	var start = function() {

		var ball = $("#ball");
		var board = $("#board");
		var leftPlayer = $("#left");
		var rightPlayer = $("#right");

		var ballDir = -1;
		var ballVerticalDir = 0;
		var whichPlayer = leftPlayer;

		var ballSpeed = 10;
		var playerWidth = parseInt(leftPlayer.css("width"));
		var playerHeight = parseInt(leftPlayer.css("height"));
		var ballWidth =  parseInt(ball.css("width"));
		var boardWidth = (function() {
			var boardWidth = parseInt(board.css("width"));
			return boardWidth - ballWidth;
		})();
		var maxHeight = (function() {
			var boardHeight = parseInt(board.css("height"));
			var leftHeight = parseInt(leftPlayer.css("height"));
			return boardHeight - leftHeight;
		})();

		var move = function(elem, dir) {
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
				move(whichPlayer, 1);
			} else if (evt.keyCode == 38) {
				move(whichPlayer, -1);
			}
		});


		var interval = setInterval(function() {
			var ballPosition = getPosition(ball);
			var ballLeft = ballPosition.left;

			ballLeft += (ballSpeed * ballDir);

			if (ballDir == -1) {//going left
				if (ballLeft == ballWidth) {
					var leftPlayerPosition = getPosition(leftPlayer);
					var contactPoint = ballContactWithPlayer(ballPosition, leftPlayerPosition);
					if (contactPoint >= 0) {
						ballDir *= -1;
						whichPlayer = rightPlayer;
						ballVerticalDir = calculateVerticalDir(contactPoint);
					}
				}
			} else {//going right
				if(ballLeft == boardWidth - ballWidth) {
					var rigthPlayerPosition = getPosition(rightPlayer);
					var contactPoint = ballContactWithPlayer(ballPosition, rigthPlayerPosition);
					if (contactPoint >= 0) {
						ballDir *= -1;
						whichPlayer = leftPlayer;
						ballVerticalDir = calculateVerticalDir(contactPoint);
					}
				}
			}

			if (ballLeft >= boardWidth || ballLeft <= 0) {
				clearInterval(interval);
				console.log("game over...")
			}
			$("#ball").css("left", ballLeft);
			$("#ball").css("top", ballPosition.top + ballVerticalDir);

		}, 500);

		var calculateVerticalDir = function(ballContactPoint) {
			return (ballContactPoint - (playerHeight/2)) / 10;
		};

		var ballContactWithPlayer = function(ballPosition, playerPosition) {
			var ballTop = ballPosition.top;
			var playerTop = playerPosition.top;
			console.log(ballTop + "," + playerTop)
			var diff = ballTop - playerTop;
			return diff;
		};

		var getPosition = function(elem) {
			var left = parseInt(elem.css("left"));
			var top = parseInt(elem.css("top"));
			return {
				left: left,
				top: top
			}
		};
	}


	return {
		start: start
	};

});
