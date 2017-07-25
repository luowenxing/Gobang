(function(exports) {

    var $c = document.createElement.bind(document)

    function GameRenderer(game,$el) {
        this.game = game
        this.$el = $el
        this._init()
    }

    GameRenderer.prototype._init = function() {
        this._initControl()
        this._initBoard()
        
    }

    GameRenderer.prototype._initBoard = function() {
        // 创建棋盘
        var $table = $c('table'),
            game = this.game
        $table.className = 'map'
        game.board.map.forEach(function(item,indexX) {
            var $tr = $c('tr')
            item.forEach(function(o,indexY){
                var $td = $c('td')
                $td.dataset.x = indexX
                $td.dataset.y = indexY
                $tr.appendChild($td)
            })
            $table.appendChild($tr)
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
                game.stepOn(x,y,true)
            }
        })
        this.$el.appendChild($table)
    }   

    GameRenderer.prototype._initControl = function() {
        var $ctlPanel = $c('div'),
            $btnStepOff = $c('button'),
            $btnRegretStepOff = $c('button'),
            game = this.game    
        $ctlPanel.className = 'control-panel'
        $btnStepOff.className = 'btn-stepoff'
        $btnRegretStepOff.className = 'btn-regret-stepoff'
        $btnStepOff.innerHTML = '悔棋'
        $btnRegretStepOff.innerHTML = '撤销悔棋'
        $ctlPanel.appendChild($btnStepOff)
        $ctlPanel.appendChild($btnRegretStepOff)
        $btnStepOff.addEventListener('click',game.stepOff.bind(game))
        $btnRegretStepOff.addEventListener('click',game.regretStepOff.bind(game))
        this.$el.appendChild($ctlPanel)
        this.$btnStepOff = $btnStepOff
        this.$btnRegretStepOff = $btnRegretStepOff
        this.reRenderControl()

    }

    // UI渲染层，主要实现DOM渲染和监听点击事件
    GameRenderer.prototype.reRenderControl = function() {
        var game = this.game,
            btnStepOffVisible = game.steps.length > 0 ? 'visible' : 'hidden',
            btnRegretStepOffVisible = game.regretSteps.length > 0 ? 'visible' : 'hidden'  
        this.$btnStepOff.style.visibility = btnStepOffVisible
        this.$btnRegretStepOff.style.visibility = btnRegretStepOffVisible
    }

    // 渲染单个棋子
    GameRenderer.prototype.reRenderPiece = function(piece,x,y) {
        if(!this.$tds) {
            // 缓存获取的DOM棋盘，防止多次获取
            this.$tds = [].slice.call(this.$el.querySelectorAll('td'))
        }
        var $td = this.$tds[ x * this.game.size + y]
        if(piece) {
            // 渲染下棋
            $td.innerHTML = piece.isBlack ? 'X' : 'O'
        } else { 
            // 渲染悔棋
            $td.innerHTML = ''
        }
        
    }

    exports.GameRenderer = GameRenderer
})(window)


   