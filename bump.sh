#!/bin/bash

# Lire le fichier package.json
json=$(cat package.json)

# Extraire la version actuelle
version=$(echo "$json" | grep -oP '(?<="version": ")[^"]*')

# Diviser la version en un tableau
IFS='.' read -ra ADDR <<< "$version"

# Augmenter le dernier chiffre de la version de 1
ADDR[2]=$((ADDR[2] + 1))

# Recombiner la version
newVersion="${ADDR[0]}.${ADDR[1]}.${ADDR[2]}"

# Remplacer l'ancienne version par la nouvelle dans le fichier package.json
sed -i "s/\"version\": \"$version\"/\"version\": \"$newVersion\"/g" package.json
