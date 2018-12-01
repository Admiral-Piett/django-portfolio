// Top Level
function setActiveFirst(element) {
    // TODO: If element is first in the row of 3 then do this transform, otherwise balance the spacing between the others so it's not left biased
    // Think about fetching the count off the class substring
    // should be like count % 3 == 0 will get last one in the row
    // count % 3 == 1 should get the first once in the row
    element.setAttribute('style', 'transform: scale(1.2) translate3d(2.6vw, 2.7vw, 0px); transition-duration: 1s; z-index: 1;');
    element.setAttribute('name', 'active');
};

function setActiveMid(element) {
    element.setAttribute('style', 'transform: scale(1.2) translate3d(0vw, 2.7vw, 0px); transition-duration: 1s; z-index: 1;');
    element.setAttribute('name', 'active');
};

function setActiveLast(element) {
    element.setAttribute('style', 'transform: scale(1.2) translate3d(-2.6vw, 2.7vw, 0px); transition-duration: 1s; z-index: 1;');
    element.setAttribute('name', 'active');
};

// TODO: If I want to move these together more
// I'm going to need to get granular on what I set to be inactive and where
// Maybe - do the position analysis on what those are going to be
function setInactiveLeftActiveFirst(element) {
    // transform: scale(0.9) background: green; translate3d(6vw, 6vw, 0px); transition-duration: 1s;
    element.setAttribute('style', 'transform: scale(0.9) translate3d(5.4vw, 6vw, 0px); transition-duration: 1s; background: green;');
}; 

function setInactiveLeftActiveMid(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(-2vw, 6vw, 0px); transition-duration: 1s; background: red; ');
};

function setInactiveLeftActiveLast(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(-1.8vw, 6vw, 0px); transition-duration: 1s; background: purple;');
};

function setInactiveRightActiveFirst(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(1.9vw, 6vw, 0px); transition-duration: 1s; background: blue;');
}; 

function setInactiveRightActiveMid(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(2vw, 6vw, 0px); transition-duration: 1s; background: yellow;');
};

function setInactiveRightActiveLast(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(-5.2vw, 6vw, 0px); transition-duration: 1s; background: orange;');
};

function setInactiveAltRowBelow(element) {
    element.setAttribute('style', 'transform: translate3d(0vw, 6.5vw, 0px); transition-duration: 1s; background: black;');
};

function setInactiveAltRowAbove(element) {
    element.setAttribute('style', 'transform: translate3d(0vw, 0vw, 0px); transition-duration: 1s; background: brown;');
};

function inactiveIter(active_postion, active_row, funcLeft, funcRight, altRowBelow, altRowAbove) {
    $('.project-slate').each(function(){
        const classes = this.className.split(/[^a-zA-Z0-9]/)
        const position = classes[classes.length - 3]
        const row = classes[classes.length - 1]
        if (this.getAttribute('name') != 'active'){
            if (active_row < row) {
                altRowBelow(this);
            } else if (active_row > row) {
                altRowAbove(this);
            } else {
                // console.log('not active',position)
                if (position % 3 == 0) {
                    // console.log('left inactive', position)
                    funcLeft(this);
                } else if (position % 3 == 2) {
                    // console.log('right inactive')
                    funcRight(this);
                // Tests for where the active position is to adjust the middle one appropriately
                // if the active one is the first one in the line execute here ELSE do the next one
                } else if (active_postion % 3 == 0) {
                    // console.log('mid inactive first')
                    funcLeft(this);
                } else {
                    // console.log('mid inactive last')
                    funcRight(this);
                }
            };
        };
    });
};

function wipeStyles(element) {
    element.setAttribute('style', 'transition-duration: 1s;');
    element.removeAttribute('name');
};


$('.project-slate').mouseover(function(){
    const classes = this.className.split(/[^a-zA-Z0-9]/)
    const position = classes[classes.length - 3]
    const row = classes[classes.length - 1]

    if (position % 3 == 0){
        setActiveFirst(this);
        inactiveIter(position, row, setInactiveLeftActiveFirst, setInactiveRightActiveFirst, setInactiveAltRowBelow, setInactiveAltRowAbove)
    } else if (position % 3 == 2) {
        setActiveLast(this);
        inactiveIter(position, row, setInactiveLeftActiveLast, setInactiveRightActiveLast, setInactiveAltRowBelow, setInactiveAltRowAbove)
    } else {
        setActiveMid(this);
        inactiveIter(position, row, setInactiveLeftActiveMid, setInactiveRightActiveMid, setInactiveAltRowBelow, setInactiveAltRowAbove)
    }
});

$('.project-slate').mouseout(function(){
    $('.project-slate').each(function() {
        wipeStyles(this);
    });
});
