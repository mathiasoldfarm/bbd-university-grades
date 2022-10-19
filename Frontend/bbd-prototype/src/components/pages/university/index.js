import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row
  } from 'reactstrap';
import { get } from '../../../utils/request';
import SingleUniversity from './SingleUniversity';

class University extends Component {
    constructor(props) {
        super(props);

        this.state = {
            universities: [],
            univiersityToggleOpen: false,
            selectedUniversity: false
        }

        this.renderUniversities = this.renderUniversities.bind(this);
        this.toggle = this.toggle.bind(this);
        this.selectUniversity = this.selectUniversity.bind(this);
        this.renderSelectedUniversity = this.renderSelectedUniversity.bind(this);
    }

    async componentDidMount() {
        const universities = await get("university/all");
        this.setState({ universities });
    }

    toggle() {
        this.setState({ univiersityToggleOpen: !this.state.univiersityToggleOpen })
    }

    selectUniversity(selectedUniversity) {
        this.setState({ selectedUniversity });
    }

    renderUniversities() {
        const { universities, univiersityToggleOpen } = this.state;
        return (
            <div>
                <p>Select university</p>
                <Dropdown isOpen={univiersityToggleOpen} toggle={this.toggle}>
                <DropdownToggle caret>Universities</DropdownToggle>
                    <DropdownMenu>
                        {universities.map( name => {
                            return (
                                <DropdownItem
                                    key={name}
                                    onClick={() => this.selectUniversity(name)}
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

    renderSelectedUniversity() {
        const { selectedUniversity } = this.state;
        if ( selectedUniversity ) {
            return <SingleUniversity universityname={selectedUniversity} />
        }
    }

    render() {
        return (
            <div>
                <Row>
                    {this.renderUniversities()}
                </Row>
                <Row className='pt-4'>
                    {this.renderSelectedUniversity()}
                </Row>
            </div>
        )
    }
}

export default University;