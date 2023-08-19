module.exports = {
    // Other webpack configuration options...
  
    resolve: {
      fallback: {
        "util": require.resolve("util/"),
        "crypto": false,
        "stream": false
      },
    },
  };
  