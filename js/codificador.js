let encodeButton = document.getElementById("encode");
let decodeButton = document.getElementById("decode");
let copyButton = document.getElementById("copiar");
let eraseButton = document.getElementById("reset");
let moveValor = document.getElementById("mover");
let compartilhar = document.getElementById("wpp");

function capturaEcodifica() {
    let input = document.getElementById("txt-input").value;
    let teste = seMaiusculasOuAcentuadas(input);
    if (input == "") {
        msgDiv("Não há nada para criptografar");
    } else if (teste === true) {
        msgDiv("Use apenas letras minuscúlas e sem acento.");
    } else {
        let codificado = codificar(input);
        escreve(codificado);
        mostrarDiv("output");
        mostrarDiv("mover");
    }
}
function capturaEdecodifica() {
    let input = document.getElementById("txt-input").value;
    let teste = seMaiusculasOuAcentuadas(input);
    if (input == "") {
        msgDiv("Não há nada para descriptografar");
    } else if (teste === true) {
        msgDiv("Use apenas letras minuscúlas e sem acento.");
    } else {
        let decodificado = decodificar(input);
        escreve(decodificado);
        mostrarDiv("output");
        mostrarDiv("mover");
    }
}
function escreve(frase) {
    document.getElementById('txt-output').innerHTML = (frase);
}
function copia() {
    document.getElementById('txt-output').select();
    document.execCommand("copy");
    msgDiv("O texto foi copiado.");
}
function valor() {
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
    let mapping = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };
    for (let key in mapping) {
        palavra = palavra.replace(new RegExp(key, 'g'), mapping[key]);
    }
    return palavra;
}
function seMaiusculasOuAcentuadas(texto) {
    const regex = /[A-ZÁÉÍÓÚÀÈÌÒÙÃÕÇáéíóúàèìòùãõç]/;
    return regex.test(texto)
}
function mostrarDiv(divAlvo) {
    let div = document.getElementById(divAlvo);
    div.classList.remove("hidden");
    div.classList.add("fade-in");
}
function esconderDiv(divAlvo) {
    let div = document.getElementById(divAlvo);
    div.classList.remove("fade-in");
    div.classList.add("hidden");
}
function reload() {
    location.reload();
    document.getElementById("txt-input").value = "";
    document.getElementById("txt-output").innerText = "";
}
function wpp() {
    window.open("https://wa.me/?text=" + document.getElementById("txt-output").value);
}
function msgDiv(msg) {
    let div = document.createElement("div");
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
    setTimeout( () => {
        let element = document.getElementById("floating-div");
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
input.addEventListener("input", () => {
    input.value = removerAcentos(input.value.toLowerCase());
});

input.addEventListener("paste", () => {
    setTimeout( () => {
        input.value = removerAcentos(input.value.toLowerCase());
    }, 0);
});

function removerAcentos(texto) {
    let comAcentos = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    let semAcentos = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let novoTexto = "";
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto.charAt(i);
        let index = comAcentos.indexOf(caracter);
        if (index > -1) {
            caracter = semAcentos.charAt(index);
        }
        novoTexto += caracter;
    }
    return novoTexto;
}