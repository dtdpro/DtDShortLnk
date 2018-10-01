import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Meteor} from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            url: ''
        };

        this.toggle = this.toggle.bind(this);
    }

    onSubmit(e) {
        const {url} = this.state;

        e.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.toggle();
            } else {
                this.setState({error: err.reason});
            }
        });
    }

    onChange(e) {
        this.setState({
            url: e.target.value
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="col-6 text-right">
                <Button color="success" onClick={this.toggle}>+ Add LInk</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.onSubmit.bind(this)} className="">
                    <ModalHeader toggle={this.toggle}>Add Link</ModalHeader>
                    <ModalBody>
                        {this.state.error ? <p>{this.state.error}</p> : undefined}
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="URL"
                                ref="url"
                                className="form-control-plaintext"
                                value={this.state.url}
                                onChange={this.onChange.bind(this)}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary">Add Link</button>
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}
