import React, { Component } from 'react';
import {
    Alert,
    Spinner
} from 'reactstrap';
import { get } from '../../../../utils/request';
import GradeForm from './GradeForm';

class SingleUniversity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            universityData: false,
        }

        this.renderError = this.renderError.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.renderUniversity = this.renderUniversity.bind(this);
        this.initialize = this.initialize.bind(this);
    }

    async componentDidMount() {
        await this.initialize();
    }

    async componentDidUpdate(prevProps) {
        if ( prevProps.universityname !== this.props.universityname ) {
            await this.initialize();
        }
    }

    async initialize() {
        const { universityname } = this.props;
        this.setState({ error: "", loading: true, universityData: false });
        try {
            const universityData = await get(`university/fetch/${universityname}`);
            this.setState({ universityData });
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

    renderUniversity() {
        const { universityData } = this.state;
        if ( universityData ) {
            const { name, country } = universityData;
            return (
                <div>
                    <h3>{name}</h3>
                    <p>Country: {country}</p>
                    <div className='mt-3'>
                        <p>Submit grade</p>
                        <GradeForm university={name} />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='w-100'>
                {this.renderUniversity()}
                {this.renderSpinner()}
                {this.renderError()}
            </div>
        );
    }
}

export default SingleUniversity;