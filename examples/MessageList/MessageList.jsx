/* @jsx React.DOM */

var React = require('react');

var Tree = require('../../src/Tree');

var MessageListItem = require('./MessageListItem'),
    MessageListItemNew = require('./MessageListItemNew');

var MessageList = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  
  getInitialState: function() {    
    return {replying: false};
  },

  _handleReply: function() {
    this.setState({replying: true});
  },
  _handleSubmit: function() {
    this.props.onSubmit(this.refs.newMessage.refs.text.getDOMNode().value);
    this.setState({replying: false});
  },
  _handleCancel: function() {
    this.setState({replying: false});
  },

  render: function() {
    var reply = null;

    if(this.state.replying) {
      reply = (
        <div>
          <MessageListItemNew ref='newMessage'/>
          <button className='button' onClick={this._handleSubmit}>Submit</button>
          <button className='button' onClick={this._handleCancel}>Cancel</button>
        </div>
      );
    } else {
      reply = <button className='button' onClick={this._handleReply}>Reply</button>;
    }

    return (
      <div>
        <Tree nodes={this.props.items} component={MessageListItem} childPropertyName='replies' nodeClassName='node'/>
        {reply}
      </div>
    );
  }
});

module.exports = MessageList;