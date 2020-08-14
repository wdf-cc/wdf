import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default class Home extends Component<any>{
    render() {
        return (
            <Row>
                <Col md={{ span: 2, offset: 3 }} xs={4}>
                    <Link to="/tts" className="btn btn-outline-info">文字转语音</Link>
                </Col>
            </Row>
        )
    }
}