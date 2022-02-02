export const fcConvert = (fc) =>{
    let day = fc.getDate()<10 ? "0"+fc.getDate() : fc.getDate();
    if(fc.getMonth()<9){
        return (day+"/"+"0"+(parseInt(fc.getMonth())+1)+"/"+fc.getFullYear())
    }else{
        return (day+"/"+fc.getMonth()+1+"/"+fc.getFullYear())
    }
}

export const equipos = [
        {id:"pc",eq_nombre:"COMPUTADOR DE ESCRITORIO"},
        {id:"lap",eq_nombre:"LAPTOP"},
        {id:"imp",eq_nombre:"IMPRESORA/ESCANER"}
];