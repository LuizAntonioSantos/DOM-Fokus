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
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector('#timer')
let tempoDeCorridoEmSegundos = 1500;
let intervaloId = null;

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
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
    inciarOuPausar.textContent = "Pausar"
    inciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId);
    inciarOuPausar.textContent = "Começar"
    inciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

const contagemRegressiva = () => {
    if (tempoDeCorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        alert('O tempo acabou!');
        zerar();
        return;
    }
    tempoDeCorridoEmSegundos -= 1;
    mostrarTempo()

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
    tempoDeCorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

mostrarTempo()