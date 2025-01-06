const audio = document.getElementById('MeuAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const repeatButton = document.getElementById('repeteBtn');
const trackTitleElemento = document.getElementById('musicaTitulo');
const albumCover = document.getElementById("albumCover");
const progressBar = document.getElementById("progressBar");
const progressFill = document.querySelector('.progress-bar-fill')
//const volumeBtn = document.getElementById("vol");


let currentTrackIndex = 0;


const MinhaPlaylist = [
    { src: "./music/♪ Deadpool (Finge que é Jujutsu) _ Ado ado ado _ AniRap.mp3", title: "Deadpool (Finge que é Jujutsu) - Ado ado ado - AniRap", cover:"./imgMusicas/Deadpool.jpg"},
    { src: "./music/CHAOSS - GANÂNCIA (Prod.Haku).mp3", title: "CHAOSS - GANÂNCIA (Prod. Haku)", cover:"./imgMusicas/Ganancia.jpg" },
    { src: "./music/NIKK - _Não Estou Errado_ (prod. Lissa).mp3", title: "NIKK - Não Estou Errado (prod. Lissa)",cover:"./imgMusicas/Nao estou errado.jpg" },
    { src: "./music/3x4.mp3", title: "3x4", cover:"./imgMusicas/3x4.jpg" },
    { src: "./music/Otaku.mp3", title: "Otaku", cover:"./imgMusicas/Otaku.jpeg" },
    { src: "./music/enmiosis - Bonde do Magneto (feat. D$ Luqi, Vidari, izxx).mp3", title: "enmiosis - Bonde do Magneto (feat. D$ Luqi, Vidari, izxx)", cover:"./imgMusicas/Bonde do magneto.jpg"},
    {src: "./music/5. Tiny Lobelia - Evellyne  (ft. Jvrthxypz, Junim, Ark King) [Prod. ohayomatsu].mp3", title:"Evellyne(Ark king)", cover:"./imgMusicas/Lobelia garden.jpg"},
]

playPauseBtn.addEventListener('click' , ()=>{
    if(audio.paused){
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
    }
    else{
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
    }
})

//Titulo da musica que esta sendo tocada
function updateTrackTitle(){
    trackTitleElemento.textContent = MinhaPlaylist[currentTrackIndex].title
    albumCover.src = MinhaPlaylist[currentTrackIndex].cover
}

//Função para a musica voltar
function prevTrack(){
    if(currentTrackIndex > 0){
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

//Aqui vai ficar o controle de volume
/*volumeBtn.addEventListener('input', ()=>{
    let volumeValue = parseFloat(volumeBtn.value);
    if(volumeBtn < 0) volumeBtn = 0;
    if(volumeBtn > 1) volumeBtn = 1;
    audio.volume = volumeValue;
})*/ 

//Aqui atualiza a barra de progresso conforme o audio vai tocando
audio.addEventListener('timeupdate', ()=>{
    if(audio.duration){
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${progress}%`
    }
});

progressBar.addEventListener('input', ()=>{
    const value = progressBar.value;
    const duration = audio.duration;

    audio.currentTime = (value / 100) * duration
})

audio.addEventListener('timeupdate', ()=> {
    const progress = (audio.currentTime / audio.duration) * 100
    progressBar.value = progress;
})