import { world, system, ScriptEventCommandMessageAfterEvent } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';

// Farm Controller class to manage individual farm controllers
class FarmController {
    constructor(location, dimension) {
        this.location = location;
        this.dimension = dimension;
        this.isActive = false;
        this.farmType = null;
        this.connectedChests = [];
        this.farmTimer = null;
    }

    // Find and connect to nearby chests
    findNearbyChests() {
        this.connectedChests = [];
        const searchRadius = 5;
        
        for (let x = -searchRadius; x <= searchRadius; x++) {
            for (let y = -searchRadius; y <= searchRadius; y++) {
                for (let z = -searchRadius; z <= searchRadius; z++) {
                    const checkLocation = {
                        x: this.location.x + x,
                        y: this.location.y + y,
                        z: this.location.z + z
                    };
                    
                    try {
                        const block = this.dimension.getBlock(checkLocation);
                        if (block && block.typeId === 'minecraft:chest') {
                            this.connectedChests.push(checkLocation);
                        }
                    } catch (error) {
                        // Block might be unloaded, skip
                    }
                }
            }
        }
        
        return this.connectedChests.length > 0;
    }

    // Add item to connected chests
    addItemToChests(itemStack) {
        for (const chestLocation of this.connectedChests) {
            try {
                const chestBlock = this.dimension.getBlock(chestLocation);
                if (chestBlock && chestBlock.typeId === 'minecraft:chest') {
                    const container = chestBlock.getComponent('minecraft:inventory').container;
                    
                    // Try to add the item to the chest
                    try {
                        container.addItem(itemStack);
                        return true; // Successfully added
                    } catch (error) {
                        // Chest might be full, try next one
                        continue;
                    }
                }
            } catch (error) {
                // Chest might be removed or unloaded
                continue;
            }
        }
        return false; // Could not add to any chest
    }

    // Start the selected farm type
    startFarm(farmType) {
        this.farmType = farmType;
        this.isActive = true;

        // Clear any existing timer
        if (this.farmTimer) {
            system.clearRun(this.farmTimer);
        }

        // Start the farm production loop
        this.farmTimer = system.runInterval(() => {
            this.produceFarmItems();
        }, 200); // Run every 10 seconds (200 ticks)
    }

    // Stop the farm
    stopFarm() {
        this.isActive = false;
        if (this.farmTimer) {
            system.clearRun(this.farmTimer);
            this.farmTimer = null;
        }
    }

    // Produce items based on farm type
    produceFarmItems() {
        if (!this.isActive || !this.farmType) return;

        let itemToProduce = null;
        const { ItemStack } = world;

        switch (this.farmType) {
            case 'iron_farm':
                itemToProduce = new ItemStack('minecraft:iron_ingot', Math.floor(Math.random() * 3) + 1);
                break;
            case 'emerald_farm':
                itemToProduce = new ItemStack('minecraft:emerald', Math.floor(Math.random() * 2) + 1);
                break;
            case 'sugar_cane_farm':
                itemToProduce = new ItemStack('minecraft:sugar_cane', Math.floor(Math.random() * 5) + 1);
                break;
            case 'wheat_farm':
                itemToProduce = new ItemStack('minecraft:wheat', Math.floor(Math.random() * 4) + 1);
                break;
            case 'mob_farm':
                // Random mob drops
                const mobDrops = ['minecraft:bone', 'minecraft:string', 'minecraft:rotten_flesh', 'minecraft:arrow'];
                const randomDrop = mobDrops[Math.floor(Math.random() * mobDrops.length)];
                itemToProduce = new ItemStack(randomDrop, Math.floor(Math.random() * 3) + 1);
                break;
            case 'gold_farm':
                itemToProduce = new ItemStack('minecraft:gold_ingot', Math.floor(Math.random() * 2) + 1);
                break;
        }

        if (itemToProduce) {
            const success = this.addItemToChests(itemToProduce);
            if (success) {
                // Show particles at the farm controller
                this.dimension.spawnParticle('minecraft:villager_happy', this.location);
            }
        }
    }
}

// Global storage for farm controllers
const farmControllers = new Map();

// Function to get location key for Map storage
function getLocationKey(location) {
    return `${location.x},${location.y},${location.z}`;
}

// Handle script events
system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, message, sourceBlock } = event;
    
    if (!sourceBlock) return;
    
    const location = sourceBlock.location;
    const dimension = sourceBlock.dimension;
    const locationKey = getLocationKey(location);

    switch (id) {
        case 'farm_automation:interact':
            handleFarmControllerInteract(sourceBlock, dimension, location, locationKey);
            break;
        case 'farm_automation:placed':
            handleFarmControllerPlaced(dimension, location, locationKey);
            break;
        case 'farm_automation:destroyed':
            handleFarmControllerDestroyed(locationKey);
            break;
    }
});

// Handle farm controller interaction
function handleFarmControllerInteract(sourceBlock, dimension, location, locationKey) {
    // Get the player who interacted
    const players = dimension.getPlayers();
    const player = players.find(p => {
        const distance = Math.sqrt(
            Math.pow(p.location.x - location.x, 2) +
            Math.pow(p.location.y - location.y, 2) +
            Math.pow(p.location.z - location.z, 2)
        );
        return distance < 10;
    });

    if (!player) return;

    const controller = farmControllers.get(locationKey);
    if (!controller) return;

    // Check if chests are connected
    if (!controller.findNearbyChests()) {
        player.sendMessage('§cNo chests found nearby. Place chests within 5 blocks.');
        return;
    }

    player.sendMessage('§aFarm Controller connected to nearby chests!');
    showFarmSelectionMenu(player, controller);
}

// Handle farm controller placement
function handleFarmControllerPlaced(dimension, location, locationKey) {
    const controller = new FarmController(location, dimension);
    farmControllers.set(locationKey, controller);
}

// Handle farm controller destruction
function handleFarmControllerDestroyed(locationKey) {
    const controller = farmControllers.get(locationKey);
    if (controller) {
        controller.stopFarm();
        farmControllers.delete(locationKey);
    }
}

// Show farm selection menu
function showFarmSelectionMenu(player, controller) {
    const form = new ActionFormData();
    form.title('Farm Controller Menu');
    form.body('Select the type of farm you want to create:');
    
    form.button('Iron Farm', 'textures/items/iron_ingot');
    form.button('Emerald Farm', 'textures/items/emerald');
    form.button('Sugar Cane Farm', 'textures/blocks/sugar_cane');
    form.button('Wheat Farm', 'textures/items/wheat');
    form.button('Mob Farm', 'textures/items/bone');
    form.button('Gold Farm', 'textures/items/gold_ingot');
    
    if (controller.isActive) {
        form.button('§cStop Farm', 'textures/ui/cancel');
    }

    form.show(player).then((response) => {
        if (response.canceled) return;

        const farmTypes = ['iron_farm', 'emerald_farm', 'sugar_cane_farm', 'wheat_farm', 'mob_farm', 'gold_farm'];
        
        if (response.selection < farmTypes.length) {
            const selectedFarm = farmTypes[response.selection];
            controller.startFarm(selectedFarm);
            player.sendMessage(`§aStarted ${selectedFarm.replace('_', ' ')}!`);
        } else if (response.selection === farmTypes.length && controller.isActive) {
            controller.stopFarm();
            player.sendMessage('§cFarm stopped!');
        }
    });
}

// Initialize the addon
world.sendMessage('§aFarm Automation Addon loaded successfully!');