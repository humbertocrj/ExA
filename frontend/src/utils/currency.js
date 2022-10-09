export const floatToCurrency = (value, input, setValue)=>{

    let newValue = value.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
    
    if(input){
        let newValue = value.replace(/\D/g,'');
        newValue = (newValue/100).toFixed(2) + '';
        newValue = newValue.replace(".", ",");
        newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        newValue = "R$"+newValue
        setValue(newValue)
        return newValue
    }
        
    return newValue
}

export const currencyToFloat = (value)=>{
    let newValue = value.replaceAll(".","")
    newValue = newValue.replace("R$", "")
    newValue = newValue.replace(",",".")
    newValue = parseFloat(newValue)
 
    return newValue
}

