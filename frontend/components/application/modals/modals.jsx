import React from "react";
import CreateServerModal from "./create_server_modal";

class Modals extends React.Component {
    render() {
        return (
            <>
            {Object.values(this.props.modals).some((bool) => bool) ? 
                <div id="modals-container">
                    {this.props.modals.addServer ? <CreateServerModal {...this.props}/> : null}
                    
                </div> : null}
            </>
        );
    }
}

export default Modals;
