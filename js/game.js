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
		this.$el = opt.el
		this.steps = 0
		this.render()
	}

	Game.prototype.isPlaying = function() {
		return this.status === GameStatus.Playing
	}

	Game.prototype.isTurnOfBlack = function() {
		return this.steps % 2 === 0	
	}

	// 点击事件，下一步棋
	Game.prototype.stepOn = function(x,y) {
		// 只有在游戏中时才能下棋
		if(this.isPlaying()) {
			var piece = this.board.setpOn(x,y,this.isTurnOfBlack())
			// 点击空白处，成功走了一步棋
			if(piece) {
				this.steps ++ 
				this.renderPiece(piece)
				// 判断是否获胜
				if(this.board.checkWin(x,y)) {
					alert( (piece.isBlack ? 'Black' : 'White') + 'Win')
					this.status = GameStatus.End
				}
			}
		}
	}



	// UI渲染层，主要实现DOM渲染和监听点击事件
	Game.prototype.render = function() {

		var $c = document.createElement.bind(document)

		// 创建棋盘
		var $table = $c('table'),
			that = this
		$table.className = 'map'
		this.board.map.forEach(function(item,indexX) {
			var $tr = $c('tr')
			item.forEach(function(o,indexY){
				var $td = $c('td')
				$td.dataset.x = indexX
				$td.dataset.y = indexY
				$tr.append($td)
			})
			$table.append($tr)
		})

		// 绑定点击事件
		$table.addEventListener('click',function(event) {
			var $target = event.target
			var $td = findParent($target,$table,function($node){
				return $node.tagName === 'TD'
			})
			if($td) {
				var x = Number($td.dataset.x)
				var y = Number($td.dataset.y)
				that.stepOn(x,y)
			}
		})

		this.$el.append($table)
	}

	// 渲染单个棋子
	Game.prototype.renderPiece = function(piece) {
		if(!this.$tds) {
			// 缓存获取的DOM棋盘，防止多次获取
			this.$tds = [].slice.call(this.$el.querySelectorAll('td'))
		}
		var $td = this.$tds[ piece.x * this.size + piece.y]
		$td.innerHTML = piece.isBlack ? 'X' : 'O'
	}

	exports.Game = Game
})(window)
