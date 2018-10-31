/**
 * A completely functioning todo-list with CRUD. 
 * To implement: LS for creating (adding) {FIXED}, LS for removing {FIXED}, and LS for updating. Every step has the data part and the UI part
 * 
 * When updating the LS: it gives us a copy of the updated item but doesn't remove the old one. So, we have to implement the remove-function to remove the item after having gotten the updated copy. Note however that we have another target in our update-function (the update-btn i guess, or the active-element), whereas the target in the remove-function is the remove-btn.
 * 
 * SUGGESTIONS:
 * Add a confirmation for the remove-btn. A cool UI, red popup
 */

const DOMstrings = {
    listGroup: document.querySelector('.list-group'),
    listItems: document.querySelectorAll('.list-group-item'),
    projectNames: document.querySelectorAll('.project-name'),
    projectTools: document.querySelectorAll('.project-tools'),
    projectDescs: document.querySelectorAll('.project-desc'),
    nameInput: document.querySelector('.input-name'),
    descInput: document.querySelector('.input-desc'),
    toolsInput: document.querySelector('.input-tools'),
    addBtn: document.querySelector('.add-btn'),
    updateBtn: document.querySelector('.update-btn'),
    errorBox: document.querySelector('.error-box')
};




// Event Listeners
// Loading
document.addEventListener('DOMContentLoaded', loadPage);

// Adding Project
DOMstrings.addBtn.addEventListener('click', addProject);

// Removing Project : use event delegation, select the listGroup and then delegate:)
DOMstrings.listGroup.addEventListener('click', removeProject);

// Updating Project Idea: create a new update btn next to the add btn. One should click and then see the .active, and then be able to modify the info and finally submit the btn.
// Toggle Project Items
DOMstrings.listGroup.addEventListener('click', updateProject);

// Update Project
//DOMstrings.updateBtn.addEventListener('click', updateProject);

// Functions

// Load Page
function loadPage() {
    let projects;
    DOMstrings.listGroup.textContent = '';
    DOMstrings.errorBox.style.display = 'none';

    // Getting items from LS (reading)
    if (localStorage.getItem('projects') === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem('projects'));
    }

    projects.forEach(project => {
        // You're dealing with an object, so project.name is the projectName, project.desc is the projectDesc, project.tool is the projectTool
            let markup = `
            <a href="#" class="list-group-item list-group-item-action list-group-item-success flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between border-success">
                <h5 class="mb-1 project-name">${project.name}</h5>
                <small class="project-tools">${project.tool}</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
            <p class="mb-1 project-desc">${project.desc}</p>
            <button type="button" class="btn btn-outline-danger btn-sm remove-btn">Remove</button>
            </div>
            
           </a>
            `;
        DOMstrings.listGroup.insertAdjacentHTML('afterbegin', markup);

    })
}

// Add Project
function addProject() {
    let projectName = DOMstrings.nameInput.value;
    let projectDesc = DOMstrings.descInput.value;
    let projectTool = DOMstrings.toolsInput.value;

    if (projectName === '' || projectDesc === '' || projectTool === '') {
        DOMstrings.errorBox.innerHTML = `
        <h4 class="alert-heading text-center">Error!</h4>
        Please check your input values.
        `;
        DOMstrings.errorBox.className = 'alert alert-danger text-center py-5 px-5 error-box';
        DOMstrings.errorBox.style.display = 'block';
        setTimeout(function() {
            DOMstrings.errorBox.style.display = 'none';
        }, 1500);
    } else {
        const markup = `
                <a href="#" class="list-group-item list-group-item-action list-group-item-success flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between border-success">
                                <h5 class="mb-1 project-name">${projectName}</h5>
                                <small class="project-tools">${projectTool}</small>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                            <p class="mb-1 project-desc">${projectDesc}</p>
                            <button type="button" class="btn btn-outline-danger btn-sm remove-btn">Remove</button>
                        </div>
                            
                </a>
                `;
    
        DOMstrings.listGroup.insertAdjacentHTML('afterbegin', markup);

        // Clear Input
        DOMstrings.nameInput.value = '';
        DOMstrings.descInput.value = '';
        DOMstrings.toolsInput.value = '';

        // Display congratz msg
        DOMstrings.errorBox.innerHTML = `
        <h4 class="alert-heading text-center">Perfect!</h4>
        Project added.
        `;
        DOMstrings.errorBox.className = 'alert alert-primary text-center py-5 px-5 error-box';
        DOMstrings.errorBox.style.display = 'block';
        setTimeout(function() {
            DOMstrings.errorBox.style.display = 'none';
        }, 1500);

    }

    let projects;
    if (localStorage.getItem('projects') === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }

    let project = {
        name: projectName,
        desc: projectDesc,
        tool: projectTool
    };

    projects.push(project);

    localStorage.setItem('projects', JSON.stringify(projects));
}

