import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row
  } from 'reactstrap';
import { get } from '../../../utils/request';
import SingleStudent from './SingleStudent';

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            studentToggleOpen: false,
            selectedStudent: false
        }

        this.renderStudents = this.renderStudents.bind(this);
        this.toggle = this.toggle.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.renderSelectedStudent = this.renderSelectedStudent.bind(this);
    }

    async componentDidMount() {
        const students = await get("student/all");
        this.setState({ students });
    }

    toggle() {
        this.setState({ studentToggleOpen: !this.state.studentToggleOpen })
    }

    selectStudent(selectedStudent) {
        this.setState({ selectedStudent });
    }

    renderStudents() {
        const { students, studentToggleOpen } = this.state;
        return (
            <div>
                <p>Select student</p>
                <Dropdown isOpen={studentToggleOpen} toggle={this.toggle}>
                <DropdownToggle caret>Students</DropdownToggle>
                    <DropdownMenu>
                        {students.map( CPR=> {
                            return (
                                <DropdownItem
                                    key={CPR}
                                    onClick={() => this.selectStudent(CPR)}
                                >
                                    {CPR}
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    renderSelectedStudent() {
        const { selectedStudent } = this.state;
        if ( selectedStudent ) {
            return <SingleStudent cpr={selectedStudent} />
        }
    }

    render() {
        return (
            <div>
                <Row>
                    {this.renderStudents()}
                </Row>
                <Row className='pt-4'>
                    {this.renderSelectedStudent()}
                </Row>
            </div>
        )
    }
}

export default Student;