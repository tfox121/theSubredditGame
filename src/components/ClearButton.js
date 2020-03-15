import React from "react";

class ClearButton extends React.Component {
  onClick = event => {
    event.preventDefault();

    this.props.clearState();
  };

  render() {
    return (
      <button onClick={this.onClick} className="ui button clear-button" type="submit">
        Clear
      </button>
    );
  }
}

export default ClearButton;
