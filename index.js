const alfabeto= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');


const shifMessage = () =>{  
const wordArray = [...inputOriginal.value.toUpperCase()]; /* el imput original transformadoe n un array de mayusculas*/
printChar(0,wordArray);
}
const printChar = (currentLetterIndex, wordArray) =>{ /*Para ir encriptando una a una las palabras,es una funcion recursiva*/ 
if(wordArray.length === currentLetterIndex) return; /*aca se corta la recurcion :D -si es la ultima letra del imput original */
inputOriginal.value = inputOriginal.value.substring(1); /*Sacamos un valor a la legra para hacer la animacion */
const spanChar = document.createElement("span");
resultado.appendChild(spanChar);
animateChar(spanChar)
.then(() =>{

    const charSinCodificar=wordArray[currentLetterIndex]; /*El caracter en que nos encontramos en el array de palabras */
    spanChar.innerHTML=alfabeto.includes(charSinCodificar) ?  /*aca le preguntarmos a alfabeto si incluye el caracter,yua que no qwuiero "encriptarlos" entonces si esta buscamos dentro del alfabeto primero el indice del caracter y a eso le sumo el rango */
        alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] : /*le preguntamos el modulo porque si estamos en la z  y sumamos 1 hay que dar toda la vuelta */
        charSinCodificar /*si el caracter no esta dentro del alfabeto lo devolvemos como esta */
        printChar(currentLetterIndex +1,wordArray);  /*aca esta la recursividad, se llama a si misma y se meuve un lugar en el array de la palabra para que en algun momento llegue al final */
});
}

const animateChar = spanChar =>{
    let cambiosletras =0;  /*event loop */
    return new Promise(resolve => {
            const intervalo = setInterval(()=>{
                spanChar.innerHTML = alfabeto[Math.floor(Math.random()* alfabeto.length)]; /*modificamos el contenido del span por una letra aleatorea */
                cambiosletras++;  /*aca le sumamos +1 a los cambios de letra  */
                if(cambiosletras ===3){
                    clearInterval(intervalo); /*aca terminamos el intervalo dependiendo de cuantas veces se movieron las letras(3) */
                    resolve();/*una vez que pasa eso resolvemos para que pase al siguiente caracter */
                }
            },50);
    });
}


const submit =e =>{
    e.preventDefault();
    resultado.innerHTML='';
    shifMessage()
}
cifrador.onsubmit =submit;