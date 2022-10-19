import React, { Component } from 'react';
import { Alert, Spinner } from 'reactstrap';
import { get, deleteRequest } from '../../../../../utils/request';
import PermissionBlock from './PermissionBlock';

class Permissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            permissions: false,
        }

        this.renderError = this.renderError.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.renderPermissions = this.renderPermissions.bind(this);
        this.initialize = this.initialize.bind(this);
        this.deletePermission = this.deletePermission.bind(this);
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
        this.setState({ error: "", loading: true, permissions: false });
        try {
            const permissions = await get(`student/permissions/${cpr}`);
            this.setState({ permissions });
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

    async deletePermission(companyname) {
        const { cpr, parentInitialize } = this.props;
        this.setState({ error: "", loading: true });
        try {
            await deleteRequest(`student/delete-permission/${cpr}/${companyname}`);
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

    renderPermissions() {
        const { permissions } = this.state;
        if ( permissions?.length > 0 ) {
            return (
                <div className='mt-3'>
                    {permissions.map(r => (
                        <PermissionBlock
                            cpr={r.studentCpr}
                            companyname={r.companyName}
                            onClick={() => this.deletePermission(r.companyName)}
                        />
                    ))}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderPermissions()}
                {this.renderSpinner()}
                {this.renderError()}
            </div>
        )
    }
}

export default Permissions;