function SummaryModel() {
    this.attributes = {
        totalScore: 0,
        bestScore: 0
    }

    // singleton
    var instance = this;
    SummaryModel = function () {
        return instance;
    }
}

Object.prototype.render = function () {
    // console.log('render method summaryModel', this.attributes);
    var summaryView = new SummaryView();
    summaryView.render();
}

Object.prototype.updateTotalScore = function () {
    this.attributes.totalScore = 0;
}
