import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col
  } from 'reactstrap';
import { get } from '../../../utils/request';
import SearchBar from './searchbar';

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
                        {employers.map( employer => {
                            const { name } = employer;
                            return (
                                <DropdownItem
                                    key={name}
                                    onClick={() => this.selectEmployer(name)}
                                >
                                    {name}
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    renderSelectedEmployer() {
        const { employers, selectedEmployer } = this.state;
        if ( selectedEmployer ) {
            const selectedEmployerData = employers.filter(data => data.name === selectedEmployer);
            if ( selectedEmployerData.length !== 1 ) {
                throw Error("Expected exactly one employer data to be selected");
            }
            const { country, name } = selectedEmployerData[0];
            return (
                <div>
                    <h3>{name}</h3>
                    <p>Country: {country}</p>
                    <div>
                        <SearchBar employer={name} />
                    </div>
                </div>
            )
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