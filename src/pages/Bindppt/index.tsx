import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Row, Col, Container } from 'react-bootstrap';
interface BindpptProps extends RouteComponentProps {
}
class BindpptState {
}


export default class Bindppt extends Component<BindpptProps, BindpptState>{
    constructor(props: BindpptProps) {
        super(props);
    }
    render() {
        return (<div>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <div style={{ position: "absolute", width: "calc(375px - 8%)", height: "200px" }}>
                            <iframe src="https://docs.qq.com/slide/DT0lVc0VWY2NQVmVh" className="slidePPT" style={{ width: "100%", height: "100%" }}>
                            </iframe>
                        </div>
                    </Col>
                </Row>
        </div>);
    }
}