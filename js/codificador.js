var encodeButton = document.getElementById("encode");
var decodeButton = document.getElementById("decode");
var copyButton = document.getElementById("copiar");
var eraseButton = document.getElementById("reset");
var moveValor = document.getElementById("mover");
var compartilhar = document.getElementById("wpp");

function capturaEcodifica(){
    var input = document.getElementById("txt-input").value;
    var teste = seMaiusculasOuAcentuadas(input);
    if(input == ""){
        msgDiv("Não há nada para criptografar");
    }else if(teste==true){
        msgDiv("Use apenas letras minuscúlas e sem acento.");
    }else{
        var codificado = codificar(input);
        escreve(codificado);
        mostrarDiv("output");
        mostrarDiv("mover");
    }
}
function capturaEdecodifica(){
    var input = document.getElementById("txt-input").value;
    var teste = seMaiusculasOuAcentuadas(input);
    if(input == ""){
        msgDiv("Não há nada para descriptografar");
    }else if(teste==true){
        msgDiv("Use apenas letras minuscúlas e sem acento.");
    }else{
        var decodificado = decodificar(input);
        escreve(decodificado);
        mostrarDiv("output");
        mostrarDiv("mover");
    }
}
function escreve(frase){
    document.getElementById('txt-output').innerHTML = (frase);
}
function copia(){
    document.getElementById('txt-output').select();
    document.execCommand("copy");
    msgDiv("O texto foi copiado.");
}
function valor(){
    document.getElementById("txt-input").value = document.getElementById("txt-output").value;
    esconderDiv("output");
    esconderDiv("mover");
}
function codificar(input) {
    const vogais = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };
    let output = "";
    for (let letra of input) {
        if (letra in vogais) {
            output += vogais[letra];
        } else {
            output += letra;
        }
    }
    return output;
}
function decodificar(palavra) {
    var mapping = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };
    for (var key in mapping) {
        palavra = palavra.replace(new RegExp(key, 'g'), mapping[key]);
    }
    return palavra;
}
function seMaiusculasOuAcentuadas(texto){
    const regex = /[A-ZÁÉÍÓÚÀÈÌÒÙÃÕÇáéíóúàèìòùãõç]/;
    return regex.test(texto)
}
function mostrarDiv(divAlvo) {
    var div = document.getElementById(divAlvo);
    div.classList.remove("hidden");
    div.classList.add("fade-in");
}
function esconderDiv(divAlvo) {
    var div = document.getElementById(divAlvo);
    div.classList.remove("fade-in");
    div.classList.add("hidden");
}
function reload(){
    location.reload();
    document.getElementById("txt-input").value="";
    document.getElementById("txt-output").innerText="";
}
function wpp(){
    window.open("https://wa.me/?text=" + document.getElementById("txt-output").value);
}
function msgDiv(msg) {
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "6.25rem";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.backgroundColor = "var(--amarelo)";
    div.style.color = "var(--preto)";
    div.style.padding = "1.25rem";
    div.style.borderRadius = "0.5rem";
    div.style.width = "80%";
    div.innerHTML = msg;
    div.setAttribute("id", "floating-div");
    document.body.appendChild(div);
    setTimeout(function(){
        var element = document.getElementById("floating-div");
        element.parentNode.removeChild(element);
    }, 1000);
  }
encodeButton.onclick = capturaEcodifica;
decodeButton.onclick = capturaEdecodifica;
copyButton.onclick = copia;
eraseButton.onclick = reload;
moveValor.onclick = valor;
compartilhar.onclick = wpp;

/*    Remover acentos, Transformar letras maiúsculas em minúsculas e texto colado ser revisado nessa regras    */

const input = document.getElementById("txt-input");
input.addEventListener("input", function() {
    input.value = removerAcentos(input.value.toLowerCase());
});

input.addEventListener("paste", function() {
    setTimeout(function(){
        input.value = removerAcentos(input.value.toLowerCase());
    }, 0);
});

function removerAcentos(texto) {
    var comAcentos = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    var semAcentos = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    var novoTexto = "";
    for (var i = 0; i < texto.length; i++) {
        var caracter = texto.charAt(i);
        var index = comAcentos.indexOf(caracter);
        if (index > -1) {
            caracter = semAcentos.charAt(index);
        }
        novoTexto += caracter;
    }
    return novoTexto;
}