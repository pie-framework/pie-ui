import React from 'react';
import './protractor.css';

export default function Protractor(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width={600} height={600} viewBox="0 0 600 600" preserveAspectRatio="xMinYMin" id="protractor-360" className="protractor-360" role="img" aria-labelledby="title  desc">
      <defs>
        {/* Text path for outer numbers. */}
        <path id="text-path-1" d="M 215 215 m -215, 0 a 215,215 0 1,1 430,0 a 215,215 0 1,1 -430,0" />
        {/* Text path for inner numbers. */}
        <path id="text-path-2" d="M 193 193 m -193, 0 a 193,193 0 1,1 386,0 a 193,193 0 1,1 -386,0" />
        {/* Text path for Reset button. */}
        <path id="text-path-3" d="M 161.41806,242.59749 A 150,150 0 0 1 357.40251,161.41806 150,150 0 0 1 438.58194,357.40251 150,150 0 0 1 242.59749,438.58194 150,150 0 0 1 161.41806,242.59749 Z" />
        {/* Root line for all segment lines. */}
        <line id="line-1" x1={0} y1={0} x2={0} y2={-300} />
        {/* Group of lines representing 10 degree arc. */}
        <g id="ten-degree-line-segment">
          <use xlinkHref="#line-1" className="primary-line" />
          <use xlinkHref="#line-1" className="tertiary-line" transform="rotate(1)" />
          <use xlinkHref="#line-1" className="tertiary-line" transform="rotate(2)" />
          <use xlinkHref="#line-1" className="tertiary-line" transform="rotate(3)" />
          <use xlinkHref="#line-1" className="tertiary-line" transform="rotate(4)" />
          <use xlinkHref="#line-1" className="secondary-line" transform="rotate(5)" />
          <use xlinkHref="#line-1" className="tertiary-line" transform="rotate(6)" />
          <use xlinkHref="#line-1" className="tertiary-line" transform="rotate(7)" />
          <use xlinkHref="#line-1" className="tertiary-line" transform="rotate(8)" />
          <use xlinkHref="#line-1" className="tertiary-line" transform="rotate(9)" />
        </g>
        {/* Root lines for red and green lines. */}
        <line id="green-line" className="green-line" x1={0} y1={0} x2={0} y2={596} />
        <line id="red-line" className="red-line" x1={0} y1={0} x2={596} y2={0} />
        {/* path for mask to obscure lines under movement controller. */}
        <path id="control-mask" className="white-mask" d="M 0,0 0,600 600,600 600,0 0,0 Z m 234.92969,143.00781 15.32812,37.00586 c -31.28755,12.79176 -57.0773,38.4047 -70.08398,69.60352 l -36.81641,-15.25 c 16.92419,-40.91779 50.61493,-74.53035 91.57227,-91.35938 z M 270,185 l 29.99219,29.99219 0.008,-0.01 0.0117,0.0117 30,-29.98828 0,18.53125 c 7.50302,3.21478 15.16761,6.16076 22.10937,10.51953 21.20337,12.39602 35.97739,33.18681 44.33399,55.94141 L 415,270 385.00977,299.98828 355,270 l 30,29.99805 0.01,-0.008 0.0117,0.01 -0.0117,0.01 L 415,330 l -18.54492,0 c -3.20419,7.51033 -6.15004,15.17773 -10.51172,22.12109 C 373.54699,373.32445 352.75461,388.09652 330,396.45312 l 0,18.54493 -30,-30 0.006,-0.006 -0.01,-0.008 -29.996,29.99642 0,-18.52735 c -7.51033,-3.2042 -15.17773,-6.15011 -22.12109,-10.51171 C 226.67553,373.54536 211.90152,352.75461 203.54492,330 L 185,330 215,300.01172 245,330 l -18.6543,0 c 7.9346,19.61605 24.03838,35.71955 43.6543,43.6543 l 0,-18.65039 c 3.99818,3.9952 7.99596,7.99112 11.99414,11.98632 L 270,355 l 19.01172,0.0117 0,-44.01172 c -14.66667,0.004 -29.33334,0.008 -44,0.0117 l 0,18.98828 L 215,300 l 30.01172,-29.98828 0,19 44.00976,0 c -0.004,-14.67262 -0.006,-29.34496 -0.01,-44.01758 l -19,0 7.49609,-7.50195 L 270,245 l 0,-18.6543 c -19.62701,7.93416 -35.71727,24.05181 -43.66992,43.66602 l 18.66992,0 L 214.98828,300 l -29.97656,-29.98828 18.51562,0 c 3.21778,-7.51083 6.16603,-15.18389 10.5293,-22.13281 C 226.453,226.67554 247.24539,211.90153 270,203.54492 L 270,185 Z m 11.99414,181.99023 18.00195,17.99415 0.004,-0.004 c -6.00182,-5.99732 -12.00404,-11.99287 -18.00586,-17.99024 z m 18.01172,18.00196 0.006,0.006 L 330,355 300.00586,384.99219 Z M 330,355 l 0,18.6543 C 349.61605,365.7197 365.71956,349.61592 373.6543,330 l -18.64258,0 -0.0117,0.0117 0,-0.0117 0.0117,0 29.99805,-29.99023 L 385,300 355,329.99805 c 0.004,-6.33249 0.008,-12.66556 0.0117,-18.99805 -14.66667,0.004 -29.33333,0.008 -44,0.0117 -0.008,14.66667 -0.0164,29.33333 -0.0234,44 6.33705,-0.004 12.67467,-0.008 19.01172,-0.0117 z m 25,-85 18.6543,0 c -7.93092,-19.61938 -24.0391,-35.70365 -43.64258,-43.66016 -0.004,6.21447 -0.008,12.42811 -0.0117,18.64258 l 0.0117,0.0117 -0.0117,0 -18.98828,0 0,44.01758 44,0 C 355.00772,282.67469 355.0037,276.33705 355,270 Z m -25,-25.00586 0,-0.0117 -29.98828,-29.98828 -0.0117,0.0117 30,29.98828 z M 299.99219,214.99219 277.50781,237.49023 300,215 299.992,214.992 Z M 300,288 a 12,11.999965 0 0 0 -12,12 12,11.999965 0 0 0 12,12 12,11.999965 0 0 0 12,-12 12,11.999965 0 0 0 -12,-12 z" />
        {/* path for mask to obscure lines under movement controller, excluding reset button. */}
        <path id="control-mask-alt" className="white-mask" d="m 0,0 0,600 600,0 0,-600 z m 270,185 29.99219,29.99219 0.008,-0.01 0.0117,0.0117 30,-29.98828 0,18.53125 c 7.50302,3.21478 15.16761,6.16076 22.10937,10.51953 21.20337,12.39602 35.97739,33.18681 44.33399,55.94141 L 415,270 385.00977,299.98828 355,270 l 30,29.99805 0.01,-0.008 0.0117,0.01 -0.0117,0.01 L 415,330 l -18.54492,0 c -3.20419,7.51033 -6.15004,15.17773 -10.51172,22.12109 C 373.54699,373.32445 352.75461,388.09652 330,396.45312 l 0,18.54493 -30,-30 0.006,-0.006 -0.01,-0.008 -29.996,29.99642 0,-18.52735 c -7.51033,-3.2042 -15.17773,-6.15011 -22.12109,-10.51171 C 226.67553,373.54536 211.90152,352.75461 203.54492,330 L 185,330 215,300.01172 245,330 l -18.6543,0 c 7.9346,19.61605 24.03838,35.71955 43.6543,43.6543 l 0,-18.65039 c 3.99818,3.9952 7.99596,7.99112 11.99414,11.98632 L 270,355 l 19.01172,0.0117 0,-44.01172 c -14.66667,0.004 -29.33334,0.008 -44,0.0117 l 0,18.98828 L 215,300 l 30.01172,-29.98828 0,19 44.00976,0 c -0.004,-14.67262 -0.006,-29.34496 -0.01,-44.01758 l -19,0 7.49609,-7.50195 L 270,245 l 0,-18.6543 c -19.62701,7.93416 -35.71727,24.05181 -43.66992,43.66602 l 18.66992,0 L 214.98828,300 l -29.97656,-29.98828 18.51562,0 c 3.21778,-7.51083 6.16603,-15.18389 10.5293,-22.13281 C 226.453,226.67554 247.24539,211.90153 270,203.54492 Z m 11.99414,181.99023 18.00195,17.99415 0.004,-0.004 c -6.00182,-5.99732 -12.00404,-11.99287 -18.00586,-17.99024 z m 18.01172,18.00196 0.006,0.006 L 330,355 Z M 330,355 l 0,18.6543 C 349.61605,365.7197 365.71956,349.61592 373.6543,330 l -18.64258,0 -0.0117,0.0117 0,-0.0117 0.0117,0 29.99805,-29.99023 L 385,300 355,329.99805 c 0.004,-6.33249 0.008,-12.66556 0.0117,-18.99805 -14.66667,0.004 -29.33333,0.008 -44,0.0117 -0.008,14.66667 -0.0164,29.33333 -0.0234,44 6.33705,-0.004 12.67467,-0.008 19.01172,-0.0117 z m 25,-85 18.6543,0 c -7.93092,-19.61938 -24.0391,-35.70365 -43.64258,-43.66016 -0.004,6.21447 -0.008,12.42811 -0.0117,18.64258 l 0.0117,0.0117 -0.0117,0 -18.98828,0 0,44.01758 44,0 C 355.00772,282.67469 355.0037,276.33705 355,270 Z m -25,-25.00586 0,-0.0117 -29.98828,-29.98828 -0.0117,0.0117 30,29.98828 z M 299.99219,214.99219 277.50781,237.49023 300,215 299.992,214.992 Z M 300,288 c -6.62743,0 -12.00002,5.37259 -12,12 -2e-5,6.62741 5.37257,12 12,12 6.62743,0 12.00002,-5.37259 12,-12 2e-5,-6.62741 -5.37257,-12 -12,-12 z" />
        {/* Mask using #control-mask. */}
        <mask id="movement-control-mask" x={0} y={0}>
          <use xlinkHref="#control-mask" />
        </mask>
      </defs>
      <style dangerouslySetInnerHTML={{ __html: "\n                \n            /* Transfer CSS to here for self-contained SVG. */\n            \n            " }} />
      <g className="controller-mask-layer">
        {/* All circle radius of protractor. */}
        <g className="circles">
          <circle id="circle-1" className="circle-1" cx={300} cy={300} r={298} />
          <circle id="circle-2" className="circle-2" cx={300} cy={300} r={240} />
          <circle id="circle-3" className="circle-2" cx={300} cy={300} r={180} />
          <circle id="circle-4" className="circle-2" cx={300} cy={300} r={120} />
          <circle id="circle-5" className="circle-2" cx={300} cy={300} r={60} />
          <circle id="circle-6" className="circle-2" cx={300} cy={300} r={12} />
        </g>
        <g className="segment-group">
          {/* Each SVG element represents a 10 degree arc/segment of lines and numbers. */}
          <svg>
            {/* To Do: externalise transforms to CSS. */}
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-90)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              {/* To Do: externalise transforms to CSS. */}
              <text transform="rotate(0 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>0</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              {/* To Do: externalise transforms to CSS. */}
              <text transform="rotate(0 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>0</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-80)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(10 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>10</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(10 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>350</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-70)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(20 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>20</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(20 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>340</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-60)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(30 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>30</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(30 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>330</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-50)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(40 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>40</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(40 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>320</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-40)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(50 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>50</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(50 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>310</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-30)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(60 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>60</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(60 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>300</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-20)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(70 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>70</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(70 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>290</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(-10)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(80 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>80</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(80 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>280</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(0)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(90 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>90</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(90 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>270</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(10)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(100 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>100</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(100 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>260</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(20)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(110 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>110</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(110 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>250</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(30)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(120 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>120</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(120 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>240</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(40)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(130 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>130</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(130 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>230</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(50)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(140 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>140</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(140 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>220</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(60)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(150 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>150</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(150 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>210</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(70)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(160 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>160</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(160 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>200</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(80)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(170 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>170</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(170 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>190</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(90)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(180 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>180</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(180 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>180</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(100)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(190 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>190</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(190 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>170</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(110)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(200 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>200</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(200 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>160</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(120)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(210 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>210</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(210 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>150</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(130)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(220 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>220</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(220 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>140</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(140)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(230 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>230</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(230 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>130</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(150)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(240 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>240</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(240 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>120</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(160)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(250 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>250</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(250 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>110</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(170)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(260 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>260</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(260 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>100</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(180)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(270 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>270</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(270 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>90</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(190)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(280 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>280</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(280 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>80</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(200)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(290 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>290</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(290 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>70</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(210)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(300 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>300</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(300 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>60</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(220)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(310 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>310</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(310 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>50</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(230)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(320 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>320</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(320 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>40</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(240)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(330 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>330</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(330 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>30</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(250)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(340 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>340</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(340 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>20</tspan>
                </textPath>
              </text>
            </g>
          </svg>
          <svg>
            <g className="ten-degree-line-segment" transform="translate(300, 300) rotate(260)">
              <use xlinkHref="#ten-degree-line-segment" />
            </g>
            <g className="clockwise-text">
              <text transform="rotate(350 215 215)">
                <textPath xlinkHref="#text-path-1" startOffset={0} method="align" spacing="exact">
                  <tspan>350</tspan>
                </textPath>
              </text>
            </g>
            <g className="anti-clockwise-text">
              <text transform="rotate(350 193 193)">
                <textPath xlinkHref="#text-path-2" startOffset={0} method="align" spacing="exact">
                  <tspan>10</tspan>
                </textPath>
              </text>
            </g>
          </svg>
        </g>
        {/* Red and green lines. */}
        <use xlinkHref="#green-line" x={300} y={2} className="green-line" />
        <use xlinkHref="#red-line" x={2} y={300} className="red-line" />
      </g>
      <g className="movement-controls" x={185} y={185}>
        {/* Touch zone for rotation controller. */}
        <path className="rotation-control" d="M 85,3.528231e-6 C 85,6.1816435 85,12.363284 85,18.544924 c -22.754606,8.35661 -43.547509,23.13147 -55.943872,44.33484 -4.363275,6.94892 -7.310171,14.62113 -10.527948,22.13196 -6.17234,0 -12.34468,0 -18.51701926,0 C 10.007347,95.011634 20.003534,105.01153 29.999721,115.01144 19.999814,125.00763 9.9999071,135.00381 3.5451214e-8,145 6.181641,145 12.363281,145 18.544922,145 c 8.3566,22.75461 23.131465,43.5475 44.33484,55.9439 6.943359,4.3616 14.609905,7.307 22.120238,10.5112 0,6.1758 0,12.3515 0,18.5273 10,-10 20,-20 30,-30 -10,-9.9925 -20,-19.9851 -30,-29.97766 0,6.21652 0,12.43304 0,18.64956 C 65.384083,180.71955 49.280299,164.61605 41.345703,145 47.563802,145 53.781901,145 60,145 49.996373,135.00009 39.992745,125.00019 29.989118,115.00028 39.992745,105.00409 49.996373,95.007914 60,85.011724 c -6.223028,0 -12.446057,0 -18.669085,0 C 49.283569,65.397514 65.372991,49.279864 85,41.345704 c 0,6.2181 0,12.4362 0,18.6543 10,-10 20,-20 30,-30 -10,-10 -20,-20 -30,-30.0000004717691 z M 145.01171,0.00600353 C 135.00799,10.006004 125.00427,20.006004 115.00055,30.006004 c 10,9.99628 20,19.99256 30,29.98884 0.004,-6.21838 0.007,-12.43676 0.0112,-18.65513 19.60348,7.95651 35.71163,24.04049 43.64255,43.65987 -6.2181,0 -12.4362,0 -18.6543,0 10,10 20,19.999996 30,29.999996 10,-10 20,-19.999996 30,-29.999996 -6.18164,0 -12.36328,0 -18.54492,0 -8.3566,-22.7546 -23.13147,-43.5475 -44.33484,-55.94387 -6.94176,-4.35877 -14.60551,-7.30396 -22.10853,-10.51874 0,-6.17699 0,-12.3539805 0,-18.53097047 z M 200,115 c -10,10 -20,20 -30,30 6.2181,0 12.4362,0 18.6543,0 -7.93474,19.61592 -24.03825,35.7197 -43.6543,43.6543 0,-6.2181 0,-12.4362 0,-18.6543 -10,10 -20,20 -30,30 10,10 20,20 30,30 0,-6.1816 0,-12.3633 0,-18.5449 22.75461,-8.3566 43.5475,-23.1315 55.94387,-44.33486 4.36168,-6.94336 7.30702,-14.60991 10.51121,-22.12024 6.18164,0 12.36328,0 18.54492,0 -10,-10 -20,-20 -30,-30 z" />
        {/* Path for X/Y controller. */}
        <path className="x-y-control" d="m 115,29.982424 -29.988281,30.01172 19.000001,0 c 0.004,14.67262 0.006,29.34496 0.01,44.017576 l -44.009761,0 0,-18.999996 L 30,115 l 30.011719,30 0,-18.98828 c 14.666666,-0.004 29.333334,-0.008 44.000001,-0.0117 l 0,44.01172 L 85,170.00004 l 30.01172,30 29.98828,-30 c -6.33705,0.004 -12.67467,0.008 -19.01172,0.0117 0.007,-14.66667 0.0159,-29.33333 0.0234,-44 14.66667,-0.004 29.33333,-0.008 44,-0.0117 -0.004,6.33705 -0.008,12.67467 -0.0117,19.01172 L 200.02148,115.00004 170,85.000044 c 0.004,6.33705 0.008,12.674666 0.0117,19.011716 l -44,0 0,-44.017576 19,0 L 115,29.982464 Z M 115,103 a 12,12 0 0 1 12,12 12,12 0 0 1 -12,12 12,12 0 0 1 -12,-12 12,12 0 0 1 12,-12 z" />
        {/* Touch zone for rotation controller. */}
        <path className="rotation-hit-zone" d="M 0,0 0,230 230,230 230,0 0,0 Z m 115,30 85,85 -85,85 -85,-85 85,-85 z" />
        {/* Touch zone for X/Y controller. */}
        <path className="x-y-hit-zone" d="m 115,30 -85,85 85,85 85,-85 z" />
      </g>
      {/* Reset button. */}
      <a className="reset-button" title="Reset protractor position.">
        <path className="reset-button-path" d="m 143.35742,234.36719 c 12.27214,5.08333 24.54427,10.16667 36.81641,15.25 13.00668,-31.19882 38.79643,-56.81176 70.08398,-69.60352 -5.10937,-12.33529 -10.21875,-24.67057 -15.32812,-37.00586 m 0,0 c -40.95734,16.82903 -74.64808,50.44159 -91.57227,91.35938" />
        <text>
          <textPath xlinkHref="#text-path-3">
            <tspan dx="0.7em" dy="0.4em">RESET</tspan>
          </textPath>
        </text>
      </a>
    </svg>
  );
}
