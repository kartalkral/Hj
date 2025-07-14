#!/bin/bash

# Farm Automation Addon Build Script
# This script packages the addon into a .mcaddon file for distribution

echo "Building Farm Automation Addon..."

# Create build directory
mkdir -p /app/build

# Copy behavior pack
cp -r /app/farm_automation_BP /app/build/

# Copy resource pack
cp -r /app/farm_automation_RP /app/build/

# Create .mcaddon file (it's basically a zip file)
cd /app/build
zip -r farm_automation.mcaddon farm_automation_BP farm_automation_RP

echo "Addon built successfully!"
echo "File location: /app/build/farm_automation.mcaddon"
echo ""
echo "Installation Instructions:"
echo "1. Copy farm_automation.mcaddon to your device"
echo "2. Double-click to import into Minecraft"
echo "3. Enable in world settings under 'Behavior Packs' and 'Resource Packs'"
echo ""
echo "Manual Installation:"
echo "1. Extract farm_automation_BP to behavior_packs folder"
echo "2. Extract farm_automation_RP to resource_packs folder"
echo "3. Enable both packs in Minecraft world settings"