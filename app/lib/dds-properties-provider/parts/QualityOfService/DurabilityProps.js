'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');




module.exports = function(group, element, translate) {
   
    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
    group.entries.push(entryFactory.selectBox(translate, {
      id : 'qosdurability', //HTML properties
      label : 'DURABILITY',
      description: 'Expresses if the data should outlive their writing time',
      selectOptions: [
        {name: 'VOLATILE', value: 'volatile'},
        {name: 'TRANSIENT_LOCAL', value: 'transient_local'},
        {name: 'TRANSIENT', value: 'transient'},
        {name: 'PERSISTENT', value: 'persistent'}
    ],
      modelProperty : 'qosdurability',
      

      get: function (element, node) {
        var bo = getBusinessObject(element);
        if(!bo.get('qosdurability')){
          bo.qosdurability = 'volatile'
        return {qosdurability: 'volatile'};
        }
        if(bo.get('qosdurability')){
          return {qosdurability: bo.get('qosdurability')};
          }
    },

    set: function (element, values) {
        var bo = getBusinessObject(element);
        return cmdHelper.updateBusinessObject(element, bo, {
            'qosdurability': values.qosdurability
        });
    }

}))
}

}

