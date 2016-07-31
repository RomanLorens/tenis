define(['jquery', 'Board'], function($, Board) {

	var start = function() {

		var ballDir = -1;
		var ballVerticalDir = 0;
		var ballSpeed = 10;
		var initSpeed = 200;
		var intervalSpeed = initSpeed;

		var moveBall = function() {
			var ballPosition = getPosition(Board.ball);
			var ballLeft = ballPosition.left;
			var ballTop = ballPosition.top;

			if (ballDir == -1) {//going left
				if (ballLeft <= Board.ballWidth) {
					checkIfBallReachedPlayer(ballPosition, Board.leftPlayer);
				}
			} else {//going right
				if(ballLeft >= Board.boardWidth - (Board.ballWidth + Board.ballWidth)) {
					checkIfBallReachedPlayer(ballPosition, Board.rightPlayer);
				}
			}

			var isOutOfBoard = ballTop < 0 || ballTop > Board.boardWidth;
			if (ballLeft >= (Board.boardWidth  - Board.ballWidth) || ballLeft <= 0 
				|| isOutOfBoard) {
				updateScore(isOutOfBoard);
				if (Board.score.isEnd()) {
					console.log("game over...");
					clearInterval(interval);
					return;
				} else {
					initBall();
				}
			} else {
				ballLeft += (ballSpeed * ballDir);
				Board.ball.css("left", ballLeft);
				Board.ball.css("top", ballPosition.top + ballVerticalDir);
			}
			
			clearInterval(interval);
		    interval = setInterval(moveBall, intervalSpeed);
		};

		var interval = setInterval(moveBall, intervalSpeed);

		var initBall = function() {
			Board.setBallInCenter();
			ballVerticalDir = 0;
			intervalSpeed = initSpeed;
		};

		var updateScore = function(isOutOfTop) {
			if (isOutOfTop) {
				if (ballDir == -1) { //going left
					Board.score.left++;
				} else {
					Board.score.right++;
				}
			} else {
				if (ballDir == -1) {
					Board.score.right++;
				} else {
					Board.score.left++;
				}
			}
			Board.score.draw();
		};

		var checkIfBallReachedPlayer = function(ballPosition, player){
			var playerPosition = getPosition(player);
			var contactPoint = ballContactWithPlayer(ballPosition, playerPosition);
			if (contactPoint >= 0) {
				ballDir *= -1;
				Board.changePlayer();
				ballVerticalDir = calculateVerticalDir(contactPoint);
				if (isCentralPoint()) {
					intervalSpeed -= (intervalSpeed/10)
				}
			}
		};

		var isCentralPoint = function() {
			return ballVerticalDir >= -0.5 && ballVerticalDir <= 0.5;
		};

		var calculateVerticalDir = function(ballContactPoint) {
			return (ballContactPoint - (Board.playerHeight/2)) / 10;
		};

		var ballContactWithPlayer = function(ballPosition, playerPosition) {
			var ballTop = ballPosition.top;
			var playerTop = playerPosition.top;
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
