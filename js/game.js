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
		this.steps = []
        this.regretSteps = []
		this.renderer = new GameRenderer(this,opt.el)

        // 仿vue数组变异方法
        // steps一旦push/pop，则触发reRenderControl
        var stepsWatch = arrayWatch(this.renderer.reRenderControl.bind(this.renderer))
        this.steps.__proto__ = stepsWatch
        this.regretSteps.__proto__ = stepsWatch
	}

	Game.prototype.isPlaying = function() {
		return this.status === GameStatus.Playing
	}

	Game.prototype.isTurnOfBlack = function() {
		return this.steps.length % 2 === 0	
	}

	// 点击事件，下一步棋
	Game.prototype.stepOn = function(x,y,checkWin) {
		// 只有在游戏中时才能下棋
		if(this.isPlaying()) {
			var piece = this.board.setpOn(x,y,this.isTurnOfBlack())
			// 点击空白处，成功走了一步棋
			if(piece) {
                this.steps.push({
                    x:x,
                    y:y
                })
				this.renderer.reRenderPiece(piece,x,y)
				// 判断是否获胜
				if(checkWin && this.board.checkWin(x,y)) {
					alert( (piece.isBlack ? 'Black' : 'White') + 'Win')
					this.status = GameStatus.End
				}
			}
		}
	}

    // 悔棋
    Game.prototype.stepOff = function() {
        if(this.isPlaying()) {
            var step = this.steps.pop()
            this.regretSteps.push(step)
            this.board.stepOff(step.x,step.y)
            this.renderer.reRenderPiece(null,step.x,step.y)
        }
    }

    // 撤销悔棋
    Game.prototype.regretStepOff = function() {
        if(this.isPlaying()) {
            var step = this.regretSteps.pop()
            this.stepOn(step.x,step.y,false)
        }
    }


	exports.Game = Game
})(window)
