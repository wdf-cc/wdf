import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Row, Col } from 'react-bootstrap';
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
            <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                <iframe src="https://docs.qq.com/slide/DT3Z5WmdpVE1RQmNE" className="slidePPT" style={{ width: "100%", height: "100%" }}>
                </iframe>
            </div>
        </div>);
    }
}