import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/auth.action';
import { initialAuthState } from '../../redux/reducers/auth.reducer';
import history from '../../utilities/core/history';
import { UserService } from '../../business/services';


class UserIconButton extends Component<any, any> {
    state={url:""}
    public user:any;
    async componentDidMount(){
       this.user= await UserService.Get();
       this.setState({
            url:`url(${this.user.user.Url})`
       })
    }
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
                                this.state.url,
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
