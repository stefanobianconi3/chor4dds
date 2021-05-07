import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

module.exports = function(group, element, translate) {
   
    
    if (is(element, 'bpmn:Choreography')){
    group.entries.push(entryFactory.textField(translate, {
      id : 'domain-participant-id', //HTML properties
      description : 'Insert an Integer between 0 and 231',
      label : 'DomainParticipant ID',
      modelProperty : 'dp'

  }))
  //console.log(getBusinessObject(element))
}

}
  
