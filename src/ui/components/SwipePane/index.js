

var React = require('react');

module.exports = class extends React.Component {
  static displayName = "SwipePane";

  render() {
    return (
      <div className="swiper-slide">
        <div className='base-pane-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}