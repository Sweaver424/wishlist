import React, { Component } from 'react';

export class WishlistBanner extends Component {

    render = () =>
        <h4 className="bg-primary text-white text-center p-2">
            {this.props.name}'s Wishlist
            ({this.props.task.filter(t => !t.received).length} items not received)
        </h4>
}