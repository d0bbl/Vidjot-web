if(process.env.NODE_ENV=== "production") {
  module.exports =
  {dbURI:"mongodb+srv:clips:asker1234@vidjot-dev.1xwxw.mongodb.net/vidjot-dev?retryWrites=true&w=majority"}
} else {
  module.exports = {dbURI:"mongodb://localhost/vidjot-dev"}
}
