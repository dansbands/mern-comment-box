const secrets = {
  dbUri: process.env.DB_URI
}

export const getSecret = key => secrets[key]



mongodb://<dbuser>:<dbpassword>@ds221405.mlab.com:21405/mern-comment-box1
