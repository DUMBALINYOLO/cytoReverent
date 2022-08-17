import React from "react";
import ReactDOM from "react-dom";
import Cytoscape from "cytoscape";
import cise from "cytoscape-cise";
import coseBilkent from "cytoscape-cose-bilkent";
import CytoscapeComponent from "react-cytoscapejs";

import "./styles.css";

Cytoscape.use(cise);
Cytoscape.use(coseBilkent);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");

  return d;
}

const nodeImg = (r, e, d, radius) => {
  const rRadius = radius + 8;
  const eRadius = radius + 17;
  const dRadius = radius + 25;
  const side = 2 * (radius + 30);
  const backCircleStyle = (color = "rgba(0, 0, 0, 0.15)") =>
    `fill="none" stroke="${color}" stroke-width="6px"`;

  const img = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns="http://www.w3.org/2000/svg" width="${side}px" height="${side}px"><g transform="${`translate(${radius +
    30}, ${radius +
    30})`}"><circle cx="0" cy="0" r="${radius}" fill="none" stroke="black" /><circle cx="0" cy="0" r="${rRadius}" ${backCircleStyle()} /><circle cx="0" cy="0" r="${eRadius}" ${backCircleStyle()} /><circle cx="0" cy="0" r="${dRadius}" ${backCircleStyle()} /><path d="${describeArc(
    0,
    0,
    rRadius,
    0,
    360 * r
  )}" stroke-linecap="round" ${backCircleStyle(
    "#FF9C32"
  )}/><path d="${describeArc(
    0,
    0,
    eRadius,
    0,
    360 * e
  )}" stroke-linecap="round" ${backCircleStyle("#C92100")}/><path
 d="${describeArc(
   0,
   0,
   dRadius,
   0,
   360 * d
 )}" stroke-linecap="round" ${backCircleStyle("#0095D3")}/></g></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(img)}`;
};

const elements = [
  {
    data: { id: "beachshirts", label: "beachshirts" },
    classes: ["app"]
  },
  {
    data: {
      id: "b1",
      r: 0.5,
      e: 0.3,
      d: 0.7,
      label: "Beach 1",
      parent: "beachshirts"
    }
  },
  {
    data: {
      id: "b2",
      r: 0.3,
      e: 0.6,
      d: 0.8,
      label: "Beach 2",
      parent: "beachshirts"
    }
  },
  {
    data: {
      id: "b3",
      r: 0.5,
      e: 0.3,
      d: 0.7,
      label: "Beach 3",
      parent: "beachshirts"
    }
  },
  {
    data: {
      id: "b4",
      r: 0.5,
      e: 0.3,
      d: 0.7,
      label: "Beach 4",
      parent: "beachshirts"
    }
  },
  {
    data: { id: "application", label: "application" },
    classes: ["app"]
  },
  {
    data: {
      id: "one",
      r: 0.5,
      e: 0.3,
      d: 0.7,
      label: "Node 1",
      parent: "application"
    }
  },
  {
    data: {
      id: "two",
      r: 0.5,
      e: 0.3,
      d: 0.7,
      label: "Node 2",
      parent: "application"
    }
  },
  {
    data: {
      id: "three",
      r: 0.5,
      e: 0.3,
      d: 0.7,
      label: "Node 3",
      parent: "application"
    }
  },
  {
    data: {
      id: "four",
      r: 0.5,
      e: 0.3,
      d: 0.7,
      label: "Node 4",
      parent: "application"
    }
  },
  {
    data: {
      source: "one",
      target: "two",
      label:
        "\u{1F4AC}450 / \u{2757}56% / \u{23F3}23ms\n\n\u{1F4AC}450 / \u{2757}56% / \u{23F3}43ms"
    }
  },
  {
    data: {
      source: "one",
      target: "three",
      label:
        "\u{1F4AC}450 / \u{2757}56% / \u{23F3}23ms\n\n\u{1F4AC}450 / \u{2757}56% / \u{23F3}43ms"
    }
  },
  {
    data: {
      source: "two",
      target: "three",
      label:
        "\u{1F4AC}450 / \u{2757}56% / \u{23F3}23ms\n\n\u{1F4AC}450 / \u{2757}56% / \u{23F3}43ms"
    }
  },
  {
    data: {
      source: "b1",
      target: "b2",
      label:
        "\u{1F4AC}450 / \u{2757}56% / \u{23F3}23ms\n\n\u{1F4AC}450 / \u{2757}56% / \u{23F3}43ms"
    }
  },
  {
    data: {
      source: "b1",
      target: "three",
      label:
        "\u{1F4AC}450 / \u{2757}56% / \u{23F3}23ms\n\n\u{1F4AC}450 / \u{2757}56% / \u{23F3}43ms"
    }
  },
  {
    data: {
      source: "b2",
      target: "b4",
      label:
        "\u{1F4AC}450 / \u{2757}56% / \u{23F3}23ms\n\n\u{1F4AC}450 / \u{2757}56% / \u{23F3}43ms"
    }
  },
  {
    data: {
      source: "b1",
      target: "b4",
      label:
        "\u{1F4AC}450 / \u{2757}56% / \u{23F3}23ms\n\n\u{1F4AC}450 / \u{2757}56% / \u{23F3}43ms"
    }
  }
];

const style = [
  {
    selector: "node",
    style: {
      label: "data(label)",
      "border-color": "grey",
      "border-opacity": 1,
      "border-style": "solid",
      //"border-width": 2,
      "background-color": "white"
    }
  },
  {
    selector: "node[e]",
    style: {
      "background-image": e =>
        nodeImg(e.data("r"), e.data("e"), e.data("d"), 50),
      "background-position-x": "0px",
      "background-position-y": "0px",
      "background-fit": "cover cover",
      "background-clip": "none",
      width: "100px",
      height: "100px"
    }
  },
  {
    selector: ".app",
    style: {
      "text-halign": "right",
      "font-size": "50px",
      "background-opacity": 0,
      "border-opacity": 0,
      "text-border-color": "black",
      "text-border-width": 1,
      "text-background-color": "black",
      "text-background-opacity": 0.3,
      "text-border-style": "solid",
      "text-border-opacity": 1,
      "text-events": "yes"
    }
  },
  {
    selector: ".app:active",
    style: {
      color: "blue"
    }
  },
  {
    selector: "edge",
    style: {
      label: "data(label)",
      "curve-style": "straight",
      "source-arrow-shape": "vee",
      "target-arrow-shape": "vee",
      "text-rotation": "autorotate",
      "text-wrap": "wrap"
    }
  }
];

const layout = {
  name: "cose-bilkent",
  nodeDimensionsIncludeLabels: true,
  idealEdgeLength: 500
};

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <CytoscapeComponent
        elements={elements}
        stylesheet={style}
        layout={layout}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