// Removing Project
function removeProject(e) {
    if (e.target.closest('.remove-btn')) {
        // We have to hunt for the name, desc and tool from our remove-btn now. Then we have to match its text contents with the real items from the LS, and if it matches: then we remove that thing from the item (with splicing maybe) and then resetting the item to our LS

        //let removedDesc = e.target.closest('.remove-btn').parentElement.firstElementChild.textContent;
        let removedName = e.target.closest('.remove-btn').parentElement.parentElement.firstElementChild.firstElementChild.textContent;
        //let removedTool = e.target.closest('.remove-btn').parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.textContent;

        // Removing project from the LS (first we have to get it from our LS and save it to projects, and then manipulate the projects, and then send it back to LS)
        let projects;
        if (localStorage.getItem('projects') === null) {
          projects = [];
        } else {
          projects = JSON.parse(localStorage.getItem('projects'));
        }

        projects.forEach((project, index) => {
            // Remember that the project is an object. So, we have to match three things: project.name == removedName, project.desc == removedDesc, project.tool == removedTool. And we'll have to use the index as well. The problem is that we have an object,... Or maybe it's not even a problem, because we want to remove the entire object anyways. So, in fact we don't even need the desc or the tool for this.
            if (project.name === removedName) {
                projects.splice(index, 1);
            }

            localStorage.setItem('projects', JSON.stringify(projects));
        });


        // Removing project from the UI
        e.target.closest('.remove-btn').parentElement.parentElement.remove();

        // Display remove msg

        DOMstrings.errorBox.innerHTML = `
        <h4 class="alert-heading text-center">Done!</h4>
        Project removed.
        `;
        DOMstrings.errorBox.className = 'alert alert-danger text-center py-5 px-5 error-box';
        DOMstrings.errorBox.style.display = 'block';
        setTimeout(function() {
            DOMstrings.errorBox.style.display = 'none';
        }, 1500);
    }

}

// Updating Project

function updateProject(e) {
    e.preventDefault();
    // Toggle the Active Class
    if (e.target.matches('.list-group-item-action, .list-group-item-action *')) {
        e.target.closest('.list-group-item-action').classList.toggle('active');
        let updateProjectName = e.target.closest('.list-group-item-action').firstElementChild.firstElementChild;
        let updateProjectTool = e.target.closest('.list-group-item-action').firstElementChild.firstElementChild.nextElementSibling;
        let updateProjectDesc = e.target.closest('.list-group-item-action').firstElementChild.nextElementSibling.firstElementChild;
        let oldProjectName = updateProjectName.textContent;
        let oldProjectTool = updateProjectTool.textContent;
        let oldProjectDesc = updateProjectDesc.textContent;

        DOMstrings.updateBtn.addEventListener('click', function() {
            let projectName = DOMstrings.nameInput.value;
            let projectDesc = DOMstrings.descInput.value;
            let projectTool = DOMstrings.toolsInput.value;

            // PROBLEMMM: When you submit the btn, the empty fields will be left empty. Then the problem is that you add these empty fields to the object, and then push it to the projects array :/
        
            // Display error msg
            if (projectName === '' && projectDesc === '' && projectTool === '') {
                DOMstrings.errorBox.innerHTML = `
                <h4 class="alert-heading text-center">Error!</h4>
                Please check your input values.
                `;
                DOMstrings.errorBox.className = 'alert alert-danger text-center py-5 px-5 error-box';
                DOMstrings.errorBox.style.display = 'block';
                setTimeout(function() {
                    DOMstrings.errorBox.style.display = 'none';
                }, 1500);
            } else {
                // Here we have to check if the input is empty, if it is. then let that element be unchanged .If its not empty, then change the element to the new value. we can use ternary operators for that
                // The problem is that if we only update one field, then the rest get erased automatically. PROBLEM FIXED!
                projectName == '' ? updateProjectName.textContent = updateProjectName.textContent : updateProjectName.textContent = projectName;
                projectDesc == '' ? updateProjectDesc.textContent = updateProjectDesc.textContent : updateProjectDesc.textContent = projectDesc;
                projectTool == '' ? updateProjectTool.textContent = updateProjectTool.textContent : updateProjectTool.textContent = projectTool;

                // Clear Input
                DOMstrings.nameInput.value = '';
                DOMstrings.descInput.value = '';
                DOMstrings.toolsInput.value = '';

                // Add the updates to LS
                let projects;
                if (localStorage.getItem('projects') === null) {
                  projects = [];
                } else {
                  projects = JSON.parse(localStorage.getItem('projects'));
                }

                let insertedName, insertedDesc, insertedTool;
                projectName == '' ? insertedName = oldProjectName : insertedName = projectName;
                projectDesc == '' ? insertedDesc = oldProjectDesc : insertedDesc = projectDesc;
                projectTool == '' ? insertedTool = oldProjectTool : insertedTool = projectTool;
            
                let project = {
                    name: insertedName,
                    desc: insertedDesc,
                    tool: insertedTool
                };
            
                projects.push(project);

                // Now it removes it, but the problem is that it removes the entire old object. We still want to keep the old values from the old object
                projects.forEach((project, index) => {
                    if (project.name == oldProjectName) {
                        projects.splice(index, 1);
                    }
                });

                // We ahve to use the similar logic of the LS-remove function. Because the error is that 
            
                // Remove the previous LS item and reset it with the new projects
                //localStorage.removeItem('projects');
                localStorage.setItem('projects', JSON.stringify(projects));

                // Display update msg

                DOMstrings.errorBox.innerHTML = `
                <h4 class="alert-heading text-center">Done!</h4>
                Project details updated.
                `;
                DOMstrings.errorBox.className = 'alert alert-warning text-center py-5 px-5 error-box';
                DOMstrings.errorBox.style.display = 'block';
                setTimeout(function() {
                    DOMstrings.errorBox.style.display = 'none';
                }, 1500);
            }

        })

    }

};
