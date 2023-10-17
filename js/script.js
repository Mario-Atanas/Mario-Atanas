

//MUDANDO NOME DO CABEÇALHO
var categoria="";
var link= window.location.href;
var videoId = ""; // ID do vídeo a ser reproduzido
var links ={
	linkAula1Logica:"8mei6uVttho",
	linkAula2Logica:"M2Af7gkbbro",
	linkAula1Javascript:"Ptbk2af68e8",
	linkAula2Javascript:"rUTKomc2gG8",
	linkAula1Phyton:"S9uPNppGsGo",
	linkAula2Phyton:"Mp0vhMDI7fA",
};


if(link.indexOf("logica")>-1){
	categoria="Curso de Logica de Programação";
	videoId=links.linkAula1Logica;
}

else if(link.indexOf("javascript")>-1){
	categoria="Curso de JavaScript";
	videoId=links.linkAula1Javascript;
}

else{
	categoria="Curso de Phyton";
	videoId=links.linkAula1Phyton;
}
document.getElementById("titulo").textContent=categoria;

//--------------------------






//EVENTO DE LISTA DE AULAS

function aula1(){
	if(link.indexOf("logica")>-1){
	playVideo(links.linkAula1Logica);
}

else if(link.indexOf("javascript")>-1){
	playVideo(links.linkAula1Javascript);
}

else{
playVideo(links.linkAula1Phyton);
}
	
}
  
//----------


function aula2(){
	
	if(link.indexOf("logica")>-1){
playVideo(links.linkAula2Logica);
}

else if(link.indexOf("javascript")>-1){
	
	playVideo(links.linkAula2Javascript);
}

else{
	playVideo(links.linkAula2Phyton);
}
	
}







//USANDO API DO YOUTUBE PARA REPRODUZIR VIDEOS

// Variável global para verificar se a API do YouTube foi carregada
var youtubeApiLoaded = false;
var player; // Objeto de vídeo do YouTube

var apiKey="AIzaSyB4NVqOacS10E67ft4roLGbcBZI80ctwyQ";
onYouTubeIframeAPIReady();
// Tempo limite para aguardar a API do YouTube (em milissegundos)
var youtubeApiLoadTimeout = 10000; // Por exemplo, 10 segundos

// Função para inicializar a API do YouTube e o player
function initializeYouTubePlayer() {
    if (window.navigator.onLine) {
        var timeoutId;

        // Defina um tempo limite para a API do YouTube ser carregada
        timeoutId = setTimeout(function () {
            if (!youtubeApiLoaded) {
                showError('Erro: A API do YouTube não pôde ser carregada. Verifique sua conexão de rede e tente novamente.');
            }
        }, youtubeApiLoadTimeout);

        if (youtubeApiLoaded) {
            clearTimeout(timeoutId); // Cancela o tempo limite se a API for carregada
            player = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: videoId,
				playerVars: {
                    'key': apiKey,
                   // 'autoplay': 1, // Auto reproduzir o vídeo
                    'controls': 1, // Exibir controles de vídeo
                    'modestbranding': 1, // Remover links do vídeo
					
					'autoplay': 1, // Auto reproduzir o vídeo
                    'controls': 1, // Exibir controles de vídeo
                    'rel': 0, // Evitar sugestões de outros vídeos
                    'showinfo': 0, // Ocultar informações do vídeo
                    'fs': 0, // Desativar o botão de tela cheia
                    'iv_load_policy': 3, // Desativar anotações
                    'disablekb': 1, // Desativar uso do teclado
                    'autohide': 1, // Ocultar controles após um tempo
                    'autoplay': 1, // Impedir que o próximo vídeo seja reproduzido automaticamente
               
                },
                events: {
                    'onReady': onPlayerReady,
                    'onError': onPlayerError
                }
            });
        }
    } else {
        showError('Erro: A rede de dados não está ligada. Verifique sua conexão de rede e tente novamente.');
    }
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    var progressBar = document.getElementById('loading-bar');
    var currentTime = player.getCurrentTime();
    var duration = player.getDuration();
    var progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';

    if (progress < 100) {
        requestAnimationFrame(updateProgressBar);
    } else {
        progressBar.style.display = 'none';
    }
}

// Função chamada quando o player do YouTube estiver pronto
function onPlayerReady(event) {
    // Adicionar manipuladores de clique aos itens da lista de reprodução
    var playlistItems = document.querySelectorAll('.list-group-item');
    for (var i = 0; i < playlistItems.length; i++) {
        playlistItems[i].addEventListener('click', function () {
            var videoData = this.getAttribute('data-video-id');
          //  playVideo(videoData);
        });
    }

    // Iniciar a atualização da barra de progresso
    requestAnimationFrame(updateProgressBar);
}

// Função para reproduzir um vídeo no player do YouTube
function playVideo(videoId) {
    if (player) {
        player.loadVideoById(videoId);
    }
}

// Função chamada quando ocorrer um erro no player do YouTube
function onPlayerError(event) {
    if (event.data === YT.PlayerError.NO_DATA) {
        showError('Erro: A rede de dados não está ligada. Verifique sua conexão de rede e tente novamente.');
    } else {
        showError('Houve um erro ao carregar o vídeo. Tente novamente mais tarde.');
    }
}

// Função para exibir uma mensagem de erro
function showError(message) {
    var errorElement = document.getElementById('error-message');
	var erro = document.getElementById("error");
    errorElement.textContent = message;
    error.style.display = 'block';
}

// Evento de inicialização da API do YouTube
function onYouTubeIframeAPIReady() {
    // Marque que a API do YouTube foi carregada com sucesso
    youtubeApiLoaded = true;
    // Inicialize o player com um vídeo inicial (se desejar)
    initializeYouTubePlayer();
}

