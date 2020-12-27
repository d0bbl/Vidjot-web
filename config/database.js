if(process.env.NODE_ENV=== "production") {
  module.exports =
  {mongoURI:"mongodb+srv://clips:asker1234@vidjot-dev.1xwxw.mongodb.net/vidjot-dev?retryWrites=true&w=majority"};

} else {
  module.exports = {mongoURI:"mongodb://localhost/vidjot-dev"};
}
