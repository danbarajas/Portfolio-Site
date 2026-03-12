import ProjectTag from "../components/ProjectTag.jsx";
import { projects } from "../data/projects.js";
import { createRoot } from "react-dom/client";

const projectBtns = document.querySelectorAll(".project-btn");
const projectThumbnail = document.getElementById("projectThumbnail");
const projectDesc = document.getElementById("projectDesc");
const projectTags = document.getElementById("projectTags");
const tagsRoot = createRoot(projectTags);

window.onload = () => {
    const img = new Image();
    projects.forEach((project) => {
        img.src = `./src/assets/${project.thumbnail}`;
    });
};

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
        tagsRoot.render(
            <>
                {projects[projectIdx].tags?.map((tag) => (
                    <ProjectTag key={tag} tag={tag} />
                ))}
            </>
        );
    });
});