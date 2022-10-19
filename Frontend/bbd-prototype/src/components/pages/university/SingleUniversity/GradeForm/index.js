import React, { Component } from 'react';
import { 
    Alert,
    Spinner,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { post } from '../../../../../utils/request';

class GradeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cpr: "",
            course: "",
            grade: "",
            error: "",
            loading: false,
            done: false
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submit = this.submit.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderSuccessMessage = this.renderSuccessMessage.bind(this);
    }

    changeHandler(key, e) {
        this.setState({ [key]: e.target.value })
    }

    async submit(e) {
        e.preventDefault();
        this.setState({ error: "", loading: true, universityData: false, done: false });
        const { cpr, course, grade } = this.state;
        if ( cpr !== "" && course !== "" && grade !== "" ) {
            try {
                const body = { studentCpr: cpr, grade, course, universityName: this.props.university }
                await post('university/add-grade', body);
                this.setState({ done: true });
            } catch (e) {
                if ( e?.response?.data ) {
                    this.setState({ error: e.response.data })
                } else {
                    this.setState({ error: e.messae })
                }
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

    renderSuccessMessage() {
        const { done } = this.state;
        if ( done ) {
            return (
                <div className='mt-3'>
                    <Alert color="success">
                        Grade was successfully added
                    </Alert>
                </div>
            )
        }
    }

    render() {
        const { cpr, course, grade } = this.state;
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
                            value={cpr}
                            onChange={(e) => this.changeHandler("cpr", e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="course">Course</Label>
                        <Input
                            type="text"
                            name="course"
                            id="course"
                            placeholder="Course"
                            value={course}
                            onChange={(e) => this.changeHandler("course", e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="grade">Grade</Label>
                        <Input
                            type="number"
                            name="grade"
                            id="grade"
                            placeholder="Grade"
                            value={grade}
                            onChange={(e) => this.changeHandler("grade", e)}
                        />
                    </FormGroup>
                    <Button color="primary">Submit grade</Button>
                </Form>
                {this.renderSpinner()}
                {this.renderError()}
                {this.renderSuccessMessage()}
            </div>
        );
    }
}

export default GradeForm;