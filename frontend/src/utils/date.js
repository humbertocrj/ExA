import {format} from "date-fns"

const dateFormat = (date) => {
      
    const newDate =  date.toString().slice(0,10)
    return  newDate

}

export default dateFormat