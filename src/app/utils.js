import validator from 'validator';


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

export const isNumber = (x) =>{
    return !validator.isNumeric(x);
}

export const isMinMax = (value, min, max) =>{
    return ((value.length < min) || (value.length > max))
}

export const isMail = (value) =>{
    return !validator.isEmail(value);
}

export const isNull = (value) =>{
    if(value==null) return true;
    return (validator.isEmpty(value));
}

export const checkCedula = (cedula) =>{
    if(cedula.length == 10){ 
        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0,2);
        
        //Pregunto si la region existe ecuador se divide en 24 regiones
        if( digito_region >= 1 && digito_region <=24 ){
          
          // Extraigo el ultimo digito
          var ultimo_digito   = cedula.substring(9,10);

          //Agrupo todos los pares y los sumo
          var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

          //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
          var numero1 = cedula.substring(0,1);
          var numero1 = (numero1 * 2);
          if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

          var numero3 = cedula.substring(2,3);
          var numero3 = (numero3 * 2);
          if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

          var numero5 = cedula.substring(4,5);
          var numero5 = (numero5 * 2);
          if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

          var numero7 = cedula.substring(6,7);
          var numero7 = (numero7 * 2);
          if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

          var numero9 = cedula.substring(8,9);
          var numero9 = (numero9 * 2);
          if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

          var impares = numero1 + numero3 + numero5 + numero7 + numero9;

          //Suma total
          var suma_total = (pares + impares);

          //extraemos el primero digito
          var primer_digito_suma = String(suma_total).substring(0,1);

          //Obtenemos la decena inmediata
          var decena = (parseInt(primer_digito_suma) + 1)  * 10;

          //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
          var digito_validador = decena - suma_total;

          //Si el digito validador es = a 10 toma el valor de 0
          if(digito_validador == 10)
            var digito_validador = 0;

          //Validamos que el digito validador sea igual al de la cedula
          if(digito_validador == ultimo_digito){
            return ('La cedula:' + cedula + ' es correcta');
          }else{
            return ('La cedula:' + cedula + ' es incorrecta');
          }
          
        }else{
          // imprimimos en consola si la region no pertenece
          return ('Esta cedula no pertenece a ninguna region');
        }
     }else{
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        return ('Esta cedula tiene menos de 10 Digitos');
     }  
}