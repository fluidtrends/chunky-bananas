import React from 'react'
import { Typography } from '@rmwc/typography'
import Screen from '../../../chunks/studio/screens/base.desktop'
import { Button, ButtonIcon } from '@rmwc/button'
import { List, notification } from 'antd'
import { Card, CardActions, CardActionButtons } from '@rmwc/card'
import { Icon } from '@rmwc/icon'

export default class ProfileScreen extends Screen {
  constructor (props) {
    super(props)
    this.state = { ...super.state, inProgress: false }
    this._renderProfileItem = this.renderProfileItem.bind(this)
  }

  componentDidMount () {
    super.componentDidMount()
  }

  get isSecondary () {
    return true
  }

  get screenTitle () {
    return 'Profile'
  }

  get screenIcon () {
    return 'account_circle'
  }

  get profileData () {
    return [{
      id: 'name',
      icon: "account_circle",
      title: 'Full Name',
      value: this.account.user.name
    }, {
      id: 'email',
      icon: "email",
      title: 'Email Address',
      value: this.account.user.email
    }, {
      id: 'id',
      icon: "verified_user",
      title: 'User ID',
      value: this.account.user.uid
    }]
  }

  onProfileItemEdit (item) {
  }

  renderProfileItemActions (item) {
    if (!item.action) {
      return []
    }

    return ([<Button
      onClick={() => this.onProfileItemEdit(item)}>
      {item.action}
    </Button>])
  }

  renderProfileItem (item) {
    return <List.Item actions={this.renderProfileItemActions(item)}>
      <List.Item.Meta
        avatar={<Icon icon={item.icon}/>}
        description={item.value || ''}
        title={item.title} />
    </List.Item>
  }

  renderScreenContents () {
    return this.renderScreenContentsContainer([<List
        key='active-list'
        style={{
          marginTop: '20px',
          textAlign: 'left',
          width: "600px",
        }}
        itemLayout='horizontal'
        dataSource={this.profileData}
        renderItem={this._renderProfileItem} />
        </div>,
      <CardActions key="actions" style={{ justifyContent: 'center', marginTop: '40px' }} key='active-actions'>
        <CardActionButtons style={{ marginLeft: '10px' }}>
          <Button
            style={{backgroundColor: '#f44336', color: '#ffffff'}}
            onClick={() => this.logout()}>
          Sign Out
          </Button>
        </CardActionButtons>
      </CardActions>])
  }
}
