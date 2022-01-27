import * as React from 'react';
import { collection, addDoc, getDocs, onSnapshot } from '@firebase/firestore';
import { firestoreData } from '../services/firebase';
import Slot from '../types/Slot';
//import {Fragment, useState, useEffect} from 'react';

interface DayListProps extends Partial<React.PropsWithChildren<React.ReactHTMLElement<HTMLDivElement>>> {
    dayId: string
};

const DayList: React.FC<DayListProps> = ({ children, dayId, ...props }) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string>();
    const [reservations, setReservations] = React.useState<Slot[]>([])

    const slotsInADay = collection(firestoreData, `days/${dayId}/days`);

    const bookATime = React.useCallback(async () => {
        addDoc(slotsInADay, {} as Slot)
    }, [slotsInADay])

    // Fetching the data once
    React.useEffect(() => {
        getDocs(slotsInADay)
            .then((data) => {
                const r = data.docs.map(doc => doc.data() as Slot);
                setReservations(r)
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
                setError(e)
            });
    }, [slotsInADay])

    // Subscription to data updates
    React.useEffect(() => {
        return onSnapshot(slotsInADay, {
            next: (querySnapshot) => {
                // if (querySnapshot.metadata.hasPendingWrites)
                //     return;
                const r = querySnapshot.docs.map(doc => doc.data() as Slot);
                setReservations(r)
            }
        })
    }, [slotsInADay])

    return <div>
        
    </div>
}

export default DayList;
