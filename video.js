// Array que define a ordem da playlist automática inicial
const infraPlaylist = [
    { src: 'assets/videos/videocamera.mp4', title: 'Câmara Anecoica', tag: 'Ensaios EMC / Compatibilidade Eletromagnética', index: 0 },
    { src: 'assets/videos/Fotometria.mp4', title: 'Fotometria', tag: 'Ensaios Ópticos e Radiométricos', index: 1 },
    { src: 'assets/videos/Materiais.mp4', title: 'Materiais', tag: 'Ensaios de segurança elétrica e isolamento de materiais', index: 2 }
];

let currentPlaylistIndex = 0;
let isUserControlled = false; // Controla se o usuário quebrou o fluxo automático

document.addEventListener("DOMContentLoaded", () => {
    const videoPlayer = document.getElementById('mainVideoPlayer');
    
    if (videoPlayer) {
        // Evento disparado nativamente quando o vídeo atual chega ao fim
        videoPlayer.addEventListener('ended', () => {
            if (!isUserControlled) {
                // Avança para o próximo vídeo da lista circular
                currentPlaylistIndex = (currentPlaylistIndex + 1) % infraPlaylist.length;
                const nextTrack = infraPlaylist[currentPlaylistIndex];
                
                // Atualiza a interface passando as thumbnails da grid
                const thumbs = document.querySelectorAll('.infra-thumbnails-grid .infra-thumb');
                if (thumbs[nextTrack.index]) {
                    autoSwitchVideo(thumbs[nextTrack.index], nextTrack.src, nextTrack.title, nextTrack.tag);
                }
            }
        });
    }
});

// Função interna para a troca automatizada (mantém o fluxo rodando)
function autoSwitchVideo(element, src, title, tag) {
    const videoPlayer = document.getElementById('mainVideoPlayer');
    const videoSource = document.getElementById('videoSource');
    
    if (videoPlayer && videoSource) {
        videoSource.src = src;
        videoPlayer.load();
        videoPlayer.play().catch(err => console.log("Autoplay barrado pelo browser:", err));
        
        document.getElementById('mainVideoTitle').innerText = title;
        document.getElementById('mainVideoTag').innerText = tag;
        
        const thumbs = document.querySelectorAll('.infra-thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        element.classList.add('active');
    }
}

// Função chamada no ONCLICK (Disparada pelo clique do usuário)
function switchVideo(element, src, title, tag) {
    isUserControlled = true; // Trava a automação
    const videoPlayer = document.getElementById('mainVideoPlayer');
    const videoSource = document.getElementById('videoSource');
    
    if (videoPlayer && videoSource) {
        // Altera para loop fixo e exclusivo do item clicado
        videoPlayer.loop = true; 
        
        videoSource.src = src;
        videoPlayer.load();
        videoPlayer.play();
        
        document.getElementById('mainVideoTitle').innerText = title;
        document.getElementById('mainVideoTag').innerText = tag;
        
        const thumbs = document.querySelectorAll('.infra-thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        element.classList.add('active');
    }
}