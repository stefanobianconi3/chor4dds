'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';
var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');



module.exports = function(group, element, translate) {
   
    
    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
      group.entries.push(entryFactory.textField(translate, {
        id : 'qoslatencybudget', //HTML properties
        description : 'Maximum acceptable delay from the time the data is written until the data received',
        label : 'LATENCY BUDGET (seconds)',
        modelProperty : 'qoslatencybudget',

        get: function (element, node) {
          var bo = getBusinessObject(element);
          if(!bo.get('qoslatencybudget')){
            bo.qoslatencybudget = '0'
          return {qoslatencybudget: '0'};
          }
          if(bo.get('qoslatencybudget')){
            return {qoslatencybudget: bo.get('qoslatencybudget')};
            }
      },
    
        set: function (element, node) {
            var bo = getBusinessObject(element);
            return cmdHelper.updateBusinessObject(element, bo, {
                'qoslatencybudget': node.qoslatencybudget
            });
        }

      }))
    }
    
    }