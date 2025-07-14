# Farm Automation Addon for Minecraft Bedrock

## Overview
This addon adds a **Farm Controller** block that automates various farm types in Minecraft Bedrock Edition 1.21.93+.

## Features

### Farm Controller Block
- **Crafting Recipe**: 
  - Top row: Oak Planks + Oak Planks + Oak Planks
  - Middle row: Oak Planks + Chest + Oak Planks  
  - Bottom row: Oak Planks + Redstone + Oak Planks
- **Functionality**: Connects to nearby chests (within 5 blocks) and automatically produces items

### Supported Farm Types
1. **Iron Farm** - Produces iron ingots
2. **Emerald Farm** - Produces emeralds
3. **Sugar Cane Farm** - Produces sugar cane
4. **Wheat Farm** - Produces wheat
5. **Mob Farm** - Produces mob drops (bones, string, rotten flesh, arrows)
6. **Gold Farm** - Produces gold ingots

## Installation

### Method 1: Import .mcaddon file
1. Download the `farm_automation.mcaddon` file
2. Double-click to import into Minecraft
3. Enable in world settings under "Behavior Packs" and "Resource Packs"

### Method 2: Manual installation
1. Copy `farm_automation_BP` folder to: `%appdata%/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/behavior_packs/`
2. Copy `farm_automation_RP` folder to: `%appdata%/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/resource_packs/`
3. Enable both packs in world settings

## Usage

1. **Craft a Farm Controller** using the recipe above
2. **Place the Farm Controller** where you want your automated farm
3. **Place chests** within 5 blocks of the Farm Controller
4. **Right-click** the Farm Controller to open the menu
5. **Select your desired farm type** from the menu
6. **Items will automatically** be produced and stored in connected chests

## Technical Details

- **Production Rate**: Items are produced every 10 seconds
- **Chest Connection**: Automatically detects chests within 5 blocks
- **Storage**: Items are distributed among connected chests
- **Visual Feedback**: Particles appear when items are produced
- **Multiple Farms**: Place multiple Farm Controllers for different farm types

## Compatibility
- **Minecraft Bedrock Edition**: 1.21.93+
- **Platforms**: Windows, Mobile, Console, Switch
- **Multiplayer**: Fully supported

## Troubleshooting

**Farm Controller not working?**
- Ensure chests are within 5 blocks
- Check that the addon is properly enabled
- Verify you have the latest Minecraft version

**Items not appearing?**
- Make sure chests have empty space
- Check if the farm is actually running (particles should appear)
- Try breaking and replacing the Farm Controller

## Version History
- **v1.0.0**: Initial release with 6 farm types and basic automation