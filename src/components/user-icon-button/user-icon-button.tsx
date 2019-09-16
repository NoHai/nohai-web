import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/auth.action';
import { initialAuthState } from '../../redux/reducers/auth.reducer';
import history from '../../utilities/core/history';


class UserIconButton extends Component<any, any> {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0"  onClick={() => this.NavigateToProfile()}>Profil</Menu.Item>
                <Menu.Item key="1" onClick={() => this.props.logout()}>
                    Deconectare
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <div
                        className="avatar"
                        style={{
                            backgroundImage:
                                'url(https://s.gravatar.com/avatar/164726d33219641af544edf1d2f38ada?s=80)',
                        }}
                    />
                </Dropdown>
            </div>
        );
    }
    private NavigateToProfile() {
        history.push('/profile');
    }
}

const mapStateToProps = ({ authReducer }: any) => authReducer || initialAuthState;

const mapDispatchToProps = {
    logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserIconButton);
