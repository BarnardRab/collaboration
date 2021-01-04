//  Strings for use with the textarea or span elements with the id attribute helpbox.

//  Root related strings
const projectManagementDescription          = "Project Management is a comprehensive data tracking system for organizing and maintaining projects and maintaining coordination between team members.";
const workOrderDescription                  = "Work Orders are records of maintenance requests.";

//  Mode related strings
const viewerDescription                     = "The viewer presents this data structure in a reader friendly, condensed format, conserving screen space and focusing on the most important, frequently addressed needs.";
const editorDescription                     = "The editor is a convenient tool for modifiying records in a structured manner. Fields are large for use with touch screens and styled to be easy on the eyes.";
const listingDescription                    = "The listing page is a table of records of this type, with navigation tools for quick access, generally intended for administrative use. The attributes of each record are laid out in the cells to be viewed at a glance and any cells can be hidden or displayed with the filter option.";

//  Department related strings
const departmentDescription                 = "A Department record represents a grouping or office for which users oversee or are employeed";
const departmentNameDescription             = "Name is the identifying component of the department in the database and it must be unique. It should be brief.";
const departmentDescriptionDescription      = "Description is an overview of the department\\'s purpose and any applicable information to convey to those who are in it or interact with it.";
const departmentMembersDescription          = "Members of the department are the employees who work in it."
const departmentMembersAddDescription       = "Add a member to this department with the values specified in the footer of this table."
const departmentMembersRemoveDescription    = "Add the selected member from this department."
const departmentProjectsHistoryDescription  = "Project History derives its values from the Projects Listing page. When a user from this department is added to a project as a team member or lead, the name of the project appears here.";

//  Message related strings
const messageDescription                    = "A Message record is modelled after the structure of a Reddit post. It is a hierachical communication structure for which users can reply directly to other messages. Messages are usually associated with the phases of the projects, but may also be independent. Replies may be nested into multiple levels.";
const messageIDDescription                  = "ID is the identifying component of the message in the database and it must be unique.";
const messageAuthorDescription              = "Author is the user who wrote the message. Only the author may edit the message. Project leaders may delete the message if it is associated with the project.";
const messageSubjectDescription             = "Subject is an overview of the message";
const messageDateDescription                = "Date is when the message was posted";
const messageCategoryDescription            = "Category is the classification of the message, such as progress reports, questions, setbacks, revisions, and notes.\\n\\nNotifications can be configured to go to specified individuals based on which category is selected.";
const messageAssociationDescription         = "Associated Lists are useful for filtering messages that may not be relevant to other members or departments and to draw attention to those that are relevant.\\n\\nWhen viewing the messages section of a record such as Blueprint, Project or Department, this message will appear if the Association selection matches this value. If posting a message while on a page for that record type, this option will automatically be set."
const messageMessageDescription             = "Message is the communication shared with users of this application. On a Windows PC, holding the Windows key while pressing period (.) will open the emojis menu if you\\'d like to stylize your message."
const messageRepliesDescription             = "Replies are associated with this message in a hierarchical structure and may go as many levels deep as neccessary."

//  User related strings
const UserDescription                       = "A user record represents a participant in this application, such as the leader, participant or stakeholder of a project, work order or other collaboration effort or member of a department.";
const userUsernameDescription               = "Username is the identifying component of the User in the database and it must be unique. It determines the name for which the user logs in. It should be brief.";
const userPasswordDescription               = "Password is an authentication code. If authentication is not of concern, this may be left blank.";
const userFirstNameDescription              = "First Name is the first name of the user. User records can be searched and sorted by this attribute";
const userLastNameDescription               = "Last Name is the last name of the user. User records can be searched and sorted by this attribute";
const userEmailDescription                  = "Email is the address for which notifications are to be sent. Notifications can be customized.";
const userPhoneDescription                  = "Phone is the number for which text notifications are to be sent. Notifications can be customized."
const userMainPhotoDescription              = "User Photo is the image for which this user is associated.\n\nThis feature is currently not implemented.";
const userMainPhotoRemoveDescription        = "Remove the photo for which this user is associated. This does not delete the photo.\n\nThis feature is currently not implemented.";
const userPhotoListDescription              = "All the photos associated with this user.\n\nThis feature is currently not implemented.";
const userPhotoDeleteDescription            = "Permenantly removes the selected photo.\n\nThis feature is currently not implemented.";
const userMainPhotoSetDescription           = "Set this as the main photo for which this user is associated.\n\nThis feature is currently not implemented.";
const userPhotoUploadDescription            = "Add a new photo to this user.\n\nThis feature is currently not implemented.";

const userProjectsLeadDescription           = "Projects Lead list derives its values from the Projects Listing page. When a user is added to a project as a leader, the name of the project appears here.";
const userProjectsPartcipatedDescription    = "Projects Participated list derives its values from the Projects Listing page. When a user is added to a project as a team member, the name of the project appears here.";
const userNotificationsDescription          = "Notifications that are sent to the user.\n\n- If Desktop is checked, notifications pop up on the right of the Windows Desktop.\n- If text is checked, notifications are sent as text Descriptions to the phone number specified by the phone field.\n- If Email is checked, notifications are sent to the email account specified by the Email field.";
const userStyleDescription                  = "Style is the general look of the page. It controls features such as text size, color, background and so on.";


//  Arrays of strings for use with select elements or the  This is useful for maintaining a consistency among all collections that uses these values

/**             The elements are General, Planning, Request, Question, Suggestion, Feedback, Setback, Revision, Progress Report, and Note*/
const messageCategoryArray                  = ["General", "Planning", "Request", "Question", "Suggestion", "Feedback", "Setback", "Revision", "Progress Report", "Note"];
/** - This value is passed to the initializeEditor(moduleName, sectionData) function called by html pages in the view/editor folder*/
/** - This value is assigned as a property to the listingContents object passed to the generateListingPage(listingContents, listingTable) function called by html pages in the view/listing folder*/
const rootNavigationObject                  =
{
    header: "Collaboration Directory",
    links :
    [
        {   item: "Home",           location: "../index.html",              description: "Back to the landing page of the Collaboration system"   },
        {   item: "Departments",    location: "../listing/departments.html",description: "Go to the Departments listing page of the Collaboration system"   },
        {   item: "Messages",       location: "../listing/messages.html",   description: "Go to the Messages listing page of the Collaboration system"      },
        {   item: "Users",          location: "../listing/users.html",      description: "Go to the Users listing page of the Collaboration system"   }
    ]
};
