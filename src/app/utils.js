export const fcConvert = (fc) =>{
    let day = fc.getDate()<10 ? "0"+fc.getDate() : fc.getDate();
    let hours = fc.getHours()<10 ? "0"+fc.getHours() : fc.getHours();
    let minutes = fc.getMinutes()<10 ? "0"+fc.getMinutes() : fc.getMinutes();
    let seconds = fc.getSeconds()<10 ? "0"+fc.getSeconds() :fc.getSeconds();
    let time = hours+":"+minutes+":"+seconds;
    if(fc.getMonth()<9){
        return (day+"/"+"0"+(parseInt(fc.getMonth())+1)+"/"+fc.getFullYear()+" "+time)
    }else{
        return (day+"/"+fc.getMonth()+1+"/"+fc.getFullYear()+" "+time)
    }
}

export const equipos = [
        {id:"pc",eq_nombre:"COMPUTADOR DE ESCRITORIO"},
        {id:"lap",eq_nombre:"LAPTOP"},
        {id:"imp",eq_nombre:"IMPRESORA/ESCANER"},
        {id:"mon",eq_nombre:"MONITOR"},
        {id:"carg",eq_nombre:"CARGADOR"},
        {id:"one", eq_nombre:"TODO EN UNO"},
        {id:"otr", eq_nombre:"OTROS"}
];

export const estadosTickets = [
    {id:"reab",est_nombre:"RE-ABIERTO"},
    {id:"diag",est_nombre:"DIAGNÓSTICO"},
    {id:"repa",est_nombre:"REPARACIÓN"},
    {id:"espe",est_nombre:"EN ESPERA"},
    {id:"adq",est_nombre:"ADQUISICIÓN"},
    {id:"comp",est_nombre:"COMPLETO"},
    {id:"cerr",est_nombre:"CERRADO"},
    {id:"devo",est_nombre:"DEVUELTO"}
];

export const round10 = (type, value, exp) => {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Data Set ejemplo para Historial
export const historial = [
    {code:'com',estado:'Completo',tecnico:'José',observacion:'Lorem ipsum dorime'},
    {code:'rep',estado:'Reparación',tecnico:'José',observacion:'Formateada y lista para entrega'},
    {code:'diag',estado:'Diagnóstico',tecnico:'José',observacion:'Ameno machide dorime'}
]

