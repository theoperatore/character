'use strict';

import React from 'react';
import Icon from '../components/Icon';
import Popup from '../components/Popup';
import ProgressModal from './ProgressModal';
import { updateUserProfile } from '../state/actions';
import { storage } from '../../api';

window.URL = window.URL || window.webkitURL;

export default React.createClass({
  displayName: 'EditProfile',

  propTypes: {
    active: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    displayName: React.PropTypes.string,
    profileImg: React.PropTypes.string,
    userId: React.PropTypes.string,
  },

  getInitialState() {
    return {
      imgURL: null,
      file: null,
      uploading: false,
      uploadError: '',
      uploadProgress: 0,
    }
  },

  componentWillReceiveProps() {
    this.setState({
      imgURL: null,
      file: null,
      uploadError: '',
      uploading: false,
      uploadProgress: 0,
    });
  },

  imgUpload: null,
  profileInput: null,

  handleFileSelect() {
    let file = this.imgUpload.files[0];
    let url = window.URL.createObjectURL(file);

    this.setState({ imgURL: url, file });
  },

  handleSave() {
    let profileName = this.props.displayName;
    if (this.profileInput && this.profileInput.value.trim() !== '') {
      profileName = this.profileInput.value.trim();
    }

    if (this.state.file) {
      if (!this.props.userId || this.props.userId === '') {
        this.setState({ uploadError: 'No User ID! Are you sure you are logged in?' });
        return;
      }

      this.setState({ uploading: true });
      let upload = storage.child(`images/${this.props.userId}/profileImg.png`).put(this.state.file);
      upload.on('state_changed', snap => {
        this.setState({ uploadProgress: Math.round((snap.bytesTransferred / snap.totalBytes) * 100) });
      }, err => {
        this.setState({ uploadError: err.message });
      }, () => {
        let url = upload.snapshot.downloadURL;
        this.props.dispatch(updateUserProfile(profileName, url));
        this.profileInput.value = '';
        this.setState({ uploadError: '', uploading: false });
      })
    }
    else {
      this.props.dispatch(updateUserProfile(profileName));
        this.profileInput.value = '';
        this.setState({ uploadError: '', uploading: false });
    }

  },

  getDisplayImg() {
    if (!this.props.displayName) return null;

    return this.props.profileImg
    ? <img src={this.props.profileImg} style={{ height: 96 }}/>
    : <div className='text-gray bg-gray flex flex-center' style={{ width: 96, height: 96 }}>
        <span>{this.props.displayName.charAt(0).toUpperCase()}</span>
      </div>
  },

  content() {
    return <section>
      <div className='popup-header' onClick={this.props.onDismiss}>
        <h3>Edit Profile Details</h3>
      </div>
      <div className='popup-content'>
        <div className='edit-profile-container text-center'>
          <h3>{ this.props.displayName }</h3>
          <div className='current-profile-img'>
            {  
              this.state.imgURL
              ? <img
                  src={this.state.imgURL}
                  style={{ height: 96 }}
                  onLoad={() => window.URL.revokeObjectURL(this.state.imgURL)}
                />
              : this.getDisplayImg()
            }
          </div>
          <input
            ref={ref => this.imgUpload = ref}
            id='upload-profile-img'
            type="file"
            accept="image/*"
            onChange={this.handleFileSelect}
            style={{ display: 'none' }}
          />
          <label
            htmlFor='upload-profile-img'
            className='button button-bl m0 mt2'
          >Upload Image</label>
          <div className='mt6'>
            <div className='inputs'>
              <label htmlFor='new-profile-name'>New Profile Name</label>
              <input
                id='new-profile-name'
                ref={ref => this.profileInput = ref}
                type='text'
                placeholder={this.props.displayName}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='popup-footer'>
        <button
          className='text-green bg-green'
          onClick={this.handleSave}
        ><Icon icon='fa fa-save'/> Save</button>
        <button
          className='text-red bg-white'
          onClick={this.props.onDismiss}
        ><Icon icon='fa fa-remove'/> Cancel</button>
      </div>
      <ProgressModal
        active={this.state.uploading}
        progress={this.state.uploadProgress}
      />
    </section>
  },


  render() {
    return <Popup
      active={this.props.active}
      content={this.content()}
      id='edit-profile-details'
      overflowAppContainer='body'
      overflowPaneContainer='body'
    />
  },
});