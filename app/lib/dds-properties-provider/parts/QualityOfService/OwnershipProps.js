'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');




module.exports = function(group, element, translate) {
   
    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
    group.entries.push(entryFactory.selectBox(translate, {
      id : 'qosownership', //HTML properties
      label : 'OWNERSHIP',
      description: 'Owner of the topic instance',
      selectOptions: [
        {name: 'SHARED', value: 'shared'},
        {name: 'EXCLUSIVE', value: 'exclusive'}
    ],
      modelProperty : 'qosownership',
      

      get: function (element, node) {
        var bo = getBusinessObject(element);
        if(!bo.get('qosownership')){
          bo.qosownership = 'shared'
        return {qosownership: 'shared'};
        }
        if(bo.get('qosownership')){
          return {qosownership: bo.get('qosownership')};
          }
    },

    set: function (element, values) {
        var bo = getBusinessObject(element);
        return cmdHelper.updateBusinessObject(element, bo, {
            'qosownership': values.qosownership
        });
    }

}))
if (is(element, 'bpmn:ChoreographyTask')){
group.entries.push(entryFactory.textField(translate, {
  id : 'qosownershipstrength', //HTML properties
  description : 'DataWriter strength',
  label : 'OWNERSHIP Strength',
  modelProperty : 'qosownershipstrength',
  get: function (element, node) {
    var bo = getBusinessObject(element);
    if(!bo.get('qosownershipstrength')){
      bo.qosownershipstrength = '0'
    return {qosownershipstrength: '0'};
    }
    if(bo.get('qosownershipstrength')){
      return {qosownershipstrength: bo.get('qosownershipstrength')};
      }
},

  
      set: function (element, node) {
          var bo = getBusinessObject(element);
          return cmdHelper.updateBusinessObject(element, bo, {
              'qosownershipstrength': node.qosownershipstrength
          });
      }

}))}




}

}

