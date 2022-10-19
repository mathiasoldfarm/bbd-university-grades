import React, { Component } from 'react';
import {
    Alert,
    Spinner
} from 'reactstrap';
import { get } from '../../../../utils/request';
import SearchBar from './Searchbar';

class SingleEmployer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            employerData: false
        }

        this.renderError = this.renderError.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.renderEmployer = this.renderEmployer.bind(this);
    }

    async componentDidMount() {
        const { companyname } = this.props;
        this.setState({ error: "", loading: true, employerData: false });
        try {
            const employerData = await get(`employer/fetch/${companyname}`);
            this.setState({ employerData });
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

    renderEmployer() {
        const { employerData } = this.state;
        if ( employerData ) {
            const { name, country } = employerData;
            return (
                <div>
                    <h3>{name}</h3>
                    <p>Country: {country}</p>
                    <div>
                        <SearchBar employer={name} />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderEmployer()}
                {this.renderSpinner()}
                {this.renderError()}
            </div>
        );
    }
}

export default SingleEmployer;