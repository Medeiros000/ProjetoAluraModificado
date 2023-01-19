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
    const vogais = 'aeiou';
    const letras = input.split('');
    for (let i = 0; i < letras.length; i++) {
        if (vogais.indexOf(letras[i]) !== -1) {
            if(letras[i] == 'a'){
                letras[i] = 'ai';
            }
            if(letras[i] == 'e'){
                letras[i] = 'enter';
            }
            if(letras[i] == 'i'){
                letras[i] = 'imes';
            }
            if(letras[i] == 'o'){
                letras[i] = 'ober';
            }
            if(letras[i] == 'u'){
                letras[i] = 'ufat';
            }
        }
    }
    return letras.join('');
}
function decodificar(palavra) {
    var mapping = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };
    return palavra.replace(/ai/g, mapping['ai'])
                    .replace(/enter/g, mapping['enter'])
                        .replace(/imes/g, mapping['imes'])
                            .replace(/ober/g, mapping['ober'])
                                .replace(/ufat/g, mapping['ufat']);
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