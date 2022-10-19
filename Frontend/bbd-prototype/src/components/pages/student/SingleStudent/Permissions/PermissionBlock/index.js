import React from 'react';
import { Row, Col, Button } from 'reactstrap';

const PermissionBlock = (props) => {
    const { companyname, onClick } = props;
    return (
        <div className='border py-2 px-3 rounded'>
            <Row>
                <Col xs={8}>
                    Permission given to company: {companyname}
                </Col>
                <Col>
                    <Button
                        size="sm"
                        className='w-100'
                        color="danger"
                        onClick={onClick}
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default PermissionBlock;