// Farm Types Configuration
// This file contains the configuration for different farm types

export const FARM_TYPES = {
    iron_farm: {
        name: "Iron Farm",
        description: "Produces iron ingots automatically",
        items: [
            { id: "minecraft:iron_ingot", minAmount: 1, maxAmount: 3 }
        ],
        productionRate: 200, // ticks (10 seconds)
        icon: "textures/items/iron_ingot"
    },
    emerald_farm: {
        name: "Emerald Farm", 
        description: "Produces emeralds through villager trading",
        items: [
            { id: "minecraft:emerald", minAmount: 1, maxAmount: 2 }
        ],
        productionRate: 300, // ticks (15 seconds)
        icon: "textures/items/emerald"
    },
    sugar_cane_farm: {
        name: "Sugar Cane Farm",
        description: "Automatically harvests sugar cane",
        items: [
            { id: "minecraft:sugar_cane", minAmount: 1, maxAmount: 5 }
        ],
        productionRate: 160, // ticks (8 seconds)
        icon: "textures/blocks/sugar_cane"
    },
    wheat_farm: {
        name: "Wheat Farm",
        description: "Automatically plants and harvests wheat",
        items: [
            { id: "minecraft:wheat", minAmount: 1, maxAmount: 4 },
            { id: "minecraft:wheat_seeds", minAmount: 0, maxAmount: 2 }
        ],
        productionRate: 240, // ticks (12 seconds)
        icon: "textures/items/wheat"
    },
    mob_farm: {
        name: "Mob Farm",
        description: "Kills mobs and collects their drops",
        items: [
            { id: "minecraft:bone", minAmount: 1, maxAmount: 3 },
            { id: "minecraft:string", minAmount: 1, maxAmount: 2 },
            { id: "minecraft:rotten_flesh", minAmount: 1, maxAmount: 3 },
            { id: "minecraft:arrow", minAmount: 1, maxAmount: 2 },
            { id: "minecraft:gunpowder", minAmount: 1, maxAmount: 2 }
        ],
        productionRate: 180, // ticks (9 seconds)
        icon: "textures/items/bone"
    },
    gold_farm: {
        name: "Gold Farm",
        description: "Kills zombie pigmen for gold",
        items: [
            { id: "minecraft:gold_ingot", minAmount: 1, maxAmount: 2 },
            { id: "minecraft:gold_nugget", minAmount: 1, maxAmount: 4 }
        ],
        productionRate: 220, // ticks (11 seconds)
        icon: "textures/items/gold_ingot"
    },
    cobblestone_farm: {
        name: "Cobblestone Farm",
        description: "Generates cobblestone automatically",
        items: [
            { id: "minecraft:cobblestone", minAmount: 1, maxAmount: 3 }
        ],
        productionRate: 100, // ticks (5 seconds)
        icon: "textures/blocks/cobblestone"
    },
    wood_farm: {
        name: "Wood Farm",
        description: "Automatically chops trees and collects wood",
        items: [
            { id: "minecraft:oak_log", minAmount: 1, maxAmount: 4 },
            { id: "minecraft:oak_leaves", minAmount: 1, maxAmount: 2 },
            { id: "minecraft:apple", minAmount: 0, maxAmount: 1 }
        ],
        productionRate: 280, // ticks (14 seconds)
        icon: "textures/blocks/oak_log"
    }
};

// Function to get random item from farm type
export function getRandomItemFromFarm(farmType) {
    const config = FARM_TYPES[farmType];
    if (!config) return null;
    
    const randomItem = config.items[Math.floor(Math.random() * config.items.length)];
    const amount = Math.floor(Math.random() * (randomItem.maxAmount - randomItem.minAmount + 1)) + randomItem.minAmount;
    
    return {
        id: randomItem.id,
        amount: amount
    };
}