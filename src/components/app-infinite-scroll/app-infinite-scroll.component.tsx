import React, { Component } from 'react';
import './app-infinite-scroll.component.scss';
import ObjectHelper from '../../helpers/object.helper';

interface AppInfiniteScrollProps {
  hasMore: boolean;
  next: () => Promise<void>;
}

class AppInfiniteScroll extends Component<AppInfiniteScrollProps> {
  private isLoading: boolean = false;
  private scrollElement: any;
  private id: string = '';
  private isMount: boolean = false;

  constructor(props: any) {
    super(props);
    this.scrollListen = this.scrollListen.bind(this);
  }

  componentWillMount() {
    this.id = ObjectHelper.generateUniqueId();
  }

  componentDidMount() {
    this.isMount = true;
    this.scrollElement = document.getElementById(this.id);
    this.createScrollListener();
  }

  componentWillUnmount() {
    this.isMount = false;
    this.removeScrollListener();
  }

  render(): any {
    return (
      <div className="app-infinite-scroll" id={this.id}>
        <div className="app-infinite-scroll-container">{this.props.children}</div>
      </div>
    );
  }

  private createScrollListener() {
    if (this.scrollElement) {
      this.scrollElement.addEventListener('scroll', this.scrollListen);
    }
  }

  private removeScrollListener() {
    if (this.scrollElement) {
      this.scrollElement.removeEventListener('scroll', this.scrollListen);
    }
  }

  private scrollListen() {
    setTimeout(() => {
      const isScrollValid = this.scrollElement && this.props.hasMore;
      if (isScrollValid) {
        // const scrollPosition = this.scrollElement.scrollHeight - this.scrollElement.scrollTop;
        // const isScrolled = scrollPosition === this.scrollElement.clientHeight;

        const scrolled = this.scrollElement.scrollTop + this.scrollElement.offsetHeight;
        const isScrolled = scrolled >= this.scrollElement.scrollHeight - 80;

        if (isScrolled && !this.isLoading) {
          this.toggleLoading(true);

          this.props.next().finally(() => {
            console.log('scroll', new Date());

            this.toggleLoading(false);
          });
        }
      }
    });
  }

  private toggleLoading(value: boolean) {
    this.isLoading = value;
  }
}

export default AppInfiniteScroll;
