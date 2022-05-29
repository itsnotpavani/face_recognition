//importing firebase methods
import {initializeApp} from 'firebase/app'
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'
import {getFirestore,collection,getDocs,addDoc,query,where} from 'firebase/firestore'

const videoElement=document.getElementById("videoId");
  var predictedAges=[];
  //url for child mode homepage
  const Url_kids="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8&with_genres=16";
  function startVideo(){
    navigator.getUserMedia(
      {video:{}},
      stream=>(videoElement.srcObject=stream),
      err => console.error(err)
    );
    
    
    }

    //loading from face api models

Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
faceapi.nets.faceExpressionNet.loadFromUri('./models'),
faceapi.nets.ageGenderNet.loadFromUri('./models'),faceapi.nets.ssdMobilenetv1.loadFromUri('/models')]).then(startVideo);

//initialzing firebase config

const firebaseConfig = {
  apiKey: "AIzaSyCk5yFtMwO7G-hg4DN1ALtZ7EIkFitR5yg",
  authDomain: "face-recognition-4a1fb.firebaseapp.com",
  projectId: "face-recognition-4a1fb",
  storageBucket: "face-recognition-4a1fb.appspot.com",
  messagingSenderId: "378811081704",
  appId: "1:378811081704:web:f91b35498a5033c8fc3a5d"
};

//initializing firebase
initializeApp(firebaseConfig);

//getting access to firebase database
const db=getFirestore();

//accessing the face_descriptor collection
const colRef=collection(db,'face_descriptors');


  
  var faceMatcher_;

  //getting all documents in face_descriptor collection

  getDocs(colRef).then((snapshot)=>{

    var vals=[];
    snapshot.docs.forEach((doc)=>{
    const data_={...doc.data()};
    const descrip=[];
    descrip.push(data_.descriptors);
    const result=descrip.map(desc=>new Float32Array(desc));
    const label=String(data_.user_id);
    const labeledFaceDescriptor=new faceapi.LabeledFaceDescriptors(label,result);
    vals.push(labeledFaceDescriptor);//storing all the face descriptors in database in vals array
    
    
  });
  
  faceMatcher_=new faceapi.FaceMatcher(vals,0.6); //initializing face matcher to acceptance level of 0.6
  //if the face matches with accuracy of 0.6 then accept else reject
});
  
  
 
  
  




const auth = getAuth(); //initializing firebase auth object
const banner=document.querySelector(".banner");
const tagsEl = document.getElementById('tags');
const pagination=document.querySelector('.pagination');
const main = document.getElementById('main');
const signInForm=document.querySelector(".signIn"); 
const signUpPage=document.querySelector(".sign_up_page");
const signOutBtn=document.querySelector(".signOut");
const signUpBtn=document.querySelector(".signUpBtn");


const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY; //adult homepage
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

var childMode=false; //sets the child mode or unsets the child mode
var w=document.querySelector(".banner");
var heading=document.querySelector(".heading"); //heading on banner

var setChildMode=false; 
var childModeBtn=document.querySelector(".childModeButton"); //child mode button

