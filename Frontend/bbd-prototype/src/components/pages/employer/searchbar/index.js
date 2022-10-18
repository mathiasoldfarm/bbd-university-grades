import React, { Component } from 'react';
import { 
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Spinner,
    Alert,
    Row
 } from 'reactstrap';
import { get } from '../../../../utils/request';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            loading: false,
            error: "",
            grades: []
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submit = this.submit.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    changeHandler(e) {
        const { value } = e.target;
        this.setState({ value, error: "" });
    }

    async submit(e) {
        const { value } = this.state;
        this.setState({ error: '', grades: [] })
        e.preventDefault();
        if ( value.length != 0 ) {
            const { employer } = this.props;
            this.setState({ loading: true });
            try {
                const grades = await get(`employer/transcript/${employer}/${value}`);
                this.setState({ grades })
            } catch (e) {
                if ( e?.response?.data ) {
                    this.setState({ error: e.response.data })
                } else {
                    this.setState({ error: e.messae })
                }
            }
            this.setState({ loading: false });
        }
    }

    renderSpinner() {
        if ( this.state.loading ) {
            return (
                <Row className='mt-3'>
                    <Spinner animation="border" variant="primary" />
                </Row>
            )
        }
    }

    requestAccess() {

    }

    renderError() {
        if ( this.state.error ) {
            return (
                <Row className='mt-3'>
                    <Row className='w-100'>
                        <Alert color="danger">
                            {this.state.error}
                        </Alert>
                    </Row>
                    {this.state.error === "You do not have access to transcripts by the given cpr" ? (
                        <Row className='w-100'>
                            <div>
                                <p>Do you want to request access to the student with CPR = {this.state.value}?</p>
                                <Button onClick={this.requestAccess}>Yes!</Button>
                            </div>
                        </Row>
                    ) : null}
                </Row>
            )
        }
    }

    render() {
        const { value } = this.state;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <FormGroup>
                        <Label for="studentCpr">CPR on student you want to see transcript on</Label>
                        <Input
                            type="text"
                            name="cpr"
                            id="studentCpr"
                            placeholder="CPR"
                            value={value}
                            onChange={this.changeHandler}
                        />
                    </FormGroup>
                    <Button color="primary">Search</Button>
                </Form>
                {this.renderSpinner()}
                {this.renderError()}
            </div>
        );
    }
}

export default SearchBar;