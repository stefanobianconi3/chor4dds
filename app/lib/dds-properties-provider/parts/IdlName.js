import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';


var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function(group, element, translate) {
   
    
    if (is(element, 'bpmn:Choreography')){
    group.entries.push(entryFactory.textField(translate, {
      id : 'idlName', //HTML properties
      label : 'IDL name',
      modelProperty : 'idlName',
      get: function (element, node) {
        var bo = getBusinessObject(element);
        
        if(!bo.get('idlName')){
          bo.idlName = 'sample';
            return {idlName: 'sample'};
        }  
        if(bo.get('idlName')){
        return {idlName: bo.get('idlName')};
        }},
    
        set: function (element, node) {
          var bo = getBusinessObject(element);
        return cmdHelper.updateBusinessObject(element, bo, {
              'idlName': node.idlName
          });
         
        
        }
      
  }))
  
}

}
  
