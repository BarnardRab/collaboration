
/** Generate an ordered or unordered list element, put it in a container element if specified and return it. The configuration argument recognizes the following keys:
 * 
 * - items (Array of string objects, used to define the text that appears in each list item element)
 * 
 * - descriptions (Array of string objects, used for helpbox descriptions)
 * 
 * - listItemAttributes   (Array of objects whose key/value pairs correspond to the attribute names and values of html list item elements)
 * 
 * - listAttributes (Objects whose key/value pairs correspond to the attribute names and values of html list elements)
 * 
 * - type (String that determines whether the list is ordered or unordered; enter ol for ordered, unordered is default)
 * 
 * - moduleName (String that is appended to the id attribute to make it unique)
 * 
 * - caption  (String that identifies the text of an H1 element preceeding the list)
 * 
 * - container (String that determines which html container element, if any, will house the list and caption; options are "div", "nav", "section" and so on)
 * 
 * - This function is called by other functions such as generateNavigation(configuration) and the Requirements class
 * 
 * @param {ObjectConstructor} configuration
 * @returns Reference to an HTML containter element
 */
function generateList(configuration)
{
    //  flags

    const errorPrefix       = "An exception was thrown in the generateList(configuration) function in the list.js module because the argument passed to configuration";

    properties = validateList();
    return initialize();

    function initialize()
    {
        let list = document.createElement("ul");

        if (configuration.hasOwnProperty("type"))                                               //  Determine whether the list is ordered or unordered
            if (configuration.type == "ol")
                list = document.createElement("ol");

        if (configuration.hasOwnProperty("listAttributes"))
            for (let [key, value] of Object.entries(configuration.listAttributes))              //  Set various html attributes of the list element based on the listAttributes property of the configuration object
                list.setAttribute(key, value);

        //  Generate the list items
        for (let index = 0; index < configuration.items.length; index++)
        {
            let listItem = document.createElement("li");

            if (configuration.hasOwnProperty("moduleName"))                                     //  The module name adds uniqueness to the id, reducing the probility of duplication
                listItem.setAttribute("id", `ListItem${configuration.moduleName}${configuration.items[index]}`);

            listItem.setAttribute("value", configuration.items[index]);
            listItem.appendChild(document.createTextNode(configuration.items[index]));
            list.appendChild(listItem);

            if (configuration.hasOwnProperty("listItemAttributes"))                             //  Set various html attributes of the list item element based on the listAttributes property of the configuration object
                for (let [key, value] of Object.entries(configuration.listItemAttributes[index]))
                    listItem.setAttribute(key, value);                                          //  Assign html attributes to the list item based on the key/value pairs of each iteration of the configuration.listItemAttributes array of objects

            // When adding descriptions, always make sure to escape (the \ character) single and double quotation marks
            if (configuration.hasOwnProperty("descriptions"))
                listItem.setAttribute("onmouseover", `document.getElementById('helpbox').value = '${configuration.descriptions[index]}'`);
        }

        if (configuration.hasOwnProperty("container"))
        {
            let container = document.createElement(configuration.container);

            if (configuration.hasOwnProperty("caption"))
            {
                let caption                 = document.createElement("h1");
                caption.appendChild(document.createTextNode(configuration.caption));
                container.appendChild(caption);
            }

            container.appendChild(list);

            console.log("In generate list, the value is");
            console.log(container);
            return container;
        }
        else
        {
            return list;
        }
    }

    /** Search through the keys of the configuration object and make decisions based on what is configured  */
    function validateList()
    {
        let propertyNames   = ["items",     "descriptions", "listItemAttributes",   "listAttributes",   "type", "moduleName",   "caption",  "container"];
        let flags           = [false,       false,          false,                  false,              false,  false,          false,      false];
        let properties      = {}

        for (let index = 0; index < propertyNames.length; index++)
        {
            if (configuration.hasOwnProperty(propertyNames[index]))
                flags[index] = true;
            
            if (flags[0] == false)                                                  throw `${errorPrefix} does not have a property called items`;
        }

        for (let index = 0; index < 3; index++)                                     //  Iterate only through the object keys that should contain an array
            if (flags[index] == true)
            {
                if (Array.isArray(configuration[propertyNames[index]]) == false)    throw `${errorPrefix}'s ${propertyNames[index]} key is not an array`;
                let property = propertyNames[index];
                if (configuration[property].length != configuration.items.length)   throw `${errorPrefix}'s ${propertyNames[index]} key is not equal in length to configuration.items`;
            }

        if (configuration.hasOwnProperty("descriptions"))                           //  Determine if the list items will have click events
            if (document.getElementById("helpbox") == null)                         throw `${errorPrefix}'s descriptions key is valid, but there is no element with the id helpbox.`
        
        return properties;
    }
}
