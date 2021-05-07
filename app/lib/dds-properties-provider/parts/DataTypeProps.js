'use strict'

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    removeEntry = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').removeEntry,
    extensionElements = require('bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/ExtensionElements.js'),
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
    formHelper = require('bpmn-js-properties-panel/lib/helper/FormHelper'),
    utils = require('bpmn-js-properties-panel/lib/Utils.js'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    find = require('lodash/find'),
    each = require('lodash/forEach');

    function generateValueId() {
        return utils.nextId('Value_');
      }
      
      /**
       * Generate a form field specific textField using entryFactory.
       *
       * @param {Function} translate
       * @param {string} options.id
       * @param {string} options.label
       * @param {string} options.modelProperty
       * @param {Function} options.validate
       *
       * @return {Object} an entryFactory.textField object
       */
      function formFieldTextField(translate, options, getSelectedFormField) {
      
        var id = options.id,
            label = options.label,
            modelProperty = options.modelProperty,
            validate = options.validate;
      
        return entryFactory.textField(translate, {
          id: id,
          label: label,
          modelProperty: modelProperty,
          get: function(element, node) {
            var selectedFormField = getSelectedFormField(element, node) || {},
                values = {};
      
            values[modelProperty] = selectedFormField[modelProperty];
      
            return values;
          },
      
          set: function(element, values, node) {
            var commands = [];
      
            if (typeof options.set === 'function') {
              var cmd = options.set(element, values, node);
      
              if (cmd) {
                commands.push(cmd);
              }
            }
      
            var formField = getSelectedFormField(element, node),
                properties = {};
      
            properties[modelProperty] = values[modelProperty] || undefined;
      
            commands.push(cmdHelper.updateBusinessObject(element, formField, properties));
      
            return commands;
          },
          hidden: function(element, node) {
            return !getSelectedFormField(element, node);
          },
          validate: validate
        });
      }

      function formFieldCheckField(translate, options, getSelectedFormField) {
      
        var id = options.id,
            label = options.label,
            modelProperty = options.modelProperty,
            validate = options.validate;
      
        return entryFactory.checkbox(translate, {
          id: id,
          label: label,
          modelProperty: modelProperty,
          get: function(element, node) {
            var selectedFormField = getSelectedFormField(element, node) || {},
                values = {};
      
            values[modelProperty] = selectedFormField[modelProperty];
      
            return values;
          },
      
          set: function(element, values, node) {
            var commands = [];
      
            if (typeof options.set === 'function') {
              var cmd = options.set(element, values, node);
      
              if (cmd) {
                commands.push(cmd);
              }
            }
      
            var formField = getSelectedFormField(element, node),
                properties = {};
      
            properties[modelProperty] = values[modelProperty] || undefined;
      
            commands.push(cmdHelper.updateBusinessObject(element, formField, properties));
      
            return commands;
          },
          hidden: function(element, node) {
            return !getSelectedFormField(element, node);
          },
          validate: validate
        });
      }
      
      
      
      module.exports = function(group, element, bpmnFactory, translate) {
      
        if (!is(element, 'bpmn:Message')){
            return;
        }
      
      
        /**
         * Return the currently selected form field querying the form field select box
         * from the DOM.
         *
         * @param  {djs.model.Base} element
         * @param  {DOMElement} node - DOM element of any form field text input
         *
         * @return {ModdleElement} the currently selected form field
         */
        function getSelectedFormField(element, node) {
          var selected = formFieldsEntry.getSelected(element, node.parentNode);
      
          if (selected.idx === -1) {
            return;
          }
      
          return formHelper.getFormField(element, selected.idx);
        }
      
        
        // [FormData] form field select box
        var formFieldsEntry = extensionElements(element, bpmnFactory, {
          id: 'form-fields',
          label: translate('Fields'),
          modelProperty: 'id',
          prefix: 'TopicField',
          createExtensionElement: function(element, extensionElements, value) {
            var bo = getBusinessObject(element), commands = [];
      
            if (!extensionElements) {
              extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
              commands.push(cmdHelper.updateProperties(element, { extensionElements: extensionElements }));
            }
      
            var formData = formHelper.getFormData(element);
      
            if (!formData) {
              formData = elementHelper.createElement('camunda:FormData', { fields: [] }, extensionElements, bpmnFactory);
              commands.push(cmdHelper.addAndRemoveElementsFromList(
                element,
                extensionElements,
                'values',
                'extensionElements',
                [formData],
                []
              ));
            }
      
            var field = elementHelper.createElement('camunda:FormField', { id: value }, formData, bpmnFactory);
            if (typeof formData.fields !== 'undefined') {
              commands.push(cmdHelper.addElementsTolist(element, formData, 'fields', [ field ]));
            } else {
              commands.push(cmdHelper.updateBusinessObject(element, formData, {
                fields: [ field ]
              }));
            }
            return commands;
          },
          removeExtensionElement: function(element, extensionElements, value, idx) {
            var formData = getExtensionElements(getBusinessObject(element), 'camunda:FormData')[0],
                entry = formData.fields[idx],
                commands = [];
      
            if (formData.fields.length < 2) {
              commands.push(removeEntry(getBusinessObject(element), element, formData));
            } else {
              commands.push(cmdHelper.removeElementsFromList(element, formData, 'fields', null, [entry]));
      
              if (entry.id === formData.get('businessKey')) {
                commands.push(cmdHelper.updateBusinessObject(element, formData, { 'businessKey': undefined }));
              }
            }
      
            return commands;
          },
          getExtensionElements: function(element) {
            return formHelper.getFormFields(element);
          },
          hideExtensionElements: function(element, node) {
            return false;
          }
        });
        group.entries.push(formFieldsEntry);
      
      
        // [FormData] Form Field label
        group.entries.push(entryFactory.label({
          id: 'form-field-header',
          labelText: translate('Data Types'),
          showLabel: function(element, node) {
            return !!getSelectedFormField(element, node);
          }
        }));
      
        // [FormData] form field id text input field
        group.entries.push(entryFactory.validationAwareTextField(translate, {
          id: 'form-field-id',
          label: translate('Name (process variable name)'),
          modelProperty: 'id',
      
          getProperty: function(element, node) {
            var selectedFormField = getSelectedFormField(element, node) || {};
      
            return selectedFormField.id;
          },
      
          setProperty: function(element, properties, node) {
            var formField = getSelectedFormField(element, node);
      
            return cmdHelper.updateBusinessObject(element, formField, properties);
          },
      
          hidden: function(element, node) {
            return !getSelectedFormField(element, node);
          },
      
          validate: function(element, values, node) {
      
            var formField = getSelectedFormField(element, node);
      
            if (formField) {
      
              var idValue = values.id;
              

              if (!idValue || idValue.trim() === '') {
                return { id: 'Form field id must not be empty' };
              }
      
              var formFields = formHelper.getFormFields(element);
      
              var existingFormField = find(formFields, function(f) {
                return f !== formField && f.id === idValue;
              });
      
              if (existingFormField) {
                return { id: 'Name field id already used in form data.' };
              }
            }
          }
        }));
     
      
        // [FormData] form field type combo box
        group.entries.push(entryFactory.comboBox(translate, {
          id: 'form-field-type',
          label: translate('Type'),
          selectOptions: [
            { name: 'short', value: 'short' },
            { name: 'long', value: 'long' },
            { name: 'unsigned short', value: 'unsigned short' },
            { name: 'unsigned long', value: 'unsigned long' },
            { name: 'float', value: 'float' },
            { name: 'double', value: 'double' },
            { name: 'char', value: 'char' },
            { name: 'boolean', value: 'boolean' },
            { name: 'string', value: 'string' },
            { name: 'enum', value: 'enum' }
          ],
          modelProperty: 'type',
          emptyParameter: true,
      
          get: function(element, node) {
            var selectedFormField = getSelectedFormField(element, node);
      
            if (selectedFormField) {
              return { type: selectedFormField.type };
            } else {
              return {};
            }
          },
          set: function(element, values, node) {
            var selectedFormField = getSelectedFormField(element, node),
                formData = getExtensionElements(getBusinessObject(element), 'camunda:FormData')[0],
                commands = [];
      
            if (selectedFormField.type === 'enum' && values.type !== 'enum') {
      
              // delete camunda:value objects from formField.values when switching from type enum
              commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, { values: undefined }));
            }
            if (values.type === 'boolean' && selectedFormField.get('id') === formData.get('businessKey')) {
              commands.push(cmdHelper.updateBusinessObject(element, formData, { 'businessKey': undefined }));
            }
            commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, values));
      
            return commands;
          },
          hidden: function(element, node) {
            return !getSelectedFormField(element, node);
          }
        }));
         // [FormData] form field label text input field
         group.entries.push(formFieldCheckField(translate, {
            id: 'form-field-label',
            label: translate('is Primary Key'),
            modelProperty: 'isKey'
          }, getSelectedFormField));
        // [FormData] form field enum values label
        group.entries.push(entryFactory.label({
          id: 'form-field-enum-values-header',
          labelText: translate('Values'),
          divider: true,
          showLabel: function(element, node) {
            var selectedFormField = getSelectedFormField(element, node);
      
            return selectedFormField && selectedFormField.type === 'enum';
          }
        }));

    
        // [FormData] form field enum values table
        group.entries.push(entryFactory.table(translate, {
          id: 'form-field-enum-values',
          labels: [ translate('Name')],
          modelProperties: [ 'id'],
          show: function(element, node) {
            var selectedFormField = getSelectedFormField(element, node);
      
            return selectedFormField && selectedFormField.type === 'enum';
          },
          getElements: function(element, node) {
            var selectedFormField = getSelectedFormField(element, node);
      
            return formHelper.getEnumValues(selectedFormField);
          },
          addElement: function(element, node) {
            var selectedFormField = getSelectedFormField(element, node),
                id = generateValueId();
      
            var enumValue = elementHelper.createElement(
              'camunda:Value',
              { id: id, name: undefined },
              getBusinessObject(element),
              bpmnFactory
            );
      
            return cmdHelper.addElementsTolist(element, selectedFormField, 'values', [enumValue]);
          },
          removeElement: function(element, node, idx) {
            var selectedFormField = getSelectedFormField(element, node),
                enumValue = selectedFormField.values[idx];
      
            return cmdHelper.removeElementsFromList(element, selectedFormField, 'values', null, [enumValue]);
          },
          updateElement: function(element, value, node, idx) {
            var selectedFormField = getSelectedFormField(element, node),
                enumValue = selectedFormField.values[idx];
      
            value.name = value.name || undefined;
            return cmdHelper.updateBusinessObject(element, enumValue, value);
          },
          validate: function(element, value, node, idx) {
      
            var selectedFormField = getSelectedFormField(element, node),
                enumValue = selectedFormField.values[idx];
      
            if (enumValue) {
      
              // check if id is valid
              var validationError = utils.isIdValid(enumValue, value.id, translate);
      
              if (validationError) {
                return { id: validationError };
              }
            }
          }
        }));
      
        
      
        
      
      
        
      };
      