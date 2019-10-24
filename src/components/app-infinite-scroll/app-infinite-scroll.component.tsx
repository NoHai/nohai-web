import React, { Component } from 'react';
import './app-infinite-scroll.component.scss';
import ObjectHelper from '../../helpers/object.helper';

interface AppInfiniteScrollProps {
  hasMore: boolean;
  next: () => void;
}

class AppInfiniteScroll extends Component<AppInfiniteScrollProps> {
  private scrollElement: any;
  private id: string = '';

  constructor(props: any) {
    super(props);
    this.scrollListen = this.scrollListen.bind(this);
  }

  componentWillMount() {
    this.id = ObjectHelper.generateUniqueId();
  }

  componentDidMount() {
    this.scrollElement = document.getElementById(this.id);
    this.createScrollListener();
  }

  componentWillUnmount() {
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
        const isScrolled = scrolled >= this.scrollElement.scrollHeight;

        if (isScrolled) {
          this.props.next();
        }
      }
    });
  }
}

export default AppInfiniteScroll;
