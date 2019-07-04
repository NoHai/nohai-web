import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';

class UserIconButton extends Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">Profil</Menu.Item>
                <Menu.Item key="1">Deconectare</Menu.Item>
                <Menu.Divider />
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

export default UserIconButton;
