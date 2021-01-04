        /** Check the argument passed to checkedObject for valid properties. The parameters in the arguments other than checkedObject and objectStructure are used to determine the information displayed in exceptions that are thrown.
         * @param {string} functionName         The name of the function whose arguments are checked for validation. This string should include the parenthesis and that argument list
         * @param {string} sourceFileName       The file for which the function is stored
         * @param {string} checkedObjectName    The name of the argument as seen in the calling function's header
         * @param {object} checkedObject        The object reference for which is being validated
         * @param {object} objectStructure      The structure of the object, including properties propertyName (array), dataTypes (array), nullChecks (array), and equalArray (string)
         */
        // function validateFunctionIdentifier(functionName, sourceFileName, checkedObjectName, checkedObject, objectStructure)
        function validateFunctionIdentifier(functionIdentifier)
        {
            /////////////////////////////////////////////////////////////////////
            //  Check for errors in the arguments passed to this function
            /////////////////////////////////////////////////////////////////////
            const argumentErrorPrefix   = `An exception was thrown in the validateFunctionIdentifier(functionIdentifier) method of the validation_check.js file because`;
            
            //  Check the parameters of this function for nulls
            if (functionIdentifier == null)                                     throw `${argumentErrorPrefix} functionIdentifier is null`;
            if (functionIdentifier.hasOwnProperty("functionName")       == false)  throw `${argumentErrorPrefix} there is no key called functionName`;
            if (functionIdentifier.hasOwnProperty("sourceFileName")     == false)  throw `${argumentErrorPrefix} there is no key called sourceFileName (${functionName})`;
            if (functionIdentifier.hasOwnProperty("checkedObjectName")  == false)  throw `${argumentErrorPrefix} there is no key called checkedObjectName (${functionName})`;
        }

        /** Verify that the object has all the expected keys and types
        * @param {object}   object              The object to be checked
        * @param {string[]} keyNames            An array of strings to determine if the object has all its expected keys
        * @param {string[]} keyTypes            An array of strings to determine the data types
        * @param {object}   functionIdentifier  An object with the keys functionName, sourceFileName and checkedObjectName
        */
        function validateObjectProperties(object, keyNames, keyTypes, functionIdentifier)
        {
            validateFunctionIdentifier(functionIdentifier);
            const errorPrefix           = `An exception was thrown in the validateObjectProperties() method called by the ${functionIdentifier.functionName} method of the ${functionIdentifier.sourceFileName} file because`;

            if (object == null)                     throw `${errorPrefix} object is null;`;
            if (Array.isArray(keyNames) == false)   throw `${errorPrefix} keyNames is not an array`;
            if (Array.isArray(keyTypes) == false)   throw `${errorPrefix} keyTypes is not an array`;

            for (let index = 0; index < keyNames.length; index++)
            {
                if (object.hasOwnProperty(keyNames[index]) == false)                                        //  If object is missing an expected property key
                    throw `${errorPrefix} keyNames[${index}] does not have the key ${keyNames[index]}`;
                if (keyTypes[index] == "array")
                    if (Array.isArray(object[keyNames[index]]) == false)                                    //  If object has a null value for the expected property key
                        throw `${errorPrefix} keyNames[${index}] is not an array`;
            }
        }

        /** Validate the array by making sure it has all the keys that are expected of it
        * @param {object[]} array         An array of objects or primitives
        * @param {string[]} objectKeys    An array of strings representing the key name of each object of the array
        * @param {object}   functionIdentifier  An object with the keys functionName, sourceFileName and checkedObjectName
        */
        function validateArray(array, objectKeys, functionIdentifier)
        {
            validateFunctionIdentifier(functionIdentifier);
            const errorPrefix               = `An exception was thrown in the validateArray(array, objectKeys, functionIdentifier) method called by the ${functionIdentifier.functionName} method of the ${functionIdentifier.sourceFileName} file because`;

            if (array                       == null)    throw `${errorPrefix} the value passed to array is null.`;
            if (objectKeys                  == null)    throw `${errorPrefix} the value passed to objectKeys is null.`;
            if (Array.isArray(array)        == false)   throw `${errorPrefix} the value passed to array is not an array.`;
            if (Array.isArray(objectKeys)   == false)   throw `${errorPrefix} the value passed to objectKeys is not an array.`;

            for (let arrayIndex = 0; arrayIndex < array.length; arrayIndex++)
            {
                let currentObject = array[arrayIndex];
                if (currentObject == null)
                    throw `${errorPrefix} array[${index}] is null`;

                for (let keyIndex = 0; keyIndex < objectKeys.length; keyIndex++)
                {
                    let currentKey = objectKeys[keyIndex];
                    if (currentObject.hasOwnProperty(currentKey) == false)
                        throw `${errorPrefix} the value at array index ${arrayIndex} does not have a key called ${currentKey}`;
                }
            }
        }
        
        /**Ensure that all arrays passed the parameter have the same length. This function is useful for enforcing parallel array structures.
         * @param {[[]]} arrays An array of arrays
         * @param {object} functionIdentifier
         */
        function validateArrayEquality(arrays, functionIdentifier)
        {
            validateFunctionIdentifier(functionIdentifier);
            const errorPrefix           = `An exception was thrown in the validateArrayEquality(arrays, functionIdentifier) method called by the ${functionIdentifier.functionName} method of the ${functionIdentifier.sourceFileName} file because`;
            if (Array.isArray(arrays) == false)
                throw `${errorPrefix} the value passed to arrays is not an array.`;

            if (Array.isArray(arrays[0]) == false)
                throw `${errorPrefix} the value passed to arrays[0] is not an array.`;

            let arrayLength = arrays[0].length;

            for (let index = 0; index < arrays.length; index++)
            {
                let currentArray = arrays[index];
                if (Array.isArray(currentArray) == false)
                    throw `${errorPrefix} the value passed to arrays[${index}] is not an array.`;
                if (currentArray.length != arrayLength)
                    throw `${errorPrefix} the value passed to arrays[${index}], ${currentArray.length}, is not of equal length to the first parallel array, ${arrayLength}. The values of the arrays are ${arrays[0]} and ${currentArray}`;
            }
        }

        /**
         * @param {[]} arguments 
         */
        function checkForNulls(arguments)
        {
            const errorPrefix = "An exception was thrown in the checkForNulls(arguments) method of the validationCheck() method in the validation_check.js file because"
            if (arguments == null)                  throw `${errorPrefix} the value of arguments is null`
            if (Array.isArray(arguments) == false)  throw `${errorPrefix} the value of arguments is not an array`

            for (let index = 0; index < arguments.length; index++)
                if (arguments[index] == null)
                    throw `${errorPrefix} the value of arguments[${index}] is null`
        }