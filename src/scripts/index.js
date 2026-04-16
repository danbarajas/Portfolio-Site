import { links } from '../data/vars.ts';
const main = document.getElementById('main');
const hero = document.getElementById('hero');
const tabs = document.getElementById('tabs');
const home = document.getElementById(links[0].id);
const navTitle = document.getElementById('navTitle');
var curPos = 0;

function updateNav(linkIndex) {
    if (linkIndex == -1) {
        home.classList.add('active-nav');
        navTitle.classList.add('hide-element');
    } else {
        home.classList.remove('active-nav');
        navTitle.classList.remove('hide-element');
    }
    
    links.slice(1).forEach((l, i) => {
        const link = document.getElementById(l.id);
        if (linkIndex == i) {
            link.classList.add('active-nav');
        } else {
            link.classList.remove('active-nav');
        }
    });
    console.log("Updated nav to " + linkIndex);
}
updateNav(-1); // Set initial nav state

function slideContent(slidePos) {
    // If scroll at the correct position, scroll to the given slide
    if (tabs && tabs.scrollLeft == tabs.scrollWidth / tabs.childElementCount * curPos) {
        tabs.scrollTo({
            left: tabs.scrollWidth / tabs.childElementCount * slidePos,
        });
        curPos = slidePos;
        updateNav(slidePos);
    // If not, keep scrolling to the current position (prevents invalid
    // snapping that could lead to an inaccurate curPos)
    } else {
        tabs.scrollTo({
            left: tabs.scrollWidth / tabs.childElementCount * curPos,
        });
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateNav(curPos);
            console.log("Scrolled to tabs");
        }
    });
}, {
    threshold: 0.9
});
observer.observe(tabs);

tabs.addEventListener("wheel", (e) => {
    if (main.scrollTop < window.innerHeight) return; // If hero is still in view, scroll normally

    e.preventDefault();
    if (e.deltaY > 0) { // Scroll down, next slide
        slideContent((curPos + 1) % tabs.childElementCount);
    } else if (curPos != 0) { // Scroll up, previous slide (if not on first slide)
        slideContent((curPos - 1 + tabs.childElementCount) % tabs.childElementCount);
    } else if (tabs.scrollLeft == 0) { // Scroll up on first slide, scroll to hero
        hero.scrollIntoView();
        updateNav(-1);
    } else { // Scroll up on first slide, but scroll to slide is not finished, continue scrolling
        tabs.scrollTo({
            left: 0,
        });
    }
});

home.addEventListener('click', () => {
    hero.scrollIntoView();
    updateNav(-1);
});

links.slice(1).forEach((link, i) => {
    const element = document.getElementById(link.id);
    element.addEventListener('click', () => {
        tabs.scrollIntoView();
        tabs.scrollTo({
            left: tabs.scrollWidth / tabs.childElementCount * i,
        });
        curPos = i;
        updateNav(i);
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        console.log(window.innerHeight + ", " + tabs.scrollTop);
    }
});