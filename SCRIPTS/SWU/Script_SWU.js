const fs = require('fs');

// Fonction pour lire et modifier le fichier JSON
function modifyJsonFile(inputFilePath, outputFilePath, result, isLast) {
    // Lire le fichier JSON
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier JSON:', err);
            return;
        }

        try {
            // Convertir les données JSON en objet
            const jsonObject = JSON.parse(data);



            jsonObject.data.forEach((c) => {
                let newCard = {}
                const cardId = c.Set + "_" + c.Number
                const cardType = c.Type == "Unit" ? "Unit - " + c.Arenas[0] : c.Type
                const isHorizontal = cardType == "Base" || cardType == "Leader"
                let cardName = c.Name
                if (c.Subtitle) {
                    cardName += ", " + c.Subtitle
                }

                function getArtUrl(image) {
                    if (isHorizontal) {
                        let withoutExtension = image.slice(0, -4)
                        return withoutExtension + "-r.png"
                    } else {
                        return image
                    }
                }

                newCard = {
                    id: cardId,
                    face: {
                        front: {
                            name: cardName,
                            type: cardType,
                            cost: parseInt(c.Cost ? c.Cost : 0),
                            image: getArtUrl(c.FrontArt),
                            isHorizontal: isHorizontal
                        }
                    },
                    name: cardName,
                    type: cardType,
                    cost: parseInt(c.Cost ? c.Cost : 0),
                    rarity: c.Rarity,
                    power: parseInt(c.Power ? c.Power : 0),
                    HP: parseInt(c.HP ? c.HP : 0),
                    aspects: c.Aspects ? c.Aspects : [],
                    unique: c.Unique ? true : false,
                    traits: c.Traits ? c.Traits : []
                }

                if (c.DoubleSided) {
                    // For now there are no back side horizontal <- wrong
                    newCard.face.back = {
                        name: cardName,
                        type: cardType,
                        cost: c.Cost,
                        image: c.BackArt,
                    }

                    if (cardId == "TWI_017" || cardId == "TWI_274" || cardId == "TWI_292") {
                        newCard.face.back.isHorizontal = true
                    }
                }

                //const cardsWithoutRVersion = ["https://cdn.swu-db.com/images/cards/TWI/297.png"]
                //if (!cardsWithoutRVersion.includes(c.FrontArt)) { 
                if (!c.VariantType.includes("Foil") && !c.VariantType.includes("Serialized")) {
                    result[cardId] = newCard
                }
            })

            console.log("File now has " + Object.keys(result).length + " cards")

            if (isLast) {
                // Sauvegarder le nouvel objet JSON dans un nouveau fichier
                fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Erreur lors de l\'écriture du fichier JSON:', err);
                    } else {
                        console.log('Le fichier JSON a été modifié et sauvegardé sous', outputFilePath);
                        console.log("Cards total: " + Object.keys(result).length)
                    }
                });
            }
        } catch (e) {
            console.error('Erreur lors du traitement du fichier JSON:', e);
        }
    });
}

// Utilisation de la fonction
let inputFilePath = 'SWU_SOR.json';  // Chemin vers le fichier JSON d'entrée
const outputFilePath = 'SWUCards.json';  // Chemin vers le fichier JSON de sortie

// Add tokens manually as they are not in the .json
let res = {
    "T_01": {
        id: "T_01",
        face: {
            front: {
                name: "Battle droid",
                type: "Unit - Ground",
                cost: 0,
                image: "https://swudb.com/images/cards/TTWI/T01.png",
                isHorizontal: false
            }
        },
        name: "Battle droid",
        type: "Unit - Ground",
        cost: 0,
        rarity: "Token",
        power: 1,
        HP: 1,
        aspects: ["Villainy"],
        unique: false,
        traits: ["SEPARATIST", "DROID", "TROOPER"],
        isToken: true
    },
    "T_02": {
        id: "T_02",
        face: {
            front: {
                name: "Clone trooper",
                type: "Unit - Ground",
                cost: 0,
                image: "https://swudb.com/images/cards/TTWI/T02.png",
                isHorizontal: false
            }
        },
        name: "Clone trooper",
        type: "Unit - Ground",
        cost: 0,
        rarity: "Token",
        power: 2,
        HP: 2,
        aspects: ["Heroism"],
        unique: false,
        traits: ["REPUBLIC", "CLONE", "TROOPER"],
        isToken: true
    },
    "T_03": {
        id: "T_03",
        face: {
            front: {
                name: "Experience",
                type: "Upgrade",
                cost: 0,
                image: "https://swudb.com/images/cards/GGTS/5.png",
                isHorizontal: false
            }
        },
        name: "Experience",
        type: "Upgrade",
        cost: 0,
        rarity: "Token",
        power: 0,
        HP: 0,
        aspects: [],
        unique: false,
        traits: ["LEARNED"],
        isToken: true
    },
    "T_04": {
        id: "T_04",
        face: {
            front: {
                name: "Shield",
                type: "Upgrade",
                cost: 0,
                image: "https://swudb.com/images/cards/GGTS/6.png",
                isHorizontal: false
            }
        },
        name: "Shield",
        type: "Upgrade",
        cost: 0,
        rarity: "Token",
        power: 0,
        HP: 0,
        aspects: [],
        unique: false,
        traits: ["ARMOR"],
        isToken: true
    },
    "T_05": {
        id: "T_05",
        face: {
            front: {
                name: "TIE fighter",
                type: "Unit - Space",
                cost: 0,
                image: "https://swudb.com/images/cards/TJTL/T01.png",
                isHorizontal: false
            }
        },
        name: "TIE fighter",
        type: "Unit - Space",
        cost: 0,
        rarity: "Token",
        power: 1,
        HP: 1,
        aspects: ["Villainy"],
        unique: false,
        traits: ["VEHICLE", "FIGHTER"],
        isToken: true
    },
    "T_06": {
        id: "T_06",
        face: {
            front: {
                name: "X-Wing",
                type: "Unit - Space",
                cost: 0,
                image: "https://swudb.com/images/cards/TJTL/T02.png",
                isHorizontal: false
            }
        },
        name: "X-Wing",
        type: "Unit - Space",
        cost: 0,
        rarity: "Token",
        power: 2,
        HP: 2,
        aspects: ["Heroism"],
        unique: false,
        traits: ["VEHICLE", "FIGHTER"],
        isToken: true
    }
}

modifyJsonFile(inputFilePath, outputFilePath, res);

setTimeout(() => {
    inputFilePath = "SWU_SHD.json";
    modifyJsonFile(inputFilePath, outputFilePath, res);
}, 1000)

setTimeout(() => {
    inputFilePath = "SWU_TWI.json";
    modifyJsonFile(inputFilePath, outputFilePath, res);
}, 2000)

setTimeout(() => {
    inputFilePath = "SWU_JTL.json";
    modifyJsonFile(inputFilePath, outputFilePath, res, true);
}, 3000)

/*
inputFilePath = "SWU_JTL";
result = modifyJsonFile(inputFilePath, outputFilePath, result, true);
*/