import { expect } from 'chai';
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import React from 'react'
import UserInput from '../src/components/UserInput'
import { configureStore } from '../src/index.js'
import { Provider } from 'react-redux'
import App from '../src/App.js'
import { ConnectedUsers, Users }  from '../src/components/Users'

describe('store', () => {

  it('returns the initial state after redux dispatches its initial action', () => {
    let store = configureStore()
      const wrapper = shallow(<App store={store}/>)
      expect(wrapper.find(ConnectedUsers)).to.have.length(0)
  });

  it('returns a state provided by the store', () => {
    let store = configureStore()
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedUsers />
        </Provider>
      )
      let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first()
      let WrapperUsers = wrapper.find(Users).first()
      console.log(WrapperUsers.props())
      expect(WrapperUsers.props().users).to.deep.equal([])
  });

  it('updates the props as more users are added to the stores state', () => {
    let store = configureStore()
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedUsers />
        </Provider>
      )
      store.dispatch({type: 'ADD_USER', payload: {name: 'bob', hometown: 'philly'}})
      let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first()
      let WrapperUsers = wrapper.find(Users).first()

      expect(WrapperUsers.props().users).to.deep.equal([{name: 'bob', hometown: 'philly'}])
  });

  it('displays the users in the users component', ()=> {
    let store = configureStore()
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedUsers />
        </Provider>
      )
      store.dispatch({type: 'ADD_USER', payload: {userName: 'bob', hometown: 'philly'}})
      store.dispatch({type: 'ADD_USER', payload: {userName: 'fred', hometown: 'pittsburgh'}})
      let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first()
      let WrapperUsers = wrapper.find(Users).first()
      expect(WrapperUsers.text()).to.include('bob')
      expect(WrapperUsers.text()).to.include('fred')
  })

  it('adds a prop called primary user to the users component which is the first user in the store', () => {
    let store = configureStore()
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedUsers />
        </Provider>
      )
      store.dispatch({type: 'ADD_USER', payload: {name: 'bob', hometown: 'philly'}})
      store.dispatch({type: 'ADD_USER', payload: {name: 'fred', hometown: 'pittsburgh'}})
      let WrapperConnectedUsers = wrapper.find(ConnectedUsers).first()
      let WrapperUsers = wrapper.find(Users).first()

      expect(WrapperUsers.props().primaryUser).to.deep.equal({name: 'bob', hometown: 'philly'})
  });
})
