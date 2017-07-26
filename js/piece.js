(function(exports) {
	


	function Piece(x,y,isBlack) {
		this.isBlack = isBlack
		this.x = x
		this.y = y
		this.winIndications = []
	}

	exports.Piece = Piece
})(window)
