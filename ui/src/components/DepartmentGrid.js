import React, {Component} from 'react';
import {Image, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const h2Style = {
    fontFamily: "'Oswald', sans-serif",
    textAlign: 'center'
};

const h3Style = {
    fontFamily: "'Oswald', sans-serif",
    textAlign: 'center'
};

export default class DepartmentGrid extends Component {

    render() {
        return (
            <div className="departmentsGrid">
                <h2 style={h2Style}>Shop By Department</h2>
                {this
                    .props
                    .departments
                    .map((department) => <Col xs={6} md={4} key={department.id}>
                        <Link to={`/view/${department.title}`} className="links">
                            <h3 style={h3Style}>{department.title}</h3>
                            <Image
                                src={department.thumb}
                                className="departmentThumb"
                                alt="store"
                                responsive/>
                        </Link>
                    </Col>)}
            </div>
        )
    }
}