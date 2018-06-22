import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import AddFishForm from './AddFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
	static propTypes = {
		addFish: PropTypes.func,
		updateFish: PropTypes.func,
		removeFish: PropTypes.func,
		loadSamples: PropTypes.func,
		fished: PropTypes.object,
		storeId: PropTypes.string
	};

	state = {
		uid: null,
		owner: null
	};

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.authHandler({ user });
			}
		});
	};

	handleChange = (e, key) => {
		const fish = this.props.fishes[key];
		const updatedFish = {
			...fish,
			[e.target.name]: e.target.value
		};
		this.props.updateFish(key, updatedFish);
	};

	renderInventory = key => {
		const fish = this.props.fishes[key];
		return (
			<div className="fish-edit" key={key}>
				<input
					type="text"
					name="name"
					placeholder="Fish Name"
					value={fish.name}
					onChange={e => this.handleChange(e, key)}
				/>
				<input
					type="text"
					name="price"
					placeholder="Fish Price"
					value={fish.price}
					onChange={e => this.handleChange(e, key)}
				/>
				<select
					type="text"
					name="status"
					placeholder="Fish Name"
					value={fish.status}
					onChange={e => this.handleChange(e, key)}
				>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea
					type="text"
					name="desc"
					placeholder="Fish Desc"
					value={fish.desc}
					onChange={e => this.handleChange(e, key)}
				/>
				<input
					type="text"
					name="image"
					placeholder="Fish Image"
					value={fish.image}
					onChange={e => this.handleChange(e, key)}
				/>
				<button onClick={e => this.props.removeFish(key)}>
					Remove Fish
				</button>
			</div>
		);
	};

	authenticate = provider => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp
			.auth()
			.signInWithPopup(authProvider)
			.then(this.authHandler);
	};

	authHandler = async authData => {
		const store = await base.fetch(this.props.storeId, { context: this });
		if (!store.owner) {
			await base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid
			});
		}

		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid
		});
  };
  
  logOut = async () => {
    console.log('Loging out!');
    await firebase.auth().signOut();
    this.setState({uid: null});
  }

	render() {
		const logoutButton = <button onClick={this.logOut}>Log Out!</button>;
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}

		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					Sorry! You are not logged in
					{logoutButton}
				</div>
			);
		}

		return (
			<div>
				<h2>Inventory</h2>
        {logoutButton}
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSamples}>
					Load Fishes Samples
				</button>
			</div>
		);
	}
}

export default Inventory;
