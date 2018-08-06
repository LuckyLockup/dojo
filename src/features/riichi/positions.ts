export const East = "East";
export const North = "North";
export const West = "West";
export const South = "South";
export type Position = typeof East | typeof North | typeof West | typeof South

export const next = (p1: Position): Position => {
    switch (p1) {
        case East: return North;
        case North: return West;
        case West: return South;
        case South: return East;
    }
};