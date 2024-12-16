const audio = document.getElementById('MeuAudio');
const playPauseBtn = document.getElementById('playPauseBtn')
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const repeatButton = document.getElementById('repeteBtn');
const trackTitleElemento = document.getElementById('musicaTitulo')
//const currentTime = document.getElementById("currtentTime");

let currentTrackIndex = 0;


const MinhaPlaylist = [
    { src: "./music/♪ Deadpool (Finge que é Jujutsu) _ Ado ado ado _ AniRap.mp3", title: "Deadpool (Finge que é Jujutsu) - Ado ado ado - AniRap" },
    { src: "./music/CHAOSS - GANÂNCIA (Prod.Haku).mp3", title: "CHAOSS - GANÂNCIA (Prod. Haku)" },
    { src: "./music/NIKK - _Não Estou Errado_ (prod. Lissa).mp3", title: "NIKK - Não Estou Errado (prod. Lissa)" },
    { src: "./music/3x4.mp3", title: "3x4" },
    { src: "./music/Otaku.mp3", title: "Otaku" },
    { src: "./music/enmiosis - Bonde do Magneto (feat. D$ Luqi, Vidari, izxx).mp3", title: "enmiosis - Bonde do Magneto (feat. D$ Luqi, Vidari, izxx)" }
]

playPauseBtn.addEventListener('click' , ()=>{
    if(audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
})

//Titulo da musica que esta sendo tocada
function updateTrackTitle(){
    trackTitleElemento.textContent = MinhaPlaylist[currentTrackIndex].title
}

//Função para a musica voltar
function prevTrack(){
    if(currentTrackIndex > 0 ){
        currentTrackIndex--;
        audio.src = MinhaPlaylist[currentTrackIndex].src;
        audio.load();
        audio.play();
        updateTrackTitle();
    } else {
        console.log('Chegou no começo da playlist')
    }
    console.log('Musica anterior mostrada')
}

prevBtn.addEventListener('click', prevTrack)

//Função para ir para proxima musica
function nextTrack(){
    if(currentTrackIndex < MinhaPlaylist.length - 1) {
        currentTrackIndex++;
        audio.src = MinhaPlaylist[currentTrackIndex].src;
        audio.load();
        audio.play();
        updateTrackTitle();
    }else{
        currentTrackIndex = 0;
        audio.src = MinhaPlaylist[currentTrackIndex].src;
        audio.play();
        audio.load();
        updateTrackTitle();
    }
    console.log('Proxima musica mostrada')
}

nextBtn.addEventListener('click' , nextTrack)

//Tratamento para caso der erro na hora de passar para a proxima musica
function loadNextTrack(){
    if(currentTrackIndex < MinhaPlaylist.length - 1){
        currentTrackIndex++;
        audio.src = MinhaPlaylist[currentTrackIndex].src;
        audio.load().then(() => {
            audio.play();
        }).catch((error) => {
            console.log('Erro ao carregar proxima musica' , error)
        });
    }else{
        console.log('Acabou a playlist');
    }
}

//Tratamento para caso der erro na hora de voltar para outra musica
function loadPrevTrack(){
    if(currentTrackIndex < MinhaPlaylist.length - 1){
        currentTrackIndex--;
        audio.src = MinhaPlaylist[currentTrackIndex].src;
        audio.load().then(() => {
            audio.play();
        }).catch((error) => {
            console.log('Erro ao voltar a musica' , error)
        });
    }else{
        console.log('Acabou a playlist');
    }
}

//Esse botao e para fazer que ele repita a mesma musica em loop
repeatButton.addEventListener('click' , function(){
    if(audio.loop){
        audio.loop = false;
    }
    else{
        audio.loop = true;
    }
})

//Avança para a proxima musica quando ela acabar e ela for para a primeira da lista
audio.addEventListener('ended', ()=>{
    if(currentTrackIndex< MinhaPlaylist.length - 1){
        nextTrack();
    }else{
        currentTrackIndex = 0;
        audio.src = MinhaPlaylist[currentTrackIndex].src;
        audio.play();
        audio.load();
        updateTrackTitle();
    }
});
updateTrackTitle();

/*function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const remaingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remaingSeconds < 10 ? '0' : ''}${remaingSeconds}`;
}*/


//Atualizando o tempo atual da musica
/*audio.ontimeupdate = function(){
    console.currentTimeDisplay = audio.currentTimeDisplay;
    currentTimeDisplay.textContent = formatTime(currentTime)
};*/