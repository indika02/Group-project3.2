import React from "react";
import{ Row,Col} from 'react-bootstrap';
import './Account.css';

export default function Account() {
    return(
        <div className="Account">
            <Row>
                <Col>
                <form>
                <div className='form-group'>
                    <label for="Index">Registration Number</label>
                    <input type='text' className='form-control' id='Index' placeholder="Enter the Registration Number" />
                </div>
                </form>
                </Col>
            </Row>
        </div>
    );
}