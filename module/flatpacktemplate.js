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

Hooks.once("init", async function () {
    console.log(`Initializing A Template`);

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
});