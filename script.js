// ======= references to DOM elements =======
const background = document.getElementById("background-blur");
const scrollContainer = document.querySelector('.project-scroll-bar');


// ======= Variables for horizontal drag scrolling  and checking if it is dragging=======
let isDown = false;
let startx;
let scrollLeft;
let isDragging = false;

// ======= Disabling scroll when user opens hidden box=======
function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

// ======= enabling scroll when user closes hidden box=======
function enableScroll() {
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
}

// ======= For each card, checking Iaf they have been pressed and opening correct hidden box=======
document.querySelectorAll(".project-card").forEach(function(card){

    card.addEventListener('click', function(){
        if (isDragging){return;}//check if mouse is dragging the horizontal scroll bar
        const boxId = card.dataset.box;
        const box = document.getElementById(boxId);
        box.classList.add("active");
        background.classList.add("active");

        disableScroll();
    });
});


// ======= Exit button to leave hidden box overlay =======
document.getElementById("exit-overlay").addEventListener("click", function() {
    document.querySelectorAll(".hidden-box").forEach(box => {
        box.classList.remove("active");
    });
    background.classList.remove("active");
    enableScroll();
});

// ======= Allowing user to leave hiddne box overlay if they click background ======
document.getElementById("background-blur").addEventListener("click", function() {
    document.querySelectorAll(".hidden-box").forEach(box => {
        box.classList.remove("active");
    });
    background.classList.remove("active");
    enableScroll();
});

// ======= Check if mouse is pressed down in project horizontal scroll bar ======
scrollContainer.addEventListener('mousedown',function(event){
    isDragging = false
    isDown = true;
    startx = event.pageX - scrollContainer.offsetLeft;
    scrollLeft= scrollContainer.scrollLeft;
    document.body.classList.add('no-select');
})

// ======= Check if mouse is left in project horizontal scroll bar ======
scrollContainer.addEventListener('mouseleave',function(){
    isDown = false;
    document.body.classList.remove('no-select');
});

// ======= Check if mouse is not pressed in project horizontal scroll bar ======
scrollContainer.addEventListener('mouseup',function(){
    isDown = false;
    document.body.classList.remove('no-select');
});

// ======= Check if mouse is moved in project horizontal scroll bar ======
scrollContainer.addEventListener('mousemove',function(event){
    if (!isDown){//check if mouse is still pressed down
        return;
    }
    isDragging = true;//So cards do not get pressed after drag action finished

    event.preventDefault();//makes scroll smoother
    const x_point =event.pageX - scrollContainer.offsetLeft;
    const scroll = (x_point - startx) * 1.3;
    scrollContainer.scrollLeft = scrollLeft - scroll;

    
});

