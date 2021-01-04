The structure of the application follows these patterns:

The app.js file is intended to be the launch point of Node JS.
Because file communication is broken with client server system of Node JS, I am working entirely local and in JavaScript, HTML and CSS with no server implementation.
I'll figure out a fix for that later.

The style folder holds multiple css files, most of which are targeted to a single class attribute in the HTML files and the child elements of that element.

Object oriented design where objects are created and maintained with the following classes:
- Root level: User, Department, Message
- Project Management level: Project, Blueprint
- Work Order level : WorkOrder

Model / View / Control file structure:
- Within model, there are 3 sub directories: data, editor and object.
    - model/data stores:
        - The JavaScript files for objects created with the aforementioned classes. There is one file for each type.
        - The constants file holds strings used for help text and arrays for select elements for which values do not change
    - model/editor stores objects for manipulating the data in the various editors, which are used for the aforementioned objects
        - Each editor has the same object properties: activeObject, moduleName, message, selection, emptySelection, emptyCollection, name, and element
        - Each editor has the following class methods: updateActiveObjectFromFields() and populateFieldsFromActiveObject()
        - These properties are manipulated by the initializeEditor() function, which is meant to reduce repetitive code
        - After the central properties are defined, the following methods from the editor.js file are called before the end of the constructor:
            - initializeEditorReferences(this), validateEditor(this), populateEmptySelectOption(this), populateSelect(this), initializeDescriptions(this);
        - The activeObject property stores an object of a class represented by that editor: UserEditor => User, DepartmentEditor => Department, etc
    - model/object stores the classes that generate the core objects used by this application: User, Department, Message, Project, Blueprint and so on
- Within controller, there are 2 subdirectories and some straggler JavaScript files: generator and object
    - generator/object stores JavaScript files containing common methods used by the objects defined by the classes stored in model/object
        - These methods are not part of the object class because they must be used before the object is created
        - In Java terms, these are equivilent to static methods
            - The initializeObjectTable(idPrefix) function configures all the associated elements of a table, but this requires them to be present in the associated HTML file
                - To achieve this, it first calls getTableElements(idPrefix), then generates the input, select or textarea elements that will go into the table footer for adding records
                - The returned object has the following properties: columnNames, columnWidths, dataSource, descriptions, footerFields, and tableElements
                - The getTableElements(idPrefix) function is defined in the listing_table.js file
                - The getTableElements(idPrefix) function requires that the corresponding HTML file has the following elements with the following id attributes:
                    - input type search with id attribute "(idPrefix)ListingTableSearch"
                    - span with id attribute "(idPrefix)ListingCount"
                    - table with id attribute "(idPrefix)ListingTable"
                    - button with id attribute "(idPrefix)ListingNewRecord"
        - The getObjectFooterValues(footerFields) function takes an array of HTML elements as its argument, passed by the initializeUserTable(idPrefix) function and returns the values of those elements to the ListingTable class, which calls the method in its createNewRecord(table, recordPath) method
    - The controller/validation_check.js file has functions useful for bringing context to thrown exceptions, but sometimes the validation checks will get in the way of finding the problem.
        - If validation checks are a hinderance, temporarily commenting out the functions validateObjectProperties(object, keyNames, keyTypes, functionIdentifier) and validateArrayEquality(arrays, functionIdentifier) may help.
- Within view, there are 3 sub directories: editor, listing and viewer.
    - The view/viewer directory is currently not implemented yet. It is intended as a way to display the data from editor in a more condensed, reader friendly format
    - The view/editor directory supports the view implementation of the model of the same name. It contains only the HTML code and is nearly identifical to other files in the folder.
        - Each editor starts with body onload="initializeObjectEditor();"
        - The initializeObjectEditor() method is defined in the script tag at the end of the body element
        - The script element has only a little bit of code: a variable to store the editor object defined in model/editor and the initializeEditor() function call, defined in controller/generator/editor
        - Each file in the view/editor director should have the following elements:
            - <section class="MenuColumn" id="EditorMenu"></section>
            - <main class="Editor">
            - Under main:
                - <hgroup>
                    <h1>Company Project Management</h1>
                    <h2>Department Editor</h2>    
                </hgroup>
                - <form id="EditorForm">
                - Under form:
                    - <section id="Editor(section name)">
                    - (As many sections as the editor requires)
            - <div style="display: inline-block; position: fixed;">
                <span class="clickable" id="EditorPreviousButton"   style="display: none;">Previous Section</span>
                <span class="clickable" id="EditorNextButton"       >Next Section</span></p>
                <textarea id="helpbox"></textarea>
              </div>
    - The view/listing directory contains HTML files of the same name, but is intended for administrative use and displays the records in a table 
        - Like the view/editor directory, these HTML files also have a general template whose contents are dynamically generated with the functions in the controller/generator directory

    The automation code may be more complex and difficult to keep track of, but it helps maintain consistency across the application and find problems quicker.