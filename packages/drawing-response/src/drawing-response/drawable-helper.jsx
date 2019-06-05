/**
 * Not using React in order to avoid performance issues.
 * If you switch this class to a React one make sure that
 * this interaction will not have performance leaks in pie-website nor in pits.
 */
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
