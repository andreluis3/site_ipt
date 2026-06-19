// infra-control.js

const infraPlaylist = [
    { src: 'assets/videos/videocamera.mp4', title: 'Câmara Anecoica', tag: 'Ensaios EMC / Compatibilidade Eletromagnética', index: 0 },
    { src: 'assets/videos/Fotometria.mp4', title: 'Fotometria', tag: 'Ensaios Ópticos e Radiométricos', index: 1 },
    { src: 'assets/videos/Materiais.mp4', title: 'Materiais', tag: 'Ensaios de segurança elétrica e isolamento de materiais', index: 2 }
];

let currentPlaylistIndex = 0;
let isUserControlled = false;

document.addEventListener("DOMContentLoaded", () => {
    const videoPlayer = document.getElementById('mainVideoPlayer');
    
    if (videoPlayer) {
        // Quando o vídeo atual terminar, passa para o próximo da lista automaticamente
        videoPlayer.addEventListener('ended', () => {
            if (!isUserControlled) {
                currentPlaylistIndex = (currentPlaylistIndex + 1) % infraPlaylist.length;
                const nextTrack = infraPlaylist[currentPlaylistIndex];
                
                const thumbs = document.querySelectorAll('.infra-thumbnails-grid .infra-thumb');
                if (thumbs[nextTrack.index]) {
                    autoSwitchVideo(thumbs[nextTrack.index], nextTrack.src, nextTrack.title, nextTrack.tag);
                }
            }
        });
    }
});

function autoSwitchVideo(element, src, title, tag) {
    const videoPlayer = document.getElementById('mainVideoPlayer');
    const videoSource = document.getElementById('videoSource');
    
    if (videoPlayer && videoSource) {
        videoSource.src = src;
        videoPlayer.load();
        videoPlayer.play().catch(err => console.log("Autoplay aguardando interação:", err));
        
        document.getElementById('mainVideoTitle').innerText = title;
        document.getElementById('mainVideoTag').innerText = tag;
        
        const thumbs = document.querySelectorAll('.infra-thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        element.classList.add('active');
    }
}

// Essa é a função disparada pelo clique do usuário no HTML
function switchVideo(element, src, title, tag) {
    isUserControlled = true; 
    const videoPlayer = document.getElementById('mainVideoPlayer');
    const videoSource = document.getElementById('videoSource');
    
    if (videoPlayer && videoSource) {
        videoPlayer.loop = true; // Ativa o loop exclusivo do vídeo selecionado
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