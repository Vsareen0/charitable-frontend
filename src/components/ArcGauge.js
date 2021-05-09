import React from "react";
import { ArcGauge } from "@progress/kendo-react-gauges";

class ArcGaugeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      value2: 0,
    };
  }

  componentDidMount() {
    const { target_price = 0, raised = 0 } = this.props;

    this.setState({
      value: Math.ceil(Math.random() * 100),
      value2: ((raised / target_price) * 100).toFixed(1),
    });
  }

  render() {
    const colors = [
      { from: 0, to: 40, color: "red" },
      { from: 40, to: 100, color: "green" },
    ];

    const arcOptions = {
      value: this.state.value2,
      colors,
    };

    const arcCenterRenderer = (value, color) => {
      return <h3 style={{ color: color }}>{value}%</h3>;
    };

    return (
      <ArcGauge
        style={{ width: "100px", height: "50px" }}
        {...arcOptions}
        arcCenterRender={arcCenterRenderer}
      />
    );
  }
}

export default ArcGaugeComponent;
