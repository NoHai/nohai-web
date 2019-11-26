import React, { Component } from 'react';
import './sports-selection.component.scss';
import { Drawer, List, Button } from 'antd';
import { SportSelectionProps } from './sports-selection.component.props';
import { SportLevelType } from '../../contracts/enums/common/sport-level.type';
import { CommonService } from '../../business/services/common.service';
import { ListModel } from '../../contracts/models';
import { SportModel } from '../../contracts/models/sport.model';

class SportsSelection extends Component<SportSelectionProps> {
  state = { visible: false, childrenDrawer: false, sports: new ListModel<SportModel>() };
  private levels = [1, 2, 3];
  private isMount: boolean = false;
  public selectedSport = new SportModel();

  async componentDidMount() {
    this.isMount = true;
    await this.getSports();
  }

  componentWillUnmount() {
    this.isMount = false;
  }

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

  showChildrenDrawer(sport: SportModel) {
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
        <Button className="full-width" type="dashed" size={'large'} onClick={this.showDrawer}>
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
                dataSource={this.state.sports.Data}
                renderItem={(item: any) => (
                  <List.Item
                    onClick={() => {
                      this.showChildrenDrawer(item);
                    }}
                  >
                    {item.Name}
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
    // const hasValue = false;
    // return hasValue
    //   ? `${this.props.sport.Name} - ${SportLevelType[this.props.level]}`
    //   : 'Alege activitatea';
  }

  private async getSports() {
    const sports = await CommonService.GetSports();

    if (this.isMount) {
      this.setState({
        sports,
      });
    }
  }
}

export default SportsSelection;
