import React, { Component } from 'react';
import {
    Button,
    Alert,
    Spinner
} from 'reactstrap';
import { post } from '../../../../../../utils/request';

class AccessRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            done: false,
            response: ""
        }

        this.renderError = this.renderError.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.requestAccess = this.requestAccess.bind(this);
        this.renderResponse = this.renderResponse.bind(this);
    }

    async requestAccess() {
        const { cpr, companyname } = this.props;
        this.setState({ done: false, loading: true, error: "", response: "" });
        try {
            const response = await post(`employer/request-access`,  { cpr: parseInt(cpr), companyname });
            this.setState({ done: true, response });
        } catch (e) {
            if ( e?.response?.data ) {
                this.setState({ error: e.response.data })
            } else {
                this.setState({ error: e.messae })
            }
        }
        this.setState({ loading: false });
    }

    renderSpinner() {
        const { loading } = this.state;
        if ( loading ) {
            return (
                <div className='mt-3'>
                    <Spinner animation="border" variant="primary" />
                </div>
            )
        }
    }

    renderError() {
        const { error } = this.state;
        if ( error ) {
            return (
                <div className='mt-3'>
                    <Alert color="danger">
                        {error}
                    </Alert>
                </div>
            )
        }
    }

    renderResponse() {
        const { response } = this.state;
        if ( response ) {
            return (
                <div className='mt-3'>
                    <Alert color="success">
                        {response}
                    </Alert>
                </div>
            )
        }
    }

    render() {
        const { cpr } = this.props;
        return (
            <div>
                <p>Do you want to request access to the student with CPR = {cpr}?</p>
                <Button onClick={this.requestAccess}>Yes!</Button>
                {this.renderSpinner()}
                {this.renderError()}
                {this.renderResponse()}
            </div>
        );
    }
}

export default AccessRequest;