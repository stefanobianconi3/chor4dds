'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';
var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');;

module.exports = function(group, element, translate) {
   
    
    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
      group.entries.push(entryFactory.textField(translate, {
        id : 'qosdeadline', //HTML properties
        description : 'Detect when data is not written or read within a specified amount of time',
        label : 'DEADLINE (seconds)',
        modelProperty : 'qosdeadline',
        get: function (element, node) {
          var bo = getBusinessObject(element);
          if(!bo.get('qosdeadline')){
              return {qosdeadline: 'INFINITY'};
          }  
          if(bo){
          return {qosdeadline: bo.get('qosdeadline')};
          }},
      
          set: function (element, node) {
              var bo = getBusinessObject(element);
              return cmdHelper.updateBusinessObject(element, bo, {
                  'qosdeadline': node.qosdeadline
              });
          }

      }))
    }
    
    }