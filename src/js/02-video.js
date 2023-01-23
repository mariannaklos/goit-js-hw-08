import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new Vimeo(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

function onTimeUpdate(e) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(e.seconds));
  console.log(e.seconds);
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

const currentTime = localStorage.getItem(LOCALSTORAGE_KEY);

if (currentTime) {
  player
    .setCurrentTime(currentTime)
    .then(function (seconds) {
      console.log(seconds);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          break;
      }
    }),
    console.log(LOCALSTORAGE_KEY);
}
