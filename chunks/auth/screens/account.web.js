import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import { Card, CardActions, CardActionButtons } from 'rmwc/Card'
import { Button } from 'rmwc/Button'
import { List, notification } from 'antd'

export default class AccountScreen extends Screen {
  constructor (props) {
    super(props)
    this.state = { ...this.state, inProgress: true }
    this._renderProfileItem = this.renderProfileItem.bind(this)
    this._onProfileItemEdit = (item) => this.onProfileItemEdit.bind(this, item)
    this._logout = this.logout.bind(this)
  }

  componentDidMount () {
    super.componentDidMount()
  }

  subscriptionArgs (subscription) {
    if (!subscription || !this.account) {
      return {}
    }

    return { userId: this.account.user.uid }
  }

  getAccountSuccess (acc) {
    const account = Object.assign({}, this.account.user, acc)
    this.login(account)
  }

  getProfileSuccess (profile) {
    const account = Object.assign({}, this.account.user, profile[0])
    this.login(account)
  }

  onProfileItemEdit (item) {
    console.log(item)
  }

  renderProfileItemActions (item) {
    if (!item.action) {
      return []
    }

    return ([<Button
      onClick={this._onProfileItemEdit(item)}>
      {item.action}
    </Button>])
  }

  renderProfileItem (item) {
    return <List.Item actions={this.renderProfileItemActions(item)}>
      <List.Item.Meta
        description={item.value || 'Not verified yet'}
        title={item.title} />
    </List.Item>
  }

  get profileData () {
    return [{
      id: 'email',
      title: 'Email Address',
      value: this.account.user.email
    }]
  }

  renderMainContentFooter () {
    return <div />
  }

  get skipWallet () {
    return false
  }

  get containerStyle () {
    return {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }

  get formWidth () {
    return this.isSmallScreen ? '95vw' : '600px'
  }

  get formPadding () {
    return this.isSmallScreen ? '10px' : '30px'
  }

  renderActiveContent () {
    return [<List
      key='active-list'
      style={{ marginTop: '20px' }}
      itemLayout='horizontal'
      dataSource={this.profileData}
      renderItem={this._renderProfileItem} />,
      <CardActions style={{ justifyContent: 'center', marginTop: '20px' }} key='active-actions'>
        <CardActionButtons style={{ marginLeft: '10px' }}>
          <Button
            style={{backgroundColor: '#f44336', color: '#ffffff'}}
            onClick={this._logout}>
          Sign Out
          </Button>
        </CardActionButtons>
      </CardActions>]
  }

  get cardStyle () {
    const width = this.formWidth
    const padding = this.formPadding
    const margin = this.isSmallScreen ? '50px 0px' : '0'

    return { width, padding, margin }
  }

  renderMainContent () {
    if (this.state.inProgress) {
      return (<div style={this.containerStyle}>
        <Card style={this.cardStyle}>
          <Components.Loading message='Just a minute, please ...' />
        </Card>
      </div>)
    }

    return (<div style={this.containerStyle}>
      <Card style={this.cardStyle}>
        { this.renderActiveContent() }
      </Card>
      { this.renderMainContentFooter() }
    </div>)
  }

  components () {
    return [this.renderMainContent()]
  }
}
