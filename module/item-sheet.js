export class FlatPackItemSheet extends ItemSheet {
    
    static get defaultOptions() {
        return mergeObject (super.defaultOptions, {
            classes: ["sheet","item"],
            width: 600,
            height: 750,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes"}]
        });
    }
    
    // Picks between available/listed templates
    get template() {
        const path = "systems/flatpacktemplate/templates/sheet"
        return `${path}/${this.item.data.type}-sheet.html`;
    }
    
    getData() {
        const data = super.getData();
        data.dtypes = ["String","Number","Boolean"];
        return data;
    }
    
    activateListeners(html) {
        super.activateListeners(html);
        let tabs = html.fins('tabs');
        let initial = this._sheetTab;
        new Tabs(tabs, {
            initial: initial,
            callback: clicked => this._sheetTab = clicked.data("tab")
        });
    }
}