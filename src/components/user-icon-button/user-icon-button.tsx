import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/auth.action';
import { initialAuthState } from '../../redux/reducers/auth.reducer';

class UserIconButton extends Component<any, any> {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">Profil</Menu.Item>
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
                                'url(https://randomuser.me/api/portraits/women/65.jpg)',
                        }}
                    />
                </Dropdown>
            </div>
        );
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
