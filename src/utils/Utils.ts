enum HitOdds {
    MISS = 0,
    HIT = 1,
    CRITICAL = 2
}

export const utils = {
    withGrid(n: number) {
        return n * 16;
    },
    asGridCoord(x: number, y: number) {
        return `${x*16},${y*16}`
    },
    nextPosition(initialX: number, initialY: number, direction: string) {
        let x = initialX;
        let y = initialY;
        const size = 16;
        if (direction === "left") { 
            x -= size;
        } else if (direction === "right") {
            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        }
        return {x,y};
    },
    attackRoll(roll: number, attack: number, defense: number) {
        if (roll === 1) {
            return HitOdds.MISS;
        } else if (roll === 20) {
            if (roll + attack >= defense) {
                return HitOdds.CRITICAL;
            } else {
                return HitOdds.HIT;
            }
        }
        if (roll + attack >= defense) {
            return HitOdds.HIT;
        } else {
            return HitOdds.MISS;
        }
    },
    // Generate a random integer between min and max
    // Inclusive - can include rolls equal to min or max 
    getRandomIntInclusive(min: number, max: number) {
        const minCeiling = Math.ceil(min);
        const maxFloor = Math.floor(max);
        return Math.floor(Math.random() * (maxFloor - minCeiling + 1) + minCeiling);
    },
}

