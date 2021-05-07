/**
 * SB_ADDED
 */

 export default function ChangeMessage(injector, canvas, modeling, bpmnFactory) {
    this._injector = injector;
    this._canvas = canvas;
    this._modeling = modeling;
    this._bpmnFactory = bpmnFactory;
  }
  
  ChangeMessage.$inject = [
    'injector',
    'canvas',
    'modeling',
    'bpmnFactory'
  ];
  
  ChangeMessage.prototype.execute = function(context) {
    let activityShape = context.parent.activityShape;
    let activity = activityShape.businessObject;
    
    let bandShape = context.bandShape;
    let newMessage = context.newMessage;
    let oldMessage = bandShape.businessObject;
  
      
      activity.messageFlowRef.forEach(messageFlow => {
        if (messageFlow.get('messageRef') === oldMessage) {
          messageFlow.set('messageRef', newMessage);
        }
        bandShape.businessObject = newMessage;
  
      });
      
      
     return [bandShape];
   
    };
  
    
    
  