import inherits from 'inherits';
import PopupMenuProvider from 'diagram-js/lib/features/popup-menu/PopupMenuProvider';

/** 
 * SB_ADDED
 */


export default function MessagePopupProvider(injector, popupMenu, modeling, canvas) {
  injector.invoke(PopupMenuProvider, this);
  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._canvas = canvas;
}

inherits(MessagePopupProvider, PopupMenuProvider);

MessagePopupProvider.$inject = [
  'injector',
  'popupMenu',
  'modeling',
  'canvas'
];



MessagePopupProvider.prototype.getEntries = function(element) {
  let entries = [];

  let choreo = this._canvas.getRootElement();

  let messages = choreo.businessObject.messages;
 let action = this._modeling.changeMessage;
  
  messages.forEach(message => {
    entries.push({
      label: message.name,
      id: message.id,
      action: () => action.call(this._modeling, element, message, element.parent)
     
    });
  });

  
  

  return entries;
};

MessagePopupProvider.prototype.register = function() {
  this._popupMenu.registerProvider('message-provider', this);
};