import {format} from "date-fns"

import { parseISO } from 'date-fns'; 
import { zonedTimeToUtc } from 'date-fns-tz';



const dateFormat = (date,output) => {
    
    let newDate =  date.toString().slice(0,10)

    if(output){
    newDate = newDate.split('-')
    newDate = newDate[2]+'/'+newDate[1]+'/'+newDate[0]
    }
    return newDate
}


export default dateFormat