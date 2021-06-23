'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');




module.exports = function(group, element, translate) {
   
    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
       
    group.entries.push(entryFactory.selectBox(translate, {
      id : 'qosreliability', //HTML properties
      label : 'RELIABILITY',
      description: 'Level of reliability offered/requested by the Service',
      selectOptions: [
        {name: 'BEST EFFORT', value: 'best_effort'},
        {name: 'RELIABLE', value: 'reliable'}
    ],
      modelProperty : 'qosreliability',
      

      get: function (element, node) {
        var bo = getBusinessObject(element);
        if(!bo.get('qosreliability')){
          bo.qosreliability = 'best_effort'
        return {qosreliability: 'best_effort'};
        }
        if(bo.get('qosreliability')){
          return {qosreliability: bo.get('qosreliability')};
          }
    },

    set: function (element, values) {
        var bo = getBusinessObject(element);
        return cmdHelper.updateBusinessObject(element, bo, {
            'qosreliability': values.qosreliability
        });
    }

}))
/*
group.entries.push(entryFactory.textField(translate, {
    id : 'qosmaxblockingtime', //HTML properties
    description : 'Realiability block time (seconds)',
    label : 'Max Blocking Time',
    modelProperty : 'qosmaxblockingtime',
    get: function (element, node) {
        var bo = getBusinessObject(element);
        if(!bo.get('qosmaxblockingtime')){
          bo.qosmaxblockingtime = 'INFINITY'
        return {qosmaxblockingtime: 'INFINITY'};
        }
        if(bo.get('qosmaxblockingtime')){
          return {qosmaxblockingtime: bo.get('qosmaxblockingtime')};
          }
    },
    
        set: function (element, node) {
            var bo = getBusinessObject(element);
            return cmdHelper.updateBusinessObject(element, bo, {
                'qosmaxblockingtime': node.qosmaxblockingtime
            });
        }

  }))
  */




}

}

