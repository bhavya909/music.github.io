const music=document.querySelector("audio")
const play=document.getElementById("play_pause")
const img=document.querySelector("img");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
const progress_div=document.getElementById('progress_div');

let isplay=false;
const playMusic= ()=>{
    music.play();
    // play.classList.replace("fa-play","fa-pause");
    document.getElementById("play_pause").innerHTML=` <i class="material-icons">pause</i>`;
    // img.classList.add("anime");
    isplay=true;
};
const pauseMusic=()=>{
    music.pause();
    // play.classList.replace("fa-pause","fa-play",);
    document.getElementById("play_pause").innerHTML=` <i class="material-icons">play_arrow</i>`;
    img.classList.remove("anime");
    isplay=false;
};

play.addEventListener('click',()=>{
    // if(isplay){
    //     pauseMusic();
    // }
    // else{

    //     playMusic();
    // }
    isplay?pauseMusic():playMusic();
})

const songs=[
    // {
    //     name:"Love Me Like You Do",
    //     title:"Love Me like you do",
    //     artist:"bhavya diksha",
    // },
    {
        name:"Savage Love",
        title:"Savage Love",
        artist:"meenu",

    },
    {
        name:"Faded",
        title:"Faded",
        artist:"abc",
    }
];

const loadsongs=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src= "music/"+songs.name+'.mp3';
    img.src="image/"+songs.name+".jpg";
}
songindex=0
const nextSong=()=>{
    songindex=(songindex+1)%songs.length;
    loadsongs(songs[songindex]);
    playMusic();
}
const prevSong=()=>{
    songindex=(songindex-1+songs.length)%songs.length;
    loadsongs(songs[songindex]);
    playMusic();
}

// Progress Status starts
let progress=document.getElementById('progress');
music.addEventListener('timeupdate',(event)=>{
    // console.log(event);
    const {currentTime,duration} = event.srcElement;
    

    let progress_time= currentTime/duration*100;
    progress.style.width=`${progress_time}%`;


    // Music duration update dynamic
    let duration_time=document.getElementById('duration');
    let currentvalatime = document.getElementById('current_time');

    let min_duration= Math.floor(duration/60);
    let sec_duration=  Math.floor(duration%60);
    // console.log(min_duration);
    // console.log(sec_duration);
    if(duration){
        duration_time.textContent=(`${min_duration}.${sec_duration}`);
    }

     // Current duration update dynamic
     
 
     let min_currenttime= Math.floor(currentTime/60);
     let sec_currenttime=  Math.floor(currentTime%60);
     if(sec_currenttime<10)
     {
        sec_currenttime= `0${sec_currenttime}`;
     }
    //  console.log(min_currenttime);
    //  console.log(sec_currenttime);
    //  if(duration){
    //      duration_time.textContent=(`${min_duration}.${sec_duration}`);
    //  }
    currentvalatime.textContent=`${min_currenttime}.${sec_currenttime}`;

});
progress_div.addEventListener('click',(event) =>{
    // console.log(event);
    const { duration}=music;
    // const duration=music.duration;
    let move_progress = (event.offsetX/ event.srcElement.clientWidth)*duration;
    // console.log(move_progress);

    music.currentTime=move_progress;
})
// Progress Status ends
music.addEventListener('ended',nextSong);
next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);

