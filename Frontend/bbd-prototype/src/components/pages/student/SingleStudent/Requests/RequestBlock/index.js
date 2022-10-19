import React from 'react';
import { Row, Col, Button } from 'reactstrap';

const RequestBlock = (props) => {
    const { companyname, accept, decline } = props;
    return (
        <div className='border py-2 px-3 rounded'>
            <Row>
                <Col xs={8}>
                    Company: {companyname}
                </Col>
                <Col>
                    <Button
                        size="sm"
                        className='mb-2 w-100'
                        color="success"
                        onClick={accept}
                    >
                        Accept
                    </Button>
                    <Button
                        size="sm"
                        className='w-100'
                        color="danger"
                        onClick={decline}
                    >
                        Decline
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default RequestBlock;