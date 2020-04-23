/**
 * A template for building game systems for Foundry VTT
 * Author: GateKept
 * Software License: CC-BY
 */

import {
    FlatPackActorSheet
} from "./actor-sheet.js";
import {
    FlatPackItemSheet
} from "./item-sheet.js";
import {
    FlatPackActor
} from "./actor.js";

Hooks.once("init", async function () {
    console.log(`Initializing A Template`);

    // Define custom Entity classes
    CONFIG.Actor.entityClass = FlatPackActor;
    
    CONFIG.Combat.initiative = {
        formula: "1d6",
        decimals: 2
    }

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("flatpack", FlatPackActorSheet, {
        makeDefault: true
    });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("flatpack", FlatPackItemSheet, {
        makeDefault: true
    });
    
    // Register system settings
  game.settings.register("flatpacktemplate", "macroShorthand", {
    name: "Shortened Macro Syntax",
    hint:
      "Enable a shortened macro syntax which allows referencing attributes directly, for example @str instead of @attributes.str.value. Disable this setting if you need the ability to reference the full attribute model, for example @attributes.str.label.",
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });
});