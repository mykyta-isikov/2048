function MatrixView() {
    this.matrixModel = new MatrixModel();
    this.controller = new Controller();
    this.template = document.getElementById('matrixTemplate').innerHTML;
    BaseView.call(this);
}

MatrixView.prototype = Object.create(BaseView.prototype);
MatrixView.prototype.constructor = MatrixView;

MatrixView.prototype.beforeRender = function () {
    this.matrixModel.createNewNumber();
    this.matrixModel.createNewNumber();
    this.matrixModel.subscribe('changeData', this.reRender, this);
}

MatrixView.prototype.render = function () {
    var i, j, attributes = this.matrixModel.attributes, str = '';
    
    for(i = 0; i < attributes.grid.length; i += 1) {
        var row = attributes.grid[i];
        
        str += '<div class="row">';
        
        for(j = 0; j < row.length; j += 1) {
            var cell = Math.pow(2, row[j]);
            
            // TODO: think about data type in model
            str += '<div class="cell appear-' + cell +'">' + ((cell === 1) ? '&zwnj;' : cell) + '</div>'
        }
        
        str += '</div>';
    }
    
    return this.template.replace('{{matrix}}', str);
}

MatrixView.prototype.afterRender = function () {

    var newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.addEventListener('click', this.controller.onClickNewGame.bind(this.controller));
    
    var context = this.controller;
    window.onkeydown = function(input) {
        switch (input.code) {
            case "ArrowUp":
                context.onArrowUp();
                break;
            case "ArrowRight":
                context.onArrowRight();
                break;
            case "ArrowDown":
                context.onArrowDown();
                break;
            case "ArrowLeft":
                context.onArrowLeft();
                break;
            default:
                break;
        }
    }
}

MatrixView.prototype.afterUpdate = function () {
    // Creating newGame button
    var newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.addEventListener('click', this.controller.onClickNewGame.bind(this.controller));

    // Curtain setup
    if (!this.matrixModel.attributes.gameStatus) {
        var matrix = document.querySelector(".table");
        var curtain = document.getElementById("curtain");
        curtain.style.width = matrix.offsetWidth - 12 + "px";
        curtain.style.height = matrix.offsetHeight + "px";
        curtain.style.display = "block";

        var msgText = document.getElementById('msg-text');
        msgText.innerHTML = this.matrixModel.attributes.endGameMessage;
        var msgButton = document.getElementById('msg-button');
        msgButton.addEventListener('click', this.controller.onClickNewGame.bind(this.controller));
    }
};
