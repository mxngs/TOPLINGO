'use scrict'

//const de mudar o modo da tela (escuro/claro)
const chk = document.getElementById('chk')

//const da entrada de voz
const botaoVoz = document.getElementById('botaoVoz');

// botão de entrada

const botaoFalarTraducao = document.getElementById('botaoFalar');

const text = document.querySelector("#text");
const linguas = document.querySelectorAll("select");
const traducao = document.querySelector("#traducao");
const botao = document.getElementById("botao");

//const que guarda as linguas do tradutor
const linguagens = {
  "en-GB": "Inglês",
  "pt-BR": "Português",
  "es-ES": "Espanhol",
  "it-IT": "Italiano",
  "ja-JP": "Japonês"
};

botaoFalarTraducao.addEventListener('click', () => {
  const traducaoText = traducao.value;
  if (traducaoText) {
    falarTraducao(traducaoText);
  } else {
    falarTraducao('Nenhuma tradução disponível.');
  }
});

function falarTraducao(texto) {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = linguas[1].value; // Defina o idioma da tradução aqui
  speechSynthesis.speak(utterance);
}


// mudar modo da tela pra escuro
chk.addEventListener('change', () => {
  document.body.classList.toggle('dark')
})

//Requisito mudar o tema do site com a palavra "alice"
botao.addEventListener('click', () => {
  
  if(text.value){
    traducaoApi()
  }else{
    text.value = ""
  }
  if(text.value.trim().toLowerCase() === "alice"){
    document.body.classList.toggle('dark')
  }
});

// reconhecimento de voz após apertar o botão
botaoVoz.addEventListener('click', () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.onresult = function(event) {
    const resultado = event.results[0][0].transcript;
    text.value = resultado; 
  };
  recognition.start();
});

function falarTraducao(traducao) {
  const utterance = new SpeechSynthesisUtterance(traducao);
  utterance.lang = 'pt-BR'; 
  speechSynthesis.speak(utterance);
};

// botaoFalarTraducao.addEventListener('click', () => {
//   const traducao = inputTraducao.value;
  
//   if (traducao) {
//     falarTraducao(traducao);
//   } else {
//     falarTraducao('Nenhuma tradução disponível.');
//   }
// });



//Selecionar as linguas da api
linguas.forEach((select) => {
  for (let id in linguagens) {
    let option = document.createElement("option");
    option.value = id;
    option.textContent = linguagens[id];
    if ((select.classList.contains("linguas") && id === "pt-BR") ||
        (select.classList.contains("linguas2") && id === "en-GB")) {
      option.selected = true;
    }
    select.appendChild(option);
  }
});

//Traduzir
botao.addEventListener("click", () => {
  
    traducaoApi();
  
});

function traducaoApi() {
  const lang1 = linguas[0].value;
  const lang2 = linguas[1].value;
  fetch(
    `https://api.mymemory.translated.net/get?q=${text.value}&langpair=${lang1}|${lang2}`
  )
    .then((res) => res.json())
    .then((data) => {
      traducao.value = data.responseData.translatedText;
    });
}