const chunky = require('react-cloud-chunky')

const filename = __filename
const auth = { limit: 1, private: true }

const createProfile = (account) => {
  const profile = Object.assign({}, {
    node: 'profiles'
  }, {
    userId: account.user.uid,
    email: account.user.email,
    join: {
      users: {
        id: account.user.uid
      }
    }
  })

  return chunky.firebase.operation('add', profile)
}

function executor ({ event, chunk, config, account }) {
  return createProfile(account))
}

module.exports.main = chunky.handler({ executor, filename, auth })
