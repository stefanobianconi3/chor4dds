var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    removeEntry = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').removeEntry,
    extensionElements = require('bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/ExtensionElements.js'),
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
    formHelper = require('bpmn-js-properties-panel/lib/helper/FormHelper'),
    utils = require('bpmn-js-properties-panel/lib/Utils.js'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    find = require('lodash/find'),
    each = require('lodash/forEach');


var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

module.exports = function(group, element, bpmnFactory, translate) {

    //console.log('element',element) Shape
    var bo = getBusinessObject(element); //ChoreographyTask
    if (!bo) {
      return;
    }
    
    var messages = bo.di.bpmnElement.messageFlowRef

    function setName(m) {
       if (bo.initiatingParticipantRef.id == m.sourceRef.id){
            return 'Receiver'
        }
        else return 'Initiating'
      }


  if (!(is(element, 'bpmn:ChoreographyTask'))) {
    return;
  }

    messages.forEach(message => {
      
 
      group.entries.push(entryFactory.textBox(translate, {
        id : 'Filter'+setName(message),
        description : 'Participant scope: '+message.targetRef.name,
        label : 'Expression for '+message.messageRef.name,
        modelProperty : 'Filter'+setName(message),

        get: function (element, node) {
          var bo = getBusinessObject(element);
          if(setName(message) == 'Receiver'){
             if(!message.get('FilterReceiver')){
               // message.FilterReceiver = ''
               return {FilterReceiver: ''};
              }
              else {
                return {FilterReceiver: message.get('FilterReceiver')};
              }
          }
          else if (setName(message) == 'Initiating'){
            if(!message.get('FilterInitiating')){
              // message.FilterReceiver = ''
              return {FilterInitiating: ''};
             }
             else {
               return {FilterInitiating: message.get('FilterInitiating')};
             }
          }


      },
  
      set: function (element, values) {
          if(setName(message) == 'Receiver'){
            return cmdHelper.updateBusinessObject(element, message, {
              'FilterReceiver': values.FilterReceiver
          });
          }
          else if (setName(message) == 'Initiating'){
            return cmdHelper.updateBusinessObject(element, message, {
              'FilterInitiating': values.FilterInitiating
          });
          }
         
      }
      }))

      
      });     
   
      

      

 


}