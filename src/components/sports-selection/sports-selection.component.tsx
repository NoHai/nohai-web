import React, { Component } from 'react';
import './sports-selection.component.scss';
import { Drawer, Button, List, Typography } from 'antd';

class SportsSelection extends Component {
    state = { visible: false, childrenDrawer: false };

    private data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };

    public render() {
        return (
            <div className="sports-selection">
                <div className="open-modal-button" onClick={this.showDrawer}>
                    Alege un sport
                </div>

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
                                dataSource={this.data}
                                renderItem={(item: any) => (
                                    <List.Item onClick={this.showChildrenDrawer}>{item}</List.Item>
                                )}
                            />
                        </div>

                        <div className="page-section sports-drawer-buttons">
                            <Button onClick={this.onClose} type="primary">
                                Done
                            </Button>
                        </div>
                    </div>
                    <Drawer
                        title="Sport Level"
                        width={320}
                        closable={false}
                        onClose={this.onChildrenDrawerClose}
                        visible={this.state.childrenDrawer}
                        placement="bottom"
                    >
                        <List
                            dataSource={this.data}
                            renderItem={(item: any) => <List.Item>{item}</List.Item>}
                        />
                    </Drawer>
                </Drawer>
            </div>
        );
    }

    private OpenModal() {}
}

export default SportsSelection;
