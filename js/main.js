
let carousel = $(".carousel");
let items = carousel.children(".items");
let item = items.children(".item");

// infite scrolling

let numberOfFirstSlideItems = Math.round(items.width() / item.outerWidth(true));
item.slice(0, numberOfFirstSlideItems).clone().appendTo(items);

let lastSlideScrollLeft = items.get(0).scrollWidth - items.innerWidth();

function infiteRightScroll() {
    if (items.scrollLeft() >= lastSlideScrollLeft) {
        items.addClass("scroll-without-animation");
        items.scrollLeft(0);
    }

    items.removeClass("scroll-without-animation");
    items.scrollLeft(items.scrollLeft() + item.outerWidth(true));
};

function infiteLeftScroll() {
    if (items.scrollLeft() === 0) {
        items.addClass("scroll-without-animation");
        items.scrollLeft(lastSlideScrollLeft);
    }

    items.removeClass("scroll-without-animation");
    items.scrollLeft(items.scrollLeft() - item.outerWidth(true));
};

//controls

carousel.children(".right-indicator").click(function () {
    infiteRightScroll();
});

carousel.children(".left-indicator").click(function () {
    infiteLeftScroll();
});

// dragging

let isDragging = false;
let startPageX = 0;
let scrollLeftStart = 0;

carousel.mousedown(function (e) {
    isDragging = true;
    startPageX = e.pageX;
    scrollLeftStart = items.scrollLeft()
});

carousel.mousemove(function (e) {
    if (isDragging) {
        let movedDistance = e.pageX - startPageX;

        if (movedDistance > 0 && items.scrollLeft() === 0)
            scrollLeftStart = lastSlideScrollLeft;

        if (movedDistance < 0 && items.scrollLeft() >= lastSlideScrollLeft)
            scrollLeftStart = 0;

        items.scrollLeft(scrollLeftStart - movedDistance);
    }
})

carousel.mouseup(function () {
    isDragging = false;
});

// auto play

if (carousel.attr("auto-play") == "true")
    setInterval(function () {
        if (!items.is(":hover"))
            infiteRightScroll();
    }, 2000);


