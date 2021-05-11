'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');




module.exports = function(group, element, translate) {
   
    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
    group.entries.push(entryFactory.selectBox(translate, {
      id : 'qosownership', //HTML properties
      label : 'OWNERSHIP',
      description: 'Specifies whether it is allowed for multiple DataWriters to write the same instance of the data',
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
}

}

