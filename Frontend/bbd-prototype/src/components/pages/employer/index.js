import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row
  } from 'reactstrap';
import { get } from '../../../utils/request';
import SingleEmployer from './SingleEmployer';

class Employer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employers: [],
            employerToggleOpen: false,
            selectedEmployer: false
        }

        this.renderEmployers = this.renderEmployers.bind(this);
        this.toggle = this.toggle.bind(this);
        this.selectEmployer = this.selectEmployer.bind(this);
        this.renderSelectedEmployer = this.renderSelectedEmployer.bind(this);
    }

    async componentDidMount() {
        const employers = await get("employer/all");
        this.setState({ employers });
    }

    toggle() {
        this.setState({ employerToggleOpen: !this.state.employerToggleOpen })
    }

    selectEmployer(selectedEmployer) {
        this.setState({ selectedEmployer });
    }

    renderEmployers() {
        const { employers, employerToggleOpen } = this.state;
        return (
            <div>
                <p>Select employer</p>
                <Dropdown isOpen={employerToggleOpen} toggle={this.toggle}>
                <DropdownToggle caret>Employers</DropdownToggle>
                    <DropdownMenu>
                        {employers.map( companyname=> {
                            return (
                                <DropdownItem
                                    key={companyname}
                                    onClick={() => this.selectEmployer(companyname)}
                                >
                                    {companyname}
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    renderSelectedEmployer() {
        const { selectedEmployer } = this.state;
        if ( selectedEmployer ) {
            return <SingleEmployer companyname={selectedEmployer} />
        }
    }

    render() {
        return (
            <div>
                <Row>
                    {this.renderEmployers()}
                </Row>
                <Row className='pt-4'>
                    {this.renderSelectedEmployer()}
                </Row>
            </div>
        )
    }
}

export default Employer;