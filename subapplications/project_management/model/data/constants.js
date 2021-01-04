const blueprintsMessage = "Open the Blueprints listing, where scalable vectore graphics are used to ";
const projectsMessage   = "The Project List organizes all the projects in a table, laying out their attributes";
const homeBlueprint     = "A blueprint record is a map or illustration of the planning of a project such as floorplans.\n\nBlueprints utilize scalable vectore graphics, which allow for zooming and panning, as seen in Google Maps.";
const homeProject       = "A Project record is a multi-stage task for which the users and departments are concerned. They may be nested into hierachies called sub-projects.";

const projectTitleDescription           = "Title is the identifying component of the Project in the database and it must be unique. It should be brief.";
const projectDescriptionDescription     = "Description is an overview of the project including its purpose and any applicable information to convey to those who are concerned with it.\\n\\nFurther details should be specified in the project phases section.";
const projectIsCategoryDescription      = "Is Category marks this project as a category.\\n\\nIf this checkbox is marked, this project will appear in the Category list presented when creating or editing a project.";
const projectCategoryDescription        = "Category not only provides the benefit of search and sorting, it also provides presets.\\n\\nCategory presets are default configurations that are automatically applied unless explicitly clarified.\\n\\nExamples consist of replicating the phase list of a frequently recurring project, which encompasses sets of requirements, team rosters, financial plans and communication messages.";
const projectLeaderDescription          = "Project Leader is the individual who manages the project. This user may modify the project settings and delete messages associated with the project.";
const projectPriorityDescription        = "Priority is an approximation of the urgency of the project. Notifications can be configured to be issued based on priority level. User chooses alerts for priority levels";
const projectStatusDescription          = "Status is the current state of this phase of this project.\\n\\nNotifications can be configured to be issued based on which option this status is set to";
const projectBudgetDescription          = "Budget is the maximum amount of funds alotted to the entire project.\\n\\nEach phase will have its own funding specified. If the cumulative budgets of each phase exceeds the total budget specified here, an alert is issued to the project lead and the project phase Lead";
const projectBudgetWarningDescription   = "Budget Warning specifies a numerical value for which an alert should be issued regarding nearing the limit of the budget of the entire project.\\n\\nIt cannot exceed the value specified in Budget.";
const projectDueDateDescription         = "Due Date is the latest date for which the entire project is expected to complete.\\n\\nEach phase will have its own due date specified. If the date of each phase exceeds the total due date specified here, or the start date of the next phase, an alert is issued to the project lead and the project phase Lead";
const projectDueDateWarningDescription  = "Due Date Warning specifies when an alert should be issued prior to nearing the due date of the entire project.\\n\\nIt cannot exceed the value specified in Due Date";
const projectDateCreatedDescription     = "Date Created represents when this project was created, not to be confused with when it was started, as a project can be created, but set to the status of Proposed or Planned";
const projectDateModifiedDescription    = "Date Modified tracks when the project was last modified";

/**                         The elements are Low, Medium, High and Critical* */
const projectPriortyArray               = ["Low", "Medium", "High", "Critical"];
/**                         The elements are Proposed, Planned, Started, In Progress, On Hold, Cancelled, Failed Completion, Completed Successfully */
const projectProgressionStatusArray     = ["Proposed", "Planned", "Started", "In Progress", "On Hold", "Cancelled", "Failed Completion", "Completed Successfully"];
/** - This value is passed to the initializeEditor(moduleName, sectionData) function called by html pages in the view/editor folder*/
/** - This value is assigned as a property to the listingContents object passed to the generateListingPage(listingContents, listingTable) function called by html pages in the view/listing folder*/
const projectManagementNavigationObject =
{
    header: "Project Management Directory", links :
    [
        {   item: "Home",       location: "../index.html",              description: "Back to the landing page of the Project Management system"   },
        {   item: "Blueprints", location: "../listing/blueprints.html", description: "Go to the Blueprints listing page of the Project Management system"   },
        {   item: "Projects",   location: "../listing/projects.html",   description: "Go to the Projects listing page of the Project Management system"   },
    ]
};
