export default class DrawableHelper {
  constructor(props) {
    const { startx, starty, fillColor, outlineColor } = props;
    this.startx = startx;
    this.starty = starty;
    this.createdAt = new Date();
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
  }
}
