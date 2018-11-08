function setActiveFirst(element) {
    // TODO: If element is first in the row of 3 then do this transform, otherwise balance the spacing between the others so it's not left biased
    // Think about fetching the count off the class substring
    // should be like count % 3 == 0 will get last one in the row
    //  count % 3 == 1 should get the first once in the row
    element.setAttribute('style', 'transform: scale(1.2) translate3d(3vw, 2.7vw, 0px); background: red; transition-duration: 1s; z-index: 1;');
};

function setActiveMid(element) {
    element.setAttribute('style', 'transform: scale(1.2) translate3d(0vw, 2.7vw, 0px); background: green; transition-duration: 1s; z-index: 1;');
};

function setActiveLast(element) {
    element.setAttribute('style', 'transform: scale(1.2) translate3d(-3vw, 2.7vw, 0px); background: purple; transition-duration: 1s; z-index: 1;');
};

function setInactiveFirst(element) {
    element.setAttribute('style', 'transform: scale(0.8) translate3d(-3vw, 2.7vw, 0px); background: blue; transition-duration: 1s;')
};

function setInactiveMid(element) {
    element.setAttribute('style', 'transform: scale(0.8) translate3d(0vw, 2.7vw, 0px); background: blue; transition-duration: 1s;')
};

function setInactiveLast(element) {
    element.setAttribute('style', 'transform: scale(0.8) translate3d(3vw, 2.7vw, 0px); background: blue; transition-duration: 1s;')
};

function inactiveIter(func) {
    $('.project-slate').each(function(){
        func(this);
    });
};

function wipeStyles(element) {
    element.removeAttribute('style');
};


$('.project-slate').mouseover(function(){
    const position = this.className.split('-')[this.className.split('-').length - 1]
    
    // $('.project-slate').each(function(){
    //     setInactive(this);
    // });

    if (position % 3 == 1){
        inactiveIter(setInactiveFirst)
        setActiveFirst(this);
    } else if (position % 3 == 0) {
        inactiveIter(setInactiveLast)
        setActiveLast(this);
    } else {
        inactiveIter(setInactiveMid)
        setActiveMid(this);
    }
});

$('.project-slate').mouseout(function(){
    $('.project-slate').each(function() {
        wipeStyles(this);
    });
});
