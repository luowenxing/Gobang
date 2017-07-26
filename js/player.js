(function(exports) {
	
	function Player(board,isBlack) {
		this.board = board
		this.isBlack = isBlack
		this.pieces = []
        this.regretPieces = []
	}

	Player.prototype.stepOn = function(x,y) {
		var piece = new Piece(x,y,this.isBlack)
		piece = this.board.stepOn(piece)
		if(piece) {
			this.pieces.push(piece)
		}
		return piece
	}

	Player.prototype.stepOff = function() {
		var piece = this.pieces.pop()
        this.regretPieces.push(piece)
        this.board.stepOff(piece)
        return piece
	}

	Player.prototype.regretStepOff = function() {
		return this.regretPieces.pop()
	}

	Player.prototype.getWinIndications = function() {
		return this.pieces.reduce(function(sum,piece) {
			return sum.concat(piece.winIndications) 
		},[])
	}

	exports.Player = Player
})(window)
