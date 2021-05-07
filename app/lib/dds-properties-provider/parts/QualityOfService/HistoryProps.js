'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');




module.exports = function(group, element, translate) {
 

    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
       
    group.entries.push(entryFactory.selectBox(translate, {
      id : 'qoshistory', //HTML properties
      label : 'HISTORY',
      description: 'Controls the delivery of values',
      selectOptions: [
        {name: 'KEEP LAST', value: ''},
        {name: 'KEEP ALL', value: 'keep_all'}
    ],
      modelProperty : 'qoshistory',
      

      get: function (element, node) {
        var bo = getBusinessObject(element);
        if(bo){
        return {qoshistory: bo.get('qoshistory')};
        }
        else return {};
    },

    set: function (element, values) {
        var bo = getBusinessObject(element);
        return cmdHelper.updateBusinessObject(element, bo, {
            'qoshistory': values.qoshistory
        });
    }

}))






}

}

