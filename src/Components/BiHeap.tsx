import React, {} from 'react';
import Row from './Row';
import { PQ_Node_json } from '../function/DS_PriorityQueue_BiHeap';

import '../style/BiHeap.scss';

function computeNumberOfRows(list: Array<PQ_Node_json>, exp: number = 1): number {
    const compareValue = Math.pow(2, exp - 1)
    if(list.length >= compareValue) return computeNumberOfRows(list, exp + 1);
    return exp;
}

function deFlatList (list: Array<PQ_Node_json>): Array<Array<PQ_Node_json | undefined>> {
    const rowCount = computeNumberOfRows(list);
    let newList = list.map(el=>el);
    
    let array : Array<Array<PQ_Node_json | undefined>> = [];
    

    for (let i = 1; i <= rowCount; i++) {
        let compareValue = Math.pow(2,i-1);
        let current: Array<PQ_Node_json | undefined> = [];
        
        for(let j = 0; j < compareValue; j++){
            if(newList[0]===undefined){
                current.push({val:'none',priority:0})
            }else{
                current.push(newList.shift());
            }
        }

        array.push(current);
    }
    return array;
}

interface BiHeapProps {
    list: Array<PQ_Node_json>;
}
 
const BiHeap: React.FC<BiHeapProps> = ({list}) => {

    const formattedList = deFlatList(list);

    return ( 
        <div className="BiHeap">
            {
                formattedList.map((el,idx)=><Row key={idx} row={idx} data={el}/>)
            }
        </div>
    );
}
 
export default BiHeap;