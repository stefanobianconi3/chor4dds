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
        {name: 'KEEP LAST', value: 'keep_last'},
        {name: 'KEEP ALL', value: 'keep_all'}
    ],
      modelProperty : 'qoshistory',
      

      get: function (element, node) {
        var bo = getBusinessObject(element);
        if(!bo.get('qoshistory')){
          bo.qoshistory = 'keep_last'
        return {qoshistory: 'keep_last'};
        }
        if(bo.get('qoshistory')){
          return {qoshistory: bo.get('qoshistory')};
          }
    },

    set: function (element, values) {
        var bo = getBusinessObject(element);
        return cmdHelper.updateBusinessObject(element, bo, {
            'qoshistory': values.qoshistory
        });
    }

}))

group.entries.push(entryFactory.textField(translate, {
  id : 'qoshistorydepth', //HTML properties
  description : '',
  label : 'History depth',
  modelProperty : 'qoshistorydepth',
  get: function (element, node) {
    var bo = getBusinessObject(element);
    if(!bo.get('qoshistorydepth')){
      bo.qoshistorydepth = '1'
    return {qoshistorydepth: '1'};
    }
    if(bo.get('qoshistorydepth')){
      return {qoshistorydepth: bo.get('qoshistorydepth')};
      }
},

  
      set: function (element, node) {
          var bo = getBusinessObject(element);
          return cmdHelper.updateBusinessObject(element, bo, {
              'qoshistorydepth': node.qoshistorydepth
          });
      }

}))






}

}

