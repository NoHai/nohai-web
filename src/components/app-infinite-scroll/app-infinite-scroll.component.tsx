import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './app-infinite-scroll.component.scss';

interface AppInfiniteScrollProps {
  hasMore: boolean;
  next: () => {};
}

class AppInfiniteScroll extends Component<AppInfiniteScrollProps> {
  private scrollElement: any;

  constructor(props: any) {
    super(props);
    this.scrollListen = this.scrollListen.bind(this);
  }

  componentDidMount() {
    this.scrollElement = ReactDOM.findDOMNode(this);
    this.createScrollListener();
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  render(): any {
    return (
      <div className="app-infinite-scroll">
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
    const isScrollValid = this.scrollElement && this.props.hasMore;
    if (isScrollValid) {
      const scrollPosition = this.scrollElement.scrollHeight - this.scrollElement.scrollTop;
      const isScrolled = scrollPosition === this.scrollElement.clientHeight;

      if (isScrolled) {
        this.props.next();
      }
    }
  }
}

export default AppInfiniteScroll;
