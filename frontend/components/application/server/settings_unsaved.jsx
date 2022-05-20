import React from "react";

class SettingsUnsaved extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="unsaved">
                <p>Careful — you have unsaved changes!</p>
                <div className="unsaved-buttons">
                    <div className="reset-changes" onClick={this.props.reset}>Reset</div>
                    <div className="save-changes" onClick={this.props.save}>Save Changes</div>
                </div>
            </div>
        );
    }
}

export default SettingsUnsaved;