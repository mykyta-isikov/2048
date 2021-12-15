function SummaryView() {
    this.summaryModel = new SummaryModel();
    this.template = document.getElementById('summaryTemplate').innerHTML;
    BaseView.call(this);
}

SummaryView.prototype = Object.create(BaseView.prototype);
SummaryView.prototype.constructor = SummaryView;

SummaryView.prototype.beforeRender = function () {
    
}

SummaryView.prototype.render = function () {
    var attributes = this.summaryModel.attributes;
    
    for(var prop in attributes) {
        if(attributes.hasOwnProperty(prop)) {
            this.template = this.template.replace('{{' + prop + '}}', attributes[prop]);
        }
    }
    
    return this.template;
}

SummaryView.prototype.afterRender = function () {

}
