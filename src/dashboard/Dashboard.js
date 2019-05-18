import React, {Component} from 'react';
import './Dashboard.css';
import logo from "../assets/logo-light-with-text.svg";
import CreateListModal from "./CreateListModal";
import NavBar from "./NavBar";
import AllTeamsView from "./AllTeamsView"
import PersonalList from "./PersonalList";

const pages = {
    ALL_TEAMS: 'all-teams',
    PERSONAL_LIST: 'personal-list'
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: {page: '', id: ''},
            openCreatePersonalListModal: false,
            openCreateTeamModal: false,
            personalLists: [],
            teams: []
        };

        this.headerText = "Dashboard";

        this.openCreatePersonalListModal = this.openCreatePersonalListModal.bind(this);
        this.closeCreateListModal = this.closeCreateListModal.bind(this);
        this.setPersonalLists = this.setPersonalLists.bind(this);
        this.addNewListToPersonalLists = this.addNewListToPersonalLists.bind(this);

        this.openCreateTeamModal = this.openCreateTeamModal.bind(this);
        this.closeCreateTeamModal = this.closeCreateTeamModal.bind(this);
        this.setTeams = this.setTeams.bind(this);
        this.addNewTeamToTeamList = this.addNewTeamToTeamList.bind(this);
        this.toggleTeams = this.toggleTeams.bind(this);

        this.openPersonalList = this.openPersonalList.bind(this);
    }

    renderModals() {
        if (this.state.openCreatePersonalListModal) {
            return <CreateListModal closeModal={this.closeCreateListModal} ownerId={this.props.user.userId}
                                    addResource={this.addNewListToPersonalLists}
                                    name="List Name"/>
        }
        if (this.state.openCreateTeamModal) {
            return <CreateListModal closeModal={this.closeCreateTeamModal} ownerId={this.props.user.userId}
                                    addResource={this.addNewTeamToTeamList}
                                    name="Team Name"/>
        }
    }

    getCurrentPage() {
        if (this.state.currentPage.page === pages.ALL_TEAMS) {
            return <AllTeamsView/>
        } else if (this.state.currentPage.page === pages.PERSONAL_LIST) {
            let list = this.state.personalLists.find(list => list.id === this.state.currentPage.id);
            this.headerText = list.name;
            return <PersonalList list={list}/>
        } else {
            return <div></div>
        }
    }

    openCreatePersonalListModal() {
        this.setState({openCreatePersonalListModal: true});
    }

    closeCreateListModal() {
        this.setState({openCreatePersonalListModal: false});
    }

    openCreateTeamModal() {
        this.setState({openCreateTeamModal: true});
    }

    closeCreateTeamModal() {
        this.setState({openCreateTeamModal: false});
    }

    addNewListToPersonalLists(list) {
        let lists = this.state.personalLists;
        lists.push(list);
        this.setState({personalLists: lists})
    }

    addNewTeamToTeamList(list) {
        let lists = this.state.teams;
        lists.push(list);
        this.setState({teams: lists})
    }

    setPersonalLists(lists) {
        this.setState({personalLists: lists})
    }

    setTeams(teams) {
        this.setState({teams: teams})
    }

    toggleTeams() {
        this.setState({currentPage: {page: pages.ALL_TEAMS}});
    }

    openPersonalList(listId) {
        this.setState({currentPage: {page: pages.PERSONAL_LIST, id: listId}});
    }

    render() {
        let content = this.getCurrentPage();
        return (
            <div className="dashboard-view">
                <div className="header-row">
                    <div className="header-title">
                        <div className="header-text">{this.headerText}</div>
                        <div className="name-container">
                            <div
                                className="header-user-name">{this.props.user.firstName}<br/> {this.props.user.lastName}
                            </div>
                            <div className="circle-thing">
                                <div
                                    className="header-initials">{this.props.user.firstName.charAt(0)}{this.props.user.lastName.charAt(0)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="logo-container">
                        <img src={logo} alt="Team Tasks logo" className="logo-img"/>
                    </div>
                </div>
                <NavBar openCreateListModal={this.openCreatePersonalListModal}
                        userId={this.props.user.userId}
                        personalLists={this.state.personalLists}
                        openPersonalList={this.openPersonalList}
                        setPersonalLists={this.setPersonalLists}
                        teams={this.state.teams}
                        setTeams={this.setTeams}
                        openCreateTeamModal={this.openCreateTeamModal}
                        toggleTeams={this.toggleTeams}
                />
                <div className="main-content">
                    {content}
                    {this.renderModals()}
                </div>
            </div>
        )
    }
}

export default Dashboard