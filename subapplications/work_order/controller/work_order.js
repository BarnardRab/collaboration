            //  Get references to the HTML input, select and textarea elements
            let orderNumber = null;
            let orderDate   = null;
            let client      = null;
            let priority    = null;
            let dueDate     = null;
            let dueTime     = null;
            var assignedTo  = null;
            let attachments = null;
            let description = null;
    
            function initializeWorkOrderFields(elementIDs)
            {
                console.log(elementIDs)
                orderNumber = document.getElementById(elementIDs[0]);
                orderDate   = document.getElementById(elementIDs[1]);
                client      = document.getElementById(elementIDs[2]);
                priority    = document.getElementById(elementIDs[3]);
                dueDate     = document.getElementById(elementIDs[4]);
                dueTime     = document.getElementById(elementIDs[5]);
                assignedTo  = document.getElementById(elementIDs[6]);
                attachments = document.getElementById(elementIDs[7]);
                description = document.getElementById(elementIDs[8]);
    
                //  Create the null option element to remove a default selection
                let option = document.createElement("option");
                option.setAttribute("value", "None");
                option.appendChild(document.createTextNode("No employee selected"));


                if (assignedTo == null)
                {
                    throw `Value of assigned to is null. The element ID is ${elementIDs[6]}`
                }
                assignedTo.appendChild(option);
    
                populateSelectFromObjectArray(assignedTo, users, "username", ["firstName", "lastName"]);
                orderNumber.value   = workOrders.length;       //  Set the new Order Number field to the length of the workOrders array in /data/work_orders.js 
                orderDate.value     = new Date();                //  Set the order date field to the current date
            }
            

            /** Sets the value of the "To Be Completed By" field and its max attribue to be consistent with the priority selection. This removes the probability of user error.*/
            function updateDueDate()
            {
                let value           = null;
                
                switch(priority.value)
                {
                    case "1": //  Cases 1 through 3 should have the same effect on the due date field
                    case "2":
                    case "3": value = getDateString(0); dueDate.value = value;   dueDate.setAttribute("max", value); break;
                    case "4": value = getDateString(7); dueDate.value = value;   dueDate.setAttribute("max", value); break;
                    case "5": dueDate.removeAttribute("max"); break;//  Case 5 is not urgent, so if the maximum value for due date was set, the unset it
                    default: throw `The updateDueDate() function of this document failed because the switch statement received an unexpected value of ${select.value}`;
                }
    
                /**  If neccessary, zero pad the day and month to conform to the required format of the "To Be Completed By" HTML element
                 * {number} daysAfter   The number of after the current date
                */
                function getDateString(daysAfter)
                {
                    let date            = new Date();
                    let max             = "";
    
    
                    date.setDate(date.getDate() + daysAfter);
    
                    console.log("Variable values for Year, month and day are:")
                    let year    = date.getFullYear();
                    let month   = date.getMonth() + 1;
                    let day     = date.getDate();
    
                    if (parseInt(day) < 10)      day   = "0" + day;
                    if (parseInt(month) < 10)    month = "0" + month;
    
                    console.log(year + "-" + month + "-" + day);
    
                    max = `${date.getFullYear()}-${month}-${day}`;
                    console.log("Max is");
                    console.log(max);
    
                    return max;
                }
            }
    
            function resetForm()
            {
                document.getElementById("WorkOrderForm").reset();
                orderNumber .value = workOrders.length;
                orderDate   .value = new Date();
            }
    
            function submitForm()
            {
                orderDate   .value = new Date();
                orderNumber .value = workOrders.length;
                document.getElementById("WorkOrderForm").submit();
            }