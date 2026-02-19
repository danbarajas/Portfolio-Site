import { links } from '../vars.ts';
const main = document.getElementById('main');
const hero = document.getElementById('hero');
const tabs = document.getElementById('tabs');
var curPos = 0;

function slideContent(slidePos) {
    // If scroll at the correct position, scroll to the given slide
    if (tabs && tabs.scrollLeft == tabs.scrollWidth / tabs.childElementCount * curPos) {
        tabs.scrollTo({
            left: tabs.scrollWidth / tabs.childElementCount * slidePos,
        });
        curPos = slidePos;
    // If not, keep scrolling to the current position (prevents invalid
    // snapping that could lead to an inaccurate curPos)
    } else {
        tabs.scrollTo({
            left: tabs.scrollWidth / tabs.childElementCount * curPos,
        });
    }
}

tabs.addEventListener('click', () => {
    slideContent((curPos + 1) % tabs.childElementCount);
});

tabs.addEventListener("wheel", (e) => {
    if (main.scrollTop < window.innerHeight) return; // If hero is still in view, scroll normally

    e.preventDefault();
    if (e.deltaY > 0) { // Scroll down, next slide
        slideContent((curPos + 1) % tabs.childElementCount);
    } else if (curPos != 0) { // Scroll up, previous slide (if not on first slide)
        slideContent((curPos - 1 + tabs.childElementCount) % tabs.childElementCount);
    } else if (tabs.scrollLeft == 0) { // Scroll up on first slide, scroll to hero
        hero.scrollIntoView();
    } else { // Scroll up on first slide, but scroll to slide is not finished, continue scrolling
        tabs.scrollTo({
            left: 0,
        });
    }
});

const home = document.getElementById(links[0].id);
home.addEventListener('click', () => {
    hero.scrollIntoView();
});

links.slice(1).forEach((link, i) => {
    const element = document.getElementById(link.id);
    element.addEventListener('click', () => {
        tabs.scrollIntoView();
        tabs.scrollTo({
            left: tabs.scrollWidth / tabs.childElementCount * i,
        });
        curPos = i;
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        console.log(window.innerHeight + ", " + tabs.scrollTop);
    }
});