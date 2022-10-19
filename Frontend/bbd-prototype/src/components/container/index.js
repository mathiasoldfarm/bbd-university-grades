import React from 'react';
import {
    Container
} from 'reactstrap';

const CustomContainer = (props) => {
    const routes = [
        {name: "Employer", route: "/employer"},
        {name: "Student", route: "/student"},
        {name: "University", route: "/university"}
    ]
    return (
        <Container>
            <div className='d-flex justify-content-start py-3'>
                {routes.map(data => {
                    const { name, route } = data;
                    return (
                        <div key={name} className='mr-3'>
                            <a href={route}>{name}</a>
                        </div>
                    )
                })}
            </div>
            <div className='py-5 text-left'>
                {props.children}
            </div>
        </Container>
    );
}

export default CustomContainer;