DGW.side.elements.widget = document.createElement('div');
DGW.side.elements.widget.id = 'dg-side-widget';
DGW.side.elements.widget.innerHTML = DGW.templates.sideWidgetCore;
DGW.side.elements.widgetBody = DGW.side.elements.widget.querySelector('.dg-side-widget-body');
DGW.side.elements.widgetContent = DGW.side.elements.widgetBody.querySelector('.dg-side-widget-content');
DGW.side.elements.widgetInner = null;

DGW.side.elements.clickCatcher = document.createElement('div');
DGW.side.elements.clickCatcher.className = 'dg-side-click-holder';