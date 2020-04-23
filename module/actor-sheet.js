export class FlatPackActorSheet extends ActorSheet {
    
    static get defaultOptions() {
        return mergeObject (super.defaultOptions, {
            classes: ["sheet","actor"],
            width: 600,
            height: 750,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes"}]
        });
    }
    
    // Picks between available/listed templates
    get template() {
        const path = "systems/flatpacktemplate/templates/sheet"
        return `${path}/${this.actor.data.type}-sheet.html`;
    }
    
    getData() {
        const data = super.getData();
        data.dtypes = ["String","Number","Boolean"];
        return data;
    }
    
    activateListeners(html) {
        super.activateListeners(html);
        let tabs = html.find('tabs');
        let initial = this._sheetTab;
        new Tabs(tabs, {
            initial: initial,
            callback: clicked => this._sheetTab = clicked.data("tab")
        });
        
        if (!this.options.editable) return;
        
        html.find('item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemID"));
            item.sheet.render(true);
        });
        
        html.find('item-delet').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(li.data("itemID"));
            li.slideUp(200, () => this.render(false));
        });
    }
}