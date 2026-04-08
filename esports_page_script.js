window.addEventListener("scroll",function(){

let nav=
document.getElementById("navbar");

if(window.scrollY>30){

nav.classList.add("scrolled");

}else{

nav.classList.remove("scrolled");

}

});

// Default filter to NECC on load
document.addEventListener("DOMContentLoaded", function() {
    filterMatches('necc');
    setupCarouselButtons();
    setupLightbox();
});

function setupCarouselButtons(){
    document.querySelectorAll(".carouselBtn").forEach(button=>{
        button.addEventListener("click",()=>{
            const carouselId=button.dataset.carousel;
            const carousel=document.getElementById(carouselId);
            if(!carousel) return;
            const card=carousel.querySelector(".carouselCard");
            if(!card) return;
            const gap=16;
            const scrollAmount=card.offsetWidth + gap;
            if(button.classList.contains("next")){
                carousel.scrollBy({left:scrollAmount,behavior:"smooth"});
            } else {
                carousel.scrollBy({left:-scrollAmount,behavior:"smooth"});
            }
        });
    });
}

function setupLightbox(){
    const modal=document.getElementById("lightboxModal");
    const closeBtn=document.querySelector(".lightboxClose");
    const carouselImages=document.querySelectorAll(".carouselCard img");
    
    carouselImages.forEach(img=>{
        img.addEventListener("click",()=>{
            modal.classList.add("active");
            document.querySelector(".lightboxImage").src=img.src;
            document.querySelector(".lightboxCaption").textContent=img.nextElementSibling?.textContent||img.alt||"";
        });
    });
    
    closeBtn.addEventListener("click",()=>{
        modal.classList.remove("active");
    });
    
    modal.addEventListener("click",function(e){
        if(e.target===modal){
            modal.classList.remove("active");
        }
    });
    
    document.addEventListener("keydown",function(e){
        if(e.key==="Escape" && modal.classList.contains("active")){
            modal.classList.remove("active");
        }
    });
}

function filterMatches(league){

let cards=
document.querySelectorAll(".matchCard");

cards.forEach(card=>{

if(card.classList.contains(league)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}