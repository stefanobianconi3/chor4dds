'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';
var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');



module.exports = function(group, element, translate) {
   
    
    if (is(element, 'bpmn:ChoreographyTask')){
      group.entries.push(entryFactory.textField(translate, {
        id : 'qostimebasedfilter', //HTML properties
        description : 'DataReader time filter',
        label : 'TIME BASED FILTER',
        modelProperty : 'qostimebasedfilter',

        get: function (element, node) {
          var bo = getBusinessObject(element);
          if(!bo.get('qostimebasedfilter')){
            bo.qostimebasedfilter = '0'
          return {qostimebasedfilter: '0'};
          }
          if(bo.get('qostimebasedfilter')){
            return {qostimebasedfilter: bo.get('qostimebasedfilter')};
            }
      },
    
        set: function (element, node) {
            var bo = getBusinessObject(element);
            return cmdHelper.updateBusinessObject(element, bo, {
                'qostimebasedfilter': node.qostimebasedfilter
            });
        }

      }))
    }
    
    }