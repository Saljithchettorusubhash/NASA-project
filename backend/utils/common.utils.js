export const strcutureResponse = (body,success,message)=>{
    return {
        header:{
            success,
            message
        
        },
        body:body
    }
};

export const parseTime = (time)=>{
    let parsedTime = time.split(':');
    let hours = parsedTime[0].padStart(2, '0');  
    return `${hours}:${parsedTime[1]}:${parsedTime[2]}`;
}
export const datetimeRegex = new RegExp(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/);

