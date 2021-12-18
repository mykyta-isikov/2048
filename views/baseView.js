function BaseView() {
    this.rootElement = document.createElement('div');
}

BaseView.prototype.show = function (element) {
    this.beforeRender();
    this.rootElement.innerHTML = this.render();
    element.appendChild(this.rootElement);
    this.afterRender();
}

BaseView.prototype.beforeRender = function () {};

BaseView.prototype.render = function () {
    throw new Error('Render method is mandatory!');
}

BaseView.prototype.afterRender = function () {};

BaseView.prototype.beforeUpdate = function () {};

BaseView.prototype.reRender = function () {
    this.beforeUpdate();
    this.rootElement.innerHTML = this.render();
    this.afterUpdate();
};

BaseView.prototype.afterUpdate = function () {
    var newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.addEventListener('click', this.controller.onClickNewGame.bind(this.controller));
};
