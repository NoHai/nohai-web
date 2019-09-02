import React, { Component } from 'react';
import './sports-selection.component.scss';
import { Drawer, List, Button } from 'antd';
import { SportSelectionProps } from './sports-selection.component.props';
import { SportLevelType } from '../../contracts/enums/common/sport-level.type';

class SportsSelection extends Component<SportSelectionProps> {
    state = { visible: false, childrenDrawer: false };

    private sports = ['Alergat', 'Fotbal', 'Tenis', 'Handbal', 'Ping Pong', 'Sah'];
    private levels = [1, 2, 3];
    public selectedSport = '';

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            textPick: this.selectedSport,
        });
    };

    onCloseChildren = () => {
        this.setState({
            childrenDrawer: false,
        });
    };

    showChildrenDrawer(sport: string) {
        this.setState({
            childrenDrawer: true,
        });
        this.selectedSport = sport;
    }

    onChildrenDrawerClose(level: number) {
        this.setState({
            childrenDrawer: false,
            visible: false,
        });
        if (this.props.onCloseDrawer) {
            this.props.onCloseDrawer(this.selectedSport, level);
        }
    }

    public render() {
        return (
            <div>
                <Button
                    className="full-width"
                    type="dashed"
                    size={'large'}
                    onClick={this.showDrawer}
                >
                    {this.getDisplay()}
                </Button>

                <Drawer
                    title="Sports"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    placement="bottom"
                    height={350}
                    className="sports-selection-drawer"
                >
                    <div className="page-sections">
                        <div className="page-section page-section-large">
                            <List
                                dataSource={this.sports}
                                renderItem={(item: any) => (
                                    <List.Item
                                        onClick={() => {
                                            this.showChildrenDrawer(item);
                                        }}
                                    >
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <Drawer
                        title="Sport Level"
                        width={320}
                        closable={false}
                        visible={this.state.childrenDrawer}
                        onClose={this.onCloseChildren}
                        placement="bottom"
                    >
                        <List
                            dataSource={this.levels}
                            renderItem={(item: any) => (
                                <List.Item
                                    onClick={() => {
                                        this.onChildrenDrawerClose(item);
                                    }}
                                >
                                    {SportLevelType[item]}
                                </List.Item>
                            )}
                        />
                    </Drawer>
                </Drawer>
            </div>
        );
    }

    private getDisplay() {
        const hasValue = this.props.sport;
        return hasValue
            ? `${this.props.sport} - ${SportLevelType[this.props.level]}`
            : 'Alege sportul';
    }
}

export default SportsSelection;
