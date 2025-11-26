const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#musica-foco');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const startPauseBt = document.querySelector('#start-pause');
let tempoDeCorridoEmSegundos = 5;
let intervaloId = null;

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    banner.setAttribute('src', `/imagens/${contexto}.png`) // quando colocar um parametro dentro de uma string, usar crase (` `) e ${parametro}
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    }
}

function inciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

const contagemRegressiva = () => {
    if (tempoDeCorridoEmSegundos === 0) {
        audioTempoFinalizado.play()
        zerar();
        alert('O tempo acabou!');
        return;
    }
    tempoDeCorridoEmSegundos -= 1;
    console.log(tempoDeCorridoEmSegundos);

}

startPauseBt.addEventListener('click', inciarOuPausar)


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.loop = true;
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});