//list of banned words in child mode
const banned_words=new Set(["boink",
  "diddle",
  "chick",
  "chicks",
  "dating",
  "date",
  "romance",
  "romantic",
  "pornx",
  "xxx",
  "xx",
  "kinky",
  "naked",
  "nude",
  "personals",
  "porn",
  "porno",
  "dick",
  "anal",
  "ass",
  "asshole",
  "penis",
  "pussy",
  "cum",
  "sex",
  "sexy",
  "analingus",
"animalism",
"anorgasmic",
"anus",
"aphrodisiac",
"asian",
"cowgirl",
"ball",
"gag",
"balloon",
"bastinado",
"bbbj",
"bbbjtc",
"bcd",
"bdsm",
"binding",
"bisexual",
"blueballs",
"prostitute",
"bondage",
"boner",
"booty",
"brothel",
"slave",
"labour",
"butt",
"plug",
"dominant",
"submisive",
"pornography",
"prostitution",
"striptease",
"strip",
"erotica",
"erotic",
"sex",
"pornographic",
"porno",
"sexual",
"arousal",
"playboy",
"masturbation",
"masturbate",
"obscenity",
"obscene",
"eroticism",
"nudity",
"fetish",
"raunchy",
"prostitutes",
"topless",
"pimp",
"pornstar",
"horny",
"bed",
"perv",
"cybersex",
"nudie",
"porny",
"sexploitation",
"blowjob",
"skeevy",
"pervy",
"pervert","paedo",
"pedo",
"tease",
"horny",
"titty",
"tits",
"peepshow",
"sexcapade",
"dead",
"alive",
"suicide",
"boob",
"booby",
"nipples",
"nipple",
"boobs",
"cock",
"cocks",
"balls",
"kiss",
"kisses",
"kissy",
"kissi",
"kissing",
"fuck",
"fucking",
"kisses",
"lipstick",
"vagina",
"vaginas",
"pregnant",
"condom",
"condoms",
"bikini",
"bra",
"breast",
"breasts",
"fucks",
"kill",
"kills",
"murder",
"suicide",
"hang",
"death",
"dead",
"zombie",
"fight",
"crocodile",
"shark",
"snakes",
"anaconda",
"pirana",
"megladon",
"ghosts",
"shoot",
"shooting",
"guns",
"terrorist",
"terror",
"terrifying",
"terrify",
"period",
"smooch",
"french",
"war",
"fight",
"blood",
"bleed",
"butchery",
	"anabelle",
  "inscidious",
  "strange",
	"killing",
	"massacre",
	"murder",
  "murdered",
  "murders",
  "serial",
  "killer",
  "psycho",
  "crime",
  "lip",
  "lips",
  "suck",
  "sucks",
  "mouth",
  "drug",
  "drugs",
  "knife",
  "cannabis",
  "coccaine",
  "drugdealer",
  "knife",
  "killing",
  "murderer",
  "fucker",
  "playboy",
  "gangster",
  "fuckboy",
  "murdering",
  "shooting",
  "guns",
  "assassin",
  "assassinate",
  "assassination",
  "assassinated",
  "trafficing",
  "smuggling",
  "terrorism",
  "hijacking",
  "abduction",
  "assault",
  "abuse",
  "hacking",
  "genocide",
  "rape",
  "molestation",
  "cybercrime",
  "deflower",
  "raped",
  "molest",
  "assaulted",
  "assulting",
  "molesting",
  "raping",
  "sexual",
  "violence",
  "violent",
  "criminal",
  "mafia",
  "don",
  "gunman",
  "hitman",
  "offense",
  "offensive",
  "ravage",
  "attack",
  "maltreat",
  "seduce",
  "seduction",
  "deflowering",
  "strip",
  "stripping",
  "kidnapping",
  "torture",
  "kidnap",
  "abduct",
  "narcotic",
  "boyfriend",
  "girlfriend",
  "kidnapper",
  "molester",
  "haunt",
  "haunted",
  "haunting"
	]);

 //list of banned genre ids
  const banned_ids=new Set([80,18,27,9648,10749,10752,99]);

  //list of allowed child genres
  const child_genres=[{
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  }]

//list of all the genres

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


const form =  document.getElementById('form'); //accessing the search form
const search = document.getElementById('search');//accessing the input search


const prev = document.getElementById('prev') //prev button
const next = document.getElementById('next') //next button
const current = document.getElementById('current') //current

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

var selectedGenre = [] //the genres selected to filter movies
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    var displayGenres=genres;
    if(childMode==true) //if we are in child mode then we will use child genres array to display tags
     displayGenres=child_genres;

    displayGenres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;

        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))//fetching the movies according to genres selected
            highlightSelection()
        })
        tagsEl.append(t);
    })
}
//highlighting the selected genre tag
function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}
//clear button tp clear all the selections
function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{

        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }

}

if (childMode==false)
 getMovies(API_URL); //if child mode is off then get adult page
else
 getMovies(API_URL + '&with_genres=16'); // if child mode is on then get the animation page

 //fetching the movies according to the specified url
function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        
        if(data.results.length !== 0){
            showMovies(data.results); //displaying the movies
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled');
            }

            tagsEl.scrollIntoView({behavior : 'smooth'})

        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }

    })

}

