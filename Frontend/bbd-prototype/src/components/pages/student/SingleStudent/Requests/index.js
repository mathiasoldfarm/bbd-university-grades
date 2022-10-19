import React, { Component } from 'react';
import { Alert, Spinner } from 'reactstrap';
import { get, post } from '../../../../../utils/request';
import RequestBlock from './RequestBlock';

class Requests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            requests: false,
        }

        this.renderError = this.renderError.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.renderRequests = this.renderRequests.bind(this);
        this.initialize = this.initialize.bind(this);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
    }

    async componentDidMount() {
        await this.initialize();
    }

    async componentDidUpdate(prevProps) {
        if ( prevProps.cpr !== this.props.cpr ) {
            await this.initialize();
        }
    }

    async initialize() {
        const { cpr } = this.props;
        this.setState({ error: "", loading: true, requests: false });
        try {
            const requests = await get(`student/requests/${cpr}`);
            this.setState({ requests });
        } catch (e) {
            if ( e?.response?.data ) {
                this.setState({ error: e.response.data })
            } else {
                this.setState({ error: e.messae })
            }
        }
        this.setState({ loading: false })
    }

    renderSpinner() {
        const { loading } = this.state;
        if ( loading ) {
            return (
                <div className='mt-3'>
                    <Spinner animation="border" variant="primary" />
                </div>
            );
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

    async accept(companyname) {
        const { cpr, parentInitialize } = this.props;
        this.setState({ error: "", loading: true });
        try {
            await post('student/accept', { cpr: parseInt(cpr), companyname });
            await parentInitialize();
        } catch (e) {
            if ( e?.response?.data ) {
                this.setState({ error: e.response.data })
            } else {
                this.setState({ error: e.messae })
            }
        }
        this.setState({ loading: false });
    }

    async decline(companyname) {
        const { cpr, parentInitialize } = this.props;
        this.setState({ error: "", loading: true });
        try {
            await post('student/decline', { cpr: parseInt(cpr), companyname });
            await parentInitialize();
        } catch (e) {
            if ( e?.response?.data ) {
                this.setState({ error: e.response.data })
            } else {
                this.setState({ error: e.messae })
            }
        }
        this.setState({ loading: false });
    }

    renderRequests() {
        const { requests } = this.state;
        if ( requests?.length > 0 ) {
            return (
                <div className='mt-3'>
                    {requests.map(r => (
                        <RequestBlock
                            key={r.studentCpr}
                            cpr={r.studentCpr}
                            companyname={r.companyName}
                            accept={() => this.accept(r.companyName)}
                            decline={() => this.decline(r.companyName)}
                        />
                    ))}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderRequests()}
                {this.renderSpinner()}
                {this.renderError()}
            </div>
        )
    }
}

export default Requests;