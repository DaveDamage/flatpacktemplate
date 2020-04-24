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
        new TabsV2(tabs, {
            initial: initial,
            callback: clicked => this._sheetTab = clicked.data("tab")
        });
        
        if (!this.options.editable) return;
        
         // Update Inventory Item
    html.find(".item-edit").click((ev) => {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      const item = this.actor.getOwnedItem(itemId);
      // const item = this.actor.getEmbeddedEntity("OwnedItem", itemId);
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find(".item-delete").click((ev) => {
      let li = $(ev.currentTarget).parents(".item"),
        itemId = li.attr("data-item-id");
      // this.actor.deleteOwnedItem(itemId);
      this.actor.deleteEmbeddedEntity("OwnedItem", itemId);
      li.slideUp(200, () => this.render(false));
    });
        
    // Roll Button Listener
        html.find('.roll-button').click((ev) => {
            let buttonValue = $(ev.currentTarget);
            const roll = new Roll("1d20 + " + Number(buttonValue.val()))
            roll.roll
            roll.toMessage();
        });
    
       
    }
}