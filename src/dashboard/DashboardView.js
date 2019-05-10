import React, {Component} from 'react';
import './DashboardView.css';
import logo from "../assets/logo-light-with-text.svg";

class DashboardView extends Component {

    render() {
        return (
            <div className="dashboardView">
                <div className='header-row'>

                    <div className="header-title">
                        <div className="header-text">DASHBOARD</div>
                        <div className="name-container">
                            <div className="header-user-name">{this.props.user.firstName}<br/> {this.props.user.lastName}</div>
                            <div className="circle-thing">
                                <div className="header-initials">{this.props.user.firstName.charAt(0)}{this.props.user.lastName.charAt(0)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="logo-container">
                        <img src={logo} alt="Team Tasks logo" className="logo-img"/>
                    </div>
                </div>

                <div className="sidebox">
                    <div className="divider"></div>
                    <div className="list">
                        <div className="list-title">Personal Lists</div>
                        {/*<div className="list-element">To Do List</div>*/}
                        {/*<div className="list-element">Training Due</div>*/}
                        <div className="new-list">NEW LIST</div>
                    </div>
                    <div className="divider"></div>
                    <div className="list">
                        <div className="list-title">Teams</div>
                        {/*<div className="list-element">Stark Industries</div>*/}
                        {/*<div className="list-element">S.H.I.E.L.D</div>*/}
                        {/*<div className="list-element">The Avengers</div>*/}
                        {/*<div className="list-element">Guardians of the Galaxy</div>*/}
                        <div className="new-list">NEW LIST</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardView