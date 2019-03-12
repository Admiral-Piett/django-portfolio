// Top Level

// Setting Up the Active Element
function setActiveFirst(element) {
    element.setAttribute('style', 'transform: scale(1.2) translate3d(2.6vw, 2.7vw, 0px); transition-duration: 1s; z-index: 1; box-shadow: none; font-size: 12px;');
    element.setAttribute('name', 'active');
};

function setActiveMid(element) {
    element.setAttribute('style', 'transform: scale(1.2) translate3d(0vw, 2.7vw, 0px); transition-duration: 1s; z-index: 1; box-shadow: none;');
    element.setAttribute('name', 'active');
};

function setActiveLast(element) {
    element.setAttribute('style', 'transform: scale(1.2) translate3d(-2.6vw, 2.7vw, 0px); transition-duration: 1s; z-index: 1; box-shadow: none;');
    element.setAttribute('name', 'active');
};

function setActiveFirstLessThan3(element) {
    element.setAttribute('style', 'transform: scale(1.2) translate3d(0vw, 2.7vw, 0px); transition-duration: 1s; z-index: 1; box-shadow: none;');
    element.setAttribute('name', 'active');
};

// Setting Up the Inactive Elements
function setInactiveLeftActiveFirst(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(5.4vw, 4vw, 0px); transition-duration: 1s;');
}; 

function setInactiveLeftActiveMid(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(-2vw, 4vw, 0px); transition-duration: 1s;');
};

function setInactiveLeftActiveLast(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(-1.8vw, 4vw, 0px); transition-duration: 1s;');
};

function setInactiveRightActiveFirst(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(1.9vw, 4vw, 0px); transition-duration: 1s;');
}; 

function setInactiveRightActiveMid(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(2vw, 4vw, 0px); transition-duration: 1s;');
};

function setInactiveRightActiveLast(element) {
    element.setAttribute('style', 'transform: scale(0.9) translate3d(-5.2vw, 4vw, 0px); transition-duration: 1s;');
};

function setInactiveAltRowBelow(element) {
    element.setAttribute('style', 'transform: translate3d(0vw, 6.5vw, 0px); transition-duration: 1s;');
};

function setInactiveAltRowAbove(element) {
    element.setAttribute('style', 'transform: translate3d(0vw, 0vw, 0px); transition-duration: 1s;');
};

// Wipe Reset Elements When No Elements are Active
function wipeStyles(element) {
    element.setAttribute('style', 'transition-duration: 1s;');
    element.removeAttribute('name');
};

function inactiveIter(active_postion, active_row, funcLeft, funcRight, altRowBelow, altRowAbove) {
    $('.project-slate').each(function(){
        const slate_count = this.className.split(/[^a-zA-Z0-9]/)
        const row_count = this.parentElement.className.split(/[^a-zA-Z0-9]/)
        const position = slate_count[slate_count.length - 1]
        const row = row_count[row_count.length - 1]
        
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


$('.project-slate').mouseover(function(){
    const slate_count = this.className.split(/[^a-zA-Z0-9]/)
    const row_count = this.parentElement.className.split(/[^a-zA-Z0-9]/)
    const position = slate_count[slate_count.length - 1]
    const row = row_count[row_count.length - 1]

    console.log(this.parentElement.children.length)
    if (this.parentElement.children.length < 3) {
        setActiveFirstLessThan3(this);
        // inactiveIter(position, row, setInactiveLeftActiveFirst, setInactiveRightActiveFirst, setInactiveAltRowBelow, setInactiveAltRowAbove);
    } else {
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
    }
});

$('.project-slate').mouseout(function(){
    $('.project-slate').each(function() {
        wipeStyles(this);
    });
});
