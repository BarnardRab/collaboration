
/**Configure the attributes of the help box and return it to the caller for the purpose of dynamic display of help messages with JavaScript
 * @param {string} elementID 
 */
function generateHelpBox()
{
    let helpBox = document.getElementById("helpbox");
    helpBox.setAttribute("class", "helpbox");
    helpBox.setAttribute("disabled", true);
    helpBox.setAttribute("rows", 30);
 //   helpBox.setAttribute("cols", "500");
    helpBox.setAttribute("placeholder", "Context sensitive information is dynamically displayed here");
}
