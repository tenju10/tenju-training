var timer = setInterval(triggerCarousel, 3000);

var rightButton = document.querySelector(".right-arrow").addEventListener("click", rightArrow);
var leftButton = document.querySelector(".left-arrow").addEventListener("click", leftArrow);
var carousel = document.querySelector(".carousel").addEventListener("mouseover", stopInterval);
var carousel = document.querySelector(".carousel").addEventListener("mouseout", resetInterval);


function rightArrow() {
    triggerCarousel(1);
    resetInterval();
}

function leftArrow() {
    triggerCarousel(-1);
    resetInterval();
}

function stopInterval() {
    clearInterval(timer);
}

function triggerCarousel(direction = 1) {
    var carousel = document.querySelector(".carousel");
    var items = carousel.querySelectorAll(".item");
    var activeIndex = indexOfActive(items);

    //console.log("activeIndex:", activeIndex);
    //console.log("direction:", direction);
    items[activeIndex].classList.remove("active");
    items[activeIndex].classList.remove("right-active");
    

    if (activeIndex == 0 && direction == -1)
    {
        items[items.length-1].classList.add("right-active");
        items[items.length-1].classList.remove("right-off");
    }
    else if (activeIndex == items.length - 1 && direction == 1)
    {
        items[0].classList.add("active");
        items[0].classList.remove("right-off");
    }
    else
    {
        if (direction == -1) {
            items[activeIndex+direction].classList.add("right-active")
        }
        else{
            items[activeIndex+direction].classList.add("active");
        }
        items[activeIndex+direction].classList.remove("right-off");
    }

    if (direction == -1) {
        items[activeIndex].classList.add("right-off");
    }
    
}

function indexOfActive(items){
    var index = -1;
    for (var i = 0; i < items.length; i++)
    {
        if (items[i].classList.contains("active") || items[i].classList.contains("right-active"))
        {
            index = i;
        }
    }
    return index;
}

function resetInterval(){
    clearInterval(timer);
    timer = setInterval(triggerCarousel, 3000);
}