import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');

const player = new VimeoPlayer(iframe);


             
player.on('timeupdate',
    throttle((data) =>
        localStorage.setItem("videoplayer-current-time", data.seconds), 1000) 
);

player.setCurrentTime(localStorage.getItem("videoplayer-current-time") || 0);
