import React, {Component} from 'react';
import './Dashboard.css';
import logo from "../assets/logo-light-with-text.svg";
import CreateModal from "./CreateModal";
import NavBar from "./navbar/NavBar";
import AllTeamsView from "./allteams/AllTeamsView"
import TaskList from "./tasklist/TaskList";
import TeamDetailView from "./teamdetail/TeamDetailView"
import Client from '../Client';
import AllAssignedTasks from "./tasklist/AllAssignedTasks";

const pages = {
    ALL_TEAMS: 'all-teams',
    PERSONAL_LIST: 'personal-list',
    TEAM_DETAIL: "team-detail",
    DASHBOARD: "dashboard"
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: {page: pages.DASHBOARD, id: ''},
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
        this.openTeamDetail = this.openTeamDetail.bind(this);
        this.leaveTeam = this.leaveTeam.bind(this);
        this.goToDashboard = this.goToDashboard.bind(this);
    }

    renderModals() {
        if (this.state.openCreatePersonalListModal) {
            return <CreateModal closeModal={this.closeCreateListModal} owner={{id: this.props.user.userId, type: 'user'}}
                                addList={this.addNewListToPersonalLists} type="list"/>
        }
        if (this.state.openCreateTeamModal) {
            return <CreateModal closeModal={this.closeCreateTeamModal} userId={this.props.user.userId}
                                addTeam={this.addNewTeamToTeamList} type="team"/>
        }
    }

    getCurrentPage() {
        if (this.state.currentPage.page === pages.ALL_TEAMS) {
            this.headerText = "TEAMS";
            return <AllTeamsView userId={this.props.user.userId} addResource={this.addNewTeamToTeamList}/>
        } else if (this.state.currentPage.page === pages.PERSONAL_LIST) {
            let list = this.state.personalLists.find(list => list.id === this.state.currentPage.id);
            this.headerText = list.name;
            return <TaskList userId={this.props.user.userId} list={list}/>
        } else if (this.state.currentPage.page === pages.TEAM_DETAIL) {
          let team = this.state.teams.find(team => team.id === this.state.currentPage.id);
          this.headerText = team.name;
          return <TeamDetailView teamId={team.id} userId={this.props.user.userId} leaveTeam={this.leaveTeam}/>
        } else if (this.state.currentPage.page === pages.DASHBOARD) {
            this.headerText = "DASHBOARD"
            return <AllAssignedTasks userId={this.props.user.userId}/>
        } else {
        }
    }

    goToDashboard(){
        this.setState({currentPage: {page: pages.DASHBOARD, id: null}});

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

    addNewTeamToTeamList(team) {
        let teams = this.state.teams;
        teams.push(team);
        this.setState({teams: teams})
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

    openTeamDetail(teamId) {
        this.setState({currentPage: {page: pages.TEAM_DETAIL, id: teamId}});
    }

    leaveTeam(teamId, userId){
        Client.leaveTeam(teamId, userId);
        let teams = this.state.teams;
        let newTeamList = teams.filter(team => team.id !== teamId);
        this.setState({currentPage: {page: pages.DASHBOARD, id: null}, teams: newTeamList});
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
                                <div className="header-initials">{this.props.user.firstName.charAt(0)}{this.props.user.lastName.charAt(0)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="logo-container">
                        <img src={logo} alt="Team Tasks logo" className="logo-img" onClick={() => this.goToDashboard()}/>
                    </div>
                </div>
                <NavBar openCreateListModal={this.openCreatePersonalListModal}
                        userId={this.props.user.userId}
                        personalLists={this.state.personalLists}
                        openPersonalList={this.openPersonalList}
                        setPersonalLists={this.setPersonalLists}
                        teams={this.state.teams}
                        setTeams={this.setTeams}
                        openTeamDetail={this.openTeamDetail}
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