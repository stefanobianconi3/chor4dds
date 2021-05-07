'use strict';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');




module.exports = function(group, element, translate) {
 

    if (is(element, 'bpmn:Message') || is(element, 'bpmn:ChoreographyTask')){
       
    group.entries.push(entryFactory.selectBox(translate, {
      id : 'qosdestinationorder', //HTML properties
      label : 'DESTINATION ORDER',
      description: 'Controls the order in which samples within are made available ',
      selectOptions: [
        {name: 'BY RECEPTION TIMESTAMP', value: ''},
        {name: ' BY SOURCE TIMESTAMP', value: 'by_source_timestamp'}
    ],
      modelProperty : 'qosdestinationorder',
      

      get: function (element, node) {
        var bo = getBusinessObject(element);
        if(bo){
        return {qosdestinationorder: bo.get('qosdestinationorder')};
        }
        else return {};
    },

    set: function (element, values) {
        var bo = getBusinessObject(element);
        return cmdHelper.updateBusinessObject(element, bo, {
            'qosdestinationorder': values.qosdestinationorder
        });
    }

}))






}

}

