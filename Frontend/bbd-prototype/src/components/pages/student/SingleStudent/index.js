import React, { Component } from 'react';
import {
    Alert,
    Spinner,
    Row,
    Col
} from 'reactstrap';
import { get } from '../../../../utils/request';
import Requests from './Requests';
import Permissions from './Permissions';

class SingleStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            studentData: false,
        }

        this.renderError = this.renderError.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.renderStudent = this.renderStudent.bind(this);
        this.initialize = this.initialize.bind(this);
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
        this.setState({ error: "", loading: true, studentData: false });
        try {
            const studentData = await get(`student/fetch/${cpr}`);
            this.setState({ studentData });
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

    renderStudent() {
        const { studentData } = this.state;
        if ( studentData ) {
            const { name, university, cpr } = studentData;
            return (
                <div>
                    <h3>{name}</h3>
                    <p className='mb-0'>University: {university}</p>
                    <p>Cpr: {cpr}</p>
                    <Row>
                        <Col>
                            <h5>All requests from employers</h5>
                            <Requests cpr={cpr} parentInitialize={this.initialize} />
                        </Col>
                        <Col>
                            <h5>All permissions given</h5> 
                            <Permissions cpr={cpr} parentInitialize={this.initialize} />                       
                        </Col>
                    </Row>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='w-100'>
                {this.renderStudent()}
                {this.renderSpinner()}
                {this.renderError()}
            </div>
        );
    }
}

export default SingleStudent;