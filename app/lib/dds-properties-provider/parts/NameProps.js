'use strict';

/**
 * From Camunda Properties Provider
 * 
 */
 var  createCategoryValue = require('bpmn-js-properties-panel/lib/helper/CategoryHelper').createCategoryValue,
     is = require('bpmn-js/lib/util/ModelUtil').is,
     getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
     entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
 

     function nameEntryFactory(element, options, translate) {

        options = options || {};
        var id = options.id || 'name',
            label = options.label || translate('Name'),
            modelProperty = options.modelProperty || 'name';
      
        var nameEntry = entryFactory.textField(translate, {
          id: id,
          label: label,
          modelProperty: modelProperty,
          get: options.get,
          set: options.set
        });
      
        return [ nameEntry ];
      
      };

 module.exports = function(group, element, bpmnFactory, canvas, translate, options) {
   if (!options) {
     options = {};
   }
 
   function initializeCategory(semantic) {
     var rootElement = canvas.getRootElement(),
         definitions = getBusinessObject(rootElement).$parent,
         categoryValue = createCategoryValue(definitions, bpmnFactory);

         

     semantic.categoryValueRef = categoryValue;
 
   }
 
   function setGroupName(element, values) {
     var bo = getBusinessObject(element),
         categoryValueRef = bo.categoryValueRef;
 
     if (!categoryValueRef) {
       initializeCategory(bo);
     }
 
     // needs direct call to update categoryValue properly
     return {
       cmd: 'element.updateLabel',
       context: {
         element: element,
         newLabel: values.categoryValue
       }
     };
   }
 
   function getGroupName(element) {
     var bo = getBusinessObject(element),
         value = (bo.categoryValueRef || {}).value;
 
     return { categoryValue: value };
   }
 
    var nameOptions = {
       id: options.id,
       label: options.label && translate(options.label)
     };

     if (!is(element, 'bpmn:Choreography')){
     // name
     group.entries = group.entries.concat(nameEntryFactory(element, nameOptions, translate));
     //console.log(getBusinessObject(element));
     //console.log(getBusinessObject(element).$parent);
     }
 };
 