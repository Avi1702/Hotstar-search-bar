
 
async function search(){
    
    let suggestionBox=document.getElementById("suggestion")
    suggestionBox.style.boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
    suggestionBox.style.overflowY="scroll"
    suggestionBox.innerHTML=""
    let value=document.getElementById("search").value
     try{
    let raw= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cf820e686ee17f6d075f033cc132b0dd&query=${value}&language=en-US&page=1&include_adult=false`)
    let orginal= await raw.json()
 
    let showData=orginal.results
    // console.log(orginal.results[0].title)

    display(showData)
     }
     catch(error){console.log(error)}
}

function display(showdata){
    

    showdata.forEach(ele => {
        
        let p=document.createElement("p")
        p.textContent=ele.title
        p.style.boxShadow="rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;"
        p.addEventListener("click",function(){
           showdetails(ele.id)
        })
     

        document.getElementById("suggestion").append(p)
    });
}

let timerId

function debounce(search,delay){

if(timerId){
    clearTimeout(timerId)
}

timerId=setTimeout(function(){
    search();
},delay)
}


async function showdetails(value){
    console.log(value)
    let raw= await fetch(`https://api.themoviedb.org/3/movie/${value}?api_key=cf820e686ee17f6d075f033cc132b0dd`)
    let orginal= await raw.json()
    // let image=orginal.poster_path

    showposter(orginal)

// =await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cf820e686ee17f6d075f033cc132b0dd&query=$&language=en-US&page=1&include_adult=false`)
}

async function showposter(data){

    document.getElementById("middle").innerHTML=""
    document.getElementById("last").innerHTML=""
    let image=data.poster_path
    console.log(data)
    let url=`https://image.tmdb.org/t/p/w500${image}`

    let img=document.createElement("img")
    img.src=url
   document.getElementById("middle").append(img)

   let heading=document.createElement("h3")
   heading.innerText="Movie Details:"

   let p1=document.createElement("p")
   p1.innerText="Movie Name:"+" "+data.original_title
   let p2=document.createElement("p")
   p2.innerText="Release Date :"+" "+data.release_date
   let p3=document.createElement("p")
   p3.innerText="IMDB :"+" "+data.vote_average

   
   let p4=document.createElement("p")
   p4.innerText="Production Company :"+" "+data.production_companies.name
   let p5=document.createElement("p")
   p5.innerText="Revenue :"+" "+data.revenue
   document.getElementById("last").append(heading,p1,p2,p3,p4,p5)
//    let p=document.createElement("p")
//    let p=document.createElement("p")


}
