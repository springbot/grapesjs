var Backbone = require('backbone');

module.exports = () => ({
  /**
   * Build props object by their name
   * @param  {Array<string>|string} props Array of properties name
   * @return {Array<Object>}
   */
  build(props) {
    var objs = [];
    var dftFixedValues = ['initial', 'inherit'];

    if (typeof props === 'string') props = [props];

    for (var i = 0, len = props.length; i < len; i++) {
      var obj = {};
      var prop = props[i];
      obj.property = prop;

      // Property
      // Styling is based on obj.property, so need to change the custom name back to actual prop being styled
      switch (prop) {
        case 'button-corner-radius':
        case 'image-corner-radius':
        case 'container-corner-radius':
        case 'section-corner-radius':
        case 'icon-corner-radius':
        case 'column-corner-radius':
        case 'border-radius-c':
          obj.property = 'border-radius';
          break;
        case 'align-content':
        case 'align-button':
        case 'align-image':
          obj.property = 'text-align';
          break;
        case 'container-padding':
        case 'section-padding':
        case 'link-padding':
          obj.property = 'padding';
          break;
        case 'button-color':
        case 'container-background-color':
        case 'column-color':
          obj.property = 'background-color';
          break;
        case 'icon-color':
          obj.property = 'color';
          break;
        case 'button-border':
        case 'divider-style':
        case 'image-border':
        case 'container-border':
        case 'section-border':
        case 'column-border-style':
          obj.property = 'border';
          break;
      }

      // Name
      switch (prop) {
        case 'button-color':
        case 'button-corner-radius':
        case 'button-border':
        case 'divider-style':
        case 'image-corner-radius':
        case 'image-border':
        case 'container-background':
        case 'container-corner-radius':
        case 'container-border':
        case 'section-background':
        case 'section-corner-radius':
        case 'section-border':
        case 'icon-color':
        case 'icon-corner-radius':
        case 'column-color':
        case 'column-corner-radius':
        case 'column-border-style':
        case 'align-content':
        case 'align-button':
        case 'align-image':
        case 'container-padding':
        case 'section-padding':
        case 'link-padding':
          let name = prop.split('-').join(' ');
          obj.name = name.charAt(0).toUpperCase() + name.slice(1);
          break;
        case 'container-background-color':
          obj.name = 'Container color';
          break;
      }

      // Fixed values
      switch (prop) {
        case 'margin-top':
        case 'margin-right':
        case 'margin-bottom':
        case 'margin-left':
        case 'padding-top':
        case 'padding-right':
        case 'padding-bottom':
        case 'padding-left':
        case 'width':
        case 'max-width':
        case 'min-width':
        case 'height':
        case 'max-height':
        case 'min-height':
        case 'flex-basis':
          obj.fixedValues = ['initial', 'inherit', 'auto'];
          break;
        case 'font-size':
          obj.fixedValues = [
            'medium',
            'xx-small',
            'x-small',
            'small',
            'large',
            'x-large',
            'xx-large',
            'smaller',
            'larger',
            'length',
            'initial',
            'inherit'
          ];
          break;
        case 'letter-spacing':
        case 'line-height':
          obj.fixedValues = ['normal', 'initial', 'inherit'];
          break;
      }

      // Type
      switch (prop) {
        case 'float':
        case 'position':
        case 'align-button':
        case 'align-content':
        case 'align-image':
        case 'text-align':
        case 'text-decoration':
          obj.type = 'radio';
          break;
        case 'display':
        case 'flex-direction':
        case 'flex-wrap':
        case 'justify-content':
        case 'align-items':
        case 'align-self':
        case 'font-family':
        case 'font-weight':
        case 'border-style':
        case 'box-shadow-type':
        case 'background-repeat':
        case 'background-position':
        case 'background-attachment':
        case 'background-size':
        case 'transition-property':
        case 'transition-timing-function':
        case 'cursor':
        case 'overflow':
        case 'overflow-x':
        case 'overflow-y':
          obj.type = 'select';
          break;
        case 'top':
        case 'right':
        case 'bottom':
        case 'left':
        case 'margin-top':
        case 'margin-right':
        case 'margin-bottom':
        case 'margin-left':
        case 'padding-top':
        case 'padding-right':
        case 'padding-bottom':
        case 'padding-left':
        case 'min-height':
        case 'min-width':
        case 'max-height':
        case 'max-width':
        case 'width':
        case 'height':
        case 'font-size':
        case 'letter-spacing':
        case 'line-height':
        case 'text-shadow-h':
        case 'text-shadow-v':
        case 'text-shadow-blur':
        case 'border-radius-c':
        case 'border-top-left-radius':
        case 'border-top-right-radius':
        case 'border-bottom-left-radius':
        case 'border-bottom-right-radius':
        case 'border-width':
        case 'box-shadow-h':
        case 'box-shadow-v':
        case 'box-shadow-blur':
        case 'box-shadow-spread':
        case 'transition-duration':
        case 'perspective':
        case 'transform-rotate-x':
        case 'transform-rotate-y':
        case 'transform-rotate-z':
        case 'transform-scale-x':
        case 'transform-scale-y':
        case 'transform-scale-z':
        case 'order':
        case 'flex-grow':
        case 'flex-shrink':
        case 'flex-basis':
          obj.type = 'integer';
          break;
        case 'margin':
        case 'container-padding':
        case 'section-padding':
        case 'link-padding':
        case 'padding':
        case 'border-radius':
        case 'button-corner-radius':
        case 'image-corner-radius':
        case 'container-corner-radius':
        case 'section-corner-radius':
        case 'column-corner-radius':
        case 'icon-corner-radius':
        case 'button-border':
        case 'image-border':
        case 'divider-style':
        case 'container-border':
        case 'column-border-style':
        case 'section-border':
        case 'border':
        case 'size':
        case 'button-size':
        case 'transform':
        case 'font-styles':
        case 'link-styles':
        case 'container-background':
        case 'section-background':
          obj.type = 'composite';
          break;
        case 'color':
        case 'text-shadow-color':
        case 'background-color':
        case 'border-color':
        case 'box-shadow-color':
        case 'button-color':
        case 'container-background-color':
        case 'icon-color':
        case 'column-color':
          obj.type = 'color';
          break;
        case 'text-shadow':
        case 'box-shadow':
        case 'background':
        case 'transition':
          obj.type = 'stack';
          break;
        case 'background-image':
          obj.type = 'file';
          break;
      }

      // Defaults
      switch (prop) {
        case 'button-color':
        case 'container-background-color':
        case 'column-color':
          obj.defaults = '#00000000';
          break;
        case 'float':
        case 'background-color':
        case 'background-image':
        case 'text-shadow':
          obj.defaults = 'none';
          break;
        case 'display':
          obj.defaults = 'block';
          break;
        case 'flex-direction':
          obj.defaults = 'row';
          break;
        case 'flex-wrap':
          obj.defaults = 'nowrap';
          break;
        case 'justify-content':
          obj.defaults = 'flex-start';
          break;
        case 'align-items':
          obj.defaults = 'stretch';
          break;
        case 'align-self':
          obj.defaults = 'auto';
          break;
        case 'position':
          obj.defaults = 'static';
          break;
        case 'top':
        case 'right':
        case 'bottom':
        case 'left':
        case 'margin-top':
        case 'margin-right':
        case 'margin-bottom':
        case 'margin-left':
        case 'padding-top':
        case 'padding-right':
        case 'padding-bottom':
        case 'padding-left':
        case 'text-shadow-h':
        case 'text-shadow-v':
        case 'text-shadow-blur':
        case 'border-radius-c':
        case 'box-shadow-h':
        case 'box-shadow-v':
        case 'box-shadow-spread':
        case 'perspective':
        case 'transform-rotate-x':
        case 'transform-rotate-y':
        case 'transform-rotate-z':
        case 'order':
        case 'flex-grow':
          obj.defaults = 0;
          break;
        case 'border-top-left-radius':
        case 'border-top-right-radius':
        case 'border-bottom-left-radius':
        case 'border-bottom-right-radius':
          obj.defaults = '0px';
          break;
        case 'transform-scale-x':
        case 'transform-scale-y':
        case 'transform-scale-z':
        case 'flex-shrink':
          obj.defaults = 1;
          break;
        case 'box-shadow-blur':
          obj.defaults = '5px';
          break;
        case 'min-height':
        case 'min-width':
        case 'max-height':
        case 'max-width':
        case 'width':
        case 'height':
        case 'background-size':
        case 'cursor':
        case 'flex-basis':
          obj.defaults = 'auto';
          break;
        case 'font-family':
          obj.defaults = 'Arial, Helvetica, sans-serif';
          break;
        case 'font-size':
        case 'border-width':
          obj.defaults = 'medium';
          break;
        case 'font-weight':
          obj.defaults = '400';
          break;
        case 'letter-spacing':
        case 'line-height':
          obj.defaults = 'normal';
          break;
        case 'color':
        case 'text-shadow-color':
        case 'border-color':
        case 'box-shadow-color':
        case 'icon-color':
          obj.defaults = 'black';
          break;
        case 'align-button':
        case 'align-content':
        case 'align-image':
        case 'text-align':
          obj.defaults = 'left';
          break;
        case 'border-style':
          obj.defaults = 'none';
          break;
        case 'box-shadow-type':
          obj.defaults = '';
          break;
        case 'background-repeat':
          obj.defaults = 'repeat';
          break;
        case 'background-position':
          obj.defaults = 'left top';
          break;
        case 'background-attachment':
          obj.defaults = 'scroll';
          break;
        case 'transition-property':
          obj.defaults = 'width';
          break;
        case 'transition-duration':
          obj.defaults = '2';
          break;
        case 'transition-timing-function':
          obj.defaults = 'ease';
          break;
        case 'overflow':
        case 'overflow-x':
        case 'overflow-y':
          obj.defaults = 'visible';
          break;
      }

      /*
       * Add styleable dependency on other properties. Allows properties to be
       * dynamically hidden or shown based on values of other properties.
       *
       * Property will be styleable if all of the properties (keys) in the
       * requires object have any of the values specified in the array.
       */
      switch (prop) {
        case 'flex-direction':
        case 'flex-wrap':
        case 'justify-content':
        case 'align-items':
          obj.requires = { display: ['flex'] };
          break;
        case 'order':
        case 'flex-basis':
        case 'flex-grow':
        case 'flex-shrink':
        case 'align-self':
          obj.requiresParent = { display: ['flex'] };
          break;
      }

      // Units
      switch (prop) {
        case 'top':
        case 'bottom':
        case 'margin-top':
        case 'margin-bottom':
        case 'padding-top':
        case 'padding-bottom':
        case 'min-height':
        case 'max-height':
        case 'height':
        case 'right':
        case 'left':
        case 'margin-right':
        case 'margin-left':
        case 'padding-right':
        case 'padding-left':
        case 'min-width':
        case 'max-width':
        case 'width':
        case 'flex-basis':
        case 'text-shadow-v':
        case 'text-shadow-h':
        case 'text-shadow-blur':
        case 'border-radius-c':
        case 'border-top-left-radius':
        case 'border-top-right-radius':
        case 'border-bottom-left-radius':
        case 'border-bottom-right-radius':
        case 'box-shadow-h':
        case 'box-shadow-v':
        case 'font-size':
        case 'letter-spacing':
        case 'line-height':
        case 'border-width':
        case 'box-shadow-blur':
        case 'box-shadow-spread':
        case 'perspective':
          obj.units = ['px'];
          break;
        case 'transition-duration':
          obj.units = ['s'];
          break;
        case 'transform-rotate-x':
        case 'transform-rotate-y':
        case 'transform-rotate-z':
          obj.units = ['deg'];
          break;
      }

      // Min/Max
      switch (prop) {
        case 'padding-top':
        case 'padding-right':
        case 'padding-bottom':
        case 'padding-left':
        case 'min-height':
        case 'min-width':
        case 'max-height':
        case 'max-width':
        case 'width':
        case 'height':
        case 'font-size':
        case 'text-shadow-blur':
        case 'border-radius-c':
        case 'border-top-left-radius':
        case 'border-top-right-radius':
        case 'border-bottom-left-radius':
        case 'border-bottom-right-radius':
        case 'border-width':
        case 'box-shadow-blur':
        case 'transition-duration':
        case 'perspective':
        case 'flex-basis':
          obj.min = 0;
          break;
      }

      // Preview
      switch (prop) {
        case 'text-shadow':
        case 'box-shadow':
        case 'background':
          obj.preview = true;
          break;
      }

      // Detached
      switch (prop) {
        case 'font-styles':
        case 'link-styles':
        case 'background':
        case 'container-background':
        case 'section-background':
          obj.detached = true;
          break;
      }

      // Functions
      switch (prop) {
        case 'transform-rotate-x':
          obj.functionName = 'rotateX';
          break;
        case 'transform-rotate-y':
          obj.functionName = 'rotateY';
          break;
        case 'transform-rotate-z':
          obj.functionName = 'rotateZ';
          break;
        case 'transform-scale-x':
          obj.functionName = 'scaleX';
          break;
        case 'transform-scale-y':
          obj.functionName = 'scaleY';
          break;
        case 'transform-scale-z':
          obj.functionName = 'scaleZ';
          break;
        case 'background-image':
          obj.functionName = 'url';
          break;
      }

      // Icons
      switch (prop) {
        case 'padding-left':
          obj.icon = 'far fa-arrow-to-left';
          break;
        case 'padding-right':
          obj.icon = 'far fa-arrow-to-right';
          break;
        case 'padding-top':
          obj.icon = 'far fa-arrow-to-top';
          break;
        case 'padding-bottom':
          obj.icon = 'far fa-arrow-to-bottom';
          break;
        case 'font-weight':
          obj.icon = 'far fa-text-width';
          break;
        case 'font-size':
          obj.icon = 'far fa-text-size';
          break;
        case 'line-height':
          obj.icon = 'far fa-line-height';
          break;
        case 'border-style':
          obj.icon = 'far fa-border-style';
          break;
        case 'border-top-left-radius':
        case 'border-top-right-radius':
          obj.icon = 'far fa-chevron-up';
          break;
        case 'border-bottom-left-radius':
        case 'border-bottom-right-radius':
          obj.icon = 'far fa-chevron-down';
          break;
        case 'border-width':
          obj.icon = 'border-width';
          break;
      }

      // TextLabels
      switch (prop) {
        case 'width':
          obj.textLabel = 'W';
          break;
        case 'height':
          obj.textLabel = 'H';
          break;
      }

      // Options
      switch (prop) {
        case 'float':
          obj.list = [{ value: 'none' }, { value: 'left' }, { value: 'right' }];
          break;
        case 'display':
          obj.list = [
            { value: 'block' },
            { value: 'inline' },
            { value: 'inline-block' },
            { value: 'flex' },
            { value: 'none' }
          ];
          break;
        case 'flex-direction':
          obj.list = [
            { value: 'row' },
            { value: 'row-reverse' },
            { value: 'column' },
            { value: 'column-reverse' }
          ];
          break;
        case 'flex-wrap':
          obj.list = [
            { value: 'nowrap' },
            { value: 'wrap' },
            { value: 'wrap-reverse' }
          ];
          break;
        case 'justify-content':
          obj.list = [
            { value: 'flex-start' },
            { value: 'flex-end' },
            { value: 'center' },
            { value: 'space-between' },
            { value: 'space-around' },
            { value: 'space-evenly' }
          ];
          break;
        case 'align-items':
          obj.list = [
            { value: 'flex-start' },
            { value: 'flex-end' },
            { value: 'center' },
            { value: 'baseline' },
            { value: 'stretch' }
          ];
          break;
        case 'align-self':
          obj.list = [
            { value: 'auto' },
            { value: 'flex-start' },
            { value: 'flex-end' },
            { value: 'center' },
            { value: 'baseline' },
            { value: 'stretch' }
          ];
          break;
        case 'position':
          obj.list = [
            { value: 'static' },
            { value: 'relative' },
            { value: 'absolute' },
            { value: 'fixed' }
          ];
          break;
        case 'font-family':
          var ss = ', sans-serif';
          var fonts = [
            'Arial, Helvetica' + ss,
            'Arial Black, Gadget' + ss,
            'Brush Script MT' + ss,
            'Comic Sans MS, cursive' + ss,
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Helvetica, serif',
            'Impact, Charcoal' + ss,
            'Lucida Sans Unicode, Lucida Grande' + ss,
            'Tahoma, Geneva' + ss,
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica' + ss,
            'Verdana, Geneva' + ss
          ];
          obj.list = [];
          for (var j = 0, l = fonts.length; j < l; j++) {
            var font = {};
            font.value = fonts[j];
            font.name = fonts[j].split(',')[0];
            obj.list.push(font);
          }
          break;
        case 'font-weight':
          obj.list = [
            { value: '100', name: 'Thin' },
            { value: '200', name: 'Extra-Light' },
            { value: '300', name: 'Light' },
            { value: '400', name: 'Normal' },
            { value: '500', name: 'Medium' },
            { value: '600', name: 'Semi-Bold' },
            { value: '700', name: 'Bold' },
            { value: '800', name: 'Extra-Bold' },
            { value: '900', name: 'Ultra-Bold' }
          ];
          break;
        case 'align-button':
        case 'align-content':
        case 'text-align':
          obj.list = [
            { value: 'left', icon: 'far fa-align-left' },
            { value: 'center', icon: 'far fa-align-center' },
            { value: 'right', icon: 'far fa-align-right' }
          ];
          break;
        case 'align-image':
          obj.list = [
            { value: 'left', icon: 'far fa-align-left' },
            { value: 'center', icon: 'far fa-align-center' },
            { value: 'right', icon: 'far fa-align-right' },
            { value: 'justify', icon: 'far fa-align-justify' }
          ];
          break;
        case 'border-style':
          obj.list = [
            { value: 'none' },
            { value: 'solid' },
            { value: 'dotted' },
            { value: 'dashed' },
            { value: 'double' },
            { value: 'groove' },
            { value: 'ridge' },
            { value: 'inset' },
            { value: 'outset' }
          ];
          break;
        case 'box-shadow-type':
          obj.list = [
            { value: '', name: 'Outside' },
            { value: 'inset', name: 'Inside' }
          ];
          break;
        case 'background-repeat':
          obj.list = [
            { value: 'repeat' },
            { value: 'repeat-x' },
            { value: 'repeat-y' },
            { value: 'no-repeat' }
          ];
          break;
        case 'background-position':
          obj.list = [
            { value: 'left top' },
            { value: 'left center' },
            { value: 'left bottom' },
            { value: 'right top' },
            { value: 'right center' },
            { value: 'right bottom' },
            { value: 'center top' },
            { value: 'center center' },
            { value: 'center bottom' }
          ];
          break;
        case 'background-attachment':
          obj.list = [
            { value: 'scroll' },
            { value: 'fixed' },
            { value: 'local' }
          ];
          break;
        case 'background-size':
          obj.list = [
            { value: 'auto' },
            { value: 'cover' },
            { value: 'contain' }
          ];
          break;
        case 'transition-property':
          obj.list = [
            { value: 'all' },
            { value: 'width' },
            { value: 'height' },
            { value: 'background-color' },
            { value: 'transform' },
            { value: 'box-shadow' },
            { value: 'opacity' }
          ];
          break;
        case 'transition-timing-function':
          obj.list = [
            { value: 'linear' },
            { value: 'ease' },
            { value: 'ease-in' },
            { value: 'ease-out' },
            { value: 'ease-in-out' }
          ];
          break;
        case 'cursor':
          obj.list = [
            { value: 'auto' },
            { value: 'pointer' },
            { value: 'copy' },
            { value: 'crosshair' },
            { value: 'grab' },
            { value: 'grabbing' },
            { value: 'help' },
            { value: 'move' },
            { value: 'text' }
          ];
          break;
        case 'overflow':
        case 'overflow-x':
        case 'overflow-y':
          obj.list = [
            { value: 'visible' },
            { value: 'hidden' },
            { value: 'scroll' },
            { value: 'auto' }
          ];
          break;
        case 'text-decoration':
          obj.list = [
            { value: 'none', icon: 'far fa-times' },
            { value: 'line-through', icon: 'far fa-strikethrough' },
            { value: 'underline', icon: 'far fa-underline' }
          ];
      }

      // Properties
      switch (prop) {
        case 'margin':
          obj.properties = this.build([
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left'
          ]);
          break;
        case 'container-padding':
        case 'section-padding':
        case 'link-padding':
        case 'padding':
          obj.properties = this.build([
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left'
          ]);
          break;
        case 'text-shadow':
          obj.properties = this.build([
            'text-shadow-h',
            'text-shadow-v',
            'text-shadow-blur',
            'text-shadow-color'
          ]);
          break;
        case 'button-border':
        case 'image-border':
        case 'container-border':
        case 'section-border': // actually also has border sides
        case 'divider-style':
        case 'column-border-style':
        case 'border':
          obj.properties = this.build([
            'border-width',
            'border-style',
            'border-color'
          ]);
          break;
        case 'button-corner-radius':
        case 'image-corner-radius':
        case 'container-corner-radius':
        case 'section-corner-radius':
        case 'icon-corner-radius':
        case 'column-corner-radius':
        case 'border-radius':
          obj.properties = this.build([
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-left-radius',
            'border-bottom-right-radius'
          ]);
          break;
        case 'box-shadow':
          obj.properties = this.build([
            'box-shadow-h',
            'box-shadow-v',
            'box-shadow-blur',
            'box-shadow-spread',
            'box-shadow-color',
            'box-shadow-type'
          ]);
          break;
        case 'background':
          obj.properties = this.build([
            'background-image',
            'background-repeat',
            'background-position',
            'background-attachment',
            'background-size'
          ]);
          break;
        case 'container-background':
        case 'section-background':
          obj.properties = this.build(['background-color', 'background-image']);
          break;
        case 'button-size':
        case 'size':
          obj.properties = this.build(['width', 'height']);
          break;
        case 'transition':
          obj.properties = this.build([
            'transition-property',
            'transition-duration',
            'transition-timing-function'
          ]);
          break;
        case 'transform':
          obj.properties = this.build([
            'transform-rotate-x',
            'transform-rotate-y',
            'transform-rotate-z',
            'transform-scale-x',
            'transform-scale-y',
            'transform-scale-z'
          ]);
          break;
        case 'link-styles':
        case 'font-styles':
          obj.properties = this.build([
            'font-family',
            'font-weight',
            'font-size',
            'color',
            'line-height',
            'text-decoration'
          ]);

          break;
      }

      objs.push(obj);
    }

    return objs;
  }
});
