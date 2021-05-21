'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');




module.exports = function(group, element, translate) {
   
    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
       
    group.entries.push(entryFactory.selectBox(translate, {
      id : 'qosliveliness', //HTML properties
      label : 'LIVELINESS',
      description: 'Determines the mechanism to determine whether an Entity is alive.',
      selectOptions: [
        {name: 'AUTOMATIC', value: 'automatic'},
        {name: 'MANUAL BY PARTICIPANT', value: 'manual_by_participant'},
        {name: 'MANUAL BY TOPIC', value: 'manual_by_topic'}
    ],
      modelProperty : 'qosliveliness',
      

      get: function (element, node) {
        var bo = getBusinessObject(element);
          if(!bo.get('qosliveliness')){
            bo.qosliveliness = 'automatic'
          return {qosliveliness: 'automatic'};
          }
          if(bo.get('qosliveliness')){
            return {qosliveliness: bo.get('qosliveliness')};
            }
      },

    set: function (element, values) {
        var bo = getBusinessObject(element);
        return cmdHelper.updateBusinessObject(element, bo, {
            'qosliveliness': values.qosliveliness
        });
    }

}))

group.entries.push(entryFactory.textField(translate, {
    id : 'qoslivelinessduration', //HTML properties
    description : 'Seconds',
    label : 'Liveliness Lease Duration',
    modelProperty : 'qoslivelinessduration',
    get: function (element, node) {
      var bo = getBusinessObject(element);
      if(!bo.get('qoslivelinessduration')){
        bo.qoslivelinessduration = 'INFINITY'
      return {qoslivelinessduration: 'INFINITY'};
      }
      if(bo.get('qoslivelinessduration')){
        return {qoslivelinessduration: bo.get('qoslivelinessduration')};
        }
  },

    
        set: function (element, node) {
            var bo = getBusinessObject(element);
            return cmdHelper.updateBusinessObject(element, bo, {
                'qoslivelinessduration': node.qoslivelinessduration
            });
        }

  }))




}

}

