import React from 'react';
import { Text } from 'react-konva';

import Transformer from './drawable-transformer';

const generateId = () =>
  Math.random().toString(36).substring(2)
  + (new Date()).getTime().toString(36);

export default class TextDrawable {
  static getTextareaNode(id) { return `textarea_${id}`; }
  static getTextNode(id) { return `text_${id}`; }
  static getTransformerNode(id) { return `transformer_${id}`; }

  constructor() {
    this.all = [];
  }

  addNewTextEntry = () => {
    const all = this.all;
    const id = generateId();

    all.push({
      id: id,
      label: 'Double click to edit this text',
      width: 200,
      x: (all.length + 1) * 5 + 50,
      y: (all.length + 1) * 5 + 50,
      textVisible: true,
      transformerVisible: true,
      textareaVisible: false
    });
  };

  forceUpdate() {
    const { forceUpdate } = props;

    if (paint) {
      this.paintColor = paintColor;
      forceUpdate();
    }
  }

  hide(id, props) {
    this.all = this.all.map(item => {
      if (item.id === id) {
        return {
          ...item,
          textVisible: false,
          transformerVisible: false,
          textareaVisible: true
        }
      }
      return item;
    });
    props.forceUpdate();
  }

  show(id, props) {
    this.all = this.all.map(item => {
      if (item.id === id) {
        return {
          ...item,
          textVisible: true,
          transformerVisible: true,
          textareaVisible: false
        }
      }
      return item;
    });
    props.forceUpdate();
  }

  handleDblClick = (e, id, props) => {
    this.hide(id, props);

    const textNode = this[TextDrawable.getTextNode(id)];
    const textareaNode = this[TextDrawable.getTextareaNode(id)];

    const areaPosition = textNode._lastPos;

    textareaNode.value = textNode.text();
    textareaNode.style.position = 'absolute';
    textareaNode.style.top = areaPosition.y + 'px';
    textareaNode.style.left = areaPosition.x + 'px';
    textareaNode.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    textareaNode.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textareaNode.style.fontSize = textNode.fontSize() + 'px';
    textareaNode.style.border = 'none';
    textareaNode.style.padding = '0px';
    textareaNode.style.margin = '0px';
    textareaNode.style.overflow = 'hidden';
    textareaNode.style.background = 'none';
    textareaNode.style.outline = 'none';
    textareaNode.style.resize = 'none';
    textareaNode.style.lineHeight = textNode.lineHeight();
    textareaNode.style.fontFamily = textNode.fontFamily();
    textareaNode.style.transformOrigin = 'left top';
    textareaNode.style.textAlign = textNode.align();
    textareaNode.style.color = textNode.fill();

    let rotation = textNode.rotation();
    let transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }

    let px = 0;
    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(fontSize / 20);
    }
    transform += 'translateY(-' + px + 'px)';

    textareaNode.style.transform = transform;
    textareaNode.style.height = 'auto';
    textareaNode.style.height = textareaNode.scrollHeight + 3 + 'px';

    textareaNode.focus();

    const removeTextarea = () => { this.show(id, props); };

    textareaNode.addEventListener('keydown', function(e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textareaNode.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    function handleOutsideClick(e) {
      if (e.target !== textareaNode) {
        // textNode.text(textareaNode.value);
        // removeTextarea();
      }
    }
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
    props.forceUpdate();
  };

  handleTransform = (e, textNode) => {
    this[textNode].setAttrs({
      width: this[textNode].width() * this[textNode].scaleX(),
      scaleX: 1
    });
  };

  renderTextareas(props) {
    const { draggable, fillColor, outlineColor } = props;

    return this.all.map(text => {
      const { id, textareaVisible } = text;
      const textareaNode = `textarea_${id}`;

      return (
        <textarea
          ref={textarea => { this[textareaNode] = textarea; }}
          style={{ display: `${textareaVisible ? 'block' : 'none'}`}}
        />
      )
    });
  }

  render(props) {
    const { draggable, fillColor, outlineColor } = props;

    return this.all.map(text => {
      const {
        id,
        label,
        x,
        y,
        width,
        textVisible
      } = text;

      const textNode = `text_${id}`;
      const showTransformer = textVisible && draggable;

      return ([
          <Text
            id={id}
            ref={text => { this[textNode] = text; }}
            onDblClick={(e) => draggable ? this.handleDblClick(e, id, props) : () => {}}
            onTransform={(e) => draggable ? this.handleTransform(e, textNode) : () => {}}
            text={label}
            name={textNode}
            x={x}
            y={y}
            width={width}
            draggable={draggable}
            visible={textVisible}
            fontSize={16}
          />,
          showTransformer && <Transformer selectedShapeName={textNode}/>
        ]
      )
    });
  }
}
