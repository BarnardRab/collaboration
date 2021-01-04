function createNewPhase(editor)
{
    for (let index = 0; index < this.activeProject.phases.length; index++)
        if (this.activeProject.phases[index].title == this.elements.phase.title.value)  //  If any element in the Phases array has the key value, then abort the function so as to avoid listing duplicates
        {
            displayHelp('ProjectEditorHelp', `You have attempted to add a Phase with the name of an existing one into the project.\n\nChange the title and try again.`);
            return;
        }
    if (this.activeProject.phases.length == 0)                                          //  If this is the first element in the Phase List, then clear the "No Phases Created Text"
    this.elements.phase.list.options.length = 0;

    this.selectedPhase.edit(
        this.elements.phase.title.value,
        this.elements.phase.description.value,
        this.elements.phase.dateStarted.value,
        this.elements.phase.dueDate.value,
        this.elements.phase.warning.value,
        this.elements.phase.progressionStatus.selectedValue,
        this.elements.phase.punctualStatus.selectedValue,
        null
        );
         
        this.activeProject.phases.push(this.selectedPhase);

        let option = document.createElement("option");

        option.setAttribute("value", this.elements.phase.title.value);
        option.setAttribute("id", `ProjectEditorPhaseList${this.elements.phase.title.value}ID`);
        option.appendChild(document.createTextNode(this.elements.phase.title.value));

        this.elements.phase.list.appendChild(option);

        this.selectedPhase = new Phase("New Phase");
        console.log("The createNewPhase() method of the ProjectEditor class has been executed successfully.")
}

function populateTeamMembersList()
{
    //  Populate the Team Members list
    if (phase.teamMembers.length > 0)
    {
        this.elements.phase.team.options.length = 0;                //  Clear any elements that may be in the list
    
        for (let index = 0; index < Phase.teamMembers.length; index++)
        {
            let member = Phase.teamMembers[index];
            let option = document.createElement("option");

            option.setAttribute("value", member.userName);
            option.setAttribute("id", `ProjectEditorPhaseTeam${member.userName}ID`);
            option.appendChild(document.createTextNode(member.userName));
    
            this.elements.phase.teamMembers.appendChild(option);
        }
    }
}

/** Pass a string value representing the Phase name */
function populateSelectedPhase(phaseName)
{
    let Phase = null;

    for (let index = 0; index < this.activeProject.phases.length; index++)
        if (this.activeProject.phases[index] == PhaseName)
            Phase = this.activeProject.phases[index];

    if (phase == null)
        return;

    populatePhaseList();
}


function populatePhaseList()
{
    if (this.activeProject.phases.length == 0)
        return;
    else
        this.elements.phase.list.options.length = 0;

    //  Add option elements to the select element called Phase List
    for (let index = 0; index < this.activeProject.phases.length; index++)
    {
        let Phase = this.activeProject.phases[index];                  //  Shortcut variable to reduce probability of error
        let option = document.createElement("option");
        option.appendChild(document.createTextNode(phase.title));
        option.setAttribute("id", `ProjectEditorPhaseList${phase.title}ID`);
        option.setAttribute("value", Phase.title);
        
        switch(phase.progressionStatus)                     //  Color code each entry based on its progression status
        {
            case "Proposed"                 : option.setAttribute("style", "background-color : yellow");    break;
            case "Planned"                  : option.setAttribute("style", "background-color : orange");    break;
            case "Started"                  : option.setAttribute("style", "background-color : green");     break;
            case "In Progress"              : option.setAttribute("style", "background-color : pink");      break;
            case "On Hold"                  : option.setAttribute("style", "background-color : brown");     break;
            case "Cancelled"                : option.setAttribute("style", "background-color : red");       break;
            case "Failed Completion"        : option.setAttribute("style", "background-color : crimson");   break;
            case "Completed Successfully"   : option.setAttribute("style", "background-color : blue");      break;
        }
    }
}