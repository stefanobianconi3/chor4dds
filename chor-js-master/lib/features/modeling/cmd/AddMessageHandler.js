import {
  isUndefined
} from 'min-dash';

import {
  createMessageShape,
  createMessageFlowSemantics,
  linkMessageFlowSemantics,
  unlinkMessageFlowSemantics
} from '../../../util/MessageUtil';

/**
 * Handler that fires on `message.add` and fires whenever an entirely new message is to be
 * added to a band shape.
 * @constructor
 * @param {Injector} injector
 * @param {Canvas} canvas
 */
export default function AddMessageHandler(injector, canvas) {
  this._injector = injector;
  this._canvas = canvas;
}

AddMessageHandler.$inject = [
  'injector',
  'canvas'
];

function countNewMessages(messages) {
  if (messages) {
    return messages.filter(p => p.name).filter(p => p.name.indexOf('New Topic') === 0).length + 1;
  }
  return 1;
}

AddMessageHandler.prototype.execute = function(context) {
  let bandShape = context.bandShape;
  let messageShape = context.messageShape;
  let messageFlow = context.messageFlow;
  const isVisible = context.isVisible;
  const name = context.name; // optional
  let choreo = this._canvas.getRootElement();

  let task = bandShape.parent.businessObject;
  let participant = bandShape.businessObject;
  bandShape.diBand.isMessageVisible = isVisible !== false;


  // create message semantics and shape if necessary (might be a redo)
  if (isUndefined(messageShape)) {
    messageFlow = createMessageFlowSemantics(
      this._injector,
      task,
      participant
    );
    messageShape = createMessageShape(this._injector, bandShape, messageFlow);
    context.messageShape = messageShape;
    messageShape.businessObject.name = 'New Topic ' + countNewMessages(choreo.businessObject.messages);
    context.messageFlow = messageFlow;
  }

  // link shape and add to canvas
  linkMessageFlowSemantics(this._injector, task, messageFlow);
  this._canvas.addShape(messageShape, bandShape);

    /**
   * SB_ADDED
   */
     let message = messageShape.businessObject;
     message.$parent = choreo;
     context.created = message;
     if (choreo.businessObject.messages) {
       choreo.businessObject.messages.push(message);
     } else {
       choreo.businessObject.messages = [ message ];
     }

  return [bandShape];
};

AddMessageHandler.prototype.revert = function(context) {
  let bandShape = context.bandShape;
  let messageShape = context.messageShape;
  let messageFlow = context.messageFlow;

  let task = bandShape.parent.businessObject;

  bandShape.diBand.isMessageVisible = false;

  this._canvas.removeShape(messageShape);
  context.oldIndices = unlinkMessageFlowSemantics(this._injector, task, messageFlow);

  return [bandShape];
};