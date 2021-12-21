function SummaryView() {
    this.summaryModel = new SummaryModel();
    this.template = document.getElementById('summaryTemplate').innerHTML;
    BaseView.call(this);
}

SummaryView.prototype = Object.create(BaseView.prototype);
SummaryView.prototype.constructor = SummaryView;

SummaryView.prototype.beforeRender = function () {
    this.summaryModel.subscribe('changeScore', this.reRender, this);
}

SummaryView.prototype.render = function () {
    var editedTemplate = this.template;
    var attributes = this.summaryModel.attributes;

    for(var prop in attributes) {
        if(attributes.hasOwnProperty(prop)) {
            editedTemplate = editedTemplate.replace('{{' + prop + '}}', attributes[prop]);
        }
    }
    return editedTemplate;
}

SummaryView.prototype.afterRender = function () {

}
