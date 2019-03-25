import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Meteor} from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            url: '',
            domain: 'qr.stegareg.com',
        };

        this.toggle = this.toggle.bind(this);
    }

    onSubmit(e) {
        const {url,domain} = this.state;

        e.preventDefault();

        Meteor.call('links.insert', url, domain, (err, res) => {
            if (!err) {
                this.toggle();
            } else {
                this.setState({error: err.reason});
            }
        });
    }

    onChangeURL(e) {
        this.setState({
            url: e.target.value
        });
    }

    onChangeDomain(e) {
        this.setState({
            domain: e.target.value
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
                <Button color="success" onClick={this.toggle}>+ Add Link</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.onSubmit.bind(this)} className="">
                    <ModalHeader toggle={this.toggle}>Add Link</ModalHeader>
                    <ModalBody>
                        {this.state.error ? <p>{this.state.error}</p> : undefined}
                        <div className="form-group mb-2">
                            <label>Destination URL</label>
                            <input
                                type="text"
                                placeholder="URL"
                                ref="url"
                                className="form-control"
                                value={this.state.url}
                                onChange={this.onChangeURL.bind(this)}/>
                        </div>
                        <div className="form-group mb-2">
                            <label>QR Base URL</label>
                            <select value={this.state.domain} onChange={this.onChangeDomain.bind(this)} className="form-control">
                                <option value="">Default</option>
                                <option value="qr.stegareg.com">https://qr.stegareg.com</option>
                                <option value="qr.mtools.site">https://qr.mtools.site</option>
                                <option value="dnaqr.site">https://dnaqr.site</option>
                            </select>
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
