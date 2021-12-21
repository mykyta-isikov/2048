function SummaryModel() {
    BaseModel.call(this);
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

SummaryModel.prototype = Object.create(BaseModel.prototype);
SummaryModel.prototype.constructor = SummaryModel;
