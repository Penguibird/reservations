import Person from "./Person";

interface SlotBase {
    type: string
}

interface EmptySlot extends SlotBase {
    type: "empty"
}
interface PendingSlot extends SlotBase {
    type: "pending"
}
interface BookedSlot extends SlotBase {
    type: "booked"
    personDetails: Person
}


type Slot = EmptySlot | PendingSlot | BookedSlot;

export default Slot