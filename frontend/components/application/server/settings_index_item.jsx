import React from "react";

class SettingsIndexItem extends React.Component {

    render() {
        let className = "settings-index-item";
        if(this.props.name === this.props.selected) {
            className += " selected"
        }
        return (
            <div name={this.props.name}
                className={className}>
                    {this.props.name}
            </div>
        );
    }
}

export default SettingsIndexItem;