import React, { Component } from 'react';
import './sports-selection.component.scss';
import { Drawer, List } from 'antd';

class SportsSelection extends Component {
    state = { visible: false, childrenDrawer: false };

    private sports = ['Alergat', 'Fotbal', 'Tenis', 'Handbal', 'Ping Pong', 'Sah'];
    private levels = ['Incepator', 'Intermediar', 'Avansat'];
    public selectedSport = '';
    public inputText = '';

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

    showChildrenDrawer(item: string) {
        this.setState({
            childrenDrawer: true,
        });
        this.selectedSport = item;
    }

    onChildrenDrawerClose(item: string) {
        this.setState({
            childrenDrawer: false,
            visible: false,
        });
        this.inputText = this.selectedSport + ' - ' + item;
    }

    public render() {
        return (
            <div className="sports-selection">
                <input
                    className="open-modal-button"
                    type="text"
                    onClick={this.showDrawer}
                    defaultValue={this.inputText}
                    placeholder="Alege Sportul si nivelul"
                >
                </input>

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
                                    {item}
                                </List.Item>
                            )}
                        />
                    </Drawer>
                </Drawer>
            </div>
        );
    }

    private OpenModal() {}
}

export default SportsSelection;