//displaying the movies
function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id,} = movie;
        var valid=true; // initalizing that movie is valid i.e. is child safe
        if(childMode) // if we are in child mode then only we will perform these checks
        { if(movie.genre_ids.length==0) //if movie doesnt have any gnres specified we make it invalid movie
            valid=false;
            else
            {
          movie.genre_ids.every(x =>{  //if movie has any banned genre ids then make movie invalid
           if(banned_ids.has(x))
             {valid=false;
              return false;
             }
          });
             if(valid==true) //only if movie passes the genre test we check if it's title contains banned words
             {
              var word=[]; //array of characters in a single word
              for (let index = 0; index < movie.title.length; index++) {
                
                if(movie.title[index]==' ' || movie.title[index]==':' || movie.title[index]=='-' || movie.title[index]==',' || movie.title[index]==`'`)
                 { var stringWord=word.join('').toLocaleLowerCase(); //converting characters to a word
                   
                   word=[]; //making character array empty again to read next word
                   if(banned_words.has(stringWord)) //checking if word is banned
                   {
                   valid=false;
                    break;
                   }
                 }

                 else
                  {
                    word.push(movie.title[index]);
                  }
             }
             var stringWord=word.join(); //checking the last word in title is banned or not
                   
                   if(banned_words.has(stringWord))
                   {
                   valid=false;
                   
                   }
                   

            }

            if(valid==true) //if it also passes the title test we check if banned words are present in movie overview or not
            { 
              var word=[];
              for (let index = 0; index < movie.overview.length; index++) {
                
                if(movie.overview[index]==' ' || movie.overview[index]==':' || movie.overview[index]=='-' || movie.overview[index]==',' || movie.overview[index]==`'` || movie.overview[index]=='.')
                 { var stringWord=word.join('').toLocaleLowerCase();
                   
                   word=[];
                   if(banned_words.has(stringWord))
                   {
                   valid=false;
                    break;
                   }
                 }

                 else
                  {
                    word.push(movie.overview[index]);
                  }
             }
             var stringWord=word.join();
                   
                   if(banned_words.has(stringWord))
                   {
                   valid=false;
                   
                   }
                   
            }
             
             
             
          
        }
        
      }
        if(valid) //if the movie is valid we display it , by default all movies are valid in adult mode
        {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <br/>
                <button class="know-more" id="${id}">Know More</button
            </div>

        `

        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })

      }

      
    })
}

const overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        var embed = [];
        var dots = [];
        videoData.results.forEach((video, idx) => {
          let {name, key, site} = video

          if(site == 'YouTube'){

            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

          `)

            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
          }
        })

        var content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>

        ${embed.join('')}
        <br/>
        <div class="dots">${dots.join('')}</div>

        `
        overlayContent.innerHTML = content;
        activeSlide=0;
        showVideos();
      }else{
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos(){
  let embedClasses = document.querySelectorAll('.embed');
  let dots = document.querySelectorAll('.dot');

  totalVideos = embedClasses.length;
  embedClasses.forEach((embedTag, idx) => {
    if(activeSlide == idx){
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    }else{
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

  dots.forEach((dot, indx) => {
    if(activeSlide == indx){
      dot.classList.add('active');
    }else{
      dot.classList.remove('active')
    }
  })
}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if(activeSlide > 0){
    activeSlide--;
  }else{
    activeSlide = totalVideos -1;
  }

  showVideos()
})

rightArrow.addEventListener('click', () => {
  if(activeSlide < (totalVideos -1)){
    activeSlide++;
  }else{
    activeSlide = 0;
  }
  showVideos()
})


function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}
//search bar form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.toLowerCase();
    
    if(childMode && !banned_words.has(searchTerm)) //checking if search term is in banned words or not in child mode
      {
       
      
    selectedGenre=[];
    setGenre();
    const collection=tagsEl.children;
    for (let index = 0; index < collection.length; index++) {
          collection[index].style.backgroundColor="#2155CD";
      
    }
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm) //fetching movies according to search term
    }else{
        getMovies(Url_kids); //if search term is invalid then display child homepage
    }
  }
  else if(childMode==false) //if we are not in child mode
  {
    if(searchTerm) {
      getMovies(searchURL+'&query='+searchTerm) //fetch movies
  }
  else{ 
    getMovies(url); //if movies dont exist then just show default adult homepage 
}

  }
return false;
});

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}

//setting the adult homepage banner
  var img_ele=document.createElement('img');
  const normal_url="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8&with_genres=28";
  fetch(normal_url).then(res => res.json()).then(data => {
       
    const normal_img_url="https://image.tmdb.org/t/p/w500/"+data.results[0].poster_path;
    
    img_ele.setAttribute("src",normal_img_url);
    img_ele.setAttribute("style","width:100vw;height:70vh;object-fit:cover;object-position:75% 60%;z-index:-1;position:absolute;top:0px;left:0px;");
    w.append(img_ele);
    heading.innerHTML=data.results[0].original_title;

  });

  //uploading your image in sign up page
const imageUpload=document.getElementById("imageUpload");
var face_detections_resizedDetections;
imageUpload.addEventListener('change',async ()=>{
  const image=await faceapi.bufferToImage(imageUpload.files[0]);
  //getting face detections for uploaded image
  var face_detections=await faceapi.detectSingleFace(image,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
  const displaySize={width:videoElement.width,height:videoElement.height};

  face_detections_resizedDetections=faceapi.resizeResults(face_detections,displaySize);
  


});


async function foo()
{
  var age=[]; //stores the ages of all people detected
  var cnt=0; //no. of successful face detections from 10 trials
  
    
   //10 trails to detect faces
    for (let index = 0; index < 10; index++) {
      
      
    
    const detections=await faceapi.detectAllFaces(videoElement,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
    const displaySize={width:videoElement.width,height:videoElement.height};
    
    const resizedDetections=faceapi.resizeResults(detections,displaySize);
    
    //performing automatic face id login 
    if(signUpPage.style.display!="none" && signUpForm.style.display!="flex")//face login disabled when already logged in or whlie filling sign up form
    {//getting results after matching faces descriptor with deescriptors in database
    const results=resizedDetections.map(d=>faceMatcher_.findBestMatch(d.descriptor));
    
    
    
    for (let index = 0; index < results.length; index++) {
      //if label associated with result is not unknown
      if(results[index]._label!="unknown")
      {//getting document associated with corresponding label (label is nothing but user_id that we stored in database)
      const q = query(colRef, where("user_id", "==", results[index]._label));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const data={...doc.data()};
        //signing in using email and password
      signInWithEmailAndPassword(auth,data.email,data.password).then((cred)=>{
       
        signUpPage.style.display="none";
        tagsEl.style.display="flex";
        main.style.display="flex";
        pagination.style.display="flex";
        banner.style.display="block";
        signOutBtn.style.display="block";
       
        signInForm.reset();
      }).catch((err)=>{console.log(err);});
      
    });
  }
  
}
    }
   
    //adding the corresponding ages in every trial 
    if(resizedDetections.length !=0)
    {cnt++;
    for(var j=0;j<resizedDetections.length;j++)
    {
       if(j+1>age.length)
       {
         age.push(resizedDetections[j].age);
       }
       else
        {
          age[j]+=resizedDetections[j].age;
        }
       
    }
     
    }
  }
  
  //if we had altleast 3 successful trials
  if(cnt>=3)
  {
   for(var k=0;k<age.length;k++)
   {
     age[k]=age[k]/cnt; //calculating the average age of every person detected
   }
  }

  else if(cnt<3) //if we didnt have atleast 3 successful trials then make age array empty
  {
    age=[];
  }
   
   var count=0; //number of kids
  for(var i=0;i<age.length;i++)
  { 
    if(age[i]<14)
     count++;
  }
 
 if(age.length!=0) //if age array is not empty
 {
  if((count==age.length && childMode==false )) //if only children are sitting in front of camera and child mode is disabled
   { childMode=true; //enable child mode
     setGenre();
     childModeBtn.style.backgroundColor="green";
     getMovies(Url_kids);
   }


  if(childMode==true)
  {
    
     //setting the banner poster in child mode
     fetch(Url_kids).then(res => res.json()).then(data => {
       
       const kids_img_url="https://image.tmdb.org/t/p/w500/"+data.results[0].poster_path;
       
       img_ele.setAttribute("src",kids_img_url);
       heading.innerHTML=data.results[0].original_title;
       
       
     });
     //changing tags color to blue
     const collection=tagsEl.children;
    for (let index = 0; index < collection.length; index++) {
          collection[index].style.backgroundColor="#2155CD";
      
    }
  }
  if(count==age.length) //if only children are present then dont show child mode button
  {
    childModeBtn.style.display="none";

  }

  if(count<age.length) //if atleast one adult is present then display child mode button
  {
    childModeBtn.style.display="block";

  }

  //child mode is on and some adult comes then show alert message to switch back to adult mode or continue on child mode
   if(signUpPage.style.display=="none" && !setChildMode && count<age.length && childMode==true)
   { if(window.confirm("do u want to switch off child mode?"))
     {
      //switching off child mode
     childMode=false;
     childModeBtn.style.backgroundColor="red";
     
     
     setGenre();
     //displaying adult pages and banner and genres
     getMovies(API_URL);
     fetch(API_URL).then(res => res.json()).then(data => {
       
      const default_img_url="https://image.tmdb.org/t/p/w500/"+data.results[0].poster_path;
      
      img_ele.setAttribute("src",default_img_url);
      heading.innerHTML=data.results[0].original_title;
      
      
    });
    //changing color of tags back to what it was in adult mode
    const collection=tagsEl.children;
   for (let index = 0; index < collection.length; index++) {
         collection[index].style.backgroundColor="#EB5353";
     
   }


   }
    else
     {
       setChildMode=true; //if we chose to continue with child mode we wont get alert message again
     }
  }
}

}
videoElement.addEventListener("playing",()=>{

 
  foo();
  setInterval(foo,10000);//reapeating the foo() function after every 10 secs
  

});


childModeBtn.addEventListener("click",()=>{
  
  if(childModeBtn.style.backgroundColor=="red") //if we are not in child mode
   {
     childModeBtn.style.backgroundColor="green"; //make it in child mode
     childMode=true;
     setGenre();
     //fetch child mode pages
     getMovies(Url_kids);
     fetch(Url_kids).then(res => res.json()).then(data => {
       
      const kids_img_url="https://image.tmdb.org/t/p/w500/"+data.results[0].poster_path;
      
      img_ele.setAttribute("src",kids_img_url);
      heading.innerHTML=data.results[0].original_title;
      
      
    });

    const collection=tagsEl.children;
   for (let index = 0; index < collection.length; index++) {
         collection[index].style.backgroundColor="#2155CD";
     
   }
   }
   //if we were already in child mode
   else{
    childModeBtn.style.backgroundColor="red"; //switch to adult mode
     childMode=false;
     
     setGenre();
     
     getMovies(API_URL);
     fetch(API_URL).then(res => res.json()).then(data => {
       
      const default_img_url="https://image.tmdb.org/t/p/w500/"+data.results[0].poster_path;
      
      img_ele.setAttribute("src",default_img_url);
      heading.innerHTML=data.results[0].original_title;
      
      
    });

    const collection=tagsEl.children;
   for (let index = 0; index < collection.length; index++) {
         collection[index].style.backgroundColor="#EB5353";
     
   }

   
   }
});

//sign up submit button
signUpBtn.addEventListener('click',(e)=>{
  signInForm.style.display="none";
  signUpForm.style.display="flex";
  signUpBtn.style.display="none";
  });

  //sign in form
  signInForm.addEventListener('submit',(e)=>{e.preventDefault();
  
    const email=signInForm.email.value;
    const password=signInForm.password.value;
    //signing in with email and password
    signInWithEmailAndPassword(auth,email,password).then((cred)=>{
      signUpPage.style.display="none";
      tagsEl.style.display="flex";
      main.style.display="flex";
      pagination.style.display="flex";
      banner.style.display="block";
      signOutBtn.style.display="block";
      console.log('user ceated:',cred.user);
      signInForm.reset();
    }).catch((err)=>{console.log(err);});
  });
  
  //sign up form
  const signUpForm=document.querySelector(".signUp");
  signUpForm.addEventListener('submit',(e)=>{e.preventDefault();
  
    const email=signUpForm.email.value;
    const password=signUpForm.password.value;
    //create user
    createUserWithEmailAndPassword(auth,email,password).then((cred)=>{
      //getting all the descriptors of the image uploaded during signup
      const describe=[];
      for (let index = 0; index < face_detections_resizedDetections.descriptor.length; index++) {
        describe[index]=face_detections_resizedDetections.descriptor[index];
        
      }
      //adding the user data inculding his face descriptors to firestore database
      addDoc(colRef,{
        user_id:cred.user.uid,
        descriptors:describe,
        email:email,
        password:password
      }).then(()=>{console.log("user created");});
      
    
      
     //showing the homepage after signup
      signUpForm.reset();
  
      signUpPage.style.display="none";
      signUpForm.style.display="none";
      signInForm.style.display="block";
      signUpBtn.style.display="block";
      
      tagsEl.style.display="flex";
      main.style.display="flex";
      pagination.style.display="flex";
      banner.style.display="block";
      signOutBtn.style.display="block";
      
    }).catch((err)=>{console.log(err);});
  });
  //sign out button takes us back to login page
  signOutBtn.addEventListener("click",()=>{
    signOut(auth).then(()=>{console.log("user signed out");
    location.reload();

  });
  
  });

  