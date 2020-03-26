import React, { Component } from 'react';
import { WishlistBanner } from './WishlistBanner';
import { WishlistCreator } from './WishlistCreator';
import { WishlistRow } from './WishlistRow';
import { VisibilityControl } from './VisibiltyControl';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: "Sean",

      wishlistItems: [
        {
          item: "Shoes",
          received: false
        },
        {
          item: "Miracle Whip",
          received: false
        },
        {
          item: "Money",
          received: true
        }
      ],
      showCompleted: true
    }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewWishlist = (task) => {
    if (!this.state.wishlistItems.find(x => x.action === task)) {
      this.setState({
        wishlistItems: [
          ...this.state.wishlistItems,
          {
            item: task,
            received: false
          }
        ]
      },
      () => localStorage.setItem("wishlists", JSON.stringify(this.state))
    )
  }
}

  wishlistTableRows = (receivedValue) => this.state.wishlistItems.filter(item => item.received === receivedValue).map(item =>
    <WishlistRow key={item.action} item={item} callback={this.toggleWishlist} />
  );

  toggleWishlist = (wishlist) => this.setState(
    {
      wishlistItems: this.state.wishlistItems.map(item => item.action === wishlist.action ? { ...this, received: !item.done } : item)
    },
    () => localStorage.setItem("wishlists", JSON.stringify(this.state))
  );

  componentDidMount = () => {
    let data = localStorage.getItem("wishlists");
    this.setState(
      data != null ? JSON.parse(data) :
      {
        userName: "Sean",
        wishlistItems: [
          {
            item: "Shoes",
            received: false
          },
          {
            item: "Miracle Whip",
            received: false
          },
          {
            item: "Money",
            received: true
          }
        ],
        showCompleted: true
      }
    );
  }

  render() {
    return (
      <div>
        <WishlistBanner name={this.state.userName} task={this.state.wishlistItems} />
        <div className="Container-fluid">
        <WishlistCreator callback={this.createNewWishlist} />
        <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.wishlistTableRows(false)}
            </tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed Tasks" isChecked={this.state.showCompleted}
              callback={(checked) => this.setState({ showCompleted: checked })} />
          </div>
          {this.state.showCompleted &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>received</th>
                </tr>
              </thead>
              <tbody>
                {this.wishlistTableRows(true)}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
};
