import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';


var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function(group, element, translate) {
   
    
    if (is(element, 'bpmn:ChoreographyTask')){
    group.entries.push(entryFactory.textField(translate, {
      id : 'dp', //HTML properties
      description : 'Insert an Integer between 0 and 231',
      label : 'DomainParticipant ID',
      modelProperty : 'dp',
      get: function (element, node) {
        var bo = getBusinessObject(element);
        
        if(!bo.get('dp')){
            return {dp: '0'};
        }  
        if(bo){
        return {dp: bo.get('dp')};
        }},
    
        set: function (element, node) {
          var bo = getBusinessObject(element);
          var numbers = /^[0-9]+$/;
    
            if(node.dp.match(numbers) && node.dp <= 231)
            {return cmdHelper.updateBusinessObject(element, bo, {
              'dp': node.dp
          });
        } 
            
            else
            return alert('The id must be an Integer between 0 and 231') ;
        }
      
  }))
  
}

}
  
