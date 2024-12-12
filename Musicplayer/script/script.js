const audio = document.getElementById('MeuAudio');
const playPauseBtn = document.getElementById('playPauseBtn')
//const playBtn = document.getElementById('playBtn');
//const pauseBtn = document.getElementById('pauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const repeatButton = document.getElementById('repeteBtn')

//const currentTime = document.getElementById("currtentTime");

let currentTrackIndex = 0;

//Aqui e onde vai ser adicionadas as musicas
const MinhaPlaylist = [
    "./music/NIKK - _Não Estou Errado_ (prod. Lissa).mp3",
    "./music/CHAOSS - GANÂNCIA (Prod.Haku).mp3",
    "./music/♪ Deadpool (Finge que é Jujutsu) _ Ado ado ado _ AniRap.mp3",
    "./music/3x4.mp3",
    "./music/Otaku.mp3",
    "./music/enmiosis - Bonde do Magneto (feat. D$ Luqi, Vidari, izxx).mp3"
]

/*function playPause(){
    if(audio.paused){
        audio.play;
        toggleButtons(true);
    }else{
        audio.pause();
        toggleButtons(false)
    }
}*/

function toggleButtons(isPlaying) {
    if (isPlaying) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    } else {
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
}

playPauseBtn.addEventListener('click' , ()=>{
    if(audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
})

/*playBtn.addEventListener('click', ()=>{
    audio.play();
    toggleButtons(true);
})

pauseBtn.addEventListener('click' , () =>{
    audio.pause();
    toggleButtons(false)
})*/

//Função para a musica voltar
function prevTrack(){
    if(currentTrackIndex > 0 ){
        currentTrackIndex--;
        audio.src = MinhaPlaylist[currentTrackIndex];
        audio.load();
        audio.play();
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
        audio.src = MinhaPlaylist[currentTrackIndex];
        audio.load();
        audio.play();
    }else{
        console.log('Chegou no final da playlist')
    }
    console.log('Proxima musica mostrada')
}

nextBtn.addEventListener('click' , nextTrack)

//Tratamento para caso der erro na hora de passar para a proxima musica
function loadNextTrack(){
    if(currentTrackIndex < MinhaPlaylist.length - 1){
        currentTrackIndex++;
        audio.src = MinhaPlaylist[currentTrackIndex];
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
        audio.src = MinhaPlaylist[currentTrackIndex];
        audio.load().then(() => {
            audio.play();
        }).catch((error) => {
            console.log('Erro ao voltar a musica' , error)
        });
    }else{
        console.log('Acabou a playlist');
    }
}

repeatButton.addEventListener('click' , function(){
    if(audio.loop){
        audio.loop = false;
    }
    else{
        audio.loop = true;
    }
})

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