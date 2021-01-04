/**Pass an array of strings and get back an array of option elements with their value and text nodes initialized
 * @param {string[]} array 
 */
function generateOptionArray(array)
{
    let elementArray = [];
    
    for (let index = 0; index < array.length; index++)
    {
        let option = document.createElement("option");
        option.setAttribute("value", array[index]);
        option.appendChild(document.createTextNode(array[index]));
        elementArray.push(option);
    }
    return elementArray;
}

/**Return the object specified by the selection from a select element without the attribute multiple set
 * @param {string}              value               The value of the object's primary key for which to identify
 * @param {ObjectConstructor[]} array               The full array of Blueprint, Department, Message, Project or User elements defined in the app.js module
 * @param {string}              comparedAttribute   The attribute to be checked to match the selected option to the object in the model class
 */
function getSelectedObject(value, array, comparedAttribute)
{
    for (let index = 0; index < array.length; index++)
    {
        let currentObject = array[index];
        if (currentObject[comparedAttribute] == value)
            return currentObject;
    }
    console.log("The getSelectedObject(value, array, comparedAttribute) function of the select.js module failed to return an object");
    return null;
}

/**
 * Return an array of objects specified by the selection from a select element with the attribute multiple set
 * @param {HTMLOptionElement[]} options             The option elements of the select element to be checked for selected items
 * @param {ObjectConstructor[]} array               The full array of Blueprint, Department, Message, Project or User elements defined in the app.js module
 * @param {string}              comparedAttribute   The attribute to be checked to match the selected option to the object in the model class
 */
function getSelectedObjects(options, array, comparedAttribute)
{
    let selectedItems = [];

    for (let optionIndex = 0; optionIndex < options.length; optionIndex++)  //  Loop through the elements of the select element
    {
        if (options[optionIndex].selected)
        {
            let selectedOption = options[optionIndex];
            for (let arrayIndex = 0; arrayIndex < array.length; arrayIndex++)
            {
                let currentObject = array[arrayIndex];
                if (currentObject[comparedAttribute] == selectedOption.value)
                {
                    selectedItems.push(currentObject);
                }
            }
        }
    }

    return selectedItems;
}

/** Generate the option elements for a select element based on the contents of the app.js arrays such as blueprints, departments, messages, projects and users
 * @param {ObjectConstructor[]} array   The full array of Blueprint, Department, Message, Project or User elements defined in the app.js module
 * @param {HTMLSelectElement} select    The select element for which the option elements will be appended to
 * @param {string} valueProperty        The property of each object from the array that will be assigned to the option element's value attribute
 * @param {string[]} displayProperties  The property of each object from the array that will be assigned to the option element's visible text
 * @param {ObjectConstructor}   filter  An object that encapsulates the criteria to filter out results. The key/value pair of propertyName
 */
function populateSelectFromObjectArray(select, array, valueProperty, displayProperties, filter)
{
    const errorPrefix = "The populateSelectFromObjectArray(select, array, valueProperty, displayProperties, filter) method failed because"

    if (select          == null) throw `${errorPrefix} the value of select is null. The valueProperty is ${valueProperty}`;
    if (array           == null) throw `${errorPrefix} the value of array is null. The valueProperty is ${valueProperty}`;
    if (valueProperty   == null) throw `${errorPrefix} the value of valueProperty is null`;
    if (displayProperties   == null) throw `${errorPrefix} the value of displayProperties is null. The valueProperty is ${valueProperty}`;

    if (filter != null) //  Validation check
    {
        if (filter.hasOwnProperty("includeProperty") == false)                  throw `${errorPrefix} the filter object does not have an includeProperty key`;
        if (filter.includeProperty.hasOwnProperty("propertyName") == false)     throw `${errorPrefix} the filter object does not have an includeProperty.propertyName key`;
        if (filter.includeProperty.hasOwnProperty("propertyValue") == false)    throw `${errorPrefix} the filter object does not have an includeProperty.propertyValue key`;
    }

    for (let index = 0; index < array.length; index++)
    {
        let option = document.createElement("option");                  //  Create the option element to be appended to the specified select element
        let object = array[index];                                      //  Shortcut variable to reduce probability of error
        let optionText = "";                                            //  The visible text that appears on each option element

        if (filter != null)                                             //  Begin filter code
        {
            let propertyKey = filter.includeProperty.propertyName;
            let propertyValue = filter.includeProperty.propertyValue;
            if (object[propertyKey] != propertyValue)
                continue;                                               //  If the criteria is not found, abort the current iteration of the loop
        }

        for (let propertyIndex = 0; propertyIndex < displayProperties.length; propertyIndex++)  //  Loop through the displayProperties array to determine the text to append to the option elements
        {
            let currentProperty = displayProperties[propertyIndex];
            optionText += object[currentProperty] + " ";                                        //  Add a space so that collections of properties are delimited by a space
        }

        option.setAttribute("value", object[valueProperty]);                                    //  Set the value attribute of each option element to the primary key of the associated object to make it accessible
        option.appendChild(document.createTextNode(optionText));
        select.appendChild(option);
    }
}
