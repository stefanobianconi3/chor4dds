'use strict';

import DomainIdProps from './parts/DomainIdProps'
import {is} from 'bpmn-js/lib/util/ModelUtil';
import IdProps from './parts/IdProps';
import NameProps from './parts/NameProps';
import DataTypeProps from './parts/DataTypeProps';
import DurabilityProps from './parts/QualityOfService/DurabilityProps'
import DeadlineProps from './parts/QualityOfService/DeadlineProps'
import LatencyBudgetProps from './parts/QualityOfService/LatencyBudgetProps'
import OwnershipProps from './parts/QualityOfService/OwnershipProps'
import LivelinessProps from './parts/QualityOfService/LivelinessProps'
import ReliabilityProps from './parts/QualityOfService/ReliabilityProps'
import HistoryProps from './parts/QualityOfService/HistoryProps'
import DestinationOrderProps from './parts/QualityOfService/DestinationOrderProps'
var inherits = require('inherits');
var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');
var documentationProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps');

    //Helper functions
 
function getIdOptions(element) {
  if (is(element, 'bpmn:Participant')) {
    return { id: 'participant-id', label: 'Participant Id' };
  }
  if (is(element, 'bpmn:Choreography')) {
    return { id: 'choreography-id', label: 'Choreography Id' };
  }
  if (is(element, 'bpmn:ChoreographyTask')) {
    return { id: 'task-id',  label: 'Task Id' };
  }
  if (is(element, 'bpmn:Message')) {
    return { id: 'message-id', label: 'Message Id' };
  }
}

function getNameOptions(element) {
  if (is(element, 'bpmn:Participant')) {
    return { id: 'participant-name', label: 'Participant Name' };
  }
  if (is(element, 'bpmn:Choreography')) {
    return { id: 'choreography-name', label: 'Choreography Name' };
  }
  if (is(element, 'bpmn:ChoreographyTask')) {
    return { id: 'task-name',  label: 'Task Name' };
  }
  if (is(element, 'bpmn:Message')) {
    return { id: 'message-name', label: 'Message Name' };
  }
  }

    
    function createGeneralTabGroups(
        element, canvas, bpmnFactory,
        elementRegistry, elementTemplates, translate) {
    

      element = element.labelTarget || element;
    
      var generalGroup = {
        id: 'general',
        label: translate('General'),
        entries: []
      };
      IdProps(generalGroup, element, translate, getIdOptions(element));
      NameProps(generalGroup, element, bpmnFactory, canvas, translate, getNameOptions(element));
      
     

      var domainParticipantGroup= {
        id: 'dp',
        label: translate('Domain Participant'),
        entries: []
      };
      DomainIdProps(domainParticipantGroup, element, translate);

      var dataTypesGroup= {
        id: 'forms',
        label: translate('Topic'),
        entries: []
      };
      DataTypeProps(dataTypesGroup, element, bpmnFactory, translate);

      var documentationGroup = {
        id: 'documentation',
        label: translate('Documentation'),
        entries: []
      };
      documentationProps(documentationGroup, element, bpmnFactory, translate);
      
      
    
      var groups = [];
      groups.push(generalGroup);
      groups.push(dataTypesGroup);
      groups.push(domainParticipantGroup)
      groups.push(documentationGroup);
      return groups;
    
  }

  function createQosTabGroups( element, canvas, bpmnFactory,
    elementRegistry, elementTemplates, translate){

      var qosGroup= {
        id: 'qos',
        label: translate('Quality of Service'),
        entries: []
      };
     DurabilityProps(qosGroup, element, bpmnFactory, translate);
     DeadlineProps(qosGroup, element, translate);
     LatencyBudgetProps(qosGroup,element,translate);
     OwnershipProps(qosGroup, element, bpmnFactory, translate);
     LivelinessProps(qosGroup,element,bpmnFactory, translate);
     ReliabilityProps(qosGroup,element,bpmnFactory,translate);
     HistoryProps(qosGroup,element,bpmnFactory,translate);
     DestinationOrderProps(qosGroup,element,bpmnFactory,translate);
      var groups = [];
      groups.push(qosGroup);
    
      return groups;

    }


    function DDSPropertiesProvider(
        bpmnFactory,
        canvas,
        commandStack,
        elementRegistry,
        elementTemplates,
        eventBus,
        modeling,
        replace,
        selection,
        translate
    ) {
      PropertiesActivator.call(this, eventBus);
    
      this.getTabs = function(element) {
    
        var generalTab = {
          id: 'general',
          label: translate('General'),
          groups: createGeneralTabGroups(
            element, canvas, bpmnFactory,
            elementRegistry, elementTemplates, translate)
        };
        var qosTab = {
          id: 'qos',
          label: translate('QoS'),
          groups: createQosTabGroups(
            element, canvas, bpmnFactory,
            elementRegistry, elementTemplates, translate)
        };

     

   
    
    
        return [
          generalTab,
          qosTab
        ];
      };
    
    }
    
    DDSPropertiesProvider.$inject = [
      'bpmnFactory',
      'canvas',
      'commandStack',
      'elementRegistry',
      'elementTemplates',
      'eventBus',
      'modeling',
      'replace',
      'selection',
      'translate'
    ];
    
    inherits(DDSPropertiesProvider, PropertiesActivator);
    
    module.exports = DDSPropertiesProvider;

