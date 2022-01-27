import * as React from 'react';
import { collection, addDoc, getDocs, onSnapshot } from '@firebase/firestore';
import { firestoreData } from '../services/firebase';
import Slot from '../types/Slot';
import Reservation from '../types/Reservation';
import Table from './table';
//import {Fragment, useState, useEffect} from 'react';

interface DayListProps extends Partial<React.PropsWithChildren<React.ReactHTMLElement<HTMLDivElement>>> {
    dayId: string
};

const DayList: React.FC<DayListProps> = ({ children, dayId, ...props }) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string>();
    const [reservations, setReservations] = React.useState<Reservation[]>([])
    const [openingHour, closingHour] = [9, 18];
    const slotsInADay = collection(firestoreData, `days/${dayId}/reservations`);

    const bookATime = React.useCallback(async (time: string, bookedSlots: number) => {
        addDoc(slotsInADay, { time, bookedSlots } as Reservation)
    }, [slotsInADay])

    // Fetching the data once
    React.useEffect(() => {
        getDocs(slotsInADay)
            .then((data) => {
                const r = data.docs.map(doc => doc.data() as Reservation);
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
                const r = querySnapshot.docs.map(doc => doc.data() as Reservation);
                setReservations(r)
            }
        })
    }, [slotsInADay])


    let times: Reservation[] = React.useMemo(() => {
        let arr = [];
        for (let hour = openingHour; hour < closingHour; hour++) {
            for (let minutes = 0; minutes < 6; minutes++) {
                const time = `${hour}:${minutes * 10}`;
                const bookedSlots = reservations.find(_ => _.time === time)?.bookedSlots ?? 0;
                arr.push({ time, bookedSlots })
            }
        }
        return arr
    }, [closingHour, openingHour, reservations]);

    return <div>
        {times.map(time => {

        })}
    </div>
}

export default DayList;
