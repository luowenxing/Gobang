(function(exports) {
	
	var GameStatus = {
		End:'End',
		Playing:'Playing',
		Waiting:'Waiting'
	}
	var defaultOptions = {
		size:20
	}

	function Game(options) {
		var opt = {}
		extend(opt,defaultOptions)
		extend(opt,options)
		this.size = opt.size
		this.board = new Board(opt.size)
		this.status = GameStatus.Playing
		// 两个玩家
		this.players = [new Player(this.board,true),new Player(this.board,false)]
		// dom渲染器
		this.renderer = new GameRenderer(this,opt.el)

		def(this,'stepsCount',this.renderer.reRenderControl.bind(this.renderer))
		this.stepsCount = 0
	}

	Game.prototype.isPlaying = function() {
		return this.status === GameStatus.Playing
	}

	Game.prototype.getCurrentPlayer = function() {
		let turn = this.stepsCount % 2 
		return this.players[turn]
	}

	Game.prototype.getPrevPlayer = function() {
		let turn = ( this.stepsCount - 1 ) % 2 
		return this.players[turn]
	}

	Game.prototype.totalPieces = function() {
		return this.players[0].pieces.length + this.players[1].pieces.length
	}

	Game.prototype.totalRegretPieces = function() {
		return this.players[0].regretPieces.length + this.players[1].regretPieces.length
	}

	// 点击事件，下一步棋
	Game.prototype.stepOn = function(x,y) {
		// 只有在游戏中时才能下棋
		if(this.isPlaying()) {
			var player = this.getCurrentPlayer()
			var piece = player.stepOn(x,y)
			// 点击空白处，成功走了一步棋
			if(piece) {
				this.stepsCount ++
				this.renderer.reRenderPiece(piece,x,y)
				if(this.board.checkWin(piece)) {
					setTimeout(function() {
						alert( (piece.isBlack ? 'Black' : 'White') + 'Win')
					},100)
					this.status = GameStatus.End
					this.renderer.reRenderIndications(true)
				} else {
					this.renderer.reRenderIndications(false)
				}
				
			}
		}
	}

    // 悔棋
    Game.prototype.stepOff = function() {
        if(this.isPlaying()) {
            var player = this.getPrevPlayer()
            var piece = player.stepOff()
            this.stepsCount -- 
            this.renderer.reRenderPiece(null,piece.x,piece.y)
        }
    }

    // 撤销悔棋
    Game.prototype.regretStepOff = function() {
        if(this.isPlaying()) {
        	var player = this.getCurrentPlayer()
            var piece = player.regretStepOff()
            this.stepOn(piece.x,piece.y,false)
        }
    }

	exports.Game = Game
})(window)
