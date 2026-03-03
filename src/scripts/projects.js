import { projects } from "../data/projects.js";

const projectBtns = document.querySelectorAll(".project-btn");
const projectThumbnail = document.getElementById("projectThumbnail");
const projectDesc = document.getElementById("projectDesc");

document.querySelector(".project-btn").classList.add("active-project");

projectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        let projectIdx = btn.dataset.projectId;
        console.log("Switching to project " + projectIdx);
        projectBtns[projectIdx].classList.add("active-project");
        projectBtns.forEach((otherBtn, i) => {
            if (i != projectIdx) otherBtn.classList.remove("active-project");
        });

        projectThumbnail.src = `./src/assets/${projects[projectIdx].thumbnail}`;
        projectDesc.innerHTML = projects[projectIdx].description;
    });
});