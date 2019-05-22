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
      isDefault: true,
      label: 'Double click to edit this text. Press Enter to submit.',
      width: 200,
      x: (all.length + 1) * 5 + 50,
      y: (all.length + 1) * 5 + 50,
      textVisible: true,
      transformerVisible: true,
      textareaVisible: false,
      createdAt: new Date(),
      type: 'text-entry'
    });
  };

  showTextarea(id) {
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
    this.forceUpdate();
  }

  hideTextarea(id) {
    this.all = this.all.map(item => {
      if (item.id === id) {
        return {
          ...item,
          textVisible: true,
          transformerVisible: false,
          textareaVisible: false
        }
      }
      return item;
    });
    this.forceUpdate();
  }

  updateDefault(id, isDefault) {
    if (isDefault) {
      const current = this.all.filter(item => item.id === id)[0];
      current.isDefault = false;
    }
  }

  showTransformer(id) {
    const current = this.all.filter(item => item.id === id)[0];
    current.transformerVisible = true;
  }

  hideTransformer(id) {
    const current = this.all.filter(item => item.id === id)[0];
    current.transformerVisible = false;
    this.forceUpdate();
  }

  handleClick = (e, id) => {
    const current = this.all.filter(item => item.id === id)[0];
    current.transformerVisible = !current.transformerVisible;
    this.forceUpdate();
  };

  handleDblClick = (e, text) => {
    const { id, isDefault, textVisible } = text;
    this.showTextarea(id);

    const textNode = this[TextDrawable.getTextNode(id)];
    const textareaNode = this[TextDrawable.getTextareaNode(id)];

    const areaPosition = textNode._lastPos;

    textareaNode.value = isDefault ? '' : textNode.text();
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

    textareaNode.addEventListener('keydown', (e) => {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textareaNode.value);
        this.hideTextarea(id);
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        this.hideTextarea(id);
      }
    });

    this.updateDefault(id, isDefault);
    this.forceUpdate();
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
    const { draggable, fillColor, outlineColor, forceUpdate } = props;

    if (!this.forceUpdate) {
      this.forceUpdate = forceUpdate;
    }

    if (!this.props) {
      this.props = forceUpdate;
    }

    return this.all.map(text => {
      const {
        id,
        label,
        x,
        y,
        width,
        textVisible,
        transformerVisible
      } = text;

      const textNode = `text_${id}`;
      const transformerNode = `transformer_${id}`;
      const showTransformer = transformerVisible && draggable;

      return ([
          <Text
            id={id}
            ref={text => { this[textNode] = text; }}
            onClick={(e) => draggable ? this.handleClick(e, id) : {}}
            onDblClick={(e) => draggable ? this.handleDblClick(e, text) : {}}
            onTransform={(e) => draggable ? this.handleTransform(e, textNode) : {}}
            text={label}
            name={textNode}
            x={x}
            y={y}
            width={width}
            draggable={draggable}
            visible={textVisible}
            fontSize={16}
          />,
          showTransformer && (
            <Transformer
              ref={text => { this[transformerNode] = text; }}
              selectedShapeName={textNode}
            />
          )
        ]
      )
    });
  }
}
