(function(exports) {

	// 八个方向的方向指示器数组
	var orientationsGroup = [
		[[1,0],[-1,0]],
		[[0,1],[0,-1]],
		[[1,1],[-1,-1]],
		[[-1,1],[1,-1]]
	];
	function Board(size) {
		this.map = new Array(size)
		this.size = size
		for(var i=0;i<size;i++) {
			this.map[i] = new Array(size)
			this.map[i].fill(null)
		}
	}

	Board.prototype.setpOn = function(x,y,isBlack) {
		if(!this.map[x][y]) {
			this.map[x][y] = new Piece(x,y,isBlack)
			return this.map[x][y]
		}
		return null
	}

	Board.prototype.setpOff = function(x,y) {
		this.map[x][y] = null
		return 
	}

	Board.prototype.checkWin = function(x,y) {
		var piece = this.map[x][y]
		var originX = x,originY = y
		var map = this.map
		var isWin = false
		
		orientationsGroup.forEach(function(orientations) {
			// 计算横竖交叉四个方向的最大长度
			var maxLength = 0
			if(!isWin) {
				orientations.forEach(function(orientation) {
					var x = originX,y = originY,
						xOri = orientation[0],yOri = orientation[1]
					while(map[x] && map[x][y] && map[x][y].isBlack === piece.isBlack ) {
						x = x + xOri 
						y = y + yOri 
						maxLength ++ 
					}
				})
				// 重复计算了一次，所以要-1
				maxLength --
				if(maxLength === 5) { 
					// 任意一个方向满了5个，赢了
					isWin = true
				}
			}
		})
		return isWin
	}

	exports.Board = Board
})(window)