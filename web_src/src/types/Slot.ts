import Person from "./Person";

interface SlotBase {
    type: string
    time: number
}

export interface EmptySlot extends SlotBase {
    type: "empty"
}
export interface PendingSlot extends SlotBase {
    type: "pending"
}
export interface BookedSlot extends SlotBase {
    type: "booked"
    personDetails: Person
}


type Slot = EmptySlot | PendingSlot | BookedSlot;

export default Slot