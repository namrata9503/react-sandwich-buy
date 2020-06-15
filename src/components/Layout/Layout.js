import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';

class Layout extends Component {

    state = {
        showSidebar: false
    }

    sidebarClosed = () => {
        this.setState({ showSidebar: false });
    }
    sidebarToggle = () => {
        this.setState((prevstate) => {
            return { showSidebar: !prevstate.showSidebar };
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    sidebarToggle={this.sidebarToggle} />
                <Sidebar
                    isAuth={this.props.isAuthenticated}

                    open={this.state.showSidebar} closed={this.sidebarClosed} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);