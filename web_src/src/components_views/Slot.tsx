import * as React from 'react';
import Slot from '../types/Slot';
import styled from '@emotion/styled'
//import {Fragment, useState, useEffect} from 'react';

const SlotWrapper = styled('button')`
    margin: 0;
`

interface SlotProps extends Partial<React.PropsWithChildren<React.ReactHTMLElement<HTMLDivElement>>> {
    slot: Slot
    book: () => void
};

const SlotComponent: React.FC<SlotProps> = ({ children, slot, book, ...props }) => {
    return <SlotWrapper {...props} onClick={book}>
        
    </SlotWrapper>
}

export default SlotComponent;